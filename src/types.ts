export type AnalysisScope = 'destination_topic' | 'sitewide';
export type AnalysisDepth = 'quick' | 'standard' | 'deep';

export type PageType =
  | 'Homepage'
  | 'Country page'
  | 'Region page'
  | 'Area page'
  | 'City page'
  | 'Things to Do page'
  | 'Attraction page'
  | 'Neighbourhood page'
  | 'Travel Guide'
  | 'Tour listing or search-results page'
  | 'Tour category page'
  | 'Tour detail page'
  | 'Guide profile'
  | 'Cruise-line page'
  | 'Cruise-ship page'
  | 'Shore-excursion page'
  | 'Blog article'
  | 'News article'
  | 'Itinerary'
  | 'Seasonal guide'
  | 'Planning guide'
  | 'Food guide'
  | 'Accommodation or neighbourhood guide'
  | 'Transportation guide'
  | 'Accessibility resource'
  | 'Comparison article'
  | 'FAQ or resource'
  | 'Landing page'
  | 'Other'
  | 'Unknown';

export type ContentRole = 'Commercial' | 'Informational' | 'Transactional' | 'Navigational' | 'Support';

export type SearchIntent = 'Informational' | 'Commercial Investigation' | 'Transactional' | 'Navigational';

export type JourneyStage = 'Dreaming / Inspiration' | 'Planning & Research' | 'Booking / Transaction' | 'In-Destination' | 'Post-Trip';

export type QualityStatus = 'High Quality' | 'Adequate' | 'Thin Content' | 'Outdated' | 'Needs Local Voice' | 'Overlapping';

export type RecommendedAction =
  | 'Keep'
  | 'Keep and update'
  | 'Expand existing page'
  | 'Add a section'
  | 'Improve answer clarity'
  | 'Add local expertise'
  | 'Add entities and relationships'
  | 'Improve internal links'
  | 'Create a new page'
  | 'Create a supporting article'
  | 'Create a hub'
  | 'Merge'
  | 'Redirect'
  | 'Repurpose'
  | 'Fix technical issue'
  | 'Validate through Query Fan-out'
  | 'Human review required'
  | 'No action';

export type HumanApprovalStatus = 'Pending Review' | 'Approved' | 'Rejected' | 'Modified';

export type CoverageStatus =
  | 'Strong coverage'
  | 'Covered'
  | 'Partially covered'
  | 'Thin'
  | 'Outdated'
  | 'Duplicated'
  | 'Wrong page type'
  | 'Missing'
  | 'Not relevant'
  | 'Unable to verify';

export type CompetitorFindingStatus =
  | 'Target site stronger'
  | 'Similar coverage'
  | 'Target site weaker'
  | 'Competitor-only coverage'
  | 'Target-only opportunity'
  | 'Different intent — not a true gap'
  | 'Both appear weak'
  | 'Unable to verify';

export type GapCategory =
  | 'Structural gaps'
  | 'Topic gaps'
  | 'Depth gaps'
  | 'Intent gaps'
  | 'Entity gaps'
  | 'Expertise gaps'
  | 'Internal-link gaps'
  | 'Competitor-only topics'
  | 'Unique target opportunities';

export type RecommendationStatus = 'Proposed' | 'Needs validation' | 'Approved' | 'Rejected' | 'In progress' | 'Completed';

export type EvidenceLabel =
  | 'Confirmed finding'
  | 'Extracted page evidence'
  | 'Structural pattern'
  | 'Competitor comparison'
  | 'Preliminary opportunity'
  | 'Hypothesis requiring validation'
  | 'Unable to verify';

export type ProjectMode = 'Standalone analysis' | 'Standalone analysis with optional validation pending' | 'Enriched with Query Fan-out' | 'Partially enriched' | 'Unable to complete';

export interface ContentInventoryItem {
  id: string;
  url: string;
  canonicalUrl: string;
  pageTitle: string;
  h1: string;
  h2s?: string[];
  pageType: PageType;
  contentRole: ContentRole;
  destination: string;
  country?: string;
  region?: string;
  city?: string;
  primaryTopic: string;
  secondaryTopics: string[];
  searchIntent: SearchIntent;
  journeyStage: JourneyStage;
  contentCluster: string;
  parentPage?: string;
  wordCount: number;
  lastModified?: string;
  indexability: 'Indexable' | 'Noindex' | 'Blocked by robots.txt' | 'Canonicalized';
  statusCode: number;
  sitemapSource: string;
  internalLinkCount: number;
  inboundLinksCount: number;
  outboundLinksCount: number;
  existingRelatedPages: string[];
  contentQualityStatus: QualityStatus;
  recommendedAction: RecommendedAction;
  confidence: number; // 0 - 100
  humanReviewStatus: HumanApprovalStatus;
  notes?: string;
  owner?: string;
}

