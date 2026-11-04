"use client";

import { useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Loader2,
  Send,
} from "lucide-react";
import {
  OTHER_VALUE,
  QUESTIONNAIRE_ID,
  QUESTIONNAIRE_META,
  QUESTIONS,
  submitForm,
  type Question,
} from "@/api/questionnaire";

const API_URL = process.env.API_HOST;

interface AnswerState {
  selected: string[];
  text: string;
}

type Answers = Record<string, AnswerState>;
type Errors = Record<string, string>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyAnswer: AnswerState = { selected: [], text: "" };

function isAnswered(q: Question, a: AnswerState): boolean {
  if (q.type === "text" || q.type === "short") return a.text.trim().length > 0;
  return a.selected.length > 0;
}

function validate(answers: Answers): Errors {
  const errors: Errors = {};
  for (const q of QUESTIONS) {
    const a = answers[q.id] ?? emptyAnswer;
    if (q.required && !isAnswered(q, a)) {
      errors[q.id] = "Please answer this question.";
      continue;
    }
    if (a.selected.includes(OTHER_VALUE) && a.text.trim() === "") {
      errors[q.id] = "Please tell us what \"Other\" means.";
      continue;
    }
    if (q.inputType === "email" && a.text.trim() && !EMAIL_RE.test(a.text.trim())) {
      errors[q.id] = "Please enter a valid email address.";
    }
  }
  return errors;
}

/** Build the JSON body sent to FastAPI. Unanswered optional questions are omitted. */
function buildPayload(answers: Answers) {
  return {
    questionnaire_id: QUESTIONNAIRE_ID,
    submitted_at: new Date().toISOString(),
    answers: QUESTIONS.flatMap((q) => {
      const a = answers[q.id] ?? emptyAnswer;
      if (!isAnswered(q, a)) return [];
      return [
        {
          question_id: q.id,
          selected: a.selected,
          text: a.text.trim() || null,
        },
      ];
    }),
  };
}

