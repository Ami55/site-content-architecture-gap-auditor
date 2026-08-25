import React, { useState } from 'react';
import { ProjectData } from '../types';
import {
  BookmarkCheck,
  FolderTree,
  Plus,
  Play,
  RotateCcw,
  Trash2,
  ArrowDownToLine,
  Upload,
  ExternalLink,
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface SavedProjectsSectionProps {
  currentProjectId: string;
  savedProjects: ProjectData[];
  onSelectProject: (projectId: string) => void;
  onCreateNew: () => void;
  onDeleteProject: (projectId: string) => void;
  onImportProject: (imported: ProjectData) => void;
}

export const SavedProjectsSection: React.FC<SavedProjectsSectionProps> = ({
  currentProjectId,
  savedProjects,
  onSelectProject,
  onCreateNew,
  onDeleteProject,
  onImportProject,
}) => {
  const [importError, setImportError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (parsed.id && parsed.targetDomain && parsed.inventory) {
          onImportProject(parsed);
          setImportError(null);
        } else {
          setImportError('Invalid ProjectData JSON structure.');
        }
      } catch (err) {
        setImportError('Failed to parse project JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-teal-600" />
            14. Saved Projects & Audit History
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Switch between saved destination audits, sitewide projects, and import/export master project states
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <button className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition flex items-center gap-1.5 shadow-xs">
              <Upload className="w-3.5 h-3.5" />
              Import Project JSON
            </button>
          </div>

          <button
            onClick={onCreateNew}
            className="px-3 py-1.5 text-xs font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            New Audit
          </button>
        </div>
      </div>

      {importError && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-medium">
          {importError}
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedProjects.map((proj) => {
          const isCurrent = proj.id === currentProjectId;
          return (
            <div
              key={proj.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between space-y-4 transition ${
                isCurrent
                  ? 'border-teal-500 ring-2 ring-teal-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    proj.isDemo ? 'bg-amber-100 text-amber-900' : 'bg-teal-100 text-teal-900'
                  }`}>
                    {proj.isDemo ? 'Demo Project' : 'Live Audit'}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(proj.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{proj.name}</h3>
                <p className="text-xs text-slate-500 font-mono">{proj.targetDomain}</p>
                <p className="text-xs text-slate-600 line-clamp-2">
                  Scope: <strong className="text-slate-800">{proj.destinationOrTopic || 'All Content'}</strong> &bull; {proj.businessObjective}
                </p>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">URLs</span>
                  <strong className="text-slate-900 font-bold">{proj.inventory.length}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Clusters</span>
                  <strong className="text-slate-900 font-bold">{proj.clusters.length}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Gaps</span>
                  <strong className="text-rose-600 font-bold">{proj.gaps.length}</strong>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-1">
                {isCurrent ? (
                  <span className="text-xs font-bold text-teal-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Active Audit
                  </span>
                ) : (
                  <button
                    onClick={() => onSelectProject(proj.id)}
                    className="px-3 py-1.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                  >
                    Open Project
                  </button>
                )}

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(proj, null, 2));
                      const a = document.createElement('a');
                      a.setAttribute("href", dataStr);
                      a.setAttribute("download", `${proj.targetDomain}-${proj.id}.json`);
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition"
                    title="Export project file"
                  >
                    <ArrowDownToLine className="w-4 h-4" />
                  </button>

                  {!proj.isDemo && (
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${proj.name}"?`)) {
                          onDeleteProject(proj.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-slate-100 transition"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