export interface SitemapFileStatus {
  url: string;
  type: 'index' | 'urlset';
  parentSitemap?: string;
  family: string;
  urlsDiscovered: number;
  lastModified?: string;
  statusCode: number;
  statusMessage: string;
  isAccessible: boolean;
  errorsDetected: string[];
}

export interface PageTypeArchitectureSummary {
  pageType: PageType;
  count: number;
  percentage: number;
  destinationsCovered: string[];
  clustersAssociated: string[];
  templateConsistency: 'Consistent' | 'Variable' | 'Needs Standardization';
  unexpectedGaps: string[];
  notes: string;
}

export interface DestinationRosterItem {
  id: string;
  categoryType: 'Commercial & Transactional' | 'Informational & Editorial';
  contentType: string;
  relevance: 'Essential' | 'Recommended' | 'Optional' | 'Niche';
  existingUrls: string[];
  coverageStatus: CoverageStatus;
  contentQuality: QualityStatus;
  overlapIssue?: string;
  competitorPresence: string;
  recommendedAction: RecommendedAction;
  priority: 'High' | 'Medium' | 'Low';
  needsQueryFanoutValidation: boolean;
  evidence: string;
  evidenceLabel: EvidenceLabel;
}

export interface ContentCluster {
  id: string;
  name: string;
  destination: string;
  primaryUserNeed: string;
  hubPageUrl?: string;
  hubPageTitle?: string;
  supportingPageUrls: string[];
  commercialPageUrls: string[];
  informationalPageUrls: string[];
  relevantEntities: string[];
  searchIntents: SearchIntent[];
  journeyStages: JourneyStage[];
  coverageStrength: 'Strong' | 'Moderate' | 'Weak' | 'Fragmented';
  missingComponents: string[];
  overlappingComponents: string[];
  internalLinkCompleteness: number; // 0 - 100%
  competitorCoverageSummary: string;
  recommendedArchitecture: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface PageToBlogRelationship {
  id: string;
  sourceUrl: string;
  sourceTitle: string;
  sourcePageType: PageType;
  targetUrl: string;
  targetTitle: string;
  targetPageType: PageType;
  relationshipType:
    | 'Parent and child'
    | 'Hub and supporting article'
    | 'Informational to commercial'
    | 'Commercial to informational'
    | 'Destination to attraction'
    | 'Attraction to relevant experience'
    | 'Article to guide expertise'
    | 'Related planning content'
    | 'Related itinerary content'
    | 'Related seasonal content';
  existingLinkStatus: 'Direct Link Present' | 'Missing Inbound' | 'Missing Outbound' | 'Orphan / Disconnected';
  suggestedLinkDirection: 'Bidirectional' | 'Source -> Target' | 'Target -> Source';
  suggestedContextualPlacement: string;
  suggestedAnchorConcept: string;
  relevance: 'Critical' | 'High' | 'Moderate';
  confidence: number;
  humanApproval: HumanApprovalStatus;
  notes?: string;
}

export interface DuplicateGroup {
  id: string;
  groupName: string;
  urls: {
    url: string;
    title: string;
    pageType: PageType;
    intent: SearchIntent;
    wordCount: number;
    gscClicks?: number;
    gscImpressions?: number;
  }[];
  primaryIntent: string;
  sharedTopics: string[];
  uniqueInformation: string;
  preferredCanonicalUrl: string;
  mergeSourceUrls: string[];
  redirectRecommendation: string;
  updateOpportunity: string;
  recommendedDecision:
    | 'Keep'
    | 'Keep and update'
    | 'Merge into selected canonical'
    | 'Redirect'
    | 'Repurpose'
    | 'Different intent — keep both'
    | 'Review manually'
    | 'No action';
  confidence: number;
  humanApproval: HumanApprovalStatus;
}

export interface CompetitorComparisonItem {
  id: string;
  competitorDomain: string;
  competitorUrl: string;
  competitorTitle: string;
  competitorPageType: PageType;
  targetEquivalentUrl?: string;
  targetEquivalentTitle?: string;
  destination: string;
  topicCluster: string;
  searchIntent: SearchIntent;
  journeyStage: JourneyStage;
  entities: string[];
  contentDepth: 'Deep' | 'Moderate' | 'Shallow';
  contentFreshness: string;
  firstHandExpertise: 'High (Guide/Expert)' | 'Moderate' | 'Generic / Curated';
  informationGain: 'High Unique Insights' | 'Standard' | 'Commoditized';
  commercialInformationalRelationship: string;
  findingStatus: CompetitorFindingStatus;
  analysisNotes: string;
}

export interface ContentGapItem {
  id: string;
  opportunityId: string;
  destination: string;
  gapCategory: GapCategory;
  missingOrWeakTopic: string;
  suggestedContentType: PageType;
  relevantTargetUrl?: string;
  existingCoverage: string;
  competitorEvidence: string;
  userIntent: SearchIntent;
  journeyStage: JourneyStage;
  relevantEntities: string[];
  businessRelevance: number; // 1 - 5
  relevanceScore: number; // 1 - 5
  contentGapScore: number; // 1 - 5
  informationGainPotential: number; // 1 - 5
  structuralImportance: number; // 1 - 5
  preliminaryScore: number; // 0 - 100
  enrichedScore?: number; // 0 - 100
  userNeedEvidence?: number; // 1 - 5 (from Query Fan-out)
  recommendedAction: RecommendedAction;
  preliminaryPriority: 'High' | 'Medium' | 'Low';
  confidence: number;
  needsQueryFanoutValidation: boolean;
  reasonValidationNeeded?: string;
  humanApproval: HumanApprovalStatus;
  evidenceLabel: EvidenceLabel;
}

export interface RecommendationItem {
  id: string;
  action: RecommendedAction;
  targetUrl?: string;
  targetTitle?: string;
  supportingUrls?: string[];
  proposedPageType: PageType;
  topicOrCluster: string;
  reason: string;
  evidence: string;
  expectedUserBenefit: string;
  businessRelevance: string;
  effort: 'Low' | 'Medium' | 'High';
  priority: 'High' | 'Medium' | 'Low';
  score: number;
  isQuickWin: boolean;
  category: 'Actions we can take now' | 'Opportunities requiring Query Fan-out validation';
  owner?: string;
  status: RecommendationStatus;
  notes?: string;
}

export interface QueryFanoutRecord {
  projectId: string;
  opportunityId: string;
  destination: string;
  topic: string;
  contentCluster: string;
  targetUrl?: string;
  pageType: PageType;
  currentCoverage: string;
  competitorUrls?: string[];
  competitorEvidence: string;
  preliminaryGap: string;
  preliminaryRecommendation: RecommendedAction;
  reasonValidationNeeded: string;
  suggestedSeedPrompt: string;
  audience: string;
  country: string;
  language: string;
  businessObjective: string;
  preliminaryPriority: 'High' | 'Medium' | 'Low';
  approvalStatus: HumanApprovalStatus;

