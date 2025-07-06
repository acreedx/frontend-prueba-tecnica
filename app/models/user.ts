import { z } from "zod";
export const UserSchema = z.object({
  username: z
    .string()
    .email("Ingrese un usuario con formato de email")
    .min(1, "El nombre de usuario es requerido")
    .max(20, "El nombre de usuario no puede tener mas de 20 carácteres"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .max(20, "La contraseña no puede tener más de 20 caracteres")
    .regex(
      /^[a-zA-Z0-9#&,_!]+$/,
      "La contraseña solo puede contener letras, números y los símbolos #, &, ,, _, !"
    ),
});

export type TUserSchema = z.infer<typeof UserSchema>;
