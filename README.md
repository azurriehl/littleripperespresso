# Little Ripper Espresso website

A one-page React + Vite site for Little Ripper Espresso, Marcoola.

## Change the words, prices, colours or photo

Open **`src/config/business.js`**. Every piece of text, every price, the brand colours, the phone number, the email and the photo link live in that one file. Save it and the site updates. You never need to open the components.

- Hide something: set it to `""` or an empty list `[]`.
- Opening hours: add rows to `hours`, e.g. `{ days: "Mon to Fri", time: "6am to 2pm" }`. While it's empty, the site links to Google Maps for today's hours.
- Reviews and FAQs: add real ones to `testimonials` and `faq`. Each section only appears once it has entries.
- Photo: drop the file into `public/images/`, then set `menu.food.image.src` to `/images/your-file.webp`. `aspect` sets the frame shape and `focus` which part stays in view.

## Run it on your computer

You need Node.js 20.19 or newer.

```bash
npm install
npm run dev        # opens a preview at http://localhost:5173
```

## Publish it

```bash
npm run build          # production files in dist/, ready for Vercel, Netlify or any static host
npm run build:single   # one self-contained file at dist/little-ripper-espresso.html (photo and code inlined)
```

## Where things are

```
src/config/business.js   all content, colours and links
src/styles/global.css    design tokens and styles
src/components/          one file per section (Navbar, Hero, Services, Marquee, About,
                         OrderBuilder, Menu, Testimonials, Faq, Contact, Footer)
src/components/ui/       Button, SectionHeading, ServiceCard, Hand (the logo), Icon, Sprite
```

The "Text your order" button opens the customer's own Messages app with the order filled in. No server or SMS service is involved.
