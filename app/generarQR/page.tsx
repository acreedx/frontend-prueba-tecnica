"use client";
import React, { useState } from "react";
import HeaderConsolidado from "../components/headerConsolidado";
import SideBar from "../components/sideBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QrFormSchema, TQrFormSchema } from "../models/qrData";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { generatePaymentQR } from "../data/generateQrPayment";
import { getFrontendToken } from "../data/getAuthToken";
import Link from "next/link";
import { QRResponse } from "../models/qrResponse";

export default function Page() {
  const [qrData, setQrData] = useState<QRResponse | undefined>();
  const handleDownload = () => {
    if (!qrData) return;
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${qrData.qr}`;
    link.download = `codigo-qr-${qrData.id}.png`;
    link.click();
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TQrFormSchema>({
    resolver: zodResolver(QrFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: TQrFormSchema) => {
    const resToken = await getFrontendToken();
    if (!resToken) {
      toast("Error al generar el QR");
    } else {
      const res = await generatePaymentQR(data, resToken.token!);
      if (res.ok) {
        setQrData(res.qrResponse);
        toast("QR generado con éxito", {
          style: {
            background: "green",
            color: "white",
          },
        });
        reset();
      } else {
        toast(res.message ?? "Error al generar el QR", {
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
            Generar QR
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-gray-300 rounded-xl border-1 p-6 w-full h-full flex flex-col gap-6 mt-4 text-main-dark-gray"
          >
            <div className="w-full">
              <p className="mb-1">Glosa:</p>
              <Input
                className="w-full"
                {...register("gloss")}
                maxLength={100}
              />
              {errors.gloss && (
                <p className="text-red-500 text-sm">{errors.gloss.message}</p>
              )}
            </div>

            <div className="flex-col md:flex-row  flex  gap-6">
              <div className="w-full md:w-1/2">
                <p className="mb-1">Moneda:</p>
                <Input className="w-full" {...register("currency")} />
                {errors.currency && (
                  <p className="text-red-500 text-sm">
                    {errors.currency.message}
                  </p>
                )}
              </div>

              <div className="w-full md:w-1/2">
                <p className="mb-1">Monto:</p>
                <Input
                  className="w-full"
                  type="number"
                  {...register("amount")}
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm">
                    {errors.amount.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                asChild
                className="bg-main-dark-blue hover:bg-main-light-blue cursor-pointer"
              >
                <Link href="/consolidado">Cancelar</Link>
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-main-dark-green hover:bg-main-light-green cursor-pointer"
              >
                Generar
              </Button>
            </div>
            {qrData && (
              <div className="flex flex-col items-center">
                <Image
                  src={`data:image/png;base64,${qrData.qr}`}
                  alt="QR Code"
                  width={300}
                  height={300}
                />
                <Button
                  type="button"
                  onClick={handleDownload}
                  className="bg-main-dark-blue hover:bg-main-light-blue cursor-pointer"
                >
                  Descargar
                </Button>
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
