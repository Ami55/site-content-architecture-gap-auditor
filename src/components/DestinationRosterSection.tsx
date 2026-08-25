import React, { useState } from 'react';
import { ProjectData, DestinationRosterItem } from '../types';
import {
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  HelpCircle,
  ArrowDownToLine,
  Filter
} from 'lucide-react';

interface DestinationRosterSectionProps {
  project: ProjectData;
}

export const DestinationRosterSection: React.FC<DestinationRosterSectionProps> = ({ project }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const roster = project.destinationRoster;

  const filteredRoster = roster.filter((item) => {
    const matchesCategory = filterCategory === 'all' || item.categoryType.includes(filterCategory);
    const matchesStatus = filterStatus === 'all' || item.coverageStatus === filterStatus;
    return matchesCategory && matchesStatus;
  });

  const exportRosterCSV = () => {
    const headers = [
      'Category Type', 'Content Type', 'Relevance', 'Coverage Status',
      'Existing URLs', 'Content Quality', 'Competitor Presence',
      'Recommended Action', 'Priority', 'Needs QFO Validation', 'Evidence'
    ];
    const rows = filteredRoster.map(r => [
      `"${r.categoryType}"`,
      `"${r.contentType}"`,
      `"${r.relevance}"`,
      `"${r.coverageStatus}"`,
      `"${r.existingUrls.join('; ')}"`,
      `"${r.contentQuality}"`,
      `"${r.competitorPresence.replace(/"/g, '""')}"`,
      `"${r.recommendedAction}"`,
      `"${r.priority}"`,
      r.needsQueryFanoutValidation ? 'Yes' : 'No',
      `"${r.evidence.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${project.targetDomain}-destination-roster.csv`);
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
            <MapPin className="w-5 h-5 text-teal-600" />
            5. Destination Content Roster
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Systematic benchmark of expected core destination topics across Commercial & Transactional vs Informational & Editorial tracks
          </p>
        </div>

        <button
          onClick={exportRosterCSV}
          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition flex items-center gap-1.5 shadow-xs"
        >
          <ArrowDownToLine className="w-3.5 h-3.5" />
          Export Roster CSV
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">Track Filter</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 font-medium"
            >
              <option value="all">All Tracks (Commercial & Editorial)</option>
              <option value="Commercial">Commercial & Transactional</option>
              <option value="Informational">Informational & Editorial</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">Coverage Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 font-medium"
            >
              <option value="all">All Coverage States</option>
              <option value="Strong coverage">Strong coverage</option>
              <option value="Covered">Covered</option>
              <option value="Partially covered">Partially covered</option>
              <option value="Missing">Missing</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Showing <strong className="text-slate-900">{filteredRoster.length}</strong> of {roster.length} roster requirements
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Track & Content Type</th>
                <th className="py-3 px-3">Relevance</th>
                <th className="py-3 px-3">Coverage Status</th>
                <th className="py-3 px-3">Target Site URL(s)</th>
                <th className="py-3 px-3">Competitor Presence</th>
                <th className="py-3 px-3">Recommended Action</th>
                <th className="py-3 px-3 text-center">Priority</th>
                <th className="py-3 px-4">Evidence Label</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredRoster.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4">
                    <span className={`px-1.5 py-0.2 rounded-xs text-[10px] font-bold block w-max mb-1 ${
                      item.categoryType.includes('Commercial') ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.categoryType}
                    </span>
                    <span className="font-bold text-slate-900 block text-xs">{item.contentType}</span>
                  </td>

                  <td className="py-3 px-3">
                    <span className={`font-semibold ${
                      item.relevance === 'Essential' ? 'text-rose-700' : item.relevance === 'Recommended' ? 'text-teal-700' : 'text-slate-500'
                    }`}>
                      {item.relevance}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      item.coverageStatus === 'Strong coverage'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.coverageStatus === 'Covered'
                        ? 'bg-teal-100 text-teal-800'
                        : item.coverageStatus === 'Partially covered'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {item.coverageStatus}
                    </span>
                  </td>

                  <td className="py-3 px-3 max-w-xs">
                    {item.existingUrls.length > 0 ? (
                      <div className="space-y-1">
                        {item.existingUrls.map((u, i) => (
                          <a
                            key={i}
                            href={u}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-teal-700 hover:text-teal-900 font-mono truncate block hover:underline"
                          >
                            {u.replace(/^https?:\/\/[^/]+/, '')}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">None (Missing URL)</span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-[11px] text-slate-600 max-w-xs">
                    {item.competitorPresence}
                  </td>

                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 font-semibold text-[10px] block w-max">
                      {item.recommendedAction}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      item.priority === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : item.priority === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.priority}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold block w-max ${
                        item.needsQueryFanoutValidation
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {item.evidenceLabel}
                      </span>
                      <p className="text-[10px] text-slate-500 leading-tight max-w-xs">
                        {item.evidence}
                      </p>
                    </div>
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
