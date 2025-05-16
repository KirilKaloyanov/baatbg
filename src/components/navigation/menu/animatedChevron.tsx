export default function AnimatedChevron({
    isMenuItemOpen, openMenuItem, itemId
} : {
    isMenuItemOpen: boolean, openMenuItem: (id: string | null) => void, itemId: string
}) {
    return (
       <div
            className={`flex ${itemId !== 'regions' && 'md:hidden'} pt-3 pl-5 cursor-pointer p-1`}
            onClick={() =>
              isMenuItemOpen ? openMenuItem(null) : openMenuItem(itemId)
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

            // Chevron for expand/collapse subMenuPaths of this menuPath
          // <div
          //   className="flex md:hidden pt-3 pl-5 cursor-pointer p-1"
          //   onClick={() =>
          //     isMenuItemOpen ? openMenuItem(null) : openMenuItem(item.id)
          //   }
          // >
          //   <div
          //     className={`w-4 h-0.5 bg-background rounded ${
          //       (isMenuItemOpen ? "-" : "") + "rotate-45 transition"
          //     }`}
          //   ></div>
          //   <div
          //     className={`w-4 h-0.5 -ml-1.5 bg-background rounded ${
          //       (isMenuItemOpen ? "" : "-") + "rotate-45 transition"
          //     }`}
          //   ></div>
          // </div>