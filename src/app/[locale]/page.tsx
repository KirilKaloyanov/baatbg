import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("HomePage");
  return (
    //cormorant
    <>
      <blockquote className="text-3xl font-cormorant my-3">{t("title")}</blockquote> 


      <div className="bg-background h-10"></div>

      <div className="grid grid-cols-3">
        <div className="bg-base-100 h-20"></div>
        <div className="bg-base-500 h-20"></div>
        <div className="bg-base-900 h-20"></div>
      </div>


      <div className="bg-background h-10"></div>

      <div className="grid grid-cols-3">
        <div className="bg-accent-50 h-20"></div>
        <div className="bg-accent-100 h-20"></div>
        <div className="bg-accent-500 h-20"></div>
      </div>


      <div className="bg-background h-10"></div>

      <div className="grid grid-cols-3">
        <div className="bg-stone-50 h-20"></div>
        <div className="bg-stone-200 h-20"></div>
        <div className="bg-stone-500 h-20"></div>
      </div>
    </>
  );
}
