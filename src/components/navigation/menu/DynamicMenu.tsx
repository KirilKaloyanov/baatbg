import React from "react";
import MenuItem from "./menuItem";
import { MenuDTO } from "@/interfaces/MenuDTO";
import { PostMetaDTO } from "@/interfaces/PostsDTO";
import StaticMenuItems from "./staticMenus/staticMenuItems";

interface DynamicMenuProps {
  menuItems: MenuDTO[] | null;
  subMenuItems: PostMetaDTO[] | null;
  locale: string;
  activeMenuItemId: string | null;
  setActiveMenuItemId: (id: string | null) => void;
  regionsExpandable: boolean;
}

const filterSubItemsByMenuItem = (
  subItems: PostMetaDTO[] | null,
  item: MenuDTO,
): PostMetaDTO[] => {
  if (subItems == null) return [];
  return subItems
    .filter((si) => si.menuPath === item.path)
    .sort((a, b) => a.position - b.position);
};

const DynamicMenu: React.FC<DynamicMenuProps> = ({
  menuItems,
  subMenuItems,
  locale,
  activeMenuItemId,
  setActiveMenuItemId,
  regionsExpandable
}) => {
  return (
    <nav className="container m-auto px-6 pb-18">
      {/* Default menus */}
      <StaticMenuItems
        locale={locale}
        activeMenuItemId={activeMenuItemId}
        setActiveMenuItemId={setActiveMenuItemId}
        regionsExpandable={regionsExpandable}
      />
      <div className="md:grid md:grid-cols-4">
        {menuItems &&
          menuItems.map((i: MenuDTO) => (
            <div key={i.id}>
              {/* Renders on Mobile expanding only one item */}
              <div className="block md:hidden">
                <MenuItem
                  menuItem={i}
                  subMenuItems={filterSubItemsByMenuItem(subMenuItems, i)}
                  currentLocale={locale}
                  isMenuItemOpen={activeMenuItemId === i.id}
                  openMenuItem={setActiveMenuItemId}
                />
              </div>
              {/* Renders on Desktop expanding all items */}
              <div className="hidden md:block">
                <MenuItem
                  menuItem={i}
                  subMenuItems={filterSubItemsByMenuItem(subMenuItems, i)}
                  currentLocale={locale}
                  isMenuItemOpen={true}
                  openMenuItem={setActiveMenuItemId}
                />
              </div>
            </div>
          ))}
      </div>
    </nav>
  );
};

export default DynamicMenu;
