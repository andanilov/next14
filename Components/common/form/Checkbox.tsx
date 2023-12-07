import { FC } from "react";
import { IInput } from "./Input";
import Label from "./Label";

const Checkbox : FC<Omit<IInput, 'value' | 'handle'> & {
  value: boolean,
  handleToggle: () => unknown,
  isNoLabelArea?: boolean,
}> = ({
  value,
  handleToggle,
  label,
  isNoLabelArea = false,
  size = 'medium',
  className,
}) => {
  
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
      {!!!isNoLabelArea && <Label size={size}> </Label>}
      <div className={`
        flex items-center
        ${{
          'small': '',
          'medium': 'mt-1 gap-1 h-[46px]',
          'large': 'mt-2 gap-2 h-[46px]',
        }?.[size]} 
        ${className || ''}
      `}>
        <button
          type="button"
          className={`
            bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            ${value ? 'bg-primary' : 'bg-gray-200'}
          `}
          role="switch"
          aria-checked={value ? 'true' : 'false'}
          aria-labelledby={label?.replaceAll(' ', '')}
          onClick={() => handleToggle()}
        >
          <span
            aria-hidden="true"
            className={`
              translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
              ${value ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
        <span
          className={`
            ml-3 text-sm
            ${value ? 'text-gray-900' : 'text-gray-400'}
          `}
          id={label?.replaceAll(' ', '')}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default Checkbox;
