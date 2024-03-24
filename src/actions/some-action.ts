"use server";
import { formFactory } from "@/lib/form-factory";

export default async function someAction(prev: unknown, formData: FormData) {
  return await formFactory.validateFormData(formData);
}
