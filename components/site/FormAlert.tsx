type FormAlertProps = {
  success: boolean;
  message: string;
  referenceId?: string;
};

export function FormAlert({ success, message, referenceId }: FormAlertProps) {
  return (
    <div
      className={`rounded-2xl px-4 py-3 text-sm ${
        success ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
      }`}
    >
      <p>{message}</p>

      {success && referenceId ? (
        <p className="mt-1 font-mono text-xs">
          Save this reference: {referenceId}
        </p>
      ) : null}
    </div>
  );
}