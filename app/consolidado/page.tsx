import React from "react";
import HeaderConsolidado from "../components/headerConsolidado";
import SideBar from "../components/sideBar";
import Dashboard from "../components/dashboard";

export default function Page() {
  return (
    <>
      <HeaderConsolidado />
      <main className="pt-[78px] flex flex-row min-h-screen h-full">
        <SideBar />
        <Dashboard />
      </main>
    </>
  );
}
