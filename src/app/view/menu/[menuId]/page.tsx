"use client";
// "/view/menu/[menuId]";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import EditMenuItem from "@components/forms/editMenuItem";
import { MenuDTO } from "@interfaces/admin/MenuDTO";

export default function EditMenuController({
  params,
}: {
  params: { menuId: string };
}) {
  const [menu, setMenu] = useState<MenuDTO | null>(null);
  const [subMenus, setSubMenus ] = useState <MenuDTO[] | []> ([]);

  useEffect(() => {
    const fetchData = async () => {
      const { menuId } = await params;
      const res = await fetch(`/view/menu/api/${menuId}`);
      const {menuData, subMenus} = await res.json();
      setSubMenus(subMenus);
      setMenu(menuData);
    };
    fetchData();
  }, []);


  if (menu && subMenus) return (
    <>
      <EditMenuItem initialData={menu} />
      {subMenus.map(sm => <div key={sm.id}>{sm.name}</div>)}
    </>
  )
  return <div>loading</div>;
}
