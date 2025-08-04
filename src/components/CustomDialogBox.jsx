import { useState } from "react";

function CustomDialog({
  triggerButton,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };
  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={handleOpen}>{triggerButton}</div>

      {isOpen && (
        <div className="fixed inset-0   flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-lg font-semibold text-black mb-4">{title}</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition"
              >
                {cancelLabel}
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomDialog;
