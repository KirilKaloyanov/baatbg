import { HomeLodges } from "@/components/homeLodges";
import { HomeRegions } from "@/components/homeRegions";
import { HomeTours } from "@/components/homeTours";
import Slider from "@/components/slider";
import { LodgeBaseDTO } from "@/interfaces/LodgeDTO";
import { getAllLodges } from "@/services/lodges.service";
import { getAllSlideItems } from "@/services/slideItemsService";
import { SplitHero } from '@components/splitHero'

export default async function Page({ params }: { params: Promise<{ locale: string }>}) {

  const { locale } = await params;

  const slideItems = await getAllSlideItems();
  const lodges: LodgeBaseDTO[] | null = await getAllLodges();

    return (
    <div className="container mx-auto">
        <Slider locale={locale} slideItems={slideItems}/>
        <div className="h-20"> </div>
        <SplitHero locale={locale} />
        <div className="h-35"> </div>
        <HomeTours locale={locale} />
        <div className="h-35"> </div>
        <HomeLodges locale={locale} lodges={lodges} />
        <div className="h-35"> </div>
        <HomeRegions locale={locale}/>
        <div className="h-25"> </div>
      </div>
  );
}



const Palette = () => {
return (<>
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
</>)}
