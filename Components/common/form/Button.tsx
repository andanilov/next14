import type { PropsWithChildren, MouseEvent, CSSProperties } from "react";
import { TFormSize } from "./TFormSize";

export default function Button ({  
  children,
  onClick,
  size = 'medium',
  variant = 'filled',
  type = 'button',
  disabled = false,
  className,
  style,
  isNotFullWidth = false,
}: PropsWithChildren<{
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void,
  size?: TFormSize,
  variant?: 'outline' | 'filled',
  type?: 'button' | 'reset' | 'submit',
  disabled?: boolean,
  className?: string,
  style?: CSSProperties,
  isNotFullWidth?: boolean,
}>) {
  return (
    <button
      type={type}
      {...(onClick ? { onClick } : {})}
      {...(style ? { style } : {})}
      disabled={disabled}
      className={`
         border-[1px] font-medium transition duration-300 py-2 px-4 rounded-lg disabled:opacity-50
        ${!!!isNotFullWidth && 'w-full'} 
        ${{
          'small': 'text-xs py-1 px-2',
          'medium': '',
          'large': 'text-sm py-3 px-4',
        }?.[size]} 
        ${{
          'outline': 'hover:bg-transparent bg-transparent border-primary hover:border-primary_hover text-primary',
          'filled': 'bg-primary hover:bg-primary_hover text-white',
        }?.[variant]}
        ${className ? className : ''}
      `}>
      {children}
    </button>
  );
}