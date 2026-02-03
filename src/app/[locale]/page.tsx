import { getTranslations } from "next-intl/server";

export default async function Page() {
  // const t = await getTranslations("HomePage");
  return (
    //cormorant
    <>
      <blockquote className="my-3 text-3xl font-bold">Hello world</blockquote>

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
        <div className="h-20 bg-stone-50"></div>
        <div className="h-20 bg-stone-200"></div>
        <div className="h-20 bg-stone-500"></div>
      </div>
      <br />
      <button className="hover:bg-accent-500 bg-accent-100 text-base-900 h-12 w-30 cursor-pointer rounded-full p-2 transition-all">
        Subscribe
      </button>
    </>
  );
}
