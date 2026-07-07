Quick deploy instructions

1. Open PowerShell in the project folder:

   cd "d:\PROJECTS\SOD\Gisele_and_Wellars\wedding-gisele-jeanpierre"

2. (Optional) Provide your Git remote URL as an argument, or you'll be prompted:

   .\deploy.ps1 "https://github.com/USERNAME/REPO.git"

3. The script will:
   - initialize a git repo if missing
   - stage and commit changes (if any)
   - set branch to `main`
   - add or replace `origin` remote
   - push `main` to the remote (you may be prompted for credentials)
   - call `npx vercel --prod --yes` to start deployment (you may need to sign in)

Notes:
- Pushing requires Git credentials (HTTPS or SSH). For HTTPS, use a Personal Access Token if GitHub blocks account password auth.
- Vercel CLI may request login or an install; run `npx vercel` manually if interactive login is required.
- If you prefer GitHub-based deploys, push to GitHub and connect the repo in the Vercel dashboard instead of using the CLI.

If anything fails, copy the terminal output here and I'll help troubleshoot.