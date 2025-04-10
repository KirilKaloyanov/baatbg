"use client";

import CustomLink from "./customLink";
import LanguageSwitch from "./localeSwtich";

export default function Menu({ items, locale }) {
  if (!items) return <div> no menu </div>;
  return (
    <div className="flex justify-between">
      <nav>
        {items.map((item) => (
          <CustomLink key={item.id} href={"/" + locale + "/" + item.data.path}>
            {item.data.label[locale]}
          </CustomLink>
        ))}
      </nav>
      <LanguageSwitch locale={locale} />
    </div>
  );
}
