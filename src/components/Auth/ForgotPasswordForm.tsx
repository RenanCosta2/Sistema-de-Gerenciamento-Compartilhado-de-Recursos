export default function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  return (
    <>
      <h1 className="text-xl font-bold mb-4">Recuperar Senha</h1>
      <p className="text-gray-600 mb-6">Tela de recuperação (placeholder)</p>

      <button
        onClick={onBack}
        className="text-blue-700 underline text-sm"
      >
        Voltar
      </button>
    </>
  );
}
