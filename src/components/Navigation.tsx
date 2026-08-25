import React from 'react';
import { ProjectData } from '../types';
import {
  LayoutDashboard,
  Network,
  Table,
  Layers,
  MapPin,
  FolderTree,
  Link2,
  CopyX,
  ShieldCheck,
  SplitSquareVertical,
  ListTodo,
  Share2,
  FileSpreadsheet,
  BookmarkCheck
} from 'lucide-react';

export type NavSection =
  | 'overview'
  | 'sitemap'
  | 'inventory'
  | 'pagetypes'
  | 'roster'
  | 'clusters'
  | 'pagetoblog'
  | 'duplicates'
  | 'competitors'
  | 'gaps'
  | 'recommendations'
  | 'queryfanout'
  | 'reports'
  | 'savedprojects';

interface NavigationProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  project: ProjectData;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSelectSection,
  project,
}) => {
  const navItems: {
    id: NavSection;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: number | string;
    badgeColor?: string;
  }[] = [
    { id: 'overview', label: '1. Overview', icon: LayoutDashboard },
    { id: 'sitemap', label: '2. Sitemap & Crawl Status', icon: Network, count: project.sitemaps.length },
    { id: 'inventory', label: '3. Content Inventory', icon: Table, count: project.inventory.length },
    { id: 'pagetypes', label: '4. Page Type Architecture', icon: Layers, count: project.pageTypeSummaries.length },
    { id: 'roster', label: '5. Destination Content Roster', icon: MapPin, count: project.destinationRoster.length },
    { id: 'clusters', label: '6. Content Clusters', icon: FolderTree, count: project.clusters.length },
    { id: 'pagetoblog', label: '7. Page-to-Blog Map', icon: Link2, count: project.pageToBlogRelationships.length },
    { id: 'duplicates', label: '8. Duplicate & Overlap Review', icon: CopyX, count: project.duplicateGroups.length, badgeColor: project.duplicateGroups.length > 0 ? 'bg-amber-100 text-amber-800' : undefined },
    { id: 'competitors', label: '9. Competitor Coverage', icon: ShieldCheck, count: project.competitorComparisons.length },
    { id: 'gaps', label: '10. Content Gaps', icon: SplitSquareVertical, count: project.gaps.length, badgeColor: 'bg-rose-100 text-rose-800' },
    { id: 'recommendations', label: '11. Recommendations', icon: ListTodo, count: project.recommendations.length, badgeColor: 'bg-teal-100 text-teal-800' },
    { id: 'queryfanout', label: '12. Query Fan-out Enrichment', icon: Share2, count: project.queryFanoutRecords.length },
    { id: 'reports', label: '13. Reports & Exports', icon: FileSpreadsheet },
    { id: 'savedprojects', label: '14. Saved Projects', icon: BookmarkCheck },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-[57px] z-30 shadow-xs overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 py-1.5 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => onSelectSection(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-slate-800 text-teal-300'
                        : item.badgeColor || 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
