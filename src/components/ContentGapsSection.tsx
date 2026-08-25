import React, { useState } from 'react';
import { ProjectData, ContentGapItem, GapCategory } from '../types';
import {
  SplitSquareVertical,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ArrowDownToLine,
  HelpCircle
} from 'lucide-react';

interface ContentGapsSectionProps {
  project: ProjectData;
  onSelectGap?: (gap: ContentGapItem) => void;
}

export const ContentGapsSection: React.FC<ContentGapsSectionProps> = ({ project, onSelectGap }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const gaps = project.gaps;

  const filteredGaps = gaps.filter((g) => {
    const matchesType = filterType === 'all' || g.gapCategory === filterType;
    const matchesPriority = filterPriority === 'all' || g.preliminaryPriority === filterPriority;
    return matchesType && matchesPriority;
  });

  const exportGapsCSV = () => {
    const headers = [
      'Opportunity ID', 'Topic / Opportunity Title', 'Destination', 'Gap Category',
      'Target Relevance (1-5)', 'Gap Severity (1-5)', 'Business Value (1-5)',
      'Info Gain (1-5)', 'Structural (1-5)', 'Preliminary Score', 'Priority',
      'Recommended Action', 'Needs QFO Validation', 'Evidence Label'
    ];
    const rows = filteredGaps.map(g => [
      `"${g.opportunityId}"`,
      `"${g.missingOrWeakTopic.replace(/"/g, '""')}"`,
      `"${g.destination}"`,
      `"${g.gapCategory}"`,
      g.relevanceScore,
      g.contentGapScore,
      g.businessRelevance,
      g.informationGainPotential,
      g.structuralImportance,
      g.preliminaryScore,
      `"${g.preliminaryPriority}"`,
      `"${g.recommendedAction}"`,
      g.needsQueryFanoutValidation ? 'Yes' : 'No',
      `"${g.evidenceLabel}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${project.targetDomain}-content-gaps.csv`);
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
            <SplitSquareVertical className="w-5 h-5 text-rose-600" />
            10. Content Gaps & 5-Factor Opportunity Scoring
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Mathematical prioritization matrix combining relevance, gap severity, business value, information gain, and structural importance
          </p>
        </div>

        <button
          onClick={exportGapsCSV}
          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition flex items-center gap-1.5 shadow-xs"
        >
          <ArrowDownToLine className="w-3.5 h-3.5" />
          Export Content Gaps CSV
        </button>
      </div>

      {/* 5-Factor Scoring Formula Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-teal-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-teal-300">
            5-Factor Mathematical Gap Scoring Formula
          </h3>
        </div>
        
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-center text-teal-300">
          Gap Score = Relevance (1-5) &times; Content Gap Severity (1-5) &times; Business Value (1-5) &times; Information Gain Potential (1-5) &times; Structural Importance (1-5)
          <span className="block text-[11px] text-slate-400 mt-1 font-sans">
            Score Range: 1 to 3,125 &bull; High Priority: &ge; 400 &bull; Medium Priority: 100 - 399 &bull; Low Priority: &lt; 100
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">Gap Category</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 font-medium"
            >
              <option value="all">All Gap Categories</option>
              <option value="Structural gaps">Structural gaps</option>
              <option value="Topic gaps">Topic gaps</option>
              <option value="Depth gaps">Depth gaps</option>
              <option value="Intent gaps">Intent gaps</option>
              <option value="Entity gaps">Entity gaps</option>
              <option value="Expertise gaps">Expertise gaps</option>
              <option value="Internal-link gaps">Internal-link gaps</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">Priority Level</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 font-medium"
            >
              <option value="all">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Showing <strong className="text-slate-900">{filteredGaps.length}</strong> of {gaps.length} scored opportunities
        </div>
      </div>

      {/* Content Gaps Cards */}
      <div className="space-y-4">
        {filteredGaps.map((gap) => (
          <div
            key={gap.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 hover:border-teal-400 transition"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold">
                    {gap.gapCategory}
                  </span>
                  <span className="text-xs text-slate-400">&bull;</span>
                  <span className="text-xs font-semibold text-slate-700">{gap.opportunityId}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">{gap.missingOrWeakTopic}</h3>
              </div>

              <div className="flex items-center gap-3 text-right">
                <div>
                  <span className="text-2xl font-black text-rose-600 leading-none">{gap.preliminaryScore}</span>
                  <span className="text-[10px] text-slate-400 block">Opportunity Score</span>
                </div>
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                  gap.preliminaryPriority === 'High'
                    ? 'bg-rose-100 text-rose-800'
                    : gap.preliminaryPriority === 'Medium'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {gap.preliminaryPriority} Priority
                </span>
              </div>
            </div>

            {/* Description and Action */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="md:col-span-2 space-y-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Existing Target Coverage:</span>
                  <p className="text-slate-600 leading-relaxed">{gap.existingCoverage}</p>
                  
                  <span className="font-bold text-slate-900 block pt-1">Competitor Evidence:</span>
                  <p className="text-slate-600 leading-relaxed">{gap.competitorEvidence}</p>
                </div>
                
                <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-200">
                  <span className="font-bold text-teal-950 block mb-0.5">Recommended Action:</span>
                  <span className="text-teal-900 font-semibold text-[11px] inline-block">
                    {gap.recommendedAction} &bull; Suggested Type: {gap.suggestedContentType}
                  </span>
                </div>
              </div>

              {/* 5-Factor Factor Breakdown */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-[11px]">
                <span className="font-bold text-slate-800 block text-xs border-b border-slate-200 pb-1">
                  Factor Breakdown (1 to 5):
                </span>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Relevance:</span>
                  <strong className="text-slate-900">{gap.relevanceScore}/5</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Gap Severity:</span>
                  <strong className="text-slate-900">{gap.contentGapScore}/5</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Business Value:</span>
                  <strong className="text-slate-900">{gap.businessRelevance}/5</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Information Gain:</span>
                  <strong className="text-slate-900">{gap.informationGainPotential}/5</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Structural Importance:</span>
                  <strong className="text-slate-900">{gap.structuralImportance}/5</strong>
                </div>
              </div>
            </div>

            {/* Evidence & Query Fan-out Tag */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Evidence Label:</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  gap.needsQueryFanoutValidation
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {gap.evidenceLabel}
                </span>
              </div>

              {gap.needsQueryFanoutValidation && (
                <span className="text-[11px] text-indigo-700 font-medium">
                  Requires validation through Query Fan-out ({gap.reasonValidationNeeded || 'Search intent validation'})
                </span>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
