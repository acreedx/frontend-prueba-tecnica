import Image from "next/image";
import React from "react";

export default function SideBar() {
  const sidebarItems = [
    { icon: "opcion-1.png", label: "Mis productos" },
    { icon: "opcion-3.png", label: "Transacciones" },
    { icon: "opcion-3.png", label: "Pagar" },
    { icon: "opcion-4.png", label: "Solicitar" },
    { icon: "opcion-5.png", label: "Gestionar" },
    { icon: "opcion-6.png", label: "Consultar" },
    { icon: "opcion-7.png", label: "Administrar" },
  ];
  return (
    <aside className="hidden md:flex w-1/4 bg-main-light-gray justify-end">
      <ul className="italic mr-8 mt-12 h-fit flex flex-col gap-4">
        {sidebarItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-12 w-full hover:bg-main-dark-gray p-4 rounded-xl hover:duration-100 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Image
                src={`/logos-dashboard/${item.icon}`}
                alt={`icono de ${item.label}`}
                width={20}
                height={20}
              />
              <span className="text-sm text-left">{item.label}</span>
            </div>
            <Image
              src="/logos-dashboard/flecha.png"
              alt="icono de flecha"
              width={10}
              height={10}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}
