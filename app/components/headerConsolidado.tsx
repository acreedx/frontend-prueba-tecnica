import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeaderConsolidado() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-around px-8 py-6 shadow-md  bg-white ">
      <Link href={"/"} className="flex  flex-row gap-4 items-center ">
        <Image
          src="/logo-banco.png"
          alt="Logo del banco"
          width={30}
          height={30}
          sizes="30px"
          className="h-auto w-[30px]"
        />
        <Image
          src="/nombre-banco.png"
          alt="Logo del banco"
          width={80}
          height={20}
          sizes="auto"
          className="h-auto w-auto max-h-[20px]"
        />
      </Link>
      <Link
        href={"/"}
        className="text-main-dark-green flex flex-row gap-2 items-center"
      >
        <span>Cerrar sesión</span>
        <Image
          src="/signOut.png"
          alt="Logo del banco"
          width={50}
          height={50}
          sizes="auto"
          className="h-auto w-auto max-h-[20px]"
        />
      </Link>
    </header>
  );
}
