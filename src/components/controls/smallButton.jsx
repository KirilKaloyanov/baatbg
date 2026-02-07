export default function SmallButton({children}) {
    return (<button className="mt-4 mb-1 hover:bg-accent-500 bg-accent-100 text-base-900 text-xs h-8 cursor-pointer rounded-full px-4 py-2 transition-all">{children}</button>)
}