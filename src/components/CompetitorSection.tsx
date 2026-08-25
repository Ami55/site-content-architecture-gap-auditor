import React, { useState } from 'react';
import { ProjectData, CompetitorComparisonItem } from '../types';
import {
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ArrowDownToLine,
  Filter
} from 'lucide-react';

interface CompetitorSectionProps {
  project: ProjectData;
}

export const CompetitorSection: React.FC<CompetitorSectionProps> = ({ project }) => {
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const comparisons = project.competitorComparisons;

  const filtered = comparisons.filter((comp) => {
    const matchesDomain = filterDomain === 'all' || comp.competitorDomain === filterDomain;
    const matchesStatus = filterStatus === 'all' || comp.findingStatus === filterStatus;
    return matchesDomain && matchesStatus;
  });

  const exportCompetitorCSV = () => {
    const headers = [
      'Competitor Domain', 'Competitor Title', 'Competitor URL',
      'Topic Cluster', 'Finding Status', 'Content Depth',
      'First-Hand Expertise', 'Information Gain', 'Analysis Notes'
    ];
    const rows = filtered.map(c => [
      `"${c.competitorDomain}"`,
      `"${c.competitorTitle.replace(/"/g, '""')}"`,
      `"${c.competitorUrl}"`,
      `"${c.topicCluster}"`,
      `"${c.findingStatus}"`,
      `"${c.contentDepth}"`,
      `"${c.firstHandExpertise}"`,
      `"${c.informationGain}"`,
      `"${c.analysisNotes.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${project.targetDomain}-competitor-audit.csv`);
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
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            9. Competitor Coverage Benchmarks
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Comparative analysis of entity depth, first-hand expertise, information gain, and structural advantages vs {project.competitorDomains.join(', ')}
          </p>
        </div>

        <button
          onClick={exportCompetitorCSV}
          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition flex items-center gap-1.5 shadow-xs"
        >
          <ArrowDownToLine className="w-3.5 h-3.5" />
          Export Competitor CSV
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">Competitor Domain</label>
            <select
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 font-medium"
            >
              <option value="all">All Competitors</option>
              {project.competitorDomains.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">Finding Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 font-medium"
            >
              <option value="all">All Finding States</option>
              <option value="Competitor-only coverage">Competitor-only coverage</option>
              <option value="Target site stronger">Target site stronger</option>
              <option value="Target site weaker">Target site weaker</option>
              <option value="Both covered equally">Both covered equally</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Showing <strong className="text-slate-900">{filtered.length}</strong> of {comparisons.length} benchmark findings
        </div>
      </div>

      {/* Competitor Cards */}
      <div className="space-y-4">
        {filtered.map((comp) => (
          <div
            key={comp.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 hover:border-teal-400 transition"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-bold">
                  {comp.competitorDomain}
                </span>
                <span className="text-xs text-slate-400">&bull;</span>
                <span className="text-xs font-semibold text-slate-700">{comp.topicCluster}</span>
              </div>

              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                comp.findingStatus === 'Competitor-only coverage'
                  ? 'bg-rose-100 text-rose-800'
                  : comp.findingStatus === 'Target site stronger'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {comp.findingStatus}
              </span>
            </div>

            {/* Content & Quality Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Competitor URL ({comp.competitorPageType})
                </span>
                <span className="font-bold text-slate-900 block">{comp.competitorTitle}</span>
                <a
                  href={comp.competitorUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-teal-700 font-mono truncate block hover:underline"
                >
                  {comp.competitorUrl}
                </a>
              </div>

              <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-200 space-y-1">
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">
                  Target Site Equivalent
                </span>
                {comp.targetEquivalentUrl ? (
                  <>
                    <span className="font-bold text-slate-900 block">{comp.targetEquivalentTitle || 'Target URL'}</span>
                    <a
                      href={comp.targetEquivalentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-teal-800 font-mono truncate block hover:underline"
                    >
                      {comp.targetEquivalentUrl}
                    </a>
                  </>
                ) : (
                  <span className="text-rose-700 font-semibold italic block pt-1">
                    Missing equivalent target URL (Opportunity gap)
                  </span>
                )}
              </div>
            </div>

            {/* Depth, E-E-A-T & Analysis */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[11px]">Content Depth</span>
                <span className="font-bold text-slate-800">{comp.contentDepth}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">First-Hand Local Expertise</span>
                <span className="font-bold text-slate-800">{comp.firstHandExpertise}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Information Gain</span>
                <span className="font-bold text-slate-800">{comp.informationGain}</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Strategic Audit Assessment:</strong> {comp.analysisNotes}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};
