# Ledger & Lot - PC setup and launcher (run on the PC, not in a cloud session).
#
# One command, from any PowerShell window:
#   powershell -ExecutionPolicy Bypass -File C:\Users\jorda\Projects\ledger-and-lot\tools\pc-setup.ps1 -Launch
#
# Every step is idempotent: safe to re-run any time (e.g. after a cloud session pushed to main).
#   -Launch   start a Remote Control session in this folder at the end (drive it from the phone app)
#   -NoSleep  stop Windows sleeping while plugged in, so long agent runs are not killed
# Written for Windows PowerShell 5.1 and PowerShell 7.

param([switch]$Launch, [switch]$NoSleep)
$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

function Step([string]$msg) { Write-Host ''; Write-Host ('== ' + $msg) -ForegroundColor Cyan }
function Fail([string]$msg) { Write-Host ('FAILED: ' + $msg) -ForegroundColor Red; exit 1 }
function Need([string]$cmd, [string]$hint) {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) { Fail ($cmd + ' is not installed. ' + $hint) }
}
function Run([string]$what, [scriptblock]$block) {
  & $block
  if ($LASTEXITCODE -ne 0) { Fail ($what + ' (exit code ' + $LASTEXITCODE + ')') }
}

Step ('Repository: ' + $repo)
Need 'git' 'Install Git for Windows from https://git-scm.com/download/win, then reopen PowerShell.'
Run 'git checkout main' { git checkout main }
Run 'git pull (main is the only branch; commit or stash local edits first)' { git pull --ff-only origin main }

Step 'Node.js'
Need 'node' 'Install Node.js LTS from https://nodejs.org, then reopen PowerShell.'
$nodeMajor = [int]((node --version).TrimStart('v').Split('.')[0])
if ($nodeMajor -lt 18) { Fail ('Node ' + (node --version) + ' is too old; install Node.js LTS (18 or newer).') }
Write-Host ('node ' + (node --version) + ' | npm ' + (npm --version))

Step 'QA harness dependencies (Playwright + Chromium)'
Run 'npm ci' { npm ci --no-audit --no-fund }
Run 'playwright install chromium' { npx playwright install chromium }
Run 'Chromium launch test' { node -e "require('playwright').chromium.launch().then(function(b){console.log('chromium launches ok');return b.close();}).catch(function(e){console.error(e.message);process.exit(1);})" }

Step 'Claude Code CLI'
if (-not (Get-Command 'claude' -ErrorAction SilentlyContinue)) {
  Write-Host 'claude not found - installing @anthropic-ai/claude-code globally via npm'
  Run 'npm install -g @anthropic-ai/claude-code' { npm install -g @anthropic-ai/claude-code }
  $env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User')
}
Need 'claude' 'The npm install finished but claude is not on PATH yet: close and reopen PowerShell, then re-run this script.'
Write-Host ('claude ' + (claude --version))

Step 'Project checks'
Run 'docs-check' { node qa/docs-check.js }
if (Test-Path 'site/index.html') {
  Run 'deskcheck (3 sim months smoke run)' { node qa/deskcheck.js site/index.html --months 3 }
} else {
  Write-Host 'No build at site/index.html yet - deskcheck skipped (expected before V1).'
}

Step 'Machine capacity'
$cpus = (Get-CimInstance Win32_Processor | Measure-Object -Property NumberOfLogicalProcessors -Sum).Sum
$ramGB = [math]::Round((Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory / 1GB, 1)
$lanes = [math]::Min(16, [math]::Max(1, $cpus - 2))
Write-Host ('Logical processors: ' + $cpus + ' | RAM: ' + $ramGB + ' GB')
Write-Host ('Workflow agents at once: ' + $lanes + ' (the cloud session had 2)')

Step 'Power'
if ($NoSleep) {
  Run 'powercfg' { powercfg /change standby-timeout-ac 0 }
  Write-Host 'Sleep on AC power disabled. Undo later with: powercfg /change standby-timeout-ac 30'
} else {
  Write-Host 'Tip: a sleeping PC stops a running session. Re-run with -NoSleep to disable sleep while plugged in.'
}

if ($Launch) {
  Step 'Starting Remote Control session (it also appears in the Claude Code app on your phone)'
  claude remote-control
} else {
  Step 'Ready'
  Write-Host ('Start working:  cd ' + $repo + '  then  claude remote-control')
  Write-Host 'Or open this folder from the Code tab of the Claude Desktop app.'
}
