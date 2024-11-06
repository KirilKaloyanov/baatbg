"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { MenuDTO } from "@interfaces/admin/MenuDTO";
import { initializeApp } from 'firebase/app';




export default function EditMenuItem({ initialData }: { initialData: MenuDTO}) {
  const [formData, setFormData] = useState<MenuDTO>(initialData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "position" ? parseInt(value) : value, // Convert position to number if applicable
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const urlEnd = formData.id ? "/" + formData.id : "" 
    try {
      const res = await fetch(`/view/menu/api${urlEnd}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await res.json();
      console.log("API response:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="position">Position</label>
        <input
          type="number"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="position">Path</label>
        <input
          type="text"
          id="path"
          name="path"
          value={formData.path}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Edit menu item</button>
    </form>
  );
}
