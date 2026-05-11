"use client";

import { useState } from "react";

export default function RepoInput({
  onSubmit,
}: {
  onSubmit: (repo: string) => void;
}) {
  const [repo, setRepo] = useState("");
  const [focused, setFocused] = useState(false);

  const handleClear = () => setRepo("");

  const handleSubmit = () => {
    if (repo.trim()) onSubmit(repo.trim());
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="flex items-center gap-3 font-mono">
      {/* Input Wrapper */}
      <div
        className={`
          relative flex flex-1 items-center rounded-xl border
          transition-all duration-200
          ${
            focused
              ? "border-emerald-400/30 bg-emerald-400/5 shadow-lg shadow-emerald-400/10 ring-2 ring-emerald-400/10"
              : "border-white/10 bg-white/[0.02]"
          }
        `}
      >
        {/* GitHub Icon */}
        <span
          className={`
            absolute left-3.5 transition-colors duration-200
            ${focused ? "text-emerald-400" : "text-white/20"}
          `}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </span>

        {/* Input */}
        <input
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKey}
          placeholder="owner / repo"
          className={`
            w-full bg-transparent py-3 pl-10 text-sm tracking-wide
            text-slate-200 outline-none placeholder:text-white/20
            ${repo ? "pr-10" : "pr-4"}
          `}
        />

        {/* Clear Button */}
        {repo && (
          <button
            onClick={handleClear}
            title="Clear"
            className="
              absolute right-3 flex h-5 w-5 items-center justify-center
              rounded-full border border-white/10 bg-white/5
              text-white/40 transition-all duration-150
              hover:border-rose-400/30
              hover:bg-rose-400/10
              hover:text-rose-400
            "
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleSubmit}
        disabled={!repo.trim()}
        className={`
          flex shrink-0 items-center gap-2 rounded-xl
          bg-gradient-to-r from-emerald-400 to-emerald-500
          px-5 py-3 text-sm font-bold tracking-wide
          text-slate-950 transition-all duration-200
          ${
            repo.trim()
              ? "shadow-lg shadow-emerald-400/30 hover:-translate-y-0.5 hover:shadow-emerald-400/50"
              : "cursor-not-allowed opacity-30"
          }
        `}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        Analyze
      </button>
    </div>
  );
}