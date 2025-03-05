"use client";

import { useLoader } from "@context/LoaderContext";
import { usePathname, useRouter } from "../i18n/navigation";

export default function LanguageSwitch({ locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const { startNavigation } = useLoader();
  const switching = (nextLocale: string) => {
    startNavigation(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      {locale == "en" ? (
        <button onClick={() => switching("bg")}>bg</button>
      ) : (
        <button onClick={() => switching("en")}>en</button>
      )}
    </div>
  );
}
