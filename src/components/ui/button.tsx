export function CustomButton({ label, cb } : {
    label: string,
    cb: () => void
} ) {
    return <>
        <button className="w-30 h-12 p-2 hover:bg-accent-500 bg-accent-100 text-base-900 transition-all cursor-pointer rounded-full">{ label }</button>
    </>
}