  // Enriched return fields
  enrichedAt?: string;
  approvedQueryClusters?: string[];
  observedGeminiQueries?: string[];
  predictedFanoutQueries?: string[];
  serpValidatedQueries?: string[];
  gscObservedQueries?: string[];
  userQuestions?: string[];
  recommendedContentFormat?: string;
  userNeedEvidenceScore?: number; // 1 - 5
  enrichedRecommendation?: RecommendedAction;
  decisionChanged?: boolean;
  reasonForChange?: string;
  confidenceBefore?: number;
  confidenceAfter?: number;
  finalHumanDecision?: HumanApprovalStatus;
}

export interface ProjectData {
  id: string;
  name: string;
  targetDomain: string;
  mainSitemapUrl: string;
  additionalSitemaps: string[];
  blogSitemapUrl?: string;
  destinationOrTopic: string;
  targetDirectoryPattern?: string;
  includePatterns: string[];
  excludePatterns: string[];
  competitorDomains: string[];
  competitorSitemaps: string[];
  country: string;
  language: string;
  targetAudience: string;
  businessObjective: string;
  preferredConversionAction: string;
  analysisScope: AnalysisScope;
  analysisDepth: AnalysisDepth;
  maxUrls: number;
  crawlDelayMs: number;
  createdAt: string;
  updatedAt: string;
  isDemo: boolean;
  mode: ProjectMode;

  // Analysis modules
  sitemaps: SitemapFileStatus[];
  inventory: ContentInventoryItem[];
  pageTypeSummaries: PageTypeArchitectureSummary[];
  destinationRoster: DestinationRosterItem[];
  clusters: ContentCluster[];
  pageToBlogRelationships: PageToBlogRelationship[];
  duplicateGroups: DuplicateGroup[];
  competitorComparisons: CompetitorComparisonItem[];
  gaps: ContentGapItem[];
  recommendations: RecommendationItem[];
  queryFanoutRecords: QueryFanoutRecord[];

  // Executive synthesis
  executiveSummary: {
    totalSitemapsDiscovered: number;
    totalUrlsDiscovered: number;
    urlsAnalysed: number;
    urlsExcluded: number;
    urlsInaccessible: number;
    pageTypesIdentifiedCount: number;
    blogPagesCount: number;
    commercialPagesCount: number;
    destinationsIdentifiedCount: number;
    clustersCount: number;
    orphanPagesCount: number;
    duplicateGroupsCount: number;
    missingPageTypes: string[];
    missingArticleTypes: string[];
    competitorOnlyTypes: string[];
    targetSiteAdvantages: string[];
    highPriorityOpportunitiesCount: number;
    validationRequiredCount: number;
    answerFirst: {
      whatSiteHas: string;
      howOrganised: string;
      whatCoversWell: string;
      whatIsWeakOrDisconnected: string;
      whatIsMissing: string;
      howCompetitorsDiffer: string;
      immediateActions: string;
      needsValidationFirst: string;
    };
  };
}
