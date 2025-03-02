import { useTranslations } from "next-intl";
import { Link } from "src/i18n/navigation";

export default function Page() {
  const t = useTranslations("HomePage");
  return (
    <>
      <h1>{t("title")}</h1>
    </>
  );
}
