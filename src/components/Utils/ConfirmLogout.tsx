interface ConfirmLogoutProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmLogout({ open, onConfirm, onCancel }: ConfirmLogoutProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80">
        <h2 className="text-lg font-semibold mb-4">Confirmar Logout</h2>
        <p className="mb-6 text-sm text-gray-700">
          Tem certeza que deseja sair da sua conta?
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
            onClick={onConfirm}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
