import { IFromState } from "@/actions/TServerAction";
import { ZodError } from "zod";

export default function checkFormStateByZod(zodSchama: Record<string, any>, data: Record<string, any>): IFromState<any> { 
  try {
    zodSchama.parse(data);
  } catch (error) {
    if ((error as ZodError)?.errors?.length)
      return {
        id: Math.random(),
        errors: (error as ZodError).errors.reduce((acc, err) => ({
          ...acc,
          [err?.path?.[0] || 'unknown']: err?.message || 'unknown',
        }), {})
      }   
  }

  return { id: Math.random() };
}