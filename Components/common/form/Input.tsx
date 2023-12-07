// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, useState } from "react";
import Label from "./Label";
import { TFormSize } from "./TFormSize";

export interface IInputOption {
  title?: string,
  value: string | number,
}

export type TInputEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
export type TInputEventHandle = (e: TInputEvent) => unknown;

export interface IInput {
  id?: string,
  type?: 'email' | 'text' | 'password' | 'textarea',
  name: string,
  label?: string,
  placeholder?: string,
  handle?: TInputEventHandle,
  defaultValue?: string,
  value?: string | number,
  size?: TFormSize,
  disabled?: boolean,
  error?: string,
  role?: 'combobox',
  onFocus?: () => void,  
  onBlur?: () => void,
  isError?: boolean,
  connectedUrlParam?: string, // If select value changes, this URL query param changes as well

  options?: IInputOption[], // If options array exists it's a select input
  defaultOption?: IInputOption,

  className?: string,

  // setState?: React.Dispatch<React.SetStateAction<string>>, // For redactor
  setState?: (value: string) => unknown, // For redactor
}

export default function Input({
  label,
  placeholder,
  id,
  name,
  type = 'text',
  handle,
  defaultValue = '',
  size = 'medium',
  value,
  disabled = false,
  error = '',
  role,
  onFocus = () => {},
  options,
  defaultOption,
  connectedUrlParam,
  isError,
  onBlur,
  className,
  setState,
} : IInput) {
  // -- State for password input
  const [isPassShown, setIsPassShown] = useState<boolean>(false);
  
  // -- Common fields options for all field types
  const optionsList = {
    name,
    id: id || name,
    placeholder,
    ...(value !== undefined ? { value } : {} ),
    ...(value === undefined && defaultValue ? { defaultValue } : {} ),
    ...(role ? { role } : {} ),
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      handle && handle(e);
    },
    disabled,
    onFocus,
    onBlur,
    className: `
      first-letter:t-2 block w-full rounded-md py-1.5 pl-3 sm:text-sm sm:leading-6
      ring-1 ring-inset focus:ring-1 ring-gray-200 shadow-sm
      disabled:opacity-50
      ${error || isError
        ? 'text-pink-600 border-pink-500 border-[1px]'
        : 'text-gray-900 border-0 focus:ring-primary'}
      ${{
        'small': 'text-xs py-1 pl-2',
        'medium': 'text-lg py-2.5 pl-4',
        'large': 'text-lg py-2.5 pl-4',
      }?.[size]}`,      
    };

  return (
    <div className={`
      flex flex-col
      ${{
        'small': '',
        'medium': 'mt-1 gap-1',
        'large': 'mt-2 gap-2',
      }?.[size]} 
      ${className || ''}      
    `}
    >
      {!!label && (
        <Label
          htmlFor={name}
          size={size}
        >
          {label}
        </Label>
      )}
        <div className={`
          flex items-center relative
          ${!['textarea', 'redactor'].includes(type) && {
            'small': '',
            'medium': 'h-[46px]',
            'large': 'h-[46px]',
          }?.[size]} 
          ${className || ''}
        `}>
          {(options?.length && (
            <select {...optionsList}>
              {!!defaultOption && <option value={defaultOption.value}>{defaultOption?.title || defaultOption.value}</option>}
              {options.map(({ title, value }) => <option key={value} value={value}>{title || value}</option>)}
            </select>)
          ) || (type === 'textarea' && <textarea {...optionsList} />
          ) || (type === 'password' && (
            <>
              <div
                className="absolute w-fit h-full top-0 right-0 pr-[10px] flex items-center justify-center cursor-pointer"
                onClick={() => setIsPassShown((prevState) => !prevState)}
              >
                {!!!isPassShown
                  ? '+'
                  : '-'
                  // ? <EyeIcon className="w-5 h-5 fill-slate-400" />
                  // : <EyeSlashIcon className="w-5 h-5 fill-slate-700" />
                }
              </div>
              <input {...optionsList} type={isPassShown ? 'text' : 'password'} />
            </>)            
          ) || <input {...optionsList} type={type} />}
        </div>
        {!!error && <div className="text-pink-600 text-sm mt-1">{error}</div>}
    </div>
  );
}

