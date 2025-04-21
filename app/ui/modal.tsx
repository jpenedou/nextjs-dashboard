import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title?: ReactNode;
  children: React.ReactNode;
  onAccept?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

export default function Modal({
  isOpen,
  title,
  children,
  onAccept,
  onCancel,
  onClose,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Title */}
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        {/* Body */}
        <div className="mb-6">{children}</div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
