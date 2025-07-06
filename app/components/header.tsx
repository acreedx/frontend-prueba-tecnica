import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 shadow-md rounded-b-2xl bg-white">
      {/* Logo y nombre */}
      <div className="sm:inv flex items-center gap-4">
        <Image
          src="/logo-banco.png"
          alt="Logo del banco"
          width={30}
          height={30}
          className="h-auto w-[30px]"
        />
        <Image
          src="/nombre-banco.png"
          alt="Nombre del banco"
          width={80}
          height={20}
          className="h-auto max-h-[20px]"
        />
      </div>

      {/* Menú centrado */}
      <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-12">
        <li className="text-[16px] font-medium whitespace-nowrap mr-6">
          Banco de Alasitas
        </li>
        <li className="text-[14px] list-disc whitespace-nowrap">Prueba</li>
        <li className="text-[14px] list-disc whitespace-nowrap">FrontEnd</li>
      </ul>

      {/* Menú para móviles */}
      <div className="flex md:hidden gap-4 text-[14px] font-medium">
        <button>Banco de Alasitas</button>
        <button>Prueba</button>
        <button>FrontEnd</button>
      </div>
    </header>
  );
}
