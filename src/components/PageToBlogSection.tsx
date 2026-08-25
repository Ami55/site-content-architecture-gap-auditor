import React from 'react';
import { ProjectData, PageToBlogRelationship } from '../types';
import {
  Link2,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Sparkles,
  ArrowDownToLine
} from 'lucide-react';

interface PageToBlogSectionProps {
  project: ProjectData;
  onApproveRelationship?: (id: string) => void;
}

export const PageToBlogSection: React.FC<PageToBlogSectionProps> = ({ project, onApproveRelationship }) => {
  const relationships = project.pageToBlogRelationships;

  const exportMapCSV = () => {
    const headers = [
      'Source Page Title', 'Source URL', 'Source Page Type',
      'Target Page Title', 'Target URL', 'Target Page Type',
      'Relationship Type', 'Existing Link Status', 'Suggested Direction',
      'Contextual Placement', 'Suggested Anchor Concept', 'Relevance', 'Confidence %'
    ];
    const rows = relationships.map(r => [
      `"${r.sourceTitle.replace(/"/g, '""')}"`,
      `"${r.sourceUrl}"`,
      `"${r.sourcePageType}"`,
      `"${r.targetTitle.replace(/"/g, '""')}"`,
      `"${r.targetUrl}"`,
      `"${r.targetPageType}"`,
      `"${r.relationshipType}"`,
      `"${r.existingLinkStatus}"`,
      `"${r.suggestedLinkDirection}"`,
      `"${r.suggestedContextualPlacement.replace(/"/g, '""')}"`,
      `"${r.suggestedAnchorConcept.replace(/"/g, '""')}"`,
      `"${r.relevance}"`,
      r.confidence
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${project.targetDomain}-page-to-blog-map.csv`);
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
            <Link2 className="w-5 h-5 text-teal-600" />
            7. Page-to-Blog Relationship Map
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Conversion bridges linking informational editorial articles to commercial tour hubs with contextual placement instructions
          </p>
        </div>

        <button
          onClick={exportMapCSV}
          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition flex items-center gap-1.5 shadow-xs"
        >
          <ArrowDownToLine className="w-3.5 h-3.5" />
          Export Relationship Map CSV
        </button>
      </div>

      {/* Relationship Cards / Table */}
      <div className="space-y-4">
        {relationships.map((rel) => (
          <div
            key={rel.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 hover:border-teal-400 transition"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-bold">
                  {rel.relationshipType}
                </span>
                <span className="text-xs text-slate-400">&bull;</span>
                <span className="text-xs font-semibold text-slate-700">Direction: {rel.suggestedLinkDirection}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  rel.existingLinkStatus === 'Direct Link Present'
                    ? 'bg-emerald-100 text-emerald-800'
                    : rel.existingLinkStatus === 'Missing Outbound'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {rel.existingLinkStatus}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  Confidence: {rel.confidence}%
                </span>
              </div>
            </div>

            {/* Source and Target Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              
              {/* Source Node */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Source ({rel.sourcePageType})
                </span>
                <span className="font-bold text-slate-900 text-xs block">{rel.sourceTitle}</span>
                <a
                  href={rel.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-teal-700 hover:underline font-mono truncate block"
                >
                  {rel.sourceUrl}
                </a>
              </div>

              {/* Target Node */}
              <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-200 space-y-1">
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">
                  Target ({rel.targetPageType})
                </span>
                <span className="font-bold text-slate-900 text-xs block">{rel.targetTitle}</span>
                <a
                  href={rel.targetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-teal-800 hover:underline font-mono truncate block"
                >
                  {rel.targetUrl}
                </a>
              </div>

            </div>

            {/* Placement and Anchor Recommendation */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-700 block mb-0.5">Suggested Contextual Placement:</span>
                <p className="text-slate-600 leading-relaxed">{rel.suggestedContextualPlacement}</p>
              </div>
              <div>
                <span className="font-bold text-slate-700 block mb-0.5">Recommended Anchor Concept:</span>
                <p className="text-teal-800 font-medium bg-teal-100/60 px-2 py-1 rounded-md border border-teal-200 font-mono text-[11px]">
                  "{rel.suggestedAnchorConcept}"
                </p>
              </div>
            </div>

            {rel.notes && (
              <p className="text-xs text-slate-500 italic">
                <strong>Editorial Note:</strong> {rel.notes}
              </p>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};
