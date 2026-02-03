export default function AnimatedChevron({
    isMenuItemOpen, setActiveMenuItemId, menuItemId
} : {
    isMenuItemOpen: boolean, setActiveMenuItemId: (id: string | null) => void, menuItemId: string
}) {
    return (
       <div
            className={`flex ${menuItemId !== 'regions' && 'md:hidden'} pt-3 pl-5 cursor-pointer p-1`}
            onClick={() =>
              isMenuItemOpen ? setActiveMenuItemId(null) : setActiveMenuItemId(menuItemId)
            }
          >
            <div
              className={`w-4 h-0.5 bg-background rounded ${
                (isMenuItemOpen ? "-" : "") + "rotate-45 transition"
              }`}
            ></div>
            <div
              className={`w-4 h-0.5 -ml-1.5 bg-background rounded ${
                (isMenuItemOpen ? "" : "-") + "rotate-45 transition"
              }`}
            ></div>
          </div>
    )
}

