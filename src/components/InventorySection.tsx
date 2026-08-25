import React, { useState, useMemo } from 'react';
import { ProjectData, ContentInventoryItem, PageType, ContentRole, SearchIntent, RecommendedAction, HumanApprovalStatus } from '../types';
import {
  Table,
  Search,
  Filter,
  ArrowUpDown,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  ArrowDownToLine,
  SlidersHorizontal,
  FileSpreadsheet,
  Save,
  X
} from 'lucide-react';

interface InventorySectionProps {
  project: ProjectData;
  onUpdateItem: (updatedItem: ContentInventoryItem) => void;
}

export const InventorySection: React.FC<InventorySectionProps> = ({ project, onUpdateItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPageType, setFilterPageType] = useState<string>('all');
  const [filterContentRole, setFilterContentRole] = useState<string>('all');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterQuality, setFilterQuality] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof ContentInventoryItem>('internalLinkCount');
  const [sortAsc, setSortAsc] = useState(false);

  // Edit drawer state
  const [editingItem, setEditingItem] = useState<ContentInventoryItem | null>(null);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return project.inventory.filter((item) => {
      const matchesSearch =
        item.pageTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.primaryTopic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contentCluster.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterPageType === 'all' || item.pageType === filterPageType;
      const matchesRole = filterContentRole === 'all' || item.contentRole === filterContentRole;
      const matchesAction = filterAction === 'all' || item.recommendedAction === filterAction;
      const matchesQuality = filterQuality === 'all' || item.contentQualityStatus === filterQuality;

      return matchesSearch && matchesType && matchesRole && matchesAction && matchesQuality;
    }).sort((a, b) => {
      const valA = (a as any)[sortField];
      const valB = (b as any)[sortField];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA || '').localeCompare(String(valB || ''))
        : String(valB || '').localeCompare(String(valA || ''));
    });
  }, [project.inventory, searchTerm, filterPageType, filterContentRole, filterAction, filterQuality, sortField, sortAsc]);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      onUpdateItem(editingItem);
      setEditingItem(null);
    }
  };

  const exportInventoryCSV = () => {
    const headers = [
      'URL', 'Page Title', 'H1', 'Page Type', 'Content Role', 'Primary Topic',
      'Search Intent', 'Journey Stage', 'Content Cluster', 'Word Count',
      'Internal Links', 'Inbound Links', 'Quality Status', 'Recommended Action',
      'Confidence %', 'Human Review Status', 'Notes'
    ];
    const rows = filteredItems.map(item => [
      `"${item.url}"`,
      `"${item.pageTitle.replace(/"/g, '""')}"`,
      `"${item.h1.replace(/"/g, '""')}"`,
      `"${item.pageType}"`,
      `"${item.contentRole}"`,
      `"${item.primaryTopic}"`,
      `"${item.searchIntent}"`,
      `"${item.journeyStage}"`,
      `"${item.contentCluster}"`,
      item.wordCount,
      item.internalLinkCount,
      item.inboundLinksCount,
      `"${item.contentQualityStatus}"`,
      `"${item.recommendedAction}"`,
      item.confidence,
      `"${item.humanReviewStatus}"`,
      `"${(item.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${project.targetDomain}-content-inventory.csv`);
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
            <Table className="w-5 h-5 text-teal-600" />
            3. Content Inventory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Normalized catalogue of evaluated pages with taxonomy classifications, search intent, internal links, and human review controls
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportInventoryCSV}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition flex items-center gap-1.5 shadow-xs"
          >
            <ArrowDownToLine className="w-3.5 h-3.5" />
            Export Inventory CSV
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          
          {/* Search Box */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, URL, topic, or cluster..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-hidden text-slate-900"
            />
          </div>

          {/* Page Type Filter */}
          <div>
            <select
              value={filterPageType}
              onChange={(e) => setFilterPageType(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 font-medium"
            >
              <option value="all">All Page Types</option>
              <option value="City page">City page</option>
              <option value="Tour category page">Tour category page</option>
              <option value="Blog article">Blog article</option>
              <option value="Itinerary">Itinerary</option>
              <option value="Food guide">Food guide</option>
              <option value="Seasonal guide">Seasonal guide</option>
              <option value="Guide profile">Guide profile</option>
            </select>
          </div>

          {/* Content Role Filter */}
          <div>
            <select
              value={filterContentRole}
              onChange={(e) => setFilterContentRole(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 font-medium"
            >
              <option value="all">All Content Roles</option>
              <option value="Commercial">Commercial</option>
              <option value="Informational">Informational</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Operational">Operational</option>
            </select>
          </div>

          {/* Recommended Action Filter */}
          <div>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 font-medium"
            >
              <option value="all">All Recommended Actions</option>
              <option value="Keep">Keep</option>
              <option value="Keep and update">Keep and update</option>
              <option value="Expand existing page">Expand existing page</option>
              <option value="Add local expertise">Add local expertise</option>
              <option value="Improve internal links">Improve internal links</option>
              <option value="Redirect">Redirect (301)</option>
            </select>
          </div>

        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Showing <strong className="text-slate-900">{filteredItems.length}</strong> of {project.inventory.length} URLs</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> High Quality</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Needs Local Voice / Update</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Outdated / Duplicate</span>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Page Title & URL</th>
                <th className="py-3 px-3">Page Type</th>
                <th className="py-3 px-3">Role & Intent</th>
                <th className="py-3 px-3">Content Cluster</th>
                <th className="py-3 px-3 text-center">Words</th>
                <th className="py-3 px-3 text-center">In / Out Links</th>
                <th className="py-3 px-3">Quality Status</th>
                <th className="py-3 px-3">Recommended Action</th>
                <th className="py-3 px-3 text-center">Human Review</th>
                <th className="py-3 px-4 text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 max-w-md">
                    <span className="font-bold text-slate-900 block truncate" title={item.pageTitle}>
                      {item.pageTitle}
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-teal-700 hover:text-teal-900 font-mono truncate block hover:underline"
                    >
                      {item.url.replace(/^https?:\/\/[^/]+/, '')}
                    </a>
                    {item.h1 && (
                      <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                        H1: {item.h1}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-medium text-[11px] whitespace-nowrap">
                      {item.pageType}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <div className="space-y-0.5">
                      <span className={`px-1.5 py-0.2 rounded-sm text-[10px] font-bold block w-max ${
                        item.contentRole === 'Commercial' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.contentRole}
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate max-w-[120px]">
                        {item.searchIntent}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span className="font-medium text-slate-700 block truncate max-w-[140px]" title={item.contentCluster}>
                      {item.contentCluster}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center font-mono text-slate-600">
                    {item.wordCount.toLocaleString()}
                  </td>

                  <td className="py-3 px-3 text-center font-mono">
                    <span className="text-emerald-700 font-bold">{item.inboundLinksCount}</span>
                    <span className="text-slate-400 mx-1">/</span>
                    <span className="text-blue-700">{item.outboundLinksCount}</span>
                  </td>

                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      item.contentQualityStatus === 'High Quality'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.contentQualityStatus === 'Outdated'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.contentQualityStatus}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 font-semibold text-[10px] block truncate max-w-[130px]" title={item.recommendedAction}>
                      {item.recommendedAction}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      item.humanReviewStatus === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.humanReviewStatus === 'Modified'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.humanReviewStatus}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setEditingItem({ ...item })}
                      className="p-1 text-slate-400 hover:text-slate-900 rounded-md hover:bg-slate-100 transition"
                      title="Edit classifications and review notes"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Item Drawer / Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm font-bold text-white">Edit Inventory Page Classifications</h3>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Page Title</label>
                <input
                  type="text"
                  value={editingItem.pageTitle}
                  onChange={(e) => setEditingItem({ ...editingItem, pageTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Page Type</label>
                  <input
                    type="text"
                    value={editingItem.pageType}
                    onChange={(e) => setEditingItem({ ...editingItem, pageType: e.target.value as PageType })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Content Role</label>
                  <select
                    value={editingItem.contentRole}
                    onChange={(e) => setEditingItem({ ...editingItem, contentRole: e.target.value as ContentRole })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Informational">Informational</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Operational">Operational</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Search Intent</label>
                  <select
                    value={editingItem.searchIntent}
                    onChange={(e) => setEditingItem({ ...editingItem, searchIntent: e.target.value as SearchIntent })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  >
                    <option value="Informational">Informational</option>
                    <option value="Commercial Investigation">Commercial Investigation</option>
                    <option value="Transactional">Transactional</option>
                    <option value="Navigational">Navigational</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Recommended Action</label>
                  <input
                    type="text"
                    value={editingItem.recommendedAction}
                    onChange={(e) => setEditingItem({ ...editingItem, recommendedAction: e.target.value as RecommendedAction })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Human Review Status</label>
                  <select
                    value={editingItem.humanReviewStatus}
                    onChange={(e) => setEditingItem({ ...editingItem, humanReviewStatus: e.target.value as HumanApprovalStatus })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white font-medium"
                  >
                    <option value="Pending Review">Pending Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Modified">Modified</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Confidence Score (%)</label>
                  <input
                    type="number"
                    value={editingItem.confidence}
                    onChange={(e) => setEditingItem({ ...editingItem, confidence: parseInt(e.target.value) || 90 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Human Review Notes & Instructions</label>
                <textarea
                  rows={3}
                  value={editingItem.notes || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  placeholder="Add specific editorial or link building instructions..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-slate-950 font-bold bg-teal-400 hover:bg-teal-300 rounded-lg flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  Save Classification Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
