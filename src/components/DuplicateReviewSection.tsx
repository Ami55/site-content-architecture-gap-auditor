import React from 'react';
import { ProjectData, DuplicateGroup } from '../types';
import {
  CopyX,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  GitMerge,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface DuplicateReviewSectionProps {
  project: ProjectData;
  onApproveDecision?: (groupId: string) => void;
}

export const DuplicateReviewSection: React.FC<DuplicateReviewSectionProps> = ({ project, onApproveDecision }) => {
  const groups = project.duplicateGroups;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CopyX className="w-5 h-5 text-amber-600" />
            8. Duplicate & Overlap Review
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify keyword cannibalization and conflicting pages to consolidate link equity into single canonical destinations
          </p>
        </div>
      </div>

      {/* Duplicate Groups List */}
      {groups.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900">No Serious Cannibalization Detected</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            All crawled destination URLs maintain distinct primary search intents and topical boundaries.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map((grp) => (
            <div
              key={grp.id}
              className="bg-white rounded-2xl border border-amber-200 shadow-sm p-6 space-y-5"
            >
              {/* Group Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                    Cannibalization Group
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{grp.groupName}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Confidence: {grp.confidence}%</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {grp.humanApproval}
                  </span>
                </div>
              </div>

              {/* Competing URLs Grid */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Competing URLs in Cluster:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {grp.urls.map((u, i) => {
                    const isPreferred = u.url === grp.preferredCanonicalUrl;
                    return (
                      <div
                        key={i}
                        className={`p-4 rounded-xl border space-y-2 ${
                          isPreferred
                            ? 'bg-emerald-50/60 border-emerald-300 ring-2 ring-emerald-500/20'
                            : 'bg-rose-50/50 border-rose-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            isPreferred ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                          }`}>
                            {isPreferred ? 'Preferred Canonical Page' : 'Merge Source (Legacy)'}
                          </span>
                          <span className="text-xs font-mono text-slate-500">{u.wordCount} words</span>
                        </div>

                        <h4 className="font-bold text-slate-900 text-xs">{u.title}</h4>
                        <a
                          href={u.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-teal-700 font-mono truncate block hover:underline"
                        >
                          {u.url}
                        </a>

                        {(u.gscClicks !== undefined || u.gscImpressions !== undefined) && (
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                            <span>Clicks: <strong className="text-slate-900">{u.gscClicks || 0}</strong></span>
                            <span>Impressions: <strong className="text-slate-900">{(u.gscImpressions || 0).toLocaleString()}</strong></span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Conflict Analysis Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="font-bold text-slate-800 block mb-1">Primary Search Intent:</span>
                  <p className="text-slate-600 leading-relaxed">{grp.primaryIntent}</p>
                  
                  <span className="font-bold text-slate-800 block mt-2 mb-1">Shared Topics:</span>
                  <div className="flex flex-wrap gap-1">
                    {grp.sharedTopics.map((top, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded-md text-[10px]">
                        {top}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-slate-800 block mb-1">Unique Value to Preserve:</span>
                  <p className="text-slate-600 leading-relaxed">{grp.uniqueInformation}</p>

                  <span className="font-bold text-slate-800 block mt-2 mb-1">Update Opportunity:</span>
                  <p className="text-slate-600 leading-relaxed">{grp.updateOpportunity}</p>
                </div>
              </div>

              {/* Action Box */}
              <div className="bg-amber-50 border border-amber-300 p-3.5 rounded-xl flex items-start gap-3 text-xs text-amber-950">
                <GitMerge className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Recommended Engineering & Redirect Action:</span>
                  <p className="leading-relaxed mt-0.5 font-mono text-[11px] text-amber-900">
                    {grp.redirectRecommendation}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
