import React, { useState } from 'react';
import { ProjectData } from '../types';
import {
  Network,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  FileCode,
  Calendar,
  Layers,
  ArrowDownToLine
} from 'lucide-react';

interface SitemapSectionProps {
  project: ProjectData;
  onRefreshSitemaps?: () => void;
}

export const SitemapSection: React.FC<SitemapSectionProps> = ({ project, onRefreshSitemaps }) => {
  const [selectedSitemap, setSelectedSitemap] = useState<string | null>(null);

  const totalDiscovered = project.sitemaps.reduce((acc, s) => acc + s.urlsDiscovered, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Network className="w-5 h-5 text-teal-600" />
            2. Sitemap & Crawl Status
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Overview of discovered XML sitemaps, child index families, status codes, and crawl accessibility
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(project.sitemaps, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", `${project.targetDomain}-sitemaps.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition flex items-center gap-1.5 shadow-xs"
          >
            <ArrowDownToLine className="w-3.5 h-3.5" />
            Export Sitemap Structure
          </button>
        </div>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Sitemaps Inspected</span>
          <span className="text-2xl font-black text-slate-900 block mt-1">{project.sitemaps.length}</span>
          <span className="text-[11px] text-teal-600 font-medium">1 Index + 4 Child sets</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Discovered URLs in Sitemaps</span>
          <span className="text-2xl font-black text-slate-900 block mt-1">{totalDiscovered.toLocaleString()}</span>
          <span className="text-[11px] text-slate-500">Across entire target domain</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Target Scope Evaluated</span>
          <span className="text-2xl font-black text-emerald-600 block mt-1">{project.inventory.length}</span>
          <span className="text-[11px] text-emerald-700 font-medium">Filtered for {project.destinationOrTopic || 'topic'}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Sitemap Warnings / Errors</span>
          <span className="text-2xl font-black text-amber-600 block mt-1">1</span>
          <span className="text-[11px] text-amber-700 font-medium">1 Legacy 301 URL in Blog</span>
        </div>
      </div>

      {/* Sitemaps Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Discovered Sitemap Index & Child Sets</h3>
          <span className="text-xs text-slate-500 font-medium">Root: {project.mainSitemapUrl}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Sitemap URL & Family</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3 text-right">Discovered URLs</th>
                <th className="py-3 px-3">Last Modified</th>
                <th className="py-3 px-3">Status Code</th>
                <th className="py-3 px-4">Audit Observations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {project.sitemaps.map((sm, index) => (
                <tr key={index} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 block">{sm.family || 'Sitemap XML'}</span>
                        <a
                          href={sm.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-teal-700 hover:text-teal-900 font-mono truncate block max-w-md hover:underline"
                        >
                          {sm.url}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      sm.type === 'index' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {sm.type === 'index' ? 'Sitemap Index' : 'URL Set'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {sm.urlsDiscovered.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-medium">
                    {sm.lastModified || 'N/A'}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1 w-max">
                      <CheckCircle2 className="w-3 h-3" /> {sm.statusCode} OK
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <p className="text-[11px]">{sm.statusMessage}</p>
                    {sm.errorsDetected && sm.errorsDetected.length > 0 && (
                      <div className="mt-1 flex items-start gap-1 text-[10px] text-amber-800 bg-amber-50 border border-amber-200 p-1.5 rounded-md">
                        <AlertCircle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                        <span>{sm.errorsDetected.join(', ')}</span>
                      </div>
                    )}
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
