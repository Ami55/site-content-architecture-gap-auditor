import { ProjectData, ContentGapItem, QueryFanoutRecord } from "../types";

export function downloadJsonFile(filename: string, data: any) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadCsvFile(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function arrayToCsv(headers: string[], rows: (string | number | undefined | null)[][]): string {
  const escapeCell = (cell: string | number | undefined | null) => {
    if (cell === null || cell === undefined) return '""';
    const str = String(cell).replace(/"/g, '""');
    return `"${str}"`;
  };

  const headerLine = headers.map(escapeCell).join(",");
  const rowLines = rows.map(row => row.map(escapeCell).join(","));
  return [headerLine, ...rowLines].join("\n");
}

export function generateQueryFanoutHandoff(project: ProjectData, selectedGapIds?: string[]): { json: any; csv: string } {
  const gapsToExport = selectedGapIds && selectedGapIds.length > 0
    ? project.gaps.filter(g => selectedGapIds.includes(g.id))
    : project.gaps;

  const records: QueryFanoutRecord[] = gapsToExport.map(g => ({
    projectId: project.id,
    opportunityId: g.opportunityId,
    destination: g.destination,
    topic: g.missingOrWeakTopic,
    contentCluster: project.clusters.find(c => c.relevantEntities.some(e => g.relevantEntities.includes(e)))?.name || "General Destination",
    targetUrl: g.relevantTargetUrl,
    pageType: g.suggestedContentType,
    currentCoverage: g.existingCoverage,
    competitorEvidence: g.competitorEvidence,
    preliminaryGap: `${g.gapCategory}: ${g.missingOrWeakTopic}`,
    preliminaryRecommendation: g.recommendedAction,
    reasonValidationNeeded: g.reasonValidationNeeded || `Validate user questions and search queries for ${g.missingOrWeakTopic}`,
    suggestedSeedPrompt: `Explore top search queries, user questions, sub-topics and content format for '${g.missingOrWeakTopic}' in ${g.destination}`,
    audience: project.targetAudience,
    country: project.country,
    language: project.language,
    businessObjective: project.businessObjective,
    preliminaryPriority: g.preliminaryPriority,
    approvalStatus: g.humanApproval
  }));

  const headers = [
    "Project ID",
    "Opportunity ID",
    "Destination",
    "Topic",
    "Content Cluster",
    "Target URL",
    "Page Type",
    "Current Coverage",
    "Competitor Evidence",
    "Preliminary Gap",
    "Preliminary Recommendation",
    "Reason Validation Needed",
    "Suggested Seed Prompt",
    "Audience",
    "Country",
    "Language",
    "Business Objective",
    "Preliminary Priority",
    "Approval Status"
  ];

  const rows = records.map(r => [
    r.projectId,
    r.opportunityId,
    r.destination,
    r.topic,
    r.contentCluster,
    r.targetUrl || "",
    r.pageType,
    r.currentCoverage,
    r.competitorEvidence,
    r.preliminaryGap,
    r.preliminaryRecommendation,
    r.reasonValidationNeeded,
    r.suggestedSeedPrompt,
    r.audience,
    r.country,
    r.language,
    r.businessObjective,
    r.preliminaryPriority,
    r.approvalStatus
  ]);

  const csv = arrayToCsv(headers, rows);
  return { json: { exportedAt: new Date().toISOString(), project: project.name, records }, csv };
}

export function exportQueryFanoutJSON(project: ProjectData, selectedGapIds?: string[]) {
  const { json } = generateQueryFanoutHandoff(project, selectedGapIds);
  downloadJsonFile(`${project.targetDomain}-query-fanout-handoff.json`, json);
}

export function exportQueryFanoutCSV(project: ProjectData, selectedGapIds?: string[]) {
  const { csv } = generateQueryFanoutHandoff(project, selectedGapIds);
  downloadCsvFile(`${project.targetDomain}-query-fanout-handoff.csv`, csv);
}

export function exportProjectMasterJSON(project: ProjectData) {
  downloadJsonFile(`${project.targetDomain}-content-architecture-audit.json`, project);
}

