import { useState, useEffect, useCallback } from "react";
import { RefreshCw } from "lucide-react";

interface MathCaptchaProps {
  onVerify: (verified: boolean) => void;
  inputClass?: string;
}

const generate = () => {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
};

const MathCaptcha = ({ onVerify, inputClass = "" }: MathCaptchaProps) => {
  const [q, setQ] = useState(generate);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const refresh = useCallback(() => {
    setQ(generate());
    setValue("");
    setError(false);
    onVerify(false);
  }, [onVerify]);

  useEffect(() => {
    if (value === "") { onVerify(false); return; }
    const correct = parseInt(value, 10) === q.answer;
    setError(!correct);
    onVerify(correct);
  }, [value, q.answer, onVerify]);

  return (
    <div>
      <label className="text-xs font-semibold text-[#374151] mb-1.5 block">
        Verification: What is {q.a} + {q.b}? *
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Enter answer"
          className={`${inputClass} ${error && value ? "ring-2 ring-red-400 border-red-300" : ""}`}
          style={{ maxWidth: 160 }}
        />
        <button
          type="button"
          onClick={refresh}
          className="w-9 h-9 rounded-xl border flex items-center justify-center text-[#6B7280] hover:text-[#FF6B2B] hover:border-[#FF6B2B] transition-colors shrink-0"
          style={{ borderColor: "#E5E7EB" }}
          title="New question"
        >
          <RefreshCw size={14} />
        </button>
      </div>
      {error && value && (
        <p className="text-xs text-red-500 mt-1">Incorrect answer, please try again.</p>
      )}
    </div>
  );
};

export default MathCaptcha;
