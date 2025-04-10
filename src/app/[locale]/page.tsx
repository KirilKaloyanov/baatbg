import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button"

export default function Page() {
  const t = useTranslations("HomePage");
  return (
    <>
      <h1 className="text-3xl">{t("title")}</h1>
      <Button variant="default">Button</Button>

    </>
  );
}
