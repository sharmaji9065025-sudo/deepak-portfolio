# Deepak Kumar – Portfolio

Files: `index.html`, `style.css`, `script.js`. Put your resume in the same folder as `Deepak_Kumar_Resume.pdf` (or change `RESUME_PATH` at the top of `script.js`).

## Things to replace
- `[ADD YOUR EMAIL]` and `[ADD YOUR PHONE NUMBER]` in `index.html` (also the `mailto:` link).
- Project GitHub links in `script.js` → `PROJECTS` array: set `url` to the real repo and `placeholder: false`.

## Run locally (VS Code)
1. Open this folder in VS Code (File → Open Folder).
2. Install the **Live Server** extension.
3. Right-click `index.html` → **Open with Live Server**.

## Connect the contact form (free)
1. Sign up at https://formspree.io and create a form.
2. Copy the form ID (e.g. `xyzabcd`).
3. In `index.html`, replace `YOUR_FORM_ID` in the form `action`.
Messages will arrive in your email. (Alternatives: Web3Forms, Getform, or your own Flask endpoint.)

## Publish free on GitHub Pages
1. Create a public repo, e.g. `portfolio`, and upload all files (including the PDF).
2. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / root → Save.
3. After a minute your site is live at `https://sharmaji9065025-sudo.github.io/portfolio/`.
