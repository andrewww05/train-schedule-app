import {defineRouting} from 'next-intl/routing';
import { fallbackLocale, locales } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale: fallbackLocale,
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};