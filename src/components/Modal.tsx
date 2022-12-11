import type { ReactNode, Dispatch, SetStateAction } from "react";

type ModalProps = {
  children: ReactNode;
  title?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  haveCloseButton: boolean;
};

export const Modal = ({
  children,
  title,
  isOpen,
  setIsOpen,
  haveCloseButton,
}: ModalProps) => {
  return (
    <>
      <input type="checkbox" className="modal-toggle" />
      <div
        className={`modal ${isOpen ? "modal-open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsOpen(false);
          }
        }}
      >
        <div className="modal-box">
          <div className="flex flex-row-reverse">
            {haveCloseButton ? (
              <button
                className="btn-sm btn-circle btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                ✕
              </button>
            ) : (
              <></>
            )}
            {title ? (
              <>
                <h1 className="grow text-xl font-semibold text-primary">
                  {title}
                </h1>
              </>
            ) : (
              <></>
            )}
          </div>
          {title ? <div className="divider" /> : <></>}
          {children}
        </div>
      </div>
    </>
  );
};
