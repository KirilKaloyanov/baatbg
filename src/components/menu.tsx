"use client";

import Link from "next/link";
import LanguageSwitch from "./localeSwtich";

export default function Menu({ items, locale }) {
  if (!items) return <div> no menu </div>;
  return (
    <nav>
      <LanguageSwitch locale={locale} />
      {items.map((item) => (
        <Link key={item.id} href={"/" + locale + "/" + item.data.path}>
          {item.data.label[locale]}
        </Link>
      ))}
    </nav>
  );
}
