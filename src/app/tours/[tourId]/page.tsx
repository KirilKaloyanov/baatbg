export default async function TourItem({ params } : { 
    params: {tourId: string}
}) {
    const { tourId } = await params;
    return <div>{tourId}</div>
}