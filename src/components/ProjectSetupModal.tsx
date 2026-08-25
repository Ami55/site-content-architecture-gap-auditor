import React, { useState } from 'react';
import { ProjectData, AnalysisScope, AnalysisDepth } from '../types';
import {
  X,
  Upload,
  Globe,
  FileText,
  Sliders,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';

interface ProjectSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAndRun: (newProject: Partial<ProjectData>, autoRun: boolean) => void;
  initialData?: ProjectData;
}

export const ProjectSetupModal: React.FC<ProjectSetupModalProps> = ({
  isOpen,
  onClose,
  onSaveAndRun,
  initialData,
}) => {
  if (!isOpen) return null;

  const [projectName, setProjectName] = useState(initialData?.name || 'New Content Architecture Audit');
  const [targetDomain, setTargetDomain] = useState(initialData?.targetDomain || 'toursbylocals.com');
  const [mainSitemapUrl, setMainSitemapUrl] = useState(initialData?.mainSitemapUrl || 'https://www.toursbylocals.com/sitemap.xml');
  const [additionalSitemaps, setAdditionalSitemaps] = useState(initialData?.additionalSitemaps.join('\n') || '');
  const [blogSitemapUrl, setBlogSitemapUrl] = useState(initialData?.blogSitemapUrl || 'https://www.toursbylocals.com/blog/sitemap.xml');
  const [destinationOrTopic, setDestinationOrTopic] = useState(initialData?.destinationOrTopic || 'Montreal');
  const [targetDirectoryPattern, setTargetDirectoryPattern] = useState(initialData?.targetDirectoryPattern || '/Montreal-Tours');
  const [includePatterns, setIncludePatterns] = useState(initialData?.includePatterns.join('\n') || '/Montreal*\n/blog/*montreal*\n/guides/*montreal*');
  const [excludePatterns, setExcludePatterns] = useState(initialData?.excludePatterns.join('\n') || '/cart\n/checkout\n/account\n/admin');
  const [competitorDomains, setCompetitorDomains] = useState(initialData?.competitorDomains.join(', ') || 'viator.com, getyourguide.com, quebecoriginal.com');
  const [competitorSitemaps, setCompetitorSitemaps] = useState(initialData?.competitorSitemaps.join('\n') || '');
  const [country, setCountry] = useState(initialData?.country || 'Canada');
  const [language, setLanguage] = useState(initialData?.language || 'English (Canadian spelling)');
  const [targetAudience, setTargetAudience] = useState(initialData?.targetAudience || 'International travellers seeking authentic private tours with local guides');
  const [businessObjective, setBusinessObjective] = useState(initialData?.businessObjective || 'Establish topical authority and convert informational searchers to private tour bookings');
  const [preferredConversionAction, setPreferredConversionAction] = useState(initialData?.preferredConversionAction || 'Inquire or book private tour');
  const [analysisScope, setAnalysisScope] = useState<AnalysisScope>(initialData?.analysisScope || 'destination_topic');
  const [analysisDepth, setAnalysisDepth] = useState<AnalysisDepth>(initialData?.analysisDepth || 'standard');
  const [maxUrls, setMaxUrls] = useState<number>(initialData?.maxUrls || 50);
  const [crawlDelayMs, setCrawlDelayMs] = useState<number>(initialData?.crawlDelayMs || 500);

  // Upload states
  const [uploadedUrlFile, setUploadedUrlFile] = useState<string | null>(null);
  const [uploadedGscFile, setUploadedGscFile] = useState<string | null>(null);
  const [uploadedQfoFile, setUploadedQfoFile] = useState<string | null>(null);

  // Pre-flight estimation calculations
  const estimatedUrls = analysisScope === 'destination_topic' ? Math.min(maxUrls, 35) : maxUrls;
  const estimatedSitemaps = 3 + (additionalSitemaps.trim() ? additionalSitemaps.split('\n').length : 0);
  const competitorCount = competitorDomains.split(',').filter(d => d.trim().length > 0).length;

  const handleFileUpload = (type: 'urls' | 'gsc' | 'qfo', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (type === 'urls') setUploadedUrlFile(file.name);
    if (type === 'gsc') setUploadedGscFile(file.name);
    if (type === 'qfo') setUploadedQfoFile(file.name);
  };

  const handleSubmit = (autoRun: boolean) => {
    if (!targetDomain.trim()) {
      alert('Target domain is required.');
      return;
    }
    if (!mainSitemapUrl.trim() && !uploadedUrlFile) {
      alert('Main sitemap URL or an uploaded URL list is required.');
      return;
    }

    const payload: Partial<ProjectData> = {
      name: projectName,
      targetDomain: targetDomain.replace(/^https?:\/\//, '').replace(/\/.*$/, ''),
      mainSitemapUrl,
      additionalSitemaps: additionalSitemaps.split('\n').map(s => s.trim()).filter(Boolean),
      blogSitemapUrl,
      destinationOrTopic,
      targetDirectoryPattern,
      includePatterns: includePatterns.split('\n').map(s => s.trim()).filter(Boolean),
      excludePatterns: excludePatterns.split('\n').map(s => s.trim()).filter(Boolean),
      competitorDomains: competitorDomains.split(',').map(s => s.trim()).filter(Boolean),
      competitorSitemaps: competitorSitemaps.split('\n').map(s => s.trim()).filter(Boolean),
      country,
      language,
      targetAudience,
      businessObjective,
      preferredConversionAction,
      analysisScope,
      analysisDepth,
      maxUrls,
      crawlDelayMs,
      isDemo: false,
      mode: uploadedQfoFile ? 'Enriched with Query Fan-out' : 'Standalone analysis with optional validation pending'
    };

    onSaveAndRun(payload, autoRun);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Project Setup & Content Scope Configuration</h2>
              <p className="text-xs text-slate-400">Configure target sitemaps, scope, filters, and competitor benchmarks</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Section 1: Core Target Domain & Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Project Name *</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-hidden font-medium text-slate-900"
                placeholder="e.g. Montreal Destination Content Audit"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Domain *</label>
              <input
                type="text"
                value={targetDomain}
                onChange={(e) => setTargetDomain(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-hidden font-medium text-slate-900"
                placeholder="e.g. toursbylocals.com"
              />
            </div>
          </div>

          {/* Section 2: Analysis Scope Selection (Default to Destination/Topic) */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="block font-bold text-slate-900 mb-2 text-sm">Analysis Scope *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <div
                onClick={() => setAnalysisScope('destination_topic')}
                className={`p-3 rounded-lg border cursor-pointer transition flex items-start gap-3 ${
                  analysisScope === 'destination_topic'
                    ? 'bg-teal-50/70 border-teal-500 ring-2 ring-teal-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="scope"
                  checked={analysisScope === 'destination_topic'}
                  onChange={() => setAnalysisScope('destination_topic')}
                  className="mt-1 text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <span className="font-bold text-slate-900 block">Destination or Topic Audit (Recommended)</span>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Analyse a specific destination (e.g. Montreal, Rome, Japan), subject, directory (/Montreal-Tours), or entity cluster. Fast, highly focused, and actionable.
                  </p>
                </div>
              </div>

              <div
                onClick={() => setAnalysisScope('sitewide')}
                className={`p-3 rounded-lg border cursor-pointer transition flex items-start gap-3 ${
                  analysisScope === 'sitewide'
                    ? 'bg-teal-50/70 border-teal-500 ring-2 ring-teal-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="scope"
                  checked={analysisScope === 'sitewide'}
                  onChange={() => setAnalysisScope('sitewide')}
                  className="mt-1 text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <span className="font-bold text-slate-900 block">Sitewide Architecture Audit</span>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Batch-process large sitemap families with pause/resume controls, crawl rate limiters, and modular classification caching.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Section 3: Sitemaps Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Main Sitemap URL *</label>
              <input
                type="url"
                value={mainSitemapUrl}
                onChange={(e) => setMainSitemapUrl(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-hidden text-slate-900"
                placeholder="https://example.com/sitemap.xml"
              />
              <p className="text-[11px] text-slate-400 mt-1">Accepts XML sitemap indexes and single urlsets</p>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Blog or Editorial Sitemap (Optional)</label>
              <input
                type="url"
                value={blogSitemapUrl}
                onChange={(e) => setBlogSitemapUrl(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-hidden text-slate-900"
                placeholder="https://example.com/blog/sitemap.xml"
              />
              <p className="text-[11px] text-slate-400 mt-1">Used to establish Page-to-Blog relationship maps</p>
            </div>
          </div>

          {/* Destination Specific Target & Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Destination / Topic Entity</label>
              <input
                type="text"
                value={destinationOrTopic}
                onChange={(e) => setDestinationOrTopic(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-hidden text-slate-900 font-medium"
                placeholder="e.g. Montreal"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Directory / Pattern</label>
              <input
                type="text"
                value={targetDirectoryPattern}
                onChange={(e) => setTargetDirectoryPattern(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-hidden text-slate-900 font-mono text-xs"
                placeholder="/Montreal-Tours"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Country & Language</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-1/2 px-2.5 py-2 border border-slate-300 rounded-lg text-slate-900"
                  placeholder="Canada"
                />
                <input
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-1/2 px-2.5 py-2 border border-slate-300 rounded-lg text-slate-900"
                  placeholder="English"
                />
              </div>
            </div>
          </div>

          {/* Include / Exclude Patterns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">URL Include Patterns (1 per line)</label>
              <textarea
                rows={2}
                value={includePatterns}
                onChange={(e) => setIncludePatterns(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono text-[11px] text-slate-900"
                placeholder="/Montreal*&#10;/blog/*montreal*"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">URL Exclude Patterns (1 per line)</label>
              <textarea
                rows={2}
                value={excludePatterns}
                onChange={(e) => setExcludePatterns(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono text-[11px] text-slate-900"
                placeholder="/cart&#10;/checkout&#10;/admin"
              />
            </div>
          </div>

          {/* Competitors & Strategy Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Competitor Domains (Comma separated)</label>
              <input
                type="text"
                value={competitorDomains}
                onChange={(e) => setCompetitorDomains(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium"
                placeholder="viator.com, getyourguide.com, quebecoriginal.com"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Business Objective & Conversion Action</label>
              <input
                type="text"
                value={businessObjective}
                onChange={(e) => setBusinessObjective(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                placeholder="Connect informational queries to private tour inquiries"
              />
            </div>
          </div>

          {/* Depth, Crawl Limit & Batch Controls */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Analysis Depth</label>
              <select
                value={analysisDepth}
                onChange={(e) => setAnalysisDepth(e.target.value as AnalysisDepth)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 font-medium"
              >
                <option value="quick">Quick (Headers & Meta Only)</option>
                <option value="standard">Standard (Meta, H1, H2s & Links)</option>
                <option value="deep">Deep (Full Semantic Extraction & Clusters)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Max URLs to Inspect</label>
              <input
                type="number"
                min={5}
                max={500}
                value={maxUrls}
                onChange={(e) => setMaxUrls(parseInt(e.target.value) || 25)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Crawl Delay (ms)</label>
              <input
                type="number"
                min={100}
                max={3000}
                step={100}
                value={crawlDelayMs}
                onChange={(e) => setCrawlDelayMs(parseInt(e.target.value) || 500)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 font-medium"
              />
            </div>
          </div>

          {/* Optional File Uploads */}
          <div>
            <label className="block font-bold text-slate-800 mb-2">Optional Data Layer Uploads (CSV / TSV / JSON)</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div className="p-3 border border-dashed border-slate-300 rounded-xl bg-slate-50 text-center hover:bg-slate-100 transition relative">
                <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <span className="block font-semibold text-slate-700">Upload Custom URL List</span>
                <span className="text-[10px] text-slate-500 block truncate">
                  {uploadedUrlFile || 'CSV or TXT of specific URLs'}
                </span>
                <input
                  type="file"
                  accept=".csv,.tsv,.txt"
                  onChange={(e) => handleFileUpload('urls', e)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <div className="p-3 border border-dashed border-slate-300 rounded-xl bg-slate-50 text-center hover:bg-slate-100 transition relative">
                <FileText className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <span className="block font-semibold text-slate-700">Upload GSC Export</span>
                <span className="text-[10px] text-slate-500 block truncate">
                  {uploadedGscFile || 'Optional clicks & impressions'}
                </span>
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={(e) => handleFileUpload('gsc', e)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <div className="p-3 border border-dashed border-teal-300 rounded-xl bg-teal-50/50 text-center hover:bg-teal-50 transition relative">
                <Sparkles className="w-5 h-5 text-teal-600 mx-auto mb-1" />
                <span className="block font-semibold text-teal-900">Upload Query Fan-out Data</span>
                <span className="text-[10px] text-teal-700 block truncate">
                  {uploadedQfoFile || 'Enrich with validated queries'}
                </span>
                <input
                  type="file"
                  accept=".json,.csv"
                  onChange={(e) => handleFileUpload('qfo', e)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

            </div>
          </div>

          {/* Pre-flight Estimation Banner */}
          <div className="bg-slate-900 text-white rounded-xl p-4 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-teal-400 font-bold uppercase tracking-wider text-[10px] block">Pre-Flight Audit Estimation</span>
              <div className="flex items-center gap-4 mt-1 text-slate-300 flex-wrap">
                <span>Estimated URLs: <strong className="text-white">{estimatedUrls}</strong></span>
                <span>&bull;</span>
                <span>Sitemaps: <strong className="text-white">{estimatedSitemaps}</strong></span>
                <span>&bull;</span>
                <span>Competitors: <strong className="text-white">{competitorCount}</strong></span>
                <span>&bull;</span>
                <span>Enrichment: <strong className={uploadedQfoFile ? "text-teal-300 font-semibold" : "text-slate-400"}>{uploadedQfoFile ? "Included" : "Standalone mode"}</strong></span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Requires Explicit Confirmation</span>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-3.5 h-3.5" /> Quota-Safe Batching Active
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-200 hover:bg-slate-300 rounded-lg transition"
            >
              Save Configuration Only
            </button>
            <button
              type="button"
              id="btn-start-architecture-audit"
              onClick={() => handleSubmit(true)}
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-md hover:shadow-teal-500/20 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              Start Content Architecture Audit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
