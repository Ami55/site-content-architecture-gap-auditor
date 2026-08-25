import React from 'react';
import { ProjectData } from '../types';
import { NavSection } from './Navigation';
import {
  FileText,
  Network,
  SplitSquareVertical,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  HelpCircle,
  CopyX,
  Layers,
  FolderTree
} from 'lucide-react';

interface OverviewSectionProps {
  project: ProjectData;
  onNavigate: (section: NavSection) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ project, onNavigate }) => {
  const summary = project.executiveSummary;
  const answer = summary.answerFirst;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Target Domain Context Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Audit Target & Scope
            </span>
            <span className="text-xs text-slate-400">
              Last analysed: {new Date(project.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {project.name}
          </h2>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            <strong className="text-teal-300">{project.targetDomain}</strong> &bull; Destination/Topic: <span className="font-semibold text-white">{project.destinationOrTopic || 'Sitewide'}</span> &bull; Business Objective: {project.businessObjective}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={() => onNavigate('recommendations')}
            className="px-4 py-2.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
          >
            <Zap className="w-4 h-4" />
            View Immediate Roadmap
          </button>
          <button
            onClick={() => onNavigate('reports')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Executive Report
          </button>
        </div>
      </div>

      {/* 6 Key KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div
          onClick={() => onNavigate('inventory')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-teal-400 cursor-pointer transition"
        >
          <span className="text-xs font-semibold text-slate-500 block">Inspected URLs</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-extrabold text-slate-900">{project.inventory.length}</span>
            <span className="text-[11px] text-slate-400 font-medium">/{summary.totalUrlsDiscovered} discovered</span>
          </div>
          <div className="text-[11px] text-teal-600 font-medium mt-1 flex items-center gap-0.5">
            View inventory <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('sitemap')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-teal-400 cursor-pointer transition"
        >
          <span className="text-xs font-semibold text-slate-500 block">Sitemap Families</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-extrabold text-slate-900">{project.sitemaps.length}</span>
            <span className="text-[11px] text-emerald-600 font-medium">100% accessible</span>
          </div>
          <div className="text-[11px] text-teal-600 font-medium mt-1 flex items-center gap-0.5">
            Inspect sitemaps <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('clusters')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-teal-400 cursor-pointer transition"
        >
          <span className="text-xs font-semibold text-slate-500 block">Content Clusters</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-extrabold text-slate-900">{project.clusters.length}</span>
            <span className="text-[11px] text-slate-500">Core topic hubs</span>
          </div>
          <div className="text-[11px] text-teal-600 font-medium mt-1 flex items-center gap-0.5">
            Cluster hierarchy <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('gaps')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-rose-400 cursor-pointer transition"
        >
          <span className="text-xs font-semibold text-slate-500 block">Identified Gaps</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-extrabold text-rose-600">{project.gaps.length}</span>
            <span className="text-[11px] text-rose-600 font-semibold">{summary.highPriorityOpportunitiesCount} High Priority</span>
          </div>
          <div className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-0.5">
            5-Factor Gap Scores <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('duplicates')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-amber-400 cursor-pointer transition"
        >
          <span className="text-xs font-semibold text-slate-500 block">Duplicates / Overlaps</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-extrabold text-amber-600">{project.duplicateGroups.length}</span>
            <span className="text-[11px] text-amber-700">1 legacy 301 needed</span>
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-1 flex items-center gap-0.5">
            Cannibalization review <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('queryfanout')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-indigo-400 cursor-pointer transition"
        >
          <span className="text-xs font-semibold text-slate-500 block">Query Fan-out</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-extrabold text-indigo-600">{summary.validationRequiredCount}</span>
            <span className="text-[11px] text-indigo-600">Pending QFO</span>
          </div>
          <div className="text-[11px] text-indigo-600 font-medium mt-1 flex items-center gap-0.5">
            Export / Import handoff <ArrowRight className="w-3 h-3" />
          </div>
        </div>

      </div>

      {/* Answer-First Synthesis Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">Answer-First Content Architecture Synthesis</h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Structured Strategic Audit Findings
          </span>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: What Site Has & How Organized */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Network className="w-4 h-4 text-teal-600" /> What the Site Has & How It Is Organized
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              {answer.whatSiteHas}
            </p>
            <p className="text-xs text-slate-500 pt-1 border-t border-slate-200">
              {answer.howOrganised}
            </p>
          </div>

          {/* Card 2: Strong Coverage */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> What the Site Covers Well
            </span>
            <p className="text-xs text-emerald-900 leading-relaxed">
              {answer.whatCoversWell}
            </p>
            <ul className="text-[11px] text-emerald-800 list-disc list-inside pt-1 space-y-0.5">
              {summary.targetSiteAdvantages.map((adv, i) => (
                <li key={i}>{adv}</li>
              ))}
            </ul>
          </div>

          {/* Card 3: Structural & Cannibalization Issues */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
            <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> Disconnected & Cannibalizing Areas
            </span>
            <p className="text-xs text-amber-900 leading-relaxed">
              {answer.whatIsWeakOrDisconnected}
            </p>
            <div className="text-[11px] text-amber-800 bg-amber-100/60 p-2 rounded-lg mt-1 font-medium">
              Action: 301-redirect legacy 2022 post and add bidirectional links between food blog and tour categories.
            </div>
          </div>

          {/* Card 4: Content Gaps Identified */}
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
            <span className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
              <SplitSquareVertical className="w-4 h-4 text-rose-600" /> What Content Is Missing
            </span>
            <p className="text-xs text-rose-900 leading-relaxed">
              {answer.whatIsMissing}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {summary.missingPageTypes.map((t, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-bold">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card 5: Competitor Comparison */}
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2">
            <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" /> How Competitors Differ
            </span>
            <p className="text-xs text-indigo-900 leading-relaxed">
              {answer.howCompetitorsDiffer}
            </p>
            <div className="text-[11px] text-indigo-800 pt-1">
              Competitor only types: {summary.competitorOnlyTypes.join(', ')}
            </div>
          </div>

          {/* Card 6: Immediate Actions vs Validation */}
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2">
            <span className="text-xs font-bold text-teal-950 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-teal-600" /> Immediate Actions & Validation Needs
            </span>
            <p className="text-xs text-teal-900 leading-relaxed">
              <strong>Immediate:</strong> {answer.immediateActions}
            </p>
            <p className="text-xs text-slate-700 pt-1 border-t border-teal-200">
              <strong>Query Fan-out:</strong> {answer.needsValidationFirst}
            </p>
          </div>

        </div>
      </div>

      {/* Top 5 Content Gap Opportunities Snapshot */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Highest-Priority Content Opportunities</h3>
            <p className="text-xs text-slate-500">Calculated using 5-factor mathematical score (Relevance × Gap × Business × Gain × Structure)</p>
          </div>
          <button
            onClick={() => onNavigate('gaps')}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
          >
            View All Gaps & Calculation Formula <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Opportunity</th>
                <th className="py-3 px-3">Category / Cluster</th>
                <th className="py-3 px-3">Gap Type</th>
                <th className="py-3 px-3 text-center">5-Factor Score</th>
                <th className="py-3 px-3">Recommended Action</th>
                <th className="py-3 px-3">Evidence Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {project.gaps.slice(0, 5).map((gap) => (
                <tr key={gap.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{gap.opportunityTitle}</span>
                    <span className="text-[11px] text-slate-500 font-normal truncate block max-w-sm">
                      {gap.description}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-medium">
                    {gap.contentCluster}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                      {gap.gapType}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-black text-rose-600 text-sm">
                    {gap.preliminaryScore} <span className="text-[10px] text-slate-400 font-normal">/3125</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 font-semibold text-[10px]">
                      {gap.preliminaryRecommendation}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        gap.needsQueryFanoutValidation
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {gap.evidenceLabel}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onNavigate('gaps')}
                      className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
