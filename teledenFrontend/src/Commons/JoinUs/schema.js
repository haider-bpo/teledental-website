import { z } from "zod";

/**
 * Zod validation schema for the join us form
 */
export const joinUsSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    position: z.string().min(1, { message: "Current Position is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    confirmEmail: z
      .string()
      .email({ message: "Please enter a valid email address" }),
    phoneNumber: z.string().optional(),
    location: z.string().min(1, { message: "Location is required" }),
    message: z.string().optional(),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails don't match",
    path: ["confirmEmail"],
  });

export const positionOptions = [
  { value: "", label: "Current Position", disabled: true },
  { value: "dentist", label: "Dentist" },
  { value: "dental-professional", label: "Dental Professional" },
  { value: "company", label: "Dental Company" },
  { value: "investor", label: "Investor" },
  { value: "other", label: "Other" },
];
