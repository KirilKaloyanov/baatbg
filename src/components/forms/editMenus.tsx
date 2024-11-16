"use client";

import { useState } from "react";
import EditMenuForm from "./editMenuForm";

export default function EditMenus({ menuList }: { menuList: any[] }) {
  const initialFormValues = { id: "create", name: "", position: 0, path: ""};

  const [menuForEditing, setMenuForEditing] = useState(initialFormValues);

  return (
    <>
      <h2>List menus</h2>
      {menuList.map((menu) => (
        <button key={menu.id} onClick={() => setMenuForEditing(menu)}>
          {menu.name}
        </button>
      ))}
      <p>
        <button onClick={() => setMenuForEditing(initialFormValues)}>Create new main menu</button>
      </p>
      <EditMenuForm menu={menuForEditing} />
    </>
  );
}

