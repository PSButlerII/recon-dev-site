type SubmitButtonProps = {
  isPending: boolean;
  pendingText?: string;
  children: React.ReactNode;
};

export function SubmitButton({
  isPending,
  pendingText = "Submitting...",
  children,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? pendingText : children}
    </button>
  );
}