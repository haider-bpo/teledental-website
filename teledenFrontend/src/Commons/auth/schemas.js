import * as z from "zod";

// schema for login validation
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter your password"),
});

// schema for signup validation
export const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    location: z.string().min(1, "Location is required"),
    businessName: z.string().optional(),
    email: z.string().email("Please enter a valid email address"),
    confirmEmail: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Please enter your password"),
    isLicensedDentist: z.boolean().refine((val) => val === true, {
      message: "Please confirm you are a licensed dentist",
    }),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails do not match",
    path: ["confirmEmail"],
  });
