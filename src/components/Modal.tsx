import type { ReactNode, Dispatch, SetStateAction } from "react";
import { BiErrorCircle } from "react-icons/bi";

type ModalProps = {
  children?: ReactNode;
  title?: string;
  description?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  haveCloseButton: boolean;
  onConfirm?: () => void;
};

export const Modal = ({
  children,
  type,
  title,
  description,
  isOpen,
  setIsOpen,
  haveCloseButton,
  onConfirm,
}: ModalProps & { isOpen: boolean; type: "form" | "confirmation" }) => {
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
        {(() => {
          switch (type) {
            case "form":
              return (
                <FormModal
                  title={title}
                  setIsOpen={setIsOpen}
                  haveCloseButton={haveCloseButton}
                >
                  {children}
                </FormModal>
              );
            case "confirmation":
              return (
                <ConfirmationModal
                  title={title}
                  description={description}
                  setIsOpen={setIsOpen}
                  haveCloseButton={haveCloseButton}
                  onConfirm={onConfirm}
                >
                  {children}
                </ConfirmationModal>
              );
            default:
              return <></>;
          }
        })()}
      </div>
    </>
  );
};

const FormModal = ({
  children,
  title,
  setIsOpen,
  haveCloseButton,
}: ModalProps) => {
  return (
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
        <h1 className="grow text-xl font-semibold text-primary">{title}</h1>
      </div>
      <div className="divider" />
      {children}
    </div>
  );
};

const ConfirmationModal = ({
  title,
  description,
  setIsOpen,
  haveCloseButton,
  onConfirm,
}: ModalProps) => {
  return (
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
      </div>
      <div className="modal-action m-5 flex-col items-center gap-5">
        <BiErrorCircle size={100} className="text-error" />
        <h1 className="text-2xl text-error">{title}</h1>
        <span>{description}</span>
        <button className="btn-error btn" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  );
};
