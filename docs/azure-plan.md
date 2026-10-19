# Azure deployment plan (PS09)

## Architecture
This prototype is a static React/TypeScript single-page application. Azure Static Web Apps hosts the built `dist/` directory over HTTPS. The browser handles all game logic and stores anonymous session history in localStorage. No database, paid AI API, or backend is necessary.

## Deployment
1. Create an Azure Static Web App linked to the GitHub repository (Free plan for a demonstration, subject to current availability/limits).
2. Choose custom build settings: app location `/`, API location blank, output location `dist`.
3. Build with Node 20: `npm ci && npm run build`.
4. Configure the Azure-generated GitHub deployment token as a GitHub Actions secret if using a separate deployment workflow. Never commit it.
5. Confirm the site loads over HTTPS and restart/matching work after deployment.

## Identity and secrets
The app has no user accounts or runtime secrets. Only repository deployment credentials belong in GitHub secrets / Azure-managed integration. Grant the least necessary repository permissions.

## Monitoring and cost
Monitor deployment status and Azure Static Web Apps usage in Azure Portal; use browser console and GitHub Actions logs for failures. Keep to the free tier where available, disable unused resources, and configure budget alerts. Session history remains in each browser and is not uploaded to Azure.

## Limitations
localStorage is device-specific and can be cleared by the browser. This is an educational prototype, not a clinical or cognitive assessment.
