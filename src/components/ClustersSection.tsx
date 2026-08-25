import React, { useState } from 'react';
import { ProjectData, ContentCluster } from '../types';
import {
  FolderTree,
  ExternalLink,
  Link2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layers,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

interface ClustersSectionProps {
  project: ProjectData;
}

export const ClustersSection: React.FC<ClustersSectionProps> = ({ project }) => {
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);

  const clusters = project.clusters;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-teal-600" />
            6. Content Clusters & Topic Architecture
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Synthesis of topic clusters, designated hub pillars, supporting informational nodes, and link completeness
          </p>
        </div>
      </div>

      {/* Cluster Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clusters.map((cluster) => (
          <div
            key={cluster.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 hover:border-teal-400 transition"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600">
                  Cluster &bull; {cluster.destination}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{cluster.name}</h3>
              </div>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                cluster.coverageStrength === 'Strong'
                  ? 'bg-emerald-100 text-emerald-800'
                  : cluster.coverageStrength === 'Moderate'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {cluster.coverageStrength} Coverage
              </span>
            </div>

            {/* Primary User Need */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-700 block mb-0.5">Primary Searcher Intent & Need:</span>
              <p className="text-slate-600 leading-relaxed">{cluster.primaryUserNeed}</p>
            </div>

            {/* Hub Pillar Page */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 block mb-1">Designated Hub Page</span>
              {cluster.hubPageUrl ? (
                <div className="flex items-center gap-2 p-2.5 bg-teal-50/60 border border-teal-200 rounded-lg text-xs">
                  <Link2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <div className="truncate">
                    <span className="font-bold text-slate-900 block truncate">{cluster.hubPageTitle || 'Hub Page'}</span>
                    <a
                      href={cluster.hubPageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-teal-700 hover:underline font-mono truncate block"
                    >
                      {cluster.hubPageUrl}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Missing Hub Pillar (Recommendation: Create Dedicated Pillar Hub)
                </div>
              )}
            </div>

            {/* Completeness Meter & Counts */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Internal Link Completeness</span>
                <span className="text-teal-700">{cluster.internalLinkCompleteness}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                <div
                  className={`h-2 rounded-full ${
                    cluster.internalLinkCompleteness > 60
                      ? 'bg-emerald-500'
                      : cluster.internalLinkCompleteness > 40
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${cluster.internalLinkCompleteness}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
                <span>Commercial Pages: {cluster.commercialPageUrls.length}</span>
                <span>Informational Articles: {cluster.informationalPageUrls.length}</span>
              </div>
            </div>

            {/* Entities */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 block mb-1">Associated Core Entities</span>
              <div className="flex flex-wrap gap-1.5">
                {cluster.relevantEntities.map((ent, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-medium">
                    {ent}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing or Overlapping Components */}
            {cluster.missingComponents.length > 0 && (
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-2.5 text-xs text-rose-900 space-y-1">
                <span className="font-bold flex items-center gap-1 text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Missing Cluster Sub-Topics:
                </span>
                <ul className="list-disc list-inside text-[11px] space-y-0.5">
                  {cluster.missingComponents.map((comp, i) => (
                    <li key={i}>{comp}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Architecture */}
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-600">
              <strong className="text-slate-900">Recommended Architecture:</strong> {cluster.recommendedArchitecture}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
