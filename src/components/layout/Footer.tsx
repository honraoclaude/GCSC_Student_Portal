import React from "react";

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t-2 border-slate-700 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                GC
              </div>
              <span className="font-bold text-white">GCSC Hub</span>
            </div>
            <p className="text-xs text-slate-400">
              © 2024 GCSC Hub. All rights reserved.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-300 mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {["AI Tutors", "Flashcards", "Marketplace", "Practice Papers"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-300 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Press"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-300 mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {["Help Center", "FAQ", "Documentation", "Status"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-300 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 pt-8 border-t border-slate-700">
          {[
            { icon: "LinkedIn", label: "LinkedIn" },
            { icon: "Twitter", label: "Twitter" },
            { icon: "YouTube", label: "YouTube" },
            { icon: "Instagram", label: "Instagram" },
            { icon: "TikTok", label: "TikTok" },
          ].map((social) => (
            <a
              key={social.label}
              href="#"
              className="w-6 h-6 text-slate-400 hover:text-white hover:scale-110 transition-all duration-200"
              title={social.label}
            >
              <span className="text-xl">{social.icon === "LinkedIn" ? "🔗" : social.icon === "Twitter" ? "𝕏" : social.icon === "YouTube" ? "▶️" : social.icon === "Instagram" ? "📷" : "🎵"}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
