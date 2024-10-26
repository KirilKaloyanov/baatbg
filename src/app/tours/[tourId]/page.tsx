export default async function TourItem({ params } : { 
    params: {tourId: string}
}) {
    return <div>{params.tourId}</div>
}