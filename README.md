# Al Madrasatul Arabia Li-Tahfeezil Quranil Kareem — Website

Trilingual (English / اردو / العربية) website for **Al Madrasatul Arabia Li-Tahfeezil Quranil Kareem & Madrasatut Tayyibaat Lil Banaat**, Tadban, Hyderabad (est. 1994).

- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, next-intl, Framer Motion, zod, Resend
- **Languages:** `/en` (LTR), `/ur` (RTL, Noto Nastaliq Urdu), `/ar` (RTL, Amiri)
- **Pages:** Home, About, Departments, Donate, Gallery, Admissions, Contact
- Every page is pre-rendered as static HTML for each language. The only server code is the contact-form API route.

---

## 1. Local setup

Requirements: **Node.js 18.17+** (20 or 22 recommended).

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000  → redirects to /en
```

Other scripts:

| Command             | What it does                        |
| ------------------- | ----------------------------------- |
| `npm run build`     | Production build                    |
| `npm start`         | Serve the production build          |
| `npm run lint`      | ESLint                              |
| `npm run typecheck` | TypeScript check                    |

### Environment variables

| Variable               | Purpose                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, e.g. `https://www.yourmadrasa.org`. Used for canonical links, sitemap and Open Graph. |
| `RESEND_API_KEY`       | API key from [resend.com](https://resend.com), used to e-mail form submissions.             |
| `CONTACT_TO_EMAIL`     | Inbox that receives contact and admission enquiries.                                        |
| `CONTACT_FROM_EMAIL`   | Verified sender, e.g. `Madrasa Website <noreply@yourmadrasa.org>`.                          |

In development, if Resend is not configured, submissions are printed to the terminal. **In production, forms return an error until `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set**, so messages are never lost silently.

---

## 2. Editing content (no coding needed)

All content lives in `/content`:

| File                | Contains                                                                                      |
| ------------------- | --------------------------------------------------------------------------------------------- |
| `content/en.json`   | All English text                                                                              |
| `content/ur.json`   | All Urdu text (the brochure is the source)                                                   |
| `content/ar.json`   | All Arabic text                                                                               |
| `content/site.json` | Data shared by all languages: phones, WhatsApp, e-mail, bank details, donation goals and **amounts raised**, stats, gallery images, YouTube videos, map |

The three language files use **the same keys**. When you change a sentence in one language, change the same key in the other two.

### Common edits

**Update how much has been raised for an urgent need.** In `content/site.json`, under `needs`, change `raised` (in rupees, digits only):

```json
{ "id": "borewell", "icon": "droplet", "goal": 400000, "raised": 125000 }
```

The progress bars and percentages update automatically.

**Phone numbers.** In `site.json → phones`, only numbers with `"confirmed": true` and a `tel` value appear on the site. The brochure number `88019974425` has 11 digits and is probably a typo, so it is hidden. Once you have the correct number, set `number`, `tel` (e.g. `+9188xxxxxxxx`) and `"confirmed": true`.

**Bank details / IFSC / UPI.** Edit `site.json → bank`. While `ifsc` is empty, the site shows "To be added". Replace `public/images/upi-qr-placeholder.png` with the real QR image, keeping the file name, or change `upiQr`. Set `upiId` to show a copyable UPI ID.

**Stats** (600+ students and so on) are in `site.json → stats`. Their labels are in each language file under `stats.items`.

**Social links** are in `site.json → social`. Empty values show a greyed-out "coming soon" icon.

**YouTube videos.** Put the video ID (the part after `watch?v=`) in `site.json → videos[].youtubeId`. Titles are in each language file under `gallery.videos.titles`.

After editing, run `npm run build` locally (or just push) to check that the JSON is still valid.

---

## 3. Replacing placeholder images

Every placeholder is an obviously generated green image and is marked with a `TODO` in the code.

| Placeholder                                   | Replace with                                             |
| --------------------------------------------- | -------------------------------------------------------- |
| `public/images/hero/hero-1..3.jpg`            | Wide photos (about 1920×1080) for the home slider        |
| `public/images/about.jpg`                     | Portrait photo of the madrasa (about 900×1100)           |
| `public/images/girls-section.jpg`             | Photo of the girls' section, **without faces**           |
| `public/images/gallery/*.jpg`                 | Gallery photos (list them in `site.json → gallery`)      |
| `public/images/upi-qr-placeholder.png`        | The real UPI QR code                                     |
| `public/images/og.jpg`                        | Optional: 1200×630 social-share image                    |

Gallery entries look like this:

```json
{ "src": "/images/gallery/annual-jalsa-2025.jpg", "category": "events", "width": 1600, "height": 1067 }
```

`category` must be one of `classes`, `events`, `dastarbandi`, `campus`, `girls`. Set `width`/`height` to the photo's real size (or at least the right proportions) so the masonry grid doesn't shift while loading. Compress photos first (e.g. with [squoosh.app](https://squoosh.app)). JPEGs under about 300 KB are ideal. Next.js then serves resized WebP/AVIF automatically.

The logo (`public/images/logo.png`) and the favicons (`app/icon.png`, `app/apple-icon.png`) were generated from the supplied logo PDF.

---

## 4. Project structure

```
app/
  [locale]/            # one folder per page; layout sets lang/dir/fonts
  api/contact/route.ts # contact + admission form handler (zod + Resend)
  sitemap.ts, robots.ts, icon.png
components/
  layout/              # TopTicker, Header, LanguageSwitcher, Footer, FloatingActions
  home/                # HeroSlider, StatsBand
  gallery/             # Gallery (filters + masonry), Lightbox, VideoGrid
  forms/               # EnquiryForm, Toast
  ui/                  # Ornament (gold divider), Icon, CopyButton
  SectionTitle, StatCounter, DepartmentCard, NeedCard, BankDetails,
  DonateCTA, MemorialCard, PageHero, MapEmbed, Reveal, ProgressBar
content/               # en.json, ur.json, ar.json, site.json
i18n/                  # next-intl routing + request config
lib/                   # typed site data, validation schemas, fonts, SEO helper
public/images/         # logo, hero, gallery, placeholders
```

**RTL:** layouts use Tailwind's logical utilities (`ms-`, `pe-`, `start-`, `end-`) and the `rtl:` variant, so they mirror automatically. Directional icons are flipped with `rtl:rotate-180`.

**Accessibility:** skip link, visible focus rings, `aria-current` on navigation, labelled carousel controls with pause, keyboard-navigable lightbox with focus trap, form errors linked with `aria-describedby`, and `prefers-reduced-motion` is respected.

---

## 5. Deploying to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository. The framework is detected as **Next.js**, so no build settings need changing.
3. Under **Environment Variables**, add `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`.
4. Click **Deploy**.
5. To use your own domain, open **Settings → Domains** and add it. Then update `NEXT_PUBLIC_SITE_URL` and redeploy.
6. In Resend, verify your domain so that `CONTACT_FROM_EMAIL` can send from it.
7. Optionally, submit `https://your-domain/sitemap.xml` in Google Search Console.

Every push to the main branch redeploys automatically, so updating `site.json` (for example the amounts raised) takes one commit.

---

## 6. Items still to confirm (TODO)

- [ ] Second phone number (brochure shows `88019974425`, which has 11 digits)
- [ ] IFSC code for SBI Bahadurpura branch
- [ ] UPI ID and QR image
- [ ] Official e-mail address (currently `info@example.org`)
- [ ] Social media links and YouTube video IDs
- [ ] Real photographs for the hero, about and gallery sections
- [ ] Exact full-time class timings (Admissions page)
- [ ] Review of Urdu and Arabic translations by the madrasa
