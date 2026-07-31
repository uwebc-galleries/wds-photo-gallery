# Wisconsin Digital Symposium Photo Gallery

UWEBC-branded photo sharing page for Wisconsin Digital Symposium still
photography.

## Routes

- `/`: local preview entry
- `/wisconsin-digital-symposium/photos/`: intended sub-page route

## Features

- Responsive thumbnail gallery using imported, watermarked 2026 Wisconsin
  Digital Symposium photography
- Full-screen lightbox with next, previous, link copy, image open, and photo
  selection actions
- Multi-photo sharing workflow that lets visitors select up to three photos
- Deep links for individual photos through URL hashes
- Generated sharing text and hashtags based on configurable event metadata
- Share channels for native device sharing, LinkedIn, Facebook, Instagram, and
  email
- Low-risk LinkedIn flow: copy generated text, open LinkedIn, and attach
  downloaded selected photos manually because LinkedIn public share links do not
  accept pre-attached images
- UWEBC/UW-Madison visual treatment, with the same UW Theme and UWEBC child
  stylesheet linked in `app/layout.tsx`

## Development

```bash
npm install
npm run dev
npm run build
```

The project uses the Sites vinext starter and keeps D1/R2 bindings disabled in
`.openai/hosting.json`.

## Updating Photos

The current prototype imports a representative watermarked batch from the
SharePoint folder:

`UWEBC Files/UWEBC Marketing/UWEBC Image Library/2026 WDS`

Optimized gallery assets live in:

- `public/photos/2026-wds/full/`: 2048px lightbox and download images
- `public/photos/2026-wds/thumb/`: 720px thumbnail images
- `outputs/photos/2026-wds/`: duplicate assets for the standalone HTML
  prototype

Edit `eventConfig` in `components/PhotoGalleryPage.tsx` for a new conference or
symposium. It controls the event name, date, venue, parent URL, hero image,
topics, and hashtags.

Edit `galleryPhotos` in `components/PhotoGalleryPage.tsx`. Each entry needs:

- `id`: stable URL hash
- `title`: thumbnail and lightbox label
- `caption`: lightbox and share context
- `year`: gallery metadata
- `thumb`: thumbnail image URL
- `full`: full-screen image URL
- `download`: original image URL

## Social Sharing Notes

The LinkedIn public share flow only accepts a URL. It does not prefill attached
photos in the LinkedIn composer. The gallery therefore uses a safer public
workflow:

- Select up to three photos.
- Copy generated text and hashtags.
- Download the selected photos.
- Open LinkedIn or another network.
- Paste the text and attach the downloaded photos manually.

Native device sharing may include selected image files when the browser and
target app support Web Share file payloads.
