import "../../globals.css";
import { ReactNode } from "react";
import { hasLocale } from "next-intl";
import { Session } from "next-auth";
import { locales } from "@/i18n/config";
import { notFound } from "next/navigation";

type Props = {
  children: ReactNode;
  session: Session;
  params: { locale: string };
};

export default async function WorkspaceLayout({ children, params }: Readonly<Props>) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) notFound();

  return (
    <>
      {children}
    </>
  );
}
