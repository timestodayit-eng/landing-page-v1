# Landing CMS Pro v1

Clean Hostinger-ready Next.js + MySQL landing-page CMS.

## Included
- Secure single-admin email/password login (no registration)
- Fixed categories: Pro, Call, Trust Gain, FOMO, Review
- One independent master template per category
- Unlimited pages inside each category
- Duplicate, Draft, Publish
- Drag-and-drop section ordering
- Raw HTML + CSS + JavaScript Custom Code block
- Custom JS is isolated in a sandboxed iframe for safer execution
- Live preview
- Global invisible GTM tracking settings: paste full GTM snippet or GTM ID
- GTM loads on every published `/p/...` page, not on admin pages
- Hostinger MySQL

## GitHub / Hostinger root directory
Upload the CONTENTS of this project as the repository root. `package.json`, `app`, `components`, `lib`, `sql` must all sit at the same level.

If you upload the whole `landing-cms-pro-v1` folder into another repository folder, set Hostinger Root Directory to that folder.

## Hostinger environment variables
Set these exact names:

```
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DATABASE=<full Hostinger database name>
MYSQL_USER=<full Hostinger database username>
MYSQL_PASSWORD=<database password>
ADMIN_EMAIL=<your admin email>
ADMIN_PASSWORD=<your admin password>
ADMIN_SESSION_SECRET=<64+ random characters>
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Do not put real passwords in GitHub.

## Database
In phpMyAdmin choose the database first, then import:
`sql/schema-hostinger.sql`

This SQL does NOT create a database, so it works with Hostinger permissions. It is also compatible with the old v0.2 `pages` table and only adds the new `templates` and `settings` tables if missing.

## Build settings
- Framework: Next.js
- Install: `npm install`
- Build: `npm run build`
- Output: `.next`
- Start: `npm start`
- Node: 22 is fine

## Test after deployment
1. Open `/admin` -> should redirect to `/login`.
2. Login with Hostinger `ADMIN_EMAIL` + `ADMIN_PASSWORD`.
3. Open a category.
4. Edit its Master Template.
5. Create a page from the category.
6. Publish and open `/p/your-slug`.
7. Open Tracking / GTM and paste your GTM snippet or GTM ID.

## Raw code safety
The Custom Code block supports raw HTML/CSS/JS. Its JavaScript runs inside a sandboxed iframe so it cannot read the CMS admin cookie or modify the dashboard. Use only code you trust.