export default function QuestionnairePage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const questionRefs = useRef<Record<string, HTMLElement | null>>({});

  const get = (id: string): AnswerState => answers[id] ?? emptyAnswer;

  const update = (id: string, patch: Partial<AnswerState>) => {
    setAnswers((prev) => ({ ...prev, [id]: { ...(prev[id] ?? emptyAnswer), ...patch } }));
    setErrors((prev) => {
      if (!prev[id]) return prev;
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const selectSingle = (q: Question, value: string) => {
    const current = get(q.id);
    // Clicking the selected tile again clears it (unless required, where it stays selected).
    const next = current.selected[0] === value && !q.required ? [] : [value];
    update(q.id, {
      selected: next,
      text: next.includes(OTHER_VALUE) ? current.text : q.type === "tiles" || q.type === "dropdown" ? "" : current.text,
    });
  };

  const toggleMulti = (q: Question, value: string) => {
    const current = get(q.id);
    const next = current.selected.includes(value)
      ? current.selected.filter((v) => v !== value)
      : [...current.selected, value];
    update(q.id, {
      selected: next,
      text: next.includes(OTHER_VALUE) ? current.text : "",
    });
  };

  const requiredQuestions = useMemo(() => QUESTIONS.filter((q) => q.required), []);
  const answeredRequired = requiredQuestions.filter((q) => isAnswered(q, get(q.id))).length;
  const progress = Math.round((answeredRequired / requiredQuestions.length) * 100);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validate(answers);
    setErrors(found);
    setServerError(null);

    const firstInvalid = QUESTIONS.find((q) => found[q.id]);
    if (firstInvalid) {
      questionRefs.current[firstInvalid.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("submitting");
    try {
      const response = await submitForm(buildPayload(answers));

      if (response && !response.ok) {
        let detail = `Something went wrong. Please contact us.`;
        try {
          const body = await response.json();
          if (typeof body?.detail === "string") detail = body.detail;
          else if (Array.isArray(body?.detail)) detail = "Some answers could not be accepted. Please review and try again.";
        } catch {
          /* non-JSON error body */
        }
        throw new Error(detail);
      }

      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setServerError(
        err instanceof Error && err.message
          ? err.message
          : "We couldn't reach the server. Please try again.",
      );
      setStatus("error");
    }
  };

  const resetForm = () => {
    setAnswers({});
    setErrors({});
    setServerError(null);
    setStatus("idle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Group questions by section, preserving order.
  const sections = useMemo(() => {
    const map = new Map<string, Question[]>();
    for (const q of QUESTIONS) map.set(q.section, [...(map.get(q.section) ?? []), q]);
    return Array.from(map.entries());
  }, []);

  if (status === "success") {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#040B14] px-6 py-20 text-center">
        <AmbientBackground />
        <div className="relative z-10 flex max-w-xl flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-sky-400/40 bg-sky-500/10">
            <CheckCircle2 size={30} className="text-sky-300" />
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-slate-50 via-slate-100 to-sky-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Thank you!
          </h1>
          <p className="mb-9 text-base leading-relaxed text-slate-400 sm:text-lg">
            Your answers have been received. They&apos;ll help shape what gets built.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#040B14] px-6 pb-20 pt-32">
      <AmbientBackground />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-sky-400/50" />
            <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-sky-300">
              <ClipboardList size={15} />
              {QUESTIONNAIRE_META.eyebrow}
            </span>
            <span className="h-px w-7 bg-sky-400/50" />
          </div>

          <h1 className="mx-auto mb-6 max-w-3xl bg-gradient-to-r from-slate-50 via-slate-100 to-sky-300 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
            {QUESTIONNAIRE_META.title}
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {QUESTIONNAIRE_META.subtitle}
          </p>
        </header>

        {/* Progress */}
        <div className="sticky top-20 z-30 -mx-6 mb-10 bg-[#040B14]/90 px-6 py-3 backdrop-blur">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <span>
              {answeredRequired} of {requiredQuestions.length} required answered
            </span>
            <span>{progress}%</span>
          </div>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Required questions answered"
          >
            <div
              className="h-full rounded-full bg-sky-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-14">
          {sections.map(([section, questions]) => (
            <section key={section} aria-label={section} className="space-y-6">
              <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-sky-300">
                {section}
              </h2>

              {questions.map((q) => (
                <fieldset
                  key={q.id}
                  ref={(el) => {
                    questionRefs.current[q.id] = el;
                  }}
                  aria-invalid={!!errors[q.id]}
                  aria-describedby={errors[q.id] ? `${q.id}-error` : undefined}
                  className={`rounded-3xl border bg-[#0A1B2E]/60 p-6 transition-colors sm:p-7 ${
                    errors[q.id] ? "border-rose-400/60" : "border-sky-900"
                  }`}
                >
                  <legend className="sr-only">{q.prompt}</legend>
                  <p className="text-base font-semibold text-slate-100 sm:text-lg" aria-hidden="true">
                    {q.prompt}
                    {q.required && <span className="ml-1 text-sky-400">*</span>}
                  </p>
                  {q.help && <p className="mt-1.5 text-sm text-slate-400">{q.help}</p>}

                  <div className="mt-5">
                    {(q.type === "tiles" || q.type === "multi") && (
                      <Tiles
                        question={q}
                        answer={get(q.id)}
                        onToggle={(value) =>
                          q.type === "multi" ? toggleMulti(q, value) : selectSingle(q, value)
                        }
                      />
                    )}

                    {q.type === "dropdown" && (
                      <Dropdown
                        question={q}
                        answer={get(q.id)}
                        onChange={(value) => selectSingle(q, value)}
                      />
                    )}

                    {(q.type === "text" || q.type === "short") && (
                      <FreeText
                        id={q.id}
                        label={q.prompt}
                        multiline={q.type === "text"}
                        value={get(q.id).text}
                        placeholder={q.placeholder}
                        inputType={q.inputType}
                        maxLength={q.maxLength}
                        onChange={(text) => update(q.id, { text })}
                      />
                    )}

                    {q.allowOther && get(q.id).selected.includes(OTHER_VALUE) && (
                      <div className="mt-4">
                        <FreeText
                          id={`${q.id}-other`}
                          label={`${q.prompt} (other)`}
                          multiline={false}
                          value={get(q.id).text}
                          placeholder="Tell us more..."
                          maxLength={500}
                          onChange={(text) => update(q.id, { text })}
                          autoFocus
                        />
                      </div>
                    )}
                  </div>

                  {errors[q.id] && (
                    <p id={`${q.id}-error`} role="alert" className="mt-4 flex items-center gap-2 text-sm text-rose-300">
                      <AlertCircle size={16} />
                      {errors[q.id]}
                    </p>
                  )}
                </fieldset>
              ))}
            </section>
          ))}

          {/* Submit */}
          <div className="flex flex-col items-center gap-4 pt-2">
            {status === "error" && serverError && (
              <p
                role="alert"
                className="flex max-w-xl items-start gap-2 rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
              >
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                {serverError}
              </p>
            )}

            {Object.keys(errors).length > 0 && (
              <p role="alert" className="text-sm text-rose-300">
                Please fix the highlighted questions above.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full bg-sky-400 px-7 py-3.5 text-sm font-semibold text-[#040B14] transition-all hover:scale-[1.03] hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:bg-sky-400"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} strokeWidth={2.2} />
                  Submit answers
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[110px]" />
      <div className="absolute bottom-0 right-1/4 h-[280px] w-[280px] rounded-full bg-blue-600/5 blur-[100px]" />
    </div>
  );
}

function Tiles({
  question,
  answer,
  onToggle,
}: {
  question: Question;
  answer: AnswerState;
  onToggle: (value: string) => void;
}) {
  const multi = question.type === "multi";
  const options = [
    ...(question.options ?? []),
    ...(question.allowOther ? [{ value: OTHER_VALUE, label: "Other" }] : []),
  ];

  return (
    <div
      role={multi ? "group" : "radiogroup"}
      aria-label={question.prompt}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      {options.map((option) => {
        const selected = answer.selected.includes(option.value);
        const Icon = "icon" in option ? option.icon : undefined;
        return (
          <button
            key={option.value}
            type="button"
            role={multi ? "checkbox" : "radio"}
            aria-checked={selected}
            onClick={() => onToggle(option.value)}
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 ${
              selected
                ? "border-sky-400 bg-sky-500/10 text-sky-200"
                : "border-sky-900 bg-[#0A1B2E] text-slate-300 hover:border-sky-400/60 hover:text-sky-300"
            }`}
          >
            {Icon && <Icon size={18} className={selected ? "text-sky-300" : "text-sky-400/70"} />}
            <span className="flex-1">{option.label}</span>
            <span
              aria-hidden="true"
              className={`flex h-5 w-5 shrink-0 items-center justify-center border transition-colors ${
                multi ? "rounded-md" : "rounded-full"
              } ${selected ? "border-sky-400 bg-sky-400 text-[#040B14]" : "border-slate-600"}`}
            >
              {selected && <Check size={13} strokeWidth={3} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Dropdown({
  question,
  answer,
  onChange,
}: {
  question: Question;
  answer: AnswerState;
  onChange: (value: string) => void;
}) {
  const options = [
    ...(question.options ?? []),
    ...(question.allowOther ? [{ value: OTHER_VALUE, label: "Other" }] : []),
  ];

  return (
    <div className="relative">
      <select
        id={question.id}
        aria-label={question.prompt}
        value={answer.selected[0] ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-2xl border border-sky-900 bg-[#0A1B2E] px-4 py-3.5 pr-11 text-sm font-medium text-slate-200 transition-colors [color-scheme:dark] hover:border-sky-400/60 focus:border-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
      >
        <option value="" disabled>
          Select an answer...
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sky-400"
      />
    </div>
  );
}

function FreeText({
  id,
  label,
  multiline,
  value,
  placeholder,
  inputType = "text",
  maxLength,
  onChange,
  autoFocus,
}: {
  id: string;
  label: string;
  multiline: boolean;
  value: string;
  placeholder?: string;
  inputType?: "text" | "email";
  maxLength?: number;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}) {
  const shared =
    "w-full rounded-2xl border border-sky-900 bg-[#0A1B2E] px-4 py-3.5 text-sm text-slate-200 placeholder:text-slate-500 transition-colors hover:border-sky-400/60 focus:border-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70";

  return (
    <div>
      {multiline ? (
        <textarea
          id={id}
          aria-label={label}
          rows={4}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          className={`${shared} resize-y leading-relaxed`}
        />
      ) : (
        <input
          id={id}
          aria-label={label}
          type={inputType}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
      {multiline && maxLength && (
        <p className="mt-1.5 text-right text-xs text-slate-500">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
}