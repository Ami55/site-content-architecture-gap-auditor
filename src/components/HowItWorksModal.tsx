import React from 'react';
import { BookOpen, CheckCircle2, Network, Search, ShieldCheck, X } from 'lucide-react';

interface Props { isOpen: boolean; onClose: () => void; onStartAudit: () => void; }

export const HowItWorksModal: React.FC<Props> = ({ isOpen, onClose, onStartAudit }) => {
  if (!isOpen) return null;
  const steps = [
    ['1. Set the audit scope', 'Enter the target domain, sitemap, destination or topic, competitors, URL limits and business objective. Start with a representative scope instead of attempting an unrestricted crawl.'],
    ['2. Discover sitemap URLs', 'The server-side proxy fetches the public sitemap, detects sitemap indexes and returns a bounded set of URLs. Blocked or timed-out sources are reported as errors, not replaced with invented results.'],
    ['3. Inspect page evidence', 'Review titles, descriptions, headings, canonicals, page types, breadcrumbs, word counts and internal-link signals. Confirm that the evidence belongs to the intended URL and template.'],
    ['4. Classify architecture', 'Pages are organised into hubs, destination pages, categories, itineraries, guides, attractions and supporting articles. Human review is required where page purpose is ambiguous.'],
    ['5. Map clusters and journeys', 'Evaluate how supporting content connects to commercial or conversion pages, where orphan pages exist, and whether internal links reflect the intended user journey.'],
    ['6. Review overlap and competition', 'Identify possible duplication and cannibalisation separately from competitor observations. Competitor findings are evidence-led comparisons, not assumed ranking factors.'],
    ['7. Score content gaps', 'The five-factor framework considers relevance, coverage gap, business value, information gain and structural fit. A high score is a prioritisation signal—not proof of search demand.'],
    ['8. Validate and implement', 'Review recommendations, assign owners, export reports and obtain human approval. Validate demand with Search Console, keyword research or Query Fan-out evidence before creating substantial new content.'],
  ];
  return <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
      <div className="sticky top-0 bg-slate-900 text-white px-6 py-5 flex items-start justify-between z-10">
        <div className="flex gap-3"><div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 grid place-items-center"><BookOpen className="w-5 h-5 text-teal-300" /></div><div><h2 className="text-lg font-bold">How It Works &amp; Operating Instructions</h2><p className="text-xs text-slate-400 mt-1">Evidence-first content architecture and gap-audit framework</p></div></div>
        <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800" aria-label="Close guide"><X className="w-5 h-5" /></button>
      </div>
      <div className="p-6">
        <div className="bg-teal-50 border border-teal-200 text-teal-950 rounded-xl p-4 flex gap-3 text-sm leading-relaxed"><ShieldCheck className="w-5 h-5 text-teal-700 shrink-0" /><p><strong>Methodology:</strong> observed crawl and page evidence comes first; classification and inference come second; implementation requires human approval. The tool never treats a content-gap score as guaranteed demand, traffic or ranking potential.</p></div>
        <div className="grid md:grid-cols-2 gap-3 mt-5">{steps.map(([title, body]) => <section key={title} className="border border-slate-200 rounded-xl p-4 bg-slate-50"><h3 className="font-bold text-sm text-slate-900 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" />{title}</h3><p className="text-xs text-slate-600 leading-relaxed mt-2">{body}</p></section>)}</div>
        <div className="mt-5 border border-slate-200 rounded-xl p-4"><h3 className="font-bold text-sm flex items-center gap-2"><Network className="w-4 h-4 text-teal-600" />Recommended workflow</h3><p className="text-xs text-slate-600 mt-2">Setup → Sitemap → Inventory → Page Types → Destination Roster → Clusters → Page-to-Blog Map → Duplicates → Competitors → Content Gaps → Recommendations → Reports.</p></div>
      </div>
      <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex justify-end gap-2"><button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg">Close</button><button onClick={() => { onClose(); onStartAudit(); }} className="px-4 py-2 text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-lg flex items-center gap-2"><Search className="w-4 h-4" />Start an Audit</button></div>
    </div>
  </div>;
};
