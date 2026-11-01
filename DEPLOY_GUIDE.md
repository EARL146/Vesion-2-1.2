# Portfolio V2 — Free GitHub Pages Deployment

This Vite portfolio can be hosted on GitHub Pages at no hosting cost. The preferred address is `https://earlnis.dev`; using that custom domain requires registering the domain and controlling its DNS. If the domain is not set up yet, GitHub Pages will provide a free `https://EARL146.github.io/REPOSITORY/` address.

## 1. Create a public GitHub repository

Create a repository for this project, then push the project files to its `main` branch. The local `.env.local` file is ignored by Git. Do not add it to the repository.

## 2. Add the Web3Forms build secret

In the repository, open **Settings → Secrets and variables → Actions → New repository secret**. Add:

- Name: `VITE_WEB3FORMS_ACCESS_KEY`
- Value: your Web3Forms access key

The GitHub Actions workflow reads that secret when it builds the site. If you skip this step, the contact form still offers the Gmail draft fallback. Web3Forms access keys are designed for client-side forms, so the key is included in the generated browser JavaScript; the `.env.local` file itself is not uploaded.

## 3. Enable GitHub Pages

Open **Settings → Pages**, then choose **GitHub Actions** as the source. The included workflow builds the site and publishes `dist/` whenever you push to `main`.

## 4. Connect `earlnis.dev`

Because you are a BSIT student, check the GitHub Student Developer Pack first. GitHub's current Name.com offer includes selected free domain extensions such as `.dev`; Name.com says eligible domains are free for the first year. Apply to GitHub Education with current enrollment proof, then open the Name.com offer through the Student Developer Pack and search for `earlnis.dev`. The exact name must be available and accepted by the offer. Check the checkout total and renewal price: later years are not part of the free first-year offer.

If the offer approves `earlnis.dev`, open **Settings → Pages**, enter `earlnis.dev` under **Custom domain**, and save it. At the registrar, point the apex (`@`) to GitHub Pages with these A records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

After DNS updates propagate, return to **Settings → Pages** and enable **Enforce HTTPS** when GitHub makes it available. GitHub notes that DNS changes can take up to 24 hours to propagate. The Vite build uses relative asset URLs, so it also works at the default GitHub Pages repository address.

## Local development

```bash
npm install
npm run dev
```

Create a production build locally with `npm run build`.

## View counter

The portfolio fetches a shared page-view total using `earlnis.dev` as its stable counter ID. It skips local development, refreshes the total every minute, and displays an unavailable mark if the counter service cannot be reached. The provider deduplicates a visitor for a 30-minute window, so this is a shared view count rather than a lifetime-unique-person count.

GitHub Pages serves static files and does not use the Apache `.htaccess` file included for other hosts.
