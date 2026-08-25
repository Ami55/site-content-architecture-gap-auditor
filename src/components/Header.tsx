import React from 'react';
import { ProjectData } from '../types';
import { Play, RotateCcw, Plus, Sparkles, AlertCircle, Database, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentProject: ProjectData;
  onOpenSetup: () => void;
  onLoadDemo: () => void;
  onRunAudit: () => void;
  isAuditing: boolean;
  onOpenHowItWorks: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProject,
  onOpenSetup,
  onLoadDemo,
  onRunAudit,
  isAuditing,
  onOpenHowItWorks,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Title & Subtitle */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-bold tracking-tight text-white">
                Site Content Architecture & Gap Auditor
              </h1>
              {currentProject.isDemo && (
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Demo data — not a live analysis
                </span>
              )}
              <span className="px-2 py-0.5 text-xs rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                {currentProject.mode}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Target: <span className="text-teal-300 font-medium">{currentProject.targetDomain}</span> &bull; Scope: <span className="text-slate-200">{currentProject.destinationOrTopic || "All Content"}</span> ({currentProject.analysisScope === 'destination_topic' ? 'Destination/Topic Audit' : 'Sitewide Batch'})
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={onOpenHowItWorks} className="px-3 py-1.5 text-xs font-semibold text-teal-200 bg-teal-500/10 hover:bg-teal-500/20 rounded-lg border border-teal-500/30 transition flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" />How It Works</button>
          <button
            id="btn-load-demo"
            onClick={onLoadDemo}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700 transition flex items-center gap-1.5"
            title="Load the Montreal Destination complete demo project"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Montreal Demo
          </button>

          <button
            id="btn-new-project"
            onClick={onOpenSetup}
            className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            New Audit Setup
          </button>

          <button
            id="btn-start-audit"
            onClick={onRunAudit}
            disabled={isAuditing}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-2 shadow-sm ${
              isAuditing
                ? 'bg-teal-700 text-teal-200 cursor-wait'
                : 'bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold hover:shadow-teal-500/20'
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isAuditing ? 'animate-spin' : ''}`} />
            {isAuditing ? 'Auditing...' : 'Run Live Analysis'}
          </button>
        </div>

      </div>
    </header>
  );
};
