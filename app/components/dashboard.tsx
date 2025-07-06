"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { getLastQrInfo } from "../data/getLastQrInfo";
import { getFrontendToken } from "../data/getAuthToken";
import { QrDetail } from "../models/qrDetailsResponse";
export default function Dashboard() {
  const QRStatus: Record<number, string> = {
    1: "No usado",
    2: "Usado",
    4: "Con error",
  };
  const [transacciones, settransacciones] = useState<QrDetail[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getFrontendToken();
      if (res.ok) {
        const resQr = await getLastQrInfo(res.token!);
        if (resQr.ok && resQr.qrResponse && resQr.qrResponse.success) {
          settransacciones(resQr.qrResponse.dTOqrDetails);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full p-8 pt-12 mr-30">
      <section className="flex flex-col lg:flex-row h-auto xl:h-80">
        {/* Perfil */}
        <div className="bg-main-dark-blue text-white p-6 md:p-8 flex flex-col gap-4 w-full lg:w-2/5 h-80">
          <div className="flex flex-row items-center gap-4">
            <div className="bg-white shadow p-4 rounded-full">
              <Image
                src={"/logos-dashboard/profile.png"}
                alt="Perfil usuario"
                width={28}
                height={28}
              />
            </div>
            <span className="text-black text-[18px]">
              Bienvenido, Juan Perez
            </span>
          </div>
          <div className="flex flex-col gap-4 text-[14px]">
            <p>Última visita: 31/03/22 02:00PM</p>
            <p>Nombre del equipo: Laptop</p>
            <p>Duración última sesión: 30 min</p>
            <p className="flex gap-2 ml-4">
              <span>Idioma</span>
              <Image
                src={"/logos-dashboard/image.png"}
                alt="flecha"
                width={20}
                height={4}
              />
            </p>
          </div>
        </div>

        {/* Banner */}
        <div className="bg-main-light-gray flex flex-col p-6 justify-around w-full md:p-10 lg:w-3/5 h-full md:h-80">
          <span className="text-gray-500 text-xl">Banner</span>
          <Image
            src="/logos-dashboard/banner.png"
            alt="flecha"
            width={100}
            height={40}
            className="mx-auto"
          />
          <div className="flex flex-row justify-end mt-6 md:mt-10 gap-4">
            <Image
              src="/logos-dashboard/arrow-left.png"
              alt="flecha"
              width={40}
              height={40}
              className="cursor-pointer"
            />
            <Image
              src="/logos-dashboard/arrow-right.png"
              alt="flecha"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </div>
        </div>

        <div></div>
      </section>

      {/* Puntos */}
      <div className="flex flex-col md:flex-row">
        <div className="w-0 md:w-180"></div>
        <div className="flex justify-center items-center gap-2 mt-4 md:mt-2">
          <span className="w-2 h-2 rounded-full bg-main-dark-green"></span>
          <span className="w-2 h-2 rounded-full bg-main-light-green"></span>
          <span className="w-2 h-2 rounded-full bg-main-light-green"></span>
        </div>
      </div>
      <section className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-8 my-6 sm:my-8">
        <Button className="bg-main-dark-green shadow-xl hover:bg-main-light-green cursor-pointer w-full sm:w-auto">
          Cajas de ahorros
        </Button>
        <Button className="bg-main-light-gray hover:bg-main-dark-gray cursor-pointer w-full sm:w-auto">
          Créditos
        </Button>
        <Button className="bg-main-light-gray hover:bg-main-dark-gray cursor-pointer w-full sm:w-auto">
          Tarjetas de Crédito
        </Button>
        <Button className="bg-main-light-gray hover:bg-main-dark-gray cursor-pointer w-full sm:w-auto">
          DPFs
        </Button>
      </section>
      <section className="flex flex-col lg:flex-row w-full gap-6 lg:gap-12">
        {/* Caja de ahorros */}
        <div className="w-full lg:w-3/5 bg-main-light-green p-6 md:p-8 rounded-xl flex flex-col gap-4">
          <div className="flex flex-row justify-between flex-wrap gap-2">
            <div className="font-semibold text-[16px] md:text-[18px]">
              Caja de ahorros
            </div>
            <div className="text-main-dark-blue flex flex-row gap-2 items-center text-sm md:text-base">
              Ver cuenta de ahorro
              <Image
                src={"/logos-dashboard/blue-arrow.png"}
                alt="flecha azul"
                width={20}
                height={10}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-4">
            {/* Número de cuenta */}
            <div className="flex flex-col text-main-dark-gray gap-2">
              <div className="text-[16px] md:text-[18px]">Nro. de cuenta</div>
              <div className="flex flex-row items-center gap-4">
                <div className="p-2 md:p-3 bg-white shadow-xl rounded-lg">
                  <Image
                    src={"/logos-dashboard/numero-cuenta.png"}
                    alt="logo numero de cuenta"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="text-[18px] md:text-[20px]">1500000000</div>
              </div>
            </div>

            {/* Saldo */}
            <div className="flex flex-col text-main-dark-gray gap-2">
              <div className="text-[16px] md:text-[18px] font-semibold">
                Saldo en bolivianos
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="p-2 py-3 md:p-3 md:py-4 bg-white shadow-xl rounded-lg">
                  <Image
                    src={"/logos-dashboard/logo-ojo.png"}
                    alt="logo ojo"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="text-[28px] md:text-[38px]">Bs 1,00,000000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Generar QR */}
        <Link
          href="/generarQR"
          className="w-full md:w-[48%] lg:w-1/5 italic bg-main-light-gray p-6 md:p-10 flex flex-col items-center gap-6 rounded-xl hover:shadow-lg transition-shadow"
        >
          <div className="bg-white p-4 rounded-full shadow-md flex items-center justify-center">
            <Image
              src="/logos-dashboard/QR.png"
              alt="Logo QR"
              width={40}
              height={40}
            />
          </div>
          <p className="text-[#85899F] text-center text-sm md:text-base">
            Generar QR
          </p>
        </Link>

        {/* Estado QR */}
        <Link
          href="/estadoQR"
          className="w-full md:w-[48%] lg:w-1/5 italic bg-main-light-gray p-6 md:p-10 flex flex-col items-center gap-6 rounded-xl"
        >
          <div className="bg-white p-4 rounded-full shadow-md flex items-center justify-center">
            <Image
              src="/logos-dashboard/Scan.png"
              alt="icono scan"
              width={40}
              height={40}
            />
          </div>
          <p className="text-[#85899F] text-center text-sm md:text-base">
            Obtener estado de QR
          </p>
        </Link>
      </section>
      <section className="mt-8 bg-white py-8 px-6 border rounded-4xl drop-shadow-2xl">
        <div className="flex flex-row justify-between px-8">
          <p className="font-bold">Últimas transferencias</p>
          <div className="text-main-dark-blue flex flex-row gap-2">
            <span>Ver todas</span>
            <Image
              src={"/logos-dashboard/blue-arrow.png"}
              alt="flecha azul"
              width={20}
              height={10}
            />
          </div>
        </div>
        <hr className="border-t border-gray-300 my-2" />
        <div className="w-full overflow-x-auto pl-4">
          <Table className="min-w-[600px] w-full">
            <TableBody>
              {transacciones.slice(0, 5).map((transaccion, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-main-dark-gray whitespace-nowrap">
                    {transaccion.gloss}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(transaccion.generationDate).toLocaleDateString(
                      "es-ES"
                    ) +
                      " " +
                      new Date(transaccion.generationDate).toLocaleTimeString(
                        "es-ES",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        }
                      )}
                  </TableCell>
                  <TableCell className="text-main-dark-gray whitespace-nowrap">
                    {transaccion.amount}
                  </TableCell>
                  <TableCell className="text-red-500 whitespace-nowrap">
                    {QRStatus[transaccion.statusId] ?? "Desconocido"}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <Image
                      src={
                        transaccion.statusId === 2
                          ? "/logos-dashboard/greenButton.png"
                          : transaccion.statusId === 1
                          ? "/logos-dashboard/grayButton.png"
                          : "/logos-dashboard/redButton.png"
                      }
                      alt="estado del QR"
                      width={40}
                      height={40}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
