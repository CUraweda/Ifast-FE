import React, { FC } from "react";

interface Props {
  id: string;
  children: React.ReactNode;
  width?: string;
  onClose?: () => void;
}

const openModal = (id: string, fun?: () => void) => {
  const modal = document.getElementById(id) as HTMLDialogElement;
  if (modal) {
    modal.showModal();
    fun?.();
  }
};

const closeModal = (id: string, fun?: () => void) => {
  const modal = document.getElementById(id) as HTMLDialogElement;
  if (modal) {
    modal.close();
    fun?.();
  }
};

const Modal: FC<Props> = ({ id, children, width, onClose = () => {} }) => {
  return (
    <div>
      <dialog id={id} onClose={onClose} className="modal modal-middle">
        <div className={`modal-box bg-neutral ${width} `}>
          <div>{children}</div>
        </div>
      </dialog>
    </div>
  );
};

export { closeModal, openModal };
export default Modal;
