import React, { useState } from 'react';
import { ProjectData, RecommendationItem, RecommendationStatus } from '../types';
import {
  ListTodo,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  Zap,
  ArrowDownToLine,
  UserCheck,
  CheckSquare,
  Square
} from 'lucide-react';

interface RecommendationsSectionProps {
  project: ProjectData;
  onUpdateRecommendation?: (updatedRec: RecommendationItem) => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  project,
  onUpdateRecommendation,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'now' | 'validation'>('all');
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(project.recommendations);

  const handleStatusChange = (id: string, newStatus: RecommendationStatus) => {
    const updated = recommendations.map((r) =>
      r.id === id ? { ...r, status: newStatus } : r
    );
    setRecommendations(updated);
    const item = updated.find((r) => r.id === id);
    if (item && onUpdateRecommendation) {
      onUpdateRecommendation(item);
    }
  };

  const actionsNow = recommendations.filter((r) => r.category === 'Actions we can take now');
  const validationRequired = recommendations.filter((r) => r.category === 'Opportunities requiring Query Fan-out validation');

  const displayed =
    activeFilter === 'now'
      ? actionsNow
      : activeFilter === 'validation'
      ? validationRequired
      : recommendations;

  const exportRecommendationsCSV = () => {
    const headers = [
      'Category', 'Action Type', 'Title', 'Target / URL',
      'Priority', 'Effort', 'Owner', 'Status', 'Strategic Reason', 'Expected Benefit'
    ];
    const rows = displayed.map(r => [
      `"${r.category}"`,
      `"${r.action}"`,
      `"${(r.targetTitle || r.action).replace(/"/g, '""')}"`,
      `"${r.targetUrl || ''}"`,
      `"${r.priority}"`,
      `"${r.effort}"`,
      `"${r.owner || ''}"`,
      `"${r.status}"`,
      `"${r.reason.replace(/"/g, '""')}"`,
      `"${r.expectedUserBenefit.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${project.targetDomain}-recommendations-roadmap.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-teal-600" />
            11. Action-Oriented Recommendations Roadmap
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Clear separation of immediate evidence-backed execution tasks vs opportunities requiring query validation
          </p>
        </div>

        <button
          onClick={exportRecommendationsCSV}
          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition flex items-center gap-1.5 shadow-xs"
        >
          <ArrowDownToLine className="w-3.5 h-3.5" />
          Export Recommendations CSV
        </button>
      </div>

      {/* Quick Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
            activeFilter === 'all'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Recommendations ({recommendations.length})
        </button>

        <button
          onClick={() => setActiveFilter('now')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
            activeFilter === 'now'
              ? 'bg-teal-600 text-white'
              : 'text-teal-700 hover:bg-teal-50 bg-teal-50/50 border border-teal-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          Actions We Can Take Now ({actionsNow.length})
        </button>

        <button
          onClick={() => setActiveFilter('validation')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
            activeFilter === 'validation'
              ? 'bg-indigo-600 text-white'
              : 'text-indigo-700 hover:bg-indigo-50 bg-indigo-50/50 border border-indigo-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Requires Query Fan-out Validation ({validationRequired.length})
        </button>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="space-y-4">
        {displayed.map((rec) => (
          <div
            key={rec.id}
            className={`bg-white rounded-2xl border p-5 shadow-xs space-y-3 transition ${
              rec.status === 'Completed'
                ? 'border-emerald-200 bg-emerald-50/20'
                : rec.category === 'Actions we can take now'
                ? 'border-teal-200 hover:border-teal-400'
                : 'border-indigo-200 hover:border-indigo-400'
            }`}
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  rec.category === 'Actions we can take now'
                    ? 'bg-teal-100 text-teal-900'
                    : 'bg-indigo-100 text-indigo-900'
                }`}>
                  {rec.category === 'Actions we can take now' ? 'Immediate Execution' : 'Query Fan-out Required'}
                </span>
                <span className="text-xs text-slate-400">&bull;</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 text-[10px] font-bold">
                  {rec.action}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  rec.priority === 'High'
                    ? 'bg-rose-100 text-rose-800'
                    : rec.priority === 'Medium'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {rec.priority} Priority
                </span>

                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">
                  Effort: {rec.effort}
                </span>
              </div>
            </div>

            {/* Title & Target */}
            <div>
              <h3 className="text-sm font-bold text-slate-900">{rec.targetTitle || rec.action}</h3>
              {rec.targetUrl && (
                <span className="text-[11px] text-teal-700 font-mono block mt-0.5">
                  Target URL: {rec.targetUrl}
                </span>
              )}
            </div>

            {/* Rationale & Expected Outcome */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-bold text-slate-700 block mb-0.5">Strategic Rationale & Evidence:</span>
                <p className="text-slate-600 leading-relaxed">{rec.reason} &mdash; <span className="text-slate-500 italic">{rec.evidence}</span></p>
              </div>
              <div>
                <span className="font-bold text-slate-700 block mb-0.5">Expected User Benefit & Business Goal:</span>
                <p className="text-slate-600 leading-relaxed">{rec.expectedUserBenefit} ({rec.businessRelevance})</p>
              </div>
            </div>

            {/* Status Workflow Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Owner: <strong className="text-slate-800">{rec.owner || 'Content Strategy Team'}</strong></span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 text-[11px] mr-1">Status:</span>
                {(['Proposed', 'In progress', 'Completed'] as RecommendationStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(rec.id, st)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition ${
                      rec.status === st
                        ? st === 'Completed'
                          ? 'bg-emerald-600 text-white'
                          : st === 'In progress'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
