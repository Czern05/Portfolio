# Cyril Rodriguez — Minimal Portfolio

A small, responsive portfolio built with plain HTML, CSS, and JavaScript.

## Run locally

Open `index.html` in a browser. No build tools or dependencies are required. Google Fonts load online; system fonts are used as fallbacks.

## Add project UI screenshots

The Zark's project currently uses the supplied Zark's promotional image as its project cover. Replace it with a real kiosk interface screenshot whenever you have one, using the same file path or updating the `image` property in `script.js`.


1. Capture a real screenshot of the project's interface. Remove browser/desktop clutter and hide private information.
2. Put the image in **`assets/projects/`**. Recommended format: WebP or JPG, around 1200 px wide, cropped to 16:9.
3. Open **`script.js`** and find the relevant project inside `CONTENT.projects`.
4. Change its `image` property from an empty string to the relative image path. For example:

   ```js
   image: 'assets/projects/zarks-kiosk.webp'
   ```

   Suggested filenames:
   - `assets/projects/zarks-kiosk.webp`
   - `assets/projects/dlsau-enrollment.webp`
   - `assets/projects/portfolio.webp`

The `image` property is the image holder. Once set, the screenshot appears on the project card and in the **Project details** dialog. Leave it as `image: ''` until a screenshot is ready; a neutral placeholder appears instead. Do not rename the `assets/projects/` folder unless you also update the paths in `script.js`.

## Add certifications

Open `script.js` and add each completed credential to `CONTENT.certifications` using this structure:

```js
{ name: 'Certification title', issuer: 'Issuing organization', date: 'Month Year', url: 'https://credential-link.example' }
```

Only add credentials you have actually earned. The URL is optional; use a verification or certificate link if one exists.

## Certificates carousel

Certificates live in `CONTENT.certifications` in `script.js`. Each entry takes `name`, `type`, `issuer`, `date`, and `image` (a file in `assets/certificates/`). Use the arrows, dots, keyboard arrow keys, or swipe to move between them; click a certificate to view it full size.

## Add your resume PDF

1. Save the PDF as **`assets/resume/cyril-rodriguez-resume.pdf`** (or another filename of your choice).
2. Open `config.js` and set:

   ```js
   resumeFile: 'assets/resume/cyril-rodriguez-resume.pdf'
   ```

The View and Download buttons appear automatically when `resumeFile` is set. Keep it empty until the PDF is added.

## Update project information and tech stack

Edit `CONTENT.projects` and `CONTENT.skills` near the top of `script.js`. Keep project roles, features, statuses, and technologies accurate to your actual contribution. Do not add placeholder demo or repository links.

## Project structure

```text
Portfolio-main/
├── index.html       # Page content and section layout
├── style.css        # Minimalist styling and responsive layout
├── script.js        # Project data, skills, certifications, project detail dialog
├── config.js        # Optional resume PDF path
├── assets/
│   ├── projects/    # Add project UI screenshots here
│   └── resume/      # Add your resume PDF here
└── README.md        # Setup and content instructions
```

The original bundled project source folders, database exports, recordings, and archives are not included in this portfolio-only package to keep it lightweight. Keep those source projects backed up separately.


### Add your profile photo
Place your portrait image at `assets/profile/profile.jpg`. Use a square, clear image for best results. The circular profile area will display your photo in the home panel; if the image is missing, the `CR` initials remain visible as a fallback.
