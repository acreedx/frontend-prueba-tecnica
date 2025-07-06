import { z } from "zod";

export const QrFormSchema = z.object({
  gloss: z
    .string()
    .min(1, "La glosa es requerida")
    .max(100, "La glosa no puede tener más de 100 caracteres"),
  currency: z
    .string()
    .min(1, "La moneda es requerida")
    .regex(/^[A-Za-z]+$/, "La moneda debe contener solo letras"),
  amount: z.coerce
    .number({
      required_error: "El monto debe ser un número",
      invalid_type_error: "El monto debe ser un número válido",
    })
    .positive("El monto debe ser un número válido")
    .max(1000000, "El monto no puede exceder Bs 1,000,000"),
});

export type TQrFormSchema = z.infer<typeof QrFormSchema>;

export const QrSearch = z.object({
  id: z.string().min(1, "El id es requerido"),
});

export type TQrSearch = z.infer<typeof QrSearch>;
