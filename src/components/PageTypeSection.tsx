import React from 'react';
import { ProjectData } from '../types';
import { Layers, CheckCircle2, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';

interface PageTypeSectionProps {
  project: ProjectData;
}

export const PageTypeSection: React.FC<PageTypeSectionProps> = ({ project }) => {
  const summaries = project.pageTypeSummaries;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-600" />
            4. Page Type Architecture
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Breakdown across standardized 28-type taxonomy, template consistency, structural anomalies, and destination coverage
          </p>
        </div>
      </div>

      {/* Visual Distribution Summary */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Page Type Composition Breakdown</h3>
        
        {/* Visual Bar */}
        <div className="w-full h-4 bg-slate-100 rounded-full flex overflow-hidden border border-slate-200">
          {summaries.map((s, idx) => {
            const colors = [
              'bg-teal-500', 'bg-blue-500', 'bg-purple-500', 'bg-amber-500',
              'bg-emerald-500', 'bg-indigo-500', 'bg-rose-500'
            ];
            const color = colors[idx % colors.length];
            return (
              <div
                key={idx}
                style={{ width: `${s.percentage}%` }}
                className={`${color} h-full transition-all duration-300 hover:opacity-80`}
                title={`${s.pageType}: ${s.count} pages (${s.percentage}%)`}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs">
          {summaries.map((s, idx) => {
            const colors = [
              'bg-teal-500', 'bg-blue-500', 'bg-purple-500', 'bg-amber-500',
              'bg-emerald-500', 'bg-indigo-500', 'bg-rose-500'
            ];
            return (
              <div key={idx} className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-xs ${colors[idx % colors.length]}`} />
                <span className="font-semibold text-slate-800">{s.pageType}</span>
                <span className="text-slate-400">({s.count} &bull; {s.percentage}%)</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Page Type Detail Cards / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summaries.map((pt, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider block">Taxonomy Type</span>
                <h4 className="text-base font-bold text-slate-900">{pt.pageType}</h4>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-slate-900">{pt.count}</span>
                <span className="text-xs text-slate-400 block">{pt.percentage}% of scope</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
              <div>
                <span className="text-slate-400 block text-[11px]">Template Consistency</span>
                <span className={`font-semibold ${pt.templateConsistency === 'Consistent' ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {pt.templateConsistency}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Associated Clusters</span>
                <span className="font-medium text-slate-700 truncate block">
                  {pt.clustersAssociated.join(', ')}
                </span>
              </div>
            </div>

            {pt.unexpectedGaps && pt.unexpectedGaps.length > 0 && (
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-2.5 space-y-1">
                <span className="text-[11px] font-bold text-rose-900 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Structural Gap Identified:
                </span>
                <ul className="text-[11px] text-rose-800 list-disc list-inside space-y-0.5">
                  {pt.unexpectedGaps.map((gap, i) => (
                    <li key={i}>{gap}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs text-slate-600 pt-1">
              <strong className="text-slate-800">Observation:</strong> {pt.notes}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};
