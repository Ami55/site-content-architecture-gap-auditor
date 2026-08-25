export function calculatePreliminaryScore(
  relevance: number,
  contentGap: number,
  businessValue: number,
  informationGain: number,
  structuralImportance: number
): number {
  const r = Math.min(5, Math.max(1, relevance));
  const cg = Math.min(5, Math.max(1, contentGap));
  const bv = Math.min(5, Math.max(1, businessValue));
  const ig = Math.min(5, Math.max(1, informationGain));
  const si = Math.min(5, Math.max(1, structuralImportance));

  // Max possible product is 5^5 = 3125, min is 1^5 = 1.
  // We can calculate geometric mean or normalized product
  // Normalization: ( (product - 1) / (3125 - 1) ) * 100 or weighted average
  // Formula specified in requirements: Relevance × Content Gap × Business Value × Information Gain × Structural Importance (normalized to 100)
  const product = r * cg * bv * ig * si;
  const normalized = Math.round((product / 3125) * 100);
  return Math.max(1, Math.min(100, normalized));
}

export function calculateEnrichedScore(
  relevance: number,
  contentGap: number,
  businessValue: number,
  informationGain: number,
  userNeedEvidence: number
): number {
  const r = Math.min(5, Math.max(1, relevance));
  const cg = Math.min(5, Math.max(1, contentGap));
  const bv = Math.min(5, Math.max(1, businessValue));
  const ig = Math.min(5, Math.max(1, informationGain));
  const une = Math.min(5, Math.max(1, userNeedEvidence));

  const product = r * cg * bv * ig * une;
  const normalized = Math.round((product / 3125) * 100);
  return Math.max(1, Math.min(100, normalized));
}

export function getScoreBadgeColor(score: number): string {
  if (score >= 80) return "bg-emerald-100 text-emerald-800 border-emerald-300";
  if (score >= 60) return "bg-teal-100 text-teal-800 border-teal-300";
  if (score >= 40) return "bg-amber-100 text-amber-800 border-amber-300";
  return "bg-slate-100 text-slate-700 border-slate-300";
}

export function getPriorityBadgeColor(priority: 'High' | 'Medium' | 'Low'): string {
  if (priority === 'High') return "bg-rose-100 text-rose-800 border-rose-200 font-semibold";
  if (priority === 'Medium') return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}
