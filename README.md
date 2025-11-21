# Pasteplace

A modern **Next.js** application for storing and sharing text snippets securely. Built with **TailwindCSS**, **Shadcn UI**, and **Turso/LibSQL** for persistent storage.

## Features

- **Optimistic UI**: Instant feedback for add/delete actions with loading states.
- **Pagination**: Browse pastes 10 per page with navigation controls.
- **Delete All**: Remove all pastes with a confirmation dialog.
- **Markdown Support**: Choose between plain text and markdown modes; markdown is rendered safely.
- **Password Protection**: Secure pastes with optional passwords.
- **Responsive Design**: Clean, modern UI that works on desktop and mobile.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or yarn install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- Edit pages in the `app/` directory (e.g., `app/page.tsx`).
- The project uses `next/font` to load the **Geist** font automatically.
- Run `npm run lint` to check code quality.

## Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)

## Deploy on Vercel

Deploy effortlessly with the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

---

© 2025 Pasteplace. All rights reserved.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
