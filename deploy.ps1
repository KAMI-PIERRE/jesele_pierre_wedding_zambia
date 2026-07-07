param(
  [string]$RepoUrl
)

function ExitIfFailed($code, $msg) {
  if ($code -ne 0) {
    Write-Error $msg
    exit $code
  }
}

Write-Host "Starting deploy script..."
Write-Host "Working dir: $(Get-Location)"

# Ensure git available
git --version > $null 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Error "git not found. Install Git and re-run this script."
  exit 1
}

# Init repo if needed
if (-not (Test-Path .git)) {
  Write-Host "Initializing git repository..."
  git init
  ExitIfFailed $LASTEXITCODE "git init failed"
}

# Stage files
Write-Host "Staging files..."
git add .
ExitIfFailed $LASTEXITCODE "git add failed"

# Commit if there are staged changes
$changes = git status --porcelain
if ($changes) {
  git commit -m "Deploy wedding invitation site: footer fix and production build"
  if ($LASTEXITCODE -ne 0) {
    Write-Warning "Commit failed (maybe no user.name/email configured). Configure Git and retry."
  }
} else {
  Write-Host "No changes to commit."
}

# Ensure branch main
Write-Host "Setting branch to 'main'..."
git branch -M main
ExitIfFailed $LASTEXITCODE "Failed to set branch to main"

# Configure remote
if (-not $RepoUrl) {
  try {
    $existing = git remote get-url origin 2>$null
    if ($LASTEXITCODE -eq 0 -and $existing) {
      Write-Host "Using existing origin: $existing"
    } else {
      $RepoUrl = Read-Host "Enter Git remote URL (HTTPS), e.g. https://github.com/USER/REPO.git"
    }
  } catch {
    $RepoUrl = Read-Host "Enter Git remote URL (HTTPS), e.g. https://github.com/USER/REPO.git"
  }
}

if ($RepoUrl) {
  # Remove existing origin if different
  $current = git remote get-url origin 2>$null
  if ($LASTEXITCODE -eq 0 -and $current -ne $RepoUrl) {
    Write-Host "Replacing remote origin ($current) -> $RepoUrl"
    git remote remove origin
    ExitIfFailed $LASTEXITCODE "git remote remove failed"
  }
  if (-not (git remote get-url origin 2>$null)) {
    git remote add origin $RepoUrl
    ExitIfFailed $LASTEXITCODE "git remote add failed"
  }
}

# Push (will prompt for credentials for HTTPS)
Write-Host "Pushing to origin main..."
git push -u origin main
if ($LASTEXITCODE -ne 0) {
  Write-Warning "git push returned non-zero. Check credentials, branch name, and remote URL."
} else {
  Write-Host "Push succeeded."
}

# Deploy with Vercel
Write-Host "Triggering Vercel deploy (npx vercel --prod --yes)..."
# This may ask for login / install; run interactively
npx vercel --prod --yes
if ($LASTEXITCODE -ne 0) {
  Write-Warning "Vercel deploy failed or required interactive input. Try running 'npx vercel' manually to sign in."
} else {
  Write-Host "Vercel deploy command completed. Check the Vercel dashboard for the deployment URL."
}

Write-Host "Done."