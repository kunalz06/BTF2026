# BUILD THE FUTURE HACKATHON 2026

Production microsite for the **BUILD THE FUTURE HACKATHON**, an annual hackathon plus event jointly hosted by **GitHub**, **GDG India**, and **Google Cloud**.

The v1 website is intentionally informational only: it does not collect participant data, provide authentication, process payments, or offer direct registration. Participants are directed to their respective college GDG team leads for payment and participation details.

## Confirmed event facts

- Event date: **1 November 2026**
- Format: industry expert lectures, networking, and a **36-hour hackathon**
- Eligibility: **college students only**
- Team size: **2–6 members**, with one team lead
- Fee: **₹4,500 per participant**
- Payment deadline: **2 October 2026**

No venue, city, speaker list, prize pool, judging criteria, tracks, payment account, phone number, or direct registration URL is claimed by the site.

## Stack

- Next.js App Router + TypeScript
- React
- CSS-driven responsive design
- Vitest + Testing Library
- Supabase Storage for approved public event media
- Vercel deployment

## Local setup

Requirements: Node.js 22.13+ and npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open the local URL printed by Next.js.

## Public environment variables

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://tdvhiarzoqzvuavwrxfz.supabase.co
NEXT_PUBLIC_EVENT_ASSET_BUCKET=build-the-future-hackathon-assets
```

Only public values belong in the frontend. Do **not** add a Supabase service-role credential to this project.

## Quality gates

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

## Supabase media

The site uses the dedicated public-read bucket `build-the-future-hackathon-assets`. Public bucket access is for approved media downloads; no anonymous write policy is required or intended. The poster component has a repository-owned fallback at `public/event-poster-fallback.svg`, so critical event information never depends on remote media availability.

## Deployment

The intended production path is GitHub -> Vercel. Configure the two public environment variables above in Vercel and deploy the verified commit. The site contains no server secret or database migration dependency.

Design and implementation documents are retained under `docs/superpowers/`.
