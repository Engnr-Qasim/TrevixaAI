# Trevixa

Trevixa runs React and Vite in the browser and Express on the server. Use Node.js 22 and Bun to install the versions in `bun.lock`.

## Local setup

1. Run `bun install --frozen-lockfile`.
2. Copy `.env.example` to `.env.local` and fill in your own credentials there. The file is Git-ignored.
3. Run `bun run dev` and open `http://localhost:3000`. The public pages and local demo sign-in are available without Clerk credentials in development. Trip generation always requires a real Clerk session.
4. Run `bun run lint` and `bun run build` to verify the project. `bun run start` serves the production build with Express.

## Environment variables

| Name | Scope and purpose |
| --- | --- |
| `GEMINI_API_KEY` | Server only. Gemini API credential. |
| `GEMINI_MODEL` | Optional server override. Defaults to `gemini-3.5-flash-lite`; choose a model that supports Google Search and structured output. |
| `CLERK_SECRET_KEY` | Server only. Match the Clerk instance used by the browser. |
| `CLERK_AUTHORIZED_PARTIES` | Server only. Comma-separated exact app origins with scheme and optional port, without trailing slashes. Required in production. Development defaults to `http://localhost:3000,http://127.0.0.1:3000`. |
| `VITE_CLERK_PUBLISHABLE_KEY` | Public Clerk publishable key. Also read by Express for token verification. |
| `VITE_SUPABASE_URL` | Public Supabase project URL. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public Supabase publishable key. |
| `VITE_SUPABASE_ANON_KEY` | Optional legacy public anon key if a publishable key is unavailable. |

## Dashboard setup

1. **Clerk.** Create or select the production instance, configure the production domain, enable email/password and email verification, and configure Google under Social Connections if you want Google sign-in. Use the app's `/sign-in` and `/sign-up` routes and `/dashboard` as the fallback after authentication. Copy the matching publishable and secret keys to their respective environment variables. [Clerk production setup](https://clerk.com/docs/guides/development/deployment/production)
2. **Clerk and Supabase.** In Clerk, activate the Supabase integration so regular session tokens contain `role: authenticated`. In Supabase **Authentication → Third-Party Auth**, add Clerk using that instance's Frontend API domain. The browser sends the regular Clerk session token through Supabase's `accessToken` option. [Clerk integration](https://clerk.com/docs/guides/development/integrations/databases/supabase) · [Supabase third-party auth](https://supabase.com/docs/guides/auth/third-party/clerk)
3. **Supabase SQL Editor.** Run [supabase/schema.sql](supabase/schema.sql) before releasing the app. It initializes fresh projects and updates the six existing Trevixa tables in a transaction. It removes the old unrestricted policies and replaces them with authenticated ownership checks using the Clerk subject. Review existing policies on those tables for any additional permissive policies created outside this repository. Existing rows must carry the correct production Clerk user IDs; reconcile any demo or previous-instance IDs before expecting those rows to appear in the new instance. Copy the Supabase project URL and publishable key into Vercel's public variables.
4. **Vercel.** Set the project root to this repository and use the Vite preset. Keep the build and output settings from `vercel.json`. Add the environment variables under **Project Settings → Environment Variables**, mark `GEMINI_API_KEY` and `CLERK_SECRET_KEY` sensitive, and set the production app origin in `CLERK_AUTHORIZED_PARTIES`. For previews, use matching development credentials and add the stable preview origin if trip generation should work there. Redeploy after changing variables. [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite) · [Vercel environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables)
5. **Credential rotation.** If an earlier build ran the version that printed the Gemini key, revoke that key and configure a replacement. Review access to the earlier logs.

After deployment, visit a protected route while signed out and confirm sign-in returns you to the same URL. Generate a trip, open it from Saved Trips, and verify with a second account that it cannot access the first account's rows. Confirm Google Search links are rendered when grounding returns citations. Availability, forecasts, roads, and current prices are displayed as unconfirmed, and the itinerary's costs are estimates.
