"use client";

interface AgentSidebarProps {
  icon: string;
  name: string;
  description: string;
  accentColor: string;
  quickPrompts: string[];
  onPromptClick: (prompt: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function AgentSidebar({
  icon,
  name,
  description,
  accentColor,
  quickPrompts,
  onPromptClick,
  isOpen = true,
  onClose,
}: AgentSidebarProps) {
  const accentClasses = {
    indigo: "border-indigo-700 text-indigo-600 dark:text-indigo-400",
    blue: "border-blue-700 text-blue-600 dark:text-blue-400",
    green: "border-green-700 text-green-600 dark:text-green-400",
    purple: "border-purple-700 text-purple-600 dark:text-purple-400",
    amber: "border-amber-700 text-amber-600 dark:text-amber-400",
  };

  const bgClasses = {
    indigo:
      "bg-gradient-to-b from-indigo-950 to-slate-900 hover:bg-indigo-900/80",
    blue: "bg-gradient-to-b from-blue-950 to-slate-900 hover:bg-blue-900/80",
    green:
      "bg-gradient-to-b from-green-950 to-slate-900 hover:bg-green-900/80",
    purple:
      "bg-gradient-to-b from-purple-950 to-slate-900 hover:bg-purple-900/80",
    amber: "bg-gradient-to-b from-amber-950 to-slate-900 hover:bg-amber-900/80",
  };

  const badgeClasses = {
    indigo: "bg-indigo-900 text-indigo-300",
    blue: "bg-blue-900 text-blue-300",
    green: "bg-green-900 text-green-300",
    purple: "bg-purple-900 text-purple-300",
    amber: "bg-amber-900 text-amber-300",
  };

  const promptBgClasses = {
    indigo:
      "bg-indigo-900/30 border-indigo-700/50 hover:bg-indigo-800/50 hover:border-indigo-600",
    blue: "bg-blue-900/30 border-blue-700/50 hover:bg-blue-800/50 hover:border-blue-600",
    green:
      "bg-green-900/30 border-green-700/50 hover:bg-green-800/50 hover:border-green-600",
    purple:
      "bg-purple-900/30 border-purple-700/50 hover:bg-purple-800/50 hover:border-purple-600",
    amber:
      "bg-amber-900/30 border-amber-700/50 hover:bg-amber-800/50 hover:border-amber-600",
  };

  const accentClass =
    accentClasses[accentColor as keyof typeof accentClasses] ||
    accentClasses.blue;
  const bgClass =
    bgClasses[accentColor as keyof typeof bgClasses] || bgClasses.blue;
  const badgeClass =
    badgeClasses[accentColor as keyof typeof badgeClasses] ||
    badgeClasses.blue;
  const promptBgClass =
    promptBgClasses[accentColor as keyof typeof promptBgClasses] ||
    promptBgClasses.blue;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative w-full md:w-[300px] h-screen bg-slate-900 border-r-2 border-slate-700 transition-transform duration-200 z-40 md:z-0 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-full overflow-y-auto flex flex-col p-lg">
          {/* Close button (mobile) */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-md right-md text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>

          {/* Agent Header */}
          <div className="pb-lg border-b-2 border-slate-700 mb-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-4xl">{icon}</div>
            </div>
            <h2 className="text-xl font-semibold text-white">{name}</h2>

            {/* Connected Badge */}
            <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>
              <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
              Connected
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 mt-4 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Quick Prompts */}
          <div className="mb-lg">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              Try asking...
            </h4>
            <div className="space-y-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onPromptClick(prompt)}
                  className={`w-full text-left text-xs sm:text-sm px-3 py-2 rounded-md border transition-all duration-200 text-slate-300 hover:text-white ${promptBgClass}`}
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="mt-auto pt-lg border-t-2 border-slate-700">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Subject Specification
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Exam Board Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Study Materials
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
