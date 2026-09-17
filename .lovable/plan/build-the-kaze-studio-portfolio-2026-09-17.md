# Build the Kaze Studio portfolio

## Goal
Use the uploaded Kaze Studio design as the main website and restore all nine uploaded websites as real portfolio projects. Each project will open inside the portfolio at a large, usable size and can also open on its own page.

## What I’ll build
- Recreate Kaze Studio at `/` with its dark cinematic look, English/Arabic switch, search, Featured/Latest filters, contact links, and mobile navigation.
- Add the nine uploaded sites to the project gallery with clear names and categories.
- Give every project its own full-page URL under `/projects/...`, preserving each original file’s images, videos, animation, and interactions.
- Open projects from their cards in an immersive full-screen viewer rather than a tiny preview.
- Make the portfolio and viewer adapt cleanly to iPhone, Samsung/Android phones, tablets, laptops, and wide desktop screens.
- Preserve the existing Kaze contact details and social links from the supplied file.

## Technical details
- Convert the Kaze shell to React/TanStack while keeping the supplied visual design and behavior.
- Serve each supplied project as an isolated HTML experience so its original scripts, video, imagery, and styling continue to work without conflicting with Kaze Studio.
- Add responsive preview sizing, touch-friendly controls, safe-area spacing, scroll locking, keyboard Escape support, and direct “open project” links.
- Replace template metadata with page-specific Kaze Studio and project metadata.
- Validate the home page and several project pages at desktop and mobile widths, including media rendering and viewer controls.

## Assumption
All uploaded HTML files are portfolio work you want displayed; `Untitled-4.html` is the Kaze Studio shell, not an additional project.
