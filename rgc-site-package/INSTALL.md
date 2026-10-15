# RGC – Profile PDFs on the website

## What's in this folder
- `rgc-profile-downloads.js` – the one script that does everything
- `downloads/RGC-Skill-Lab-Brochure.pdf` – 1. RGC Skill Lab Brochure
- `downloads/RGC-Workforce-Solutions.pdf` – 2. RGC Workforce Solutions
- `downloads/cover-skilllab.jpg`, `cover-workforce.jpg` – cover previews
- `preview.html` – open locally to see the result before going live

## Install (3 steps)
1. Upload the `downloads` folder and `rgc-profile-downloads.js` to the **root** of your website (same level as your homepage file).
2. Add this line just before `</body>` in your site's main HTML (once; if each page is a separate file, add to each):
   `<script src="/rgc-profile-downloads.js" defer></script>`
3. Reload the site and press Ctrl+F5.

## What visitors will see (on every page / section)
- Bottom-left **flashing "Download Profiles" dock** with both PDFs (collapsed on phones, tap to open). WhatsApp button on the right stays untouched.
- A **"Company Profiles" section** with cover previews above every footer.
- Flashing download buttons in the footer.
- The dock hides itself while the full profile section is on screen, so buttons never double up.

## Put a flashing button anywhere (optional)
Add an attribute to any link or button, e.g. in the "RGC Workforce Solutions" vertical card or the hero:
`<a data-rgc-pdf="workforce">Download Profile</a>`
`<a data-rgc-pdf="skilllab">Download Brochure</a>`

## Notes
- Different folder? Set `window.RGC_PDF_BASE = '/files/';` in a script tag before this script.
- File sizes are large (Skill Lab 18 MB, Workforce 8.5 MB). Compressing each to under ~5 MB (e.g. ilovepdf.com → Compress PDF) will make downloads faster on mobile. Keep the same file names.
- Page 12 of the Workforce PDF contains bank account details and page 11 your registration documents; confirm you want those public on a website download.
- Animations switch off automatically for visitors who set "reduce motion".
