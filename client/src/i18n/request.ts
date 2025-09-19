import { getRequestConfig, RequestConfig } from "next-intl/server";
import { fallbackLocale, locales } from "./config";
import { hasLocale } from "next-intl";

export default getRequestConfig(async ({ requestLocale }): Promise<RequestConfig> => {
    const requested = await requestLocale;

    const locale = hasLocale(locales, requested)
        ? requested
        : fallbackLocale;

    const messages = {
        ...(await import(`../../messages/${locale}/components.json`)).default,
        ...(await import(`../../messages/${locale}/common.json`)).default,
        ...(await import(`../../messages/${locale}/auth.json`)).default,
    }

    return {
        locale,
        messages,
    };
});
