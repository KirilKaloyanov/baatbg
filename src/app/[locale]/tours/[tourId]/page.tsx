import FramerTest from "@components/framerTest";

export default async function TourItem({ params } : { 
    params: Promise<{tourId: string}>
}) {
    const { tourId } = await params;
    return  <FramerTest />
}
