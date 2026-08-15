import React from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface Props {
  message: string | null;
  type?: "success" | "error";
  onClose: () => void;
}

export const Toast: React.FC<Props> = ({
  message,
  type = "success",
  onClose,
}) => {
  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 animate-slide-in">
      {type === "success" ? (
        <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
      ) : (
        <AlertCircle size={18} className="text-rose-400 shrink-0" />
      )}
      <span className="text-xs font-bold">{message}</span>
      <button
        onClick={onClose}
        className="p-1 text-slate-400 hover:text-white transition"
      >
        <X size={14} />
      </button>
    </div>
  );
};
