<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Admin demo

Open `/admin` for the store dashboard. The admin includes overview, orders,
products, inventory, customers, analytics, discounts, settings, and a Content
Studio for storefront pages (including Our Story), blog stories, FAQs, product
reviews, and customer messages.

The admin uses sample data only. Search, filters, sorting, pagination, CSV
exports, product/content forms, inventory adjustments, discount actions,
notification actions, and profile actions demonstrate the intended interactions
locally. Admin table rows provide working view/edit/delete actions, with a
confirmation step for individual and bulk deletes; Content Studio and Discounts
also support viewing, editing, and deleting their records. These CRUD changes
are demo state and reset when the page reloads. Content Studio includes homepage hero and promotional placement
management, storefront pages, stories, FAQ entries and page presentation,
contact-page copy, reviews, and customer messages. Admin settings are stored in
browser `localStorage` so preference and store-profile edits survive a refresh
in the same browser; other demo content edits remain in memory. No changes are
written to a database or sent to customers.

On the storefront, shoppers can select individual cart items (or select all)
for checkout. Totals and discounts reflect only the selected items, and
unselected items remain in the cart after an order is placed. Cart selections
persist in browser `localStorage`.

## Prisma data model

The proposed PostgreSQL schema and its table/relationship notes live in
[`database-tables.prisma`](./database-tables.prisma). [`prisma.config.mjs`](./prisma.config.mjs)
points Prisma ORM 7 at this file and reads `DATABASE_URL` from the environment.
Prisma itself is not included in the dependencies, and no database connection
or migrations are configured to run by this demo.

The schema separates scheduled homepage/promotional placements
(`StorefrontCampaign`), FAQ page presentation (`FAQPageContent`), and public
contact-page/form configuration (`ContactPageContent`) from individual FAQ
entries and submitted contact messages. `StoreSetting` is intended for keyed
store-wide preferences; the demo's browser storage is only a temporary UI
stand-in and is not automatically synchronized with Prisma.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# timeless-trends
Ecommerce website
>>>>>>> 88a6ab262d505e4f3bf65ec4dd1943292b779719
