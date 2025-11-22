"use client";
import dynamic from "next/dynamic";

const LocalviewMap = dynamic(
    () => import("@/app/[locale]/lodges/[lodgeId]/localviewMap"),
    { ssr: false }
);

export default function MapContainerComponent({ center }: { center: [number, number] }) {
    return (
        <LocalviewMap center={center} />
    );
}