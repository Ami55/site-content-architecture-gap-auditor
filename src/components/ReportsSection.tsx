import React, { useState } from 'react';
import { ProjectData } from '../types';
import { exportProjectMasterJSON } from '../utils/exporter';
import {
  FileSpreadsheet,
  Printer,
  Copy,
  Check,
  ArrowDownToLine,
  FileText,
  Sparkles,
  ShieldCheck,
  SplitSquareVertical,
  Network
} from 'lucide-react';

interface ReportsSectionProps {
  project: ProjectData;
}

export const ReportsSection: React.FC<ReportsSectionProps> = ({ project }) => {
  const [reportType, setReportType] = useState<'executive' | 'detailed'>('executive');
  const [copied, setCopied] = useState(false);

  const summary = project.executiveSummary;
  const answer = summary.answerFirst;

  const handleCopyReport = () => {
    const reportText = `SITE CONTENT ARCHITECTURE & GAP AUDIT REPORT
Target Domain: ${project.targetDomain}
Destination/Topic: ${project.destinationOrTopic || 'Sitewide'}
Audit Date: ${new Date(project.updatedAt).toLocaleDateString()}

EXECUTIVE SUMMARY:
1. What Site Has: ${answer.whatSiteHas}
2. How Organised: ${answer.howOrganised}
3. Strong Coverage: ${answer.whatCoversWell}
4. Weaknesses & Cannibalization: ${answer.whatIsWeakOrDisconnected}
5. Missing Content Gaps: ${answer.whatIsMissing}
6. Competitor Comparison: ${answer.howCompetitorsDiffer}
7. Immediate Actions: ${answer.immediateActions}
8. Query Fan-out Validation Needs: ${answer.needsValidationFirst}

KEY METRICS:
- Total Sitemaps: ${project.sitemaps.length}
- Evaluated URLs: ${project.inventory.length}
- Content Clusters: ${project.clusters.length}
- Scored Opportunities: ${project.gaps.length}
- Cannibalization Groups: ${project.duplicateGroups.length}

HIGH PRIORITY ACTIONS:
${project.recommendations.map(r => `- [${r.category}] ${r.title} (${r.priority} Priority, Effort: ${r.effort})`).join('\n')}

Disclaimer: Observational IA analysis. Validate search nuances via Query Fan-out.
© 2026 Site Content Architecture & Gap Auditor. Developed by SEO Girl - Ami. All rights reserved.`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-teal-600" />
            13. Reports & Strategy Exports
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate executive summaries, print-ready client reports, and download master data packages
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportProjectMasterJSON(project)}
            className="px-3 py-1.5 text-xs font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition flex items-center gap-1.5 shadow-sm"
          >
            <ArrowDownToLine className="w-3.5 h-3.5" />
            Export Master JSON
          </button>
          
          <button
            onClick={handleCopyReport}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition flex items-center gap-1.5 shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied to Clipboard' : 'Copy Text'}
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Report
          </button>
        </div>
      </div>

      {/* Report Switcher */}
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setReportType('executive')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
            reportType === 'executive'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Executive Summary Report
        </button>
        <button
          onClick={() => setReportType('detailed')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
            reportType === 'detailed'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Detailed Content Architecture Audit
        </button>
      </div>

      {/* Report Document Canvas */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-md p-8 max-w-5xl mx-auto space-y-8 print:border-none print:shadow-none print:p-0">
        
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Site Content Architecture & Gap Audit
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">{project.name}</h1>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              Target: {project.targetDomain} &bull; Scope: {project.destinationOrTopic || 'Sitewide'} &bull; Date: {new Date(project.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-md">
              {project.mode}
            </span>
          </div>
        </div>

        {/* Executive Section */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            1. Strategic Synthesis & Findings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block">Existing Architecture:</strong>
              <p className="text-slate-700 leading-relaxed">{answer.whatSiteHas}</p>
            </div>
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
              <strong className="text-emerald-950 block">Target Site Strengths:</strong>
              <p className="text-emerald-900 leading-relaxed">{answer.whatCoversWell}</p>
            </div>
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1">
              <strong className="text-amber-950 block">Structural Cannibalization & Disconnections:</strong>
              <p className="text-amber-900 leading-relaxed">{answer.whatIsWeakOrDisconnected}</p>
            </div>
            <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200 space-y-1">
              <strong className="text-rose-950 block">Critical Missing Content Gaps:</strong>
              <p className="text-rose-900 leading-relaxed">{answer.whatIsMissing}</p>
            </div>
          </div>
        </div>

        {/* Immediate Roadmap Table */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <FileText className="w-4 h-4 text-teal-600" />
            2. High-Priority Strategic Roadmap
          </h2>

          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Action Type</th>
                <th className="py-2.5 px-3">Title & Target</th>
                <th className="py-2.5 px-3">Strategic Rationale</th>
                <th className="py-2.5 px-3 text-center">Priority</th>
                <th className="py-2.5 px-3 text-center">Effort</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {project.recommendations.slice(0, 6).map((rec) => (
                <tr key={rec.id}>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{rec.actionType}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-slate-900 block">{rec.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono truncate block">{rec.targetPageOrTopic}</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 text-[11px] leading-relaxed">{rec.strategicRationale}</td>
                  <td className="py-2.5 px-3 text-center font-bold text-rose-700">{rec.priority}</td>
                  <td className="py-2.5 px-3 text-center text-slate-500">{rec.effort}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disclaimer Footer in Report */}
        <div className="p-4 bg-slate-100 rounded-xl text-[11px] text-slate-600 leading-relaxed border border-slate-200">
          <strong>Methodology Note:</strong> This application analyses observable sitemap, page, content, and competitor evidence. Opportunities requiring additional query and user-intent evidence should be validated through Query Fan-out analysis.
        </div>

      </div>

    </div>
  );
};
