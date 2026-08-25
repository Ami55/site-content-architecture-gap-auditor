import React, { useState, useEffect } from 'react';
import { ProjectData, ContentInventoryItem, QueryFanoutRecord, RecommendationItem } from './types';
import { demoMontrealProject } from './data/demoMontreal';
import { Header } from './components/Header';
import { Navigation, NavSection } from './components/Navigation';
import { OverviewSection } from './components/OverviewSection';
import { SitemapSection } from './components/SitemapSection';
import { InventorySection } from './components/InventorySection';
import { PageTypeSection } from './components/PageTypeSection';
import { DestinationRosterSection } from './components/DestinationRosterSection';
import { ClustersSection } from './components/ClustersSection';
import { PageToBlogSection } from './components/PageToBlogSection';
import { DuplicateReviewSection } from './components/DuplicateReviewSection';
import { CompetitorSection } from './components/CompetitorSection';
import { ContentGapsSection } from './components/ContentGapsSection';
import { RecommendationsSection } from './components/RecommendationsSection';
import { QueryFanoutSection } from './components/QueryFanoutSection';
import { ReportsSection } from './components/ReportsSection';
import { SavedProjectsSection } from './components/SavedProjectsSection';
import { ProjectSetupModal } from './components/ProjectSetupModal';
import { LiveAuditRunner } from './components/LiveAuditRunner';
import { Footer } from './components/Footer';
import { HowItWorksModal } from './components/HowItWorksModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('overview');
  const [currentProject, setCurrentProject] = useState<ProjectData>(() => {
    const saved = localStorage.getItem('site_auditor_current_project');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return demoMontrealProject;
  });

  const [savedProjects, setSavedProjects] = useState<ProjectData[]>(() => {
    const saved = localStorage.getItem('site_auditor_all_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return [demoMontrealProject];
  });

  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('site_auditor_current_project', JSON.stringify(currentProject));
  }, [currentProject]);

  useEffect(() => {
    localStorage.setItem('site_auditor_all_projects', JSON.stringify(savedProjects));
  }, [savedProjects]);

  const handleLoadDemo = () => {
    setCurrentProject(demoMontrealProject);
    setActiveSection('overview');
  };

  const handleOpenSetup = () => {
    setIsSetupOpen(true);
  };

  const handleSaveAndRunProject = (newProjectConfig: Partial<ProjectData>, autoRun: boolean) => {
    const newProject: ProjectData = {
      ...demoMontrealProject,
      ...newProjectConfig,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDemo: false,
    };

    setCurrentProject(newProject);
    setSavedProjects((prev) => [newProject, ...prev.filter(p => p.id !== newProject.id)]);

    if (autoRun) {
      setIsAuditing(true);
    }
  };

  const handleAuditComplete = (updatedProject: ProjectData) => {
    setCurrentProject(updatedProject);
    setSavedProjects((prev) => [updatedProject, ...prev.filter(p => p.id !== updatedProject.id)]);
    setIsAuditing(false);
    setActiveSection('overview');
  };

  const handleUpdateInventoryItem = (updatedItem: ContentInventoryItem) => {
    const updatedInventory = currentProject.inventory.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    const updatedProject = {
      ...currentProject,
      inventory: updatedInventory,
      updatedAt: new Date().toISOString(),
    };
    setCurrentProject(updatedProject);
    setSavedProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const handleImportFanout = (records: QueryFanoutRecord[]) => {
    const updatedProject = {
      ...currentProject,
      queryFanoutRecords: records,
      mode: 'Enriched with Query Fan-out',
      updatedAt: new Date().toISOString(),
    };
    setCurrentProject(updatedProject);
    setSavedProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const handleUpdateRecommendation = (updatedRec: RecommendationItem) => {
    const updatedRecs = currentProject.recommendations.map((r) =>
      r.id === updatedRec.id ? updatedRec : r
    );
    const updatedProject = {
      ...currentProject,
      recommendations: updatedRecs,
      updatedAt: new Date().toISOString(),
    };
    setCurrentProject(updatedProject);
    setSavedProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const handleSelectProject = (projectId: string) => {
    const target = savedProjects.find((p) => p.id === projectId);
    if (target) {
      setCurrentProject(target);
      setActiveSection('overview');
    }
  };

  const handleDeleteProject = (projectId: string) => {
    const remaining = savedProjects.filter((p) => p.id !== projectId);
    setSavedProjects(remaining);
    if (currentProject.id === projectId) {
      setCurrentProject(remaining[0] || demoMontrealProject);
    }
  };

  const handleImportProject = (imported: ProjectData) => {
    setCurrentProject(imported);
    setSavedProjects((prev) => [imported, ...prev.filter((p) => p.id !== imported.id)]);
    setActiveSection('overview');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      
      {/* Header */}
      <Header
        currentProject={currentProject}
        onOpenSetup={handleOpenSetup}
        onLoadDemo={handleLoadDemo}
        onRunAudit={() => setIsAuditing(true)}
        isAuditing={isAuditing}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
      />

      {/* 14-Tab Navigation */}
      <Navigation
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        project={currentProject}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'overview' && (
          <OverviewSection project={currentProject} onNavigate={setActiveSection} />
        )}

        {activeSection === 'sitemap' && (
          <SitemapSection project={currentProject} />
        )}

        {activeSection === 'inventory' && (
          <InventorySection
            project={currentProject}
            onUpdateItem={handleUpdateInventoryItem}
          />
        )}

        {activeSection === 'pagetypes' && (
          <PageTypeSection project={currentProject} />
        )}

        {activeSection === 'roster' && (
          <DestinationRosterSection project={currentProject} />
        )}

        {activeSection === 'clusters' && (
          <ClustersSection project={currentProject} />
        )}

        {activeSection === 'pagetoblog' && (
          <PageToBlogSection project={currentProject} />
        )}

        {activeSection === 'duplicates' && (
          <DuplicateReviewSection project={currentProject} />
        )}

        {activeSection === 'competitors' && (
          <CompetitorSection project={currentProject} />
        )}

        {activeSection === 'gaps' && (
          <ContentGapsSection project={currentProject} />
        )}

        {activeSection === 'recommendations' && (
          <RecommendationsSection
            project={currentProject}
            onUpdateRecommendation={handleUpdateRecommendation}
          />
        )}

        {activeSection === 'queryfanout' && (
          <QueryFanoutSection
            project={currentProject}
            onImportFanout={handleImportFanout}
          />
        )}

        {activeSection === 'reports' && (
          <ReportsSection project={currentProject} />
        )}

        {activeSection === 'savedprojects' && (
          <SavedProjectsSection
            currentProjectId={currentProject.id}
            savedProjects={savedProjects}
            onSelectProject={handleSelectProject}
            onCreateNew={handleOpenSetup}
            onDeleteProject={handleDeleteProject}
            onImportProject={handleImportProject}
          />
        )}
      </main>

      {/* Setup Modal */}
      <ProjectSetupModal
        isOpen={isSetupOpen}
        onClose={() => setIsSetupOpen(false)}
        onSaveAndRun={handleSaveAndRunProject}
        initialData={currentProject}
      />

      {/* Live Audit Runner Modal */}
      <LiveAuditRunner
        isOpen={isAuditing}
        project={currentProject}
        onComplete={handleAuditComplete}
        onCancel={() => setIsAuditing(false)}
      />

      {/* Required Disclaimer and Credits Footer */}
      <Footer />

      <HowItWorksModal isOpen={isHowItWorksOpen} onClose={() => setIsHowItWorksOpen(false)} onStartAudit={() => setIsSetupOpen(true)} />

    </div>
  );
}
