import React from 'react';
import { AlertCircle, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Required Disclaimer */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-slate-300 leading-relaxed text-xs">
            <span className="font-semibold text-white block mb-0.5">Methodology & Evidence Disclaimer:</span>
            “This application analyses observable sitemap, page, content and competitor evidence. Content gaps and competitor comparisons do not automatically prove search demand or ranking potential. Opportunities requiring additional query and user-intent evidence should be validated through Query Fan-out analysis.”
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800 text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-teal-400" />
            <span className="font-semibold text-slate-200">Site Content Architecture & Gap Auditor</span>
            <span>&bull; Standalone Content Strategy & Information Architecture System</span>
          </div>
          <div className="font-medium text-slate-300">
            &copy; 2026 Site Content Architecture &amp; Gap Auditor. Developed by <strong className="text-teal-300">Ami - SEO Girl</strong>. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
