export default async function TourItem({ params } : { 
    params: Promise<{tourId: string}>
}) {
    const { tourId } = await params;
    return <div>{tourId}</div>
}