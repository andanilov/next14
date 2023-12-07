import { PropsWithChildren } from "react";
import { TFormSize } from "./TFormSize";

export default function Label({
  children,
  htmlFor,
  size = 'medium',
} : PropsWithChildren<{
  htmlFor?: string,
  size?: TFormSize,
}>) {
  return (
    <label
      {...(htmlFor ? { htmlFor } : {})}
      className={`
        block leading-6 text-gray-900
        ${{
          'small': 'text-xs font-medium min-h-[24px]',
          'medium': 'text-sm font-semibold min-h-[24px]',
          'large': 'text-sm font-semibold min-h-[24px]',
        }?.[size]}
      `}
    >
      {children}
    </label>
  );
}