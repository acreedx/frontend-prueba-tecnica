"use client";
import React, { useState } from "react";
import HeaderConsolidado from "../components/headerConsolidado";
import SideBar from "../components/sideBar";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { QrSearch, TQrSearch } from "../models/qrData";
import { getQrInfo } from "../data/getQrInfo";
import { getFrontendToken } from "../data/getAuthToken";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { qrInfo } from "../models/qrInfo";

export default function Page() {
  const [qrData, setQrData] = useState<qrInfo | undefined>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(QrSearch),
    mode: "onChange",
  });

  const onSubmit = async (data: TQrSearch) => {
    const resToken = await getFrontendToken();
    if (!resToken) {
      toast("Error al obtener información del QR");
    } else {
      const res = await getQrInfo(data, resToken.token!);
      if (res.ok) {
        setQrData(res.qrResponse);
        toast("Información del QR obtenida con éxito", {
          style: {
            background: "green",
            color: "white",
          },
        });
        reset();
      } else {
        toast(res.message ?? "Error al obtener la información del QR", {
          style: {
            background: "red",
            color: "white",
          },
        });
      }
    }
  };
  return (
    <>
      <HeaderConsolidado />
      <main className="pt-[78px] flex flex-row min-h-screen h-full">
        <SideBar />
        <div className="flex flex-col p-10 pl-8 w-full">
          <h1 className="text-2xl font-bold text-main-dark-green">
            Obtener estado QR
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-gray-300 rounded-xl border-1 p-6 w-full h-full flex flex-col gap-2 mt-4 text-main-dark-gray"
          >
            <label>QR id:</label>
            <div className="flex items-center">
              <Input {...register("id")} className="rounded-r-none" />
              <Button
                disabled={isSubmitting}
                type="submit"
                className="bg-main-dark-green hover:bg-main-light-green"
              >
                Buscar
              </Button>
            </div>
            {errors.id && (
              <p className="text-red-500 text-sm">{errors.id.message}</p>
            )}
            {qrData && (
              <div className="border-gray-300 rounded-xl border-1 p-6  flex flex-col  mt-4 text-black mx-auto justify-center text-center">
                <div className="flex flex-col items-center gap-4">
                  <dl className="grid grid-cols-[max-content_auto] gap-x-4 gap-y-2">
                    <dt className="text-right font-semibold">id:</dt>
                    <dd className="text-left">{qrData.id}</dd>

                    <dt className="text-right font-semibold">statusId:</dt>
                    <dd className="text-left">{qrData.statusId}</dd>

                    <dt className="text-right font-semibold">
                      expirationDate:
                    </dt>
                    <dd className="text-left">
                      {new Date(qrData.expirationDate).toLocaleDateString(
                        "es-ES"
                      ) +
                        " " +
                        new Date(qrData.expirationDate).toLocaleTimeString(
                          "es-ES",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          }
                        )}
                    </dd>

                    <dt className="text-right font-semibold">voucherId:</dt>
                    <dd className="text-left">{qrData.voucherId ?? "-"}</dd>
                  </dl>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
