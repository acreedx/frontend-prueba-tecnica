"use client";
import Image from "next/image";
import Header from "./components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { MockUsers } from "./data/mockUsers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUserSchema, UserSchema } from "./models/user";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function Home() {
  const [showUser, setShowUser] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const fecha = new Date().toLocaleDateString();
  const hora = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(UserSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: TUserSchema) => {
    if (
      MockUsers.some(
        (user) =>
          user.usuario === data.username && user.password === data.password
      )
    ) {
      toast("Bienvenido de nuevo", {
        style: {
          color: "white",
          background: "green",
        },
      });
      reset();
      redirect("/consolidado");
    } else {
      toast("Usuario o contraseña incorrectos", {
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };
  return (
    <>
      <Header />
      <main className="relative min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute top-0 left-[-200px] w-[1000px] h-[450px] rounded-full blur-[150px] opacity-70 mix-blend-multiply rotate-90"
            style={{
              background: "linear-gradient(0deg, #B0E0D772 44.67%, #A776BF 0%)",
            }}
          />
          <div
            className="absolute top-[100px] left-[300px] w-[400px] h-[700px] rounded-full blur-[150px] mix-blend-multiply"
            style={{
              background: "linear-gradient(0deg, #DEFFFD 68.12%, #BFE8D0 0%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[1000px] h-[800px] rounded-full mix-blend-multiply blur-[120px]"
            style={{
              background: "linear-gradient(0deg, #80D2CD7A 47.82%, #80A6D2 0%)",
              backgroundImage: "url('/sombras/abajo-derecha.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="relative z-10 bg-white rounded-2xl shadow-lg p-10 sm:p-16 pb-12 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-8 text-start">Bienvenido,</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-7">
              <p className="text-[#03014C] opacity-50">
                Ingresa al Banco de Alasitas
              </p>

              {/* Usuario */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#03014C] opacity-50">
                  Usuario
                </label>
                <div className="relative w-full">
                  <Input
                    {...register("username", {
                      required: "El nombre de usuario es requerido",
                      maxLength: 20,
                    })}
                    maxLength={20}
                    required
                    type={showUser ? "text" : "password"}
                    placeholder="********"
                    className="focus:border-none focus-visible:ring-0 pl-0 placeholder:text-[#03014C] placeholder:opacity-50 rounded-none border-0 border-b border-main-light-gray focus:outline-none focus:ring-0 focus:border-main-light-gray"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={() => setShowUser((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showUser ? (
                      <EyeOff className="h-4 w-4 text-[#03014C] opacity-50" />
                    ) : (
                      <Eye className="h-4 w-4 text-[#03014C] opacity-50" />
                    )}
                  </Button>
                </div>
                {errors.username && (
                  <p className="text-red-500 text-[14px]">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Contraseña */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#03014C] opacity-50">
                  Contraseña
                </label>
                <div className="relative w-full">
                  <Input
                    {...register("password", {
                      required: "El password es requerido",
                      maxLength: 20,
                    })}
                    maxLength={20}
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="******************"
                    className="focus:border-none focus-visible:ring-0 pl-0 placeholder:text-[#03014C] placeholder:opacity-50 rounded-none border-0 border-b border-main-light-gray focus:outline-none focus:ring-0 focus:border-main-light-gray"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={() => setshowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-[#03014C] opacity-50" />
                    ) : (
                      <Eye className="h-4 w-4 text-[#03014C] opacity-50" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[14px]">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-main-dark-green w-full py-7 hover:bg-main-light-green"
              >
                Ingresar
              </Button>

              <div className="flex flex-col gap-4">
                <p className="text-[14px] whitespace-normal sm:whitespace-nowrap">
                  Olvidaste tu contraseña o tu usuario?{" "}
                  <span className="text-main-dark-green font-semibold">
                    Contáctanos
                  </span>
                </p>
                <Button
                  asChild
                  className="bg-main-dark-blue w-full py-7 hover:bg-main-light-blue"
                >
                  <Link
                    href={`https://wa.me/73744202?text=${encodeURIComponent(
                      `Felicidades Jaime Adrian Herrera Linares, hoy ${fecha} ${hora} aprobaste el examen práctico de FrontEnd`
                    )}`}
                  >
                    Contáctanos
                  </Link>
                </Button>
              </div>

              <div className="flex flex-row gap-8 w-full justify-center mt-4">
                <Link href={"https://www.facebook.com"}>
                  <Image
                    src={"/logos-redes/facebook.png"}
                    alt="logo facebook"
                    width={32}
                    height={32}
                    className="h-auto w-[32px]"
                  />
                </Link>
                <Link href={"https://www.instagram.com"}>
                  <Image
                    src={"/logos-redes/instagram.png"}
                    alt="logo instagram"
                    width={32}
                    height={32}
                    className="h-auto w-[32px]"
                  />
                </Link>
                <Link href={"https://www.linkedin.com"}>
                  <Image
                    src={"/logos-redes/linkedin.png"}
                    alt="logo linkedin"
                    width={32}
                    height={32}
                    className="h-auto w-[32px]"
                  />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
