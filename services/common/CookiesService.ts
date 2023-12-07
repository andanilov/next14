import { cookies } from "next/headers";

export const CookiesService = {

  server() {
    'use server';
    
    return {
      get: async (key: string) => { 'use server'; return (await cookies().get(key))?.value },
      set: async (key: string, value: any) => { 'use server'; return cookies().set(key, value) },
      delete: async (key: string) => { 'use server'; return cookies().delete(key) },
    }
  },
}