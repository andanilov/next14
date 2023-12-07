'use client';

import { CSSProperties, Dispatch, SetStateAction } from "react";

export default function Modal({
  title,
  isShown = true,
  setIsShown,
  children,
  className,
  style = {},
  onClose,
} : {
  title?: string,
  isShown?: boolean,
  setIsShown?: Dispatch<SetStateAction<boolean>>, 
  children: React.ReactNode,
  className?: string,
  style?: CSSProperties,
  onClose?: () => void,
}) {
  
  const handleClose = () => {
    setIsShown && setIsShown(() => false);
    onClose && onClose();
  };

  return (
    <div
      role="button"
      tabIndex={-1}
      onClick={handleClose}      
      style={{}}
      className={`        
        ${isShown ? '' : 'hidden'}
        modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 z-[100]
      `}
    >
      <div
        role="button"
        tabIndex={-1}
        className={`
          bg-white rounded-2xl shadow-lg w-10/12 lg:w-9/12 xl:w-2/3 2xl:w-1/2 
          ${className ? className : ''}
        `}
        onClick={(e) => { e.stopPropagation(); }}
        style={style}
      >
        {!!title && (
          <div className="border-b px-8 py-6 flex justify-between items-center">
            <h3 className="font-semibold text-lg">{title}</h3>
            <button
              className="close-modal"
              onClick={handleClose}
            >
              <svg className="fill-slate-400" width="1.8rem" height="1.8rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" />
              </svg>
            </button>
          </div>
        )}
        
        <div className="px-10 pt-6 pb-8">{children}</div>
      </div>
    </div>
  );
}