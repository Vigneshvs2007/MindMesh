import { z } from 'zod';
/**
 * Session Schema Definitions
 *
 * Centralized Zod schemas for all session data types.
 * Ensures type safety and validation across all modules.
 */
export declare const PaperSchema: z.ZodObject<{
    paperId: z.ZodString;
    title: z.ZodString;
    authors: z.ZodArray<z.ZodString, "many">;
    year: z.ZodNumber;
    venue: z.ZodOptional<z.ZodString>;
    abstract: z.ZodOptional<z.ZodString>;
    doi: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    citationCount: z.ZodDefault<z.ZodNumber>;
    quartile: z.ZodDefault<z.ZodEnum<["Q1", "Q2", "Q3", "Q4", "unknown"]>>;
    fieldsOfStudy: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    pdfUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    isOpenAccess: z.ZodDefault<z.ZodBoolean>;
    extractedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    paperId: string;
    title: string;
    authors: string[];
    year: number;
    citationCount: number;
    quartile: "unknown" | "Q1" | "Q2" | "Q3" | "Q4";
    fieldsOfStudy: string[];
    isOpenAccess: boolean;
    venue?: string | undefined;
    abstract?: string | undefined;
    doi?: string | undefined;
    url?: string | undefined;
    pdfUrl?: string | null | undefined;
    extractedAt?: string | undefined;
}, {
    paperId: string;
    title: string;
    authors: string[];
    year: number;
    venue?: string | undefined;
    abstract?: string | undefined;
    doi?: string | undefined;
    url?: string | undefined;
    citationCount?: number | undefined;
    quartile?: "unknown" | "Q1" | "Q2" | "Q3" | "Q4" | undefined;
    fieldsOfStudy?: string[] | undefined;
    pdfUrl?: string | null | undefined;
    isOpenAccess?: boolean | undefined;
    extractedAt?: string | undefined;
}>;
export type Paper = z.infer<typeof PaperSchema>;
export declare const RepoSchema: z.ZodObject<{
    name: z.ZodString;
    url: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    stars: z.ZodDefault<z.ZodNumber>;
    language: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
    relevanceScore: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    url: string;
    name: string;
    stars: number;
    description?: string | null | undefined;
    language?: string | undefined;
    updatedAt?: string | undefined;
    relevanceScore?: number | undefined;
}, {
    url: string;
    name: string;
    description?: string | null | undefined;
    stars?: number | undefined;
    language?: string | undefined;
    updatedAt?: string | undefined;
    relevanceScore?: number | undefined;
}>;
export type Repo = z.infer<typeof RepoSchema>;
export declare const PriorSessionSchema: z.ZodObject<{
    sessionId: z.ZodString;
    topic: z.ZodString;
    verdict: z.ZodOptional<z.ZodEnum<["PASS", "CONDITIONAL", "REJECT"]>>;
    resilienceScore: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    topic: string;
    createdAt: string;
    verdict?: "PASS" | "CONDITIONAL" | "REJECT" | undefined;
    resilienceScore?: number | undefined;
}, {
    sessionId: string;
    topic: string;
    createdAt: string;
    verdict?: "PASS" | "CONDITIONAL" | "REJECT" | undefined;
    resilienceScore?: number | undefined;
}>;
export type PriorSession = z.infer<typeof PriorSessionSchema>;
export declare const ClaimSchema: z.ZodObject<{
    claimId: z.ZodString;
    paperId: z.ZodString;
    text: z.ZodString;
    type: z.ZodEnum<["finding", "method", "limitation", "assumption", "hypothesis", "result"]>;
    confidence: z.ZodDefault<z.ZodNumber>;
    evidence: z.ZodOptional<z.ZodString>;
    extractedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
    paperId: string;
    extractedAt: string;
    claimId: string;
    text: string;
    confidence: number;
    evidence?: string | undefined;
}, {
    type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
    paperId: string;
    extractedAt: string;
    claimId: string;
    text: string;
    confidence?: number | undefined;
    evidence?: string | undefined;
}>;
export type Claim = z.infer<typeof ClaimSchema>;
export declare const MethodologySchema: z.ZodObject<{
    methodologyId: z.ZodString;
    paperId: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    category: z.ZodEnum<["experimental", "theoretical", "simulation", "survey", "literature-review", "other"]>;
    keyComponents: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    datasets: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    metrics: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    extractedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    paperId: string;
    extractedAt: string;
    name: string;
    description: string;
    methodologyId: string;
    category: "experimental" | "theoretical" | "simulation" | "survey" | "literature-review" | "other";
    keyComponents: string[];
    datasets: string[];
    metrics: string[];
}, {
    paperId: string;
    extractedAt: string;
    name: string;
    description: string;
    methodologyId: string;
    category: "experimental" | "theoretical" | "simulation" | "survey" | "literature-review" | "other";
    keyComponents?: string[] | undefined;
    datasets?: string[] | undefined;
    metrics?: string[] | undefined;
}>;
export type Methodology = z.infer<typeof MethodologySchema>;
export declare const DatasetSchema: z.ZodObject<{
    datasetId: z.ZodString;
    paperId: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodString>;
    domain: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    paperId: string;
    name: string;
    datasetId: string;
    url?: string | undefined;
    description?: string | undefined;
    size?: string | undefined;
    domain?: string | undefined;
}, {
    paperId: string;
    name: string;
    datasetId: string;
    url?: string | undefined;
    description?: string | undefined;
    size?: string | undefined;
    domain?: string | undefined;
}>;
export type Dataset = z.infer<typeof DatasetSchema>;
export declare const MetricSchema: z.ZodObject<{
    metricId: z.ZodString;
    paperId: z.ZodString;
    name: z.ZodString;
    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    unit: z.ZodOptional<z.ZodString>;
    baseline: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    paperId: string;
    name: string;
    metricId: string;
    value?: string | number | undefined;
    unit?: string | undefined;
    baseline?: string | undefined;
}, {
    paperId: string;
    name: string;
    metricId: string;
    value?: string | number | undefined;
    unit?: string | undefined;
    baseline?: string | undefined;
}>;
export type Metric = z.infer<typeof MetricSchema>;
export declare const TechnicalParamsSchema: z.ZodObject<{
    paramsId: z.ZodString;
    paperId: z.ZodString;
    sensors: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    samplingRateHz: z.ZodOptional<z.ZodNumber>;
    datasetSize: z.ZodOptional<z.ZodNumber>;
    hardwarePlatform: z.ZodOptional<z.ZodString>;
    powerBudgetMw: z.ZodOptional<z.ZodNumber>;
    latencyMs: z.ZodOptional<z.ZodNumber>;
    throughput: z.ZodOptional<z.ZodString>;
    other: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    extractedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    paperId: string;
    extractedAt: string;
    other: Record<string, unknown>;
    paramsId: string;
    sensors: string[];
    samplingRateHz?: number | undefined;
    datasetSize?: number | undefined;
    hardwarePlatform?: string | undefined;
    powerBudgetMw?: number | undefined;
    latencyMs?: number | undefined;
    throughput?: string | undefined;
}, {
    paperId: string;
    extractedAt: string;
    paramsId: string;
    other?: Record<string, unknown> | undefined;
    sensors?: string[] | undefined;
    samplingRateHz?: number | undefined;
    datasetSize?: number | undefined;
    hardwarePlatform?: string | undefined;
    powerBudgetMw?: number | undefined;
    latencyMs?: number | undefined;
    throughput?: string | undefined;
}>;
export type TechnicalParams = z.infer<typeof TechnicalParamsSchema>;
export declare const ClusterSchema: z.ZodObject<{
    clusterId: z.ZodString;
    label: z.ZodString;
    paperIds: z.ZodArray<z.ZodString, "many">;
    centroid: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    summary: z.ZodOptional<z.ZodString>;
    keyThemes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    clusterId: string;
    label: string;
    paperIds: string[];
    keyThemes: string[];
    centroid?: number[] | undefined;
    summary?: string | undefined;
}, {
    createdAt: string;
    clusterId: string;
    label: string;
    paperIds: string[];
    centroid?: number[] | undefined;
    summary?: string | undefined;
    keyThemes?: string[] | undefined;
}>;
export type Cluster = z.infer<typeof ClusterSchema>;
export declare const ContradictionSchema: z.ZodObject<{
    contradictionId: z.ZodString;
    claimA: z.ZodObject<{
        claimId: z.ZodString;
        paperId: z.ZodString;
        text: z.ZodString;
        type: z.ZodEnum<["finding", "method", "limitation", "assumption", "hypothesis", "result"]>;
        confidence: z.ZodDefault<z.ZodNumber>;
        evidence: z.ZodOptional<z.ZodString>;
        extractedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
        paperId: string;
        extractedAt: string;
        claimId: string;
        text: string;
        confidence: number;
        evidence?: string | undefined;
    }, {
        type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
        paperId: string;
        extractedAt: string;
        claimId: string;
        text: string;
        confidence?: number | undefined;
        evidence?: string | undefined;
    }>;
    claimB: z.ZodObject<{
        claimId: z.ZodString;
        paperId: z.ZodString;
        text: z.ZodString;
        type: z.ZodEnum<["finding", "method", "limitation", "assumption", "hypothesis", "result"]>;
        confidence: z.ZodDefault<z.ZodNumber>;
        evidence: z.ZodOptional<z.ZodString>;
        extractedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
        paperId: string;
        extractedAt: string;
        claimId: string;
        text: string;
        confidence: number;
        evidence?: string | undefined;
    }, {
        type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
        paperId: string;
        extractedAt: string;
        claimId: string;
        text: string;
        confidence?: number | undefined;
        evidence?: string | undefined;
    }>;
    explanation: z.ZodString;
    severity: z.ZodEnum<["low", "medium", "high"]>;
    detectedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    contradictionId: string;
    claimA: {
        type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
        paperId: string;
        extractedAt: string;
        claimId: string;
        text: string;
        confidence: number;
        evidence?: string | undefined;
    };
    claimB: {
        type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
        paperId: string;
        extractedAt: string;
        claimId: string;
        text: string;
        confidence: number;
        evidence?: string | undefined;
    };
    explanation: string;
    severity: "low" | "medium" | "high";
    detectedAt: string;
}, {
    contradictionId: string;
    claimA: {
        type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
        paperId: string;
        extractedAt: string;
        claimId: string;
        text: string;
        confidence?: number | undefined;
        evidence?: string | undefined;
    };
    claimB: {
        type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
        paperId: string;
        extractedAt: string;
        claimId: string;
        text: string;
        confidence?: number | undefined;
        evidence?: string | undefined;
    };
    explanation: string;
    severity: "low" | "medium" | "high";
    detectedAt: string;
}>;
export type Contradiction = z.infer<typeof ContradictionSchema>;
export declare const ResearchGapSchema: z.ZodObject<{
    gapId: z.ZodString;
    claim: z.ZodString;
    evidence: z.ZodArray<z.ZodString, "many">;
    noveltyScore: z.ZodNumber;
    feasibility: z.ZodNumber;
    impact: z.ZodNumber;
    relatedPapers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    status: z.ZodDefault<z.ZodEnum<["proposed", "under-review", "passed", "rejected"]>>;
    proposedAt: z.ZodString;
    reviewedAt: z.ZodOptional<z.ZodString>;
    reviewIteration: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    status: "proposed" | "under-review" | "passed" | "rejected";
    evidence: string[];
    gapId: string;
    claim: string;
    noveltyScore: number;
    feasibility: number;
    impact: number;
    relatedPapers: string[];
    proposedAt: string;
    reviewIteration: number;
    reviewedAt?: string | undefined;
}, {
    evidence: string[];
    gapId: string;
    claim: string;
    noveltyScore: number;
    feasibility: number;
    impact: number;
    proposedAt: string;
    status?: "proposed" | "under-review" | "passed" | "rejected" | undefined;
    relatedPapers?: string[] | undefined;
    reviewedAt?: string | undefined;
    reviewIteration?: number | undefined;
}>;
export type ResearchGap = z.infer<typeof ResearchGapSchema>;
export declare const ReviewResultSchema: z.ZodObject<{
    reviewId: z.ZodString;
    gapId: z.ZodString;
    gapClaim: z.ZodString;
    paperSet: z.ZodArray<z.ZodString, "many">;
    adversarialSearchQuery: z.ZodString;
    counterEvidence: z.ZodArray<z.ZodString, "many">;
    verdict: z.ZodEnum<["PASS", "OBJECTION"]>;
    objections: z.ZodArray<z.ZodString, "many">;
    objectionStrength: z.ZodDefault<z.ZodNumber>;
    confidence: z.ZodDefault<z.ZodNumber>;
    reviewedAt: z.ZodString;
    iteration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    verdict: "PASS" | "OBJECTION";
    confidence: number;
    gapId: string;
    reviewedAt: string;
    reviewId: string;
    gapClaim: string;
    paperSet: string[];
    adversarialSearchQuery: string;
    counterEvidence: string[];
    objections: string[];
    objectionStrength: number;
    iteration: number;
}, {
    verdict: "PASS" | "OBJECTION";
    gapId: string;
    reviewedAt: string;
    reviewId: string;
    gapClaim: string;
    paperSet: string[];
    adversarialSearchQuery: string;
    counterEvidence: string[];
    objections: string[];
    iteration: number;
    confidence?: number | undefined;
    objectionStrength?: number | undefined;
}>;
export type ReviewResult = z.infer<typeof ReviewResultSchema>;
export declare const VerdictSchema: z.ZodObject<{
    verdictId: z.ZodString;
    gapId: z.ZodString;
    finalVerdict: z.ZodEnum<["PASS", "CONDITIONAL", "REJECT"]>;
    resilienceScore: z.ZodNumber;
    objectionStrength: z.ZodNumber;
    closestPriorYear: z.ZodOptional<z.ZodNumber>;
    citationDensity: z.ZodOptional<z.ZodNumber>;
    reasoning: z.ZodString;
    iterations: z.ZodNumber;
    objections: z.ZodArray<z.ZodString, "many">;
    decidedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    resilienceScore: number;
    gapId: string;
    objections: string[];
    objectionStrength: number;
    verdictId: string;
    finalVerdict: "PASS" | "CONDITIONAL" | "REJECT";
    reasoning: string;
    iterations: number;
    decidedAt: string;
    closestPriorYear?: number | undefined;
    citationDensity?: number | undefined;
}, {
    resilienceScore: number;
    gapId: string;
    objections: string[];
    objectionStrength: number;
    verdictId: string;
    finalVerdict: "PASS" | "CONDITIONAL" | "REJECT";
    reasoning: string;
    iterations: number;
    decidedAt: string;
    closestPriorYear?: number | undefined;
    citationDensity?: number | undefined;
}>;
export type Verdict = z.infer<typeof VerdictSchema>;
export declare const AnalogySchema: z.ZodObject<{
    analogyId: z.ZodString;
    sourceDomain: z.ZodString;
    targetDomain: z.ZodString;
    sourceTechnique: z.ZodString;
    targetApplication: z.ZodString;
    similarityScore: z.ZodNumber;
    transferability: z.ZodEnum<["high", "medium", "low"]>;
    verificationNotes: z.ZodOptional<z.ZodString>;
    discoveredAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    analogyId: string;
    sourceDomain: string;
    targetDomain: string;
    sourceTechnique: string;
    targetApplication: string;
    similarityScore: number;
    transferability: "low" | "medium" | "high";
    discoveredAt: string;
    verificationNotes?: string | undefined;
}, {
    analogyId: string;
    sourceDomain: string;
    targetDomain: string;
    sourceTechnique: string;
    targetApplication: string;
    similarityScore: number;
    transferability: "low" | "medium" | "high";
    discoveredAt: string;
    verificationNotes?: string | undefined;
}>;
export type Analogy = z.infer<typeof AnalogySchema>;
export declare const CitationSchema: z.ZodObject<{
    citationId: z.ZodString;
    paperId: z.ZodString;
    style: z.ZodEnum<["IEEE", "APA", "MLA"]>;
    formatted: z.ZodString;
    bibtex: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    paperId: string;
    createdAt: string;
    citationId: string;
    style: "IEEE" | "APA" | "MLA";
    formatted: string;
    bibtex?: string | undefined;
}, {
    paperId: string;
    createdAt: string;
    citationId: string;
    style: "IEEE" | "APA" | "MLA";
    formatted: string;
    bibtex?: string | undefined;
}>;
export type Citation = z.infer<typeof CitationSchema>;
export declare const WritingCheckSchema: z.ZodObject<{
    checkId: z.ZodString;
    section: z.ZodString;
    originalText: z.ZodString;
    checkType: z.ZodEnum<["tone", "ai-generic", "meaning-preserved", "clarity"]>;
    passed: z.ZodBoolean;
    issues: z.ZodArray<z.ZodString, "many">;
    suggestions: z.ZodArray<z.ZodString, "many">;
    checkedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    issues: string[];
    passed: boolean;
    checkId: string;
    section: string;
    originalText: string;
    checkType: "tone" | "ai-generic" | "meaning-preserved" | "clarity";
    suggestions: string[];
    checkedAt: string;
}, {
    issues: string[];
    passed: boolean;
    checkId: string;
    section: string;
    originalText: string;
    checkType: "tone" | "ai-generic" | "meaning-preserved" | "clarity";
    suggestions: string[];
    checkedAt: string;
}>;
export type WritingCheck = z.infer<typeof WritingCheckSchema>;
export declare const VerificationCheckSchema: z.ZodObject<{
    checkId: z.ZodString;
    claimId: z.ZodString;
    checkType: z.ZodEnum<["claim-support", "citation-accuracy", "methodology-consistency", "statistical-validity"]>;
    passed: z.ZodBoolean;
    detail: z.ZodString;
    evidence: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    checkedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    claimId: string;
    evidence: string[];
    passed: boolean;
    checkId: string;
    checkType: "claim-support" | "citation-accuracy" | "methodology-consistency" | "statistical-validity";
    checkedAt: string;
    detail: string;
}, {
    claimId: string;
    passed: boolean;
    checkId: string;
    checkType: "claim-support" | "citation-accuracy" | "methodology-consistency" | "statistical-validity";
    checkedAt: string;
    detail: string;
    evidence?: string[] | undefined;
}>;
export type VerificationCheck = z.infer<typeof VerificationCheckSchema>;
export declare const KnowledgeGraphEdgeSchema: z.ZodObject<{
    subject: z.ZodString;
    relation: z.ZodString;
    object: z.ZodString;
    weight: z.ZodDefault<z.ZodNumber>;
    source: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    object: string;
    createdAt: string;
    subject: string;
    relation: string;
    weight: number;
    source?: string | undefined;
}, {
    object: string;
    createdAt: string;
    subject: string;
    relation: string;
    weight?: number | undefined;
    source?: string | undefined;
}>;
export type KnowledgeGraphEdge = z.infer<typeof KnowledgeGraphEdgeSchema>;
export declare const SessionSchema: z.ZodObject<{
    sessionId: z.ZodString;
    topic: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<["active", "completed", "archived"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    priorWork: z.ZodDefault<z.ZodObject<{
        papers: z.ZodDefault<z.ZodArray<z.ZodObject<{
            paperId: z.ZodString;
            title: z.ZodString;
            authors: z.ZodArray<z.ZodString, "many">;
            year: z.ZodNumber;
            venue: z.ZodOptional<z.ZodString>;
            abstract: z.ZodOptional<z.ZodString>;
            doi: z.ZodOptional<z.ZodString>;
            url: z.ZodOptional<z.ZodString>;
            citationCount: z.ZodDefault<z.ZodNumber>;
            quartile: z.ZodDefault<z.ZodEnum<["Q1", "Q2", "Q3", "Q4", "unknown"]>>;
            fieldsOfStudy: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            pdfUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            isOpenAccess: z.ZodDefault<z.ZodBoolean>;
            extractedAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            paperId: string;
            title: string;
            authors: string[];
            year: number;
            citationCount: number;
            quartile: "unknown" | "Q1" | "Q2" | "Q3" | "Q4";
            fieldsOfStudy: string[];
            isOpenAccess: boolean;
            venue?: string | undefined;
            abstract?: string | undefined;
            doi?: string | undefined;
            url?: string | undefined;
            pdfUrl?: string | null | undefined;
            extractedAt?: string | undefined;
        }, {
            paperId: string;
            title: string;
            authors: string[];
            year: number;
            venue?: string | undefined;
            abstract?: string | undefined;
            doi?: string | undefined;
            url?: string | undefined;
            citationCount?: number | undefined;
            quartile?: "unknown" | "Q1" | "Q2" | "Q3" | "Q4" | undefined;
            fieldsOfStudy?: string[] | undefined;
            pdfUrl?: string | null | undefined;
            isOpenAccess?: boolean | undefined;
            extractedAt?: string | undefined;
        }>, "many">>;
        repos: z.ZodDefault<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            stars: z.ZodDefault<z.ZodNumber>;
            language: z.ZodOptional<z.ZodString>;
            updatedAt: z.ZodOptional<z.ZodString>;
            relevanceScore: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            name: string;
            stars: number;
            description?: string | null | undefined;
            language?: string | undefined;
            updatedAt?: string | undefined;
            relevanceScore?: number | undefined;
        }, {
            url: string;
            name: string;
            description?: string | null | undefined;
            stars?: number | undefined;
            language?: string | undefined;
            updatedAt?: string | undefined;
            relevanceScore?: number | undefined;
        }>, "many">>;
        priorSessions: z.ZodDefault<z.ZodArray<z.ZodObject<{
            sessionId: z.ZodString;
            topic: z.ZodString;
            verdict: z.ZodOptional<z.ZodEnum<["PASS", "CONDITIONAL", "REJECT"]>>;
            resilienceScore: z.ZodOptional<z.ZodNumber>;
            createdAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            sessionId: string;
            topic: string;
            createdAt: string;
            verdict?: "PASS" | "CONDITIONAL" | "REJECT" | undefined;
            resilienceScore?: number | undefined;
        }, {
            sessionId: string;
            topic: string;
            createdAt: string;
            verdict?: "PASS" | "CONDITIONAL" | "REJECT" | undefined;
            resilienceScore?: number | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        papers: {
            paperId: string;
            title: string;
            authors: string[];
            year: number;
            citationCount: number;
            quartile: "unknown" | "Q1" | "Q2" | "Q3" | "Q4";
            fieldsOfStudy: string[];
            isOpenAccess: boolean;
            venue?: string | undefined;
            abstract?: string | undefined;
            doi?: string | undefined;
            url?: string | undefined;
            pdfUrl?: string | null | undefined;
            extractedAt?: string | undefined;
        }[];
        repos: {
            url: string;
            name: string;
            stars: number;
            description?: string | null | undefined;
            language?: string | undefined;
            updatedAt?: string | undefined;
            relevanceScore?: number | undefined;
        }[];
        priorSessions: {
            sessionId: string;
            topic: string;
            createdAt: string;
            verdict?: "PASS" | "CONDITIONAL" | "REJECT" | undefined;
            resilienceScore?: number | undefined;
        }[];
    }, {
        papers?: {
            paperId: string;
            title: string;
            authors: string[];
            year: number;
            venue?: string | undefined;
            abstract?: string | undefined;
            doi?: string | undefined;
            url?: string | undefined;
            citationCount?: number | undefined;
            quartile?: "unknown" | "Q1" | "Q2" | "Q3" | "Q4" | undefined;
            fieldsOfStudy?: string[] | undefined;
            pdfUrl?: string | null | undefined;
            isOpenAccess?: boolean | undefined;
            extractedAt?: string | undefined;
        }[] | undefined;
        repos?: {
            url: string;
            name: string;
            description?: string | null | undefined;
            stars?: number | undefined;
            language?: string | undefined;
            updatedAt?: string | undefined;
            relevanceScore?: number | undefined;
        }[] | undefined;
        priorSessions?: {
            sessionId: string;
            topic: string;
            createdAt: string;
            verdict?: "PASS" | "CONDITIONAL" | "REJECT" | undefined;
            resilienceScore?: number | undefined;
        }[] | undefined;
    }>>;
    papers: z.ZodDefault<z.ZodArray<z.ZodObject<{
        paperId: z.ZodString;
        title: z.ZodString;
        authors: z.ZodArray<z.ZodString, "many">;
        year: z.ZodNumber;
        venue: z.ZodOptional<z.ZodString>;
        abstract: z.ZodOptional<z.ZodString>;
        doi: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        citationCount: z.ZodDefault<z.ZodNumber>;
        quartile: z.ZodDefault<z.ZodEnum<["Q1", "Q2", "Q3", "Q4", "unknown"]>>;
        fieldsOfStudy: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        pdfUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        isOpenAccess: z.ZodDefault<z.ZodBoolean>;
        extractedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        paperId: string;
        title: string;
        authors: string[];
        year: number;
        citationCount: number;
        quartile: "unknown" | "Q1" | "Q2" | "Q3" | "Q4";
        fieldsOfStudy: string[];
        isOpenAccess: boolean;
        venue?: string | undefined;
        abstract?: string | undefined;
        doi?: string | undefined;
        url?: string | undefined;
        pdfUrl?: string | null | undefined;
        extractedAt?: string | undefined;
    }, {
        paperId: string;
        title: string;
        authors: string[];
        year: number;
        venue?: string | undefined;
        abstract?: string | undefined;
        doi?: string | undefined;
        url?: string | undefined;
        citationCount?: number | undefined;
        quartile?: "unknown" | "Q1" | "Q2" | "Q3" | "Q4" | undefined;
        fieldsOfStudy?: string[] | undefined;
        pdfUrl?: string | null | undefined;
        isOpenAccess?: boolean | undefined;
        extractedAt?: string | undefined;
    }>, "many">>;
    claims: z.ZodDefault<z.ZodArray<z.ZodObject<{
        claimId: z.ZodString;
        paperId: z.ZodString;
        text: z.ZodString;
        type: z.ZodEnum<["finding", "method", "limitation", "assumption", "hypothesis", "result"]>;
        confidence: z.ZodDefault<z.ZodNumber>;
        evidence: z.ZodOptional<z.ZodString>;
        extractedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
        paperId: string;
        extractedAt: string;
        claimId: string;
        text: string;
        confidence: number;
        evidence?: string | undefined;
    }, {
        type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
        paperId: string;
        extractedAt: string;
        claimId: string;
        text: string;
        confidence?: number | undefined;
        evidence?: string | undefined;
    }>, "many">>;
    methodologies: z.ZodDefault<z.ZodArray<z.ZodObject<{
        methodologyId: z.ZodString;
        paperId: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        category: z.ZodEnum<["experimental", "theoretical", "simulation", "survey", "literature-review", "other"]>;
        keyComponents: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        datasets: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        metrics: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        extractedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        paperId: string;
        extractedAt: string;
        name: string;
        description: string;
        methodologyId: string;
        category: "experimental" | "theoretical" | "simulation" | "survey" | "literature-review" | "other";
        keyComponents: string[];
        datasets: string[];
        metrics: string[];
    }, {
        paperId: string;
        extractedAt: string;
        name: string;
        description: string;
        methodologyId: string;
        category: "experimental" | "theoretical" | "simulation" | "survey" | "literature-review" | "other";
        keyComponents?: string[] | undefined;
        datasets?: string[] | undefined;
        metrics?: string[] | undefined;
    }>, "many">>;
    datasets: z.ZodDefault<z.ZodArray<z.ZodObject<{
        datasetId: z.ZodString;
        paperId: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodString>;
        domain: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        paperId: string;
        name: string;
        datasetId: string;
        url?: string | undefined;
        description?: string | undefined;
        size?: string | undefined;
        domain?: string | undefined;
    }, {
        paperId: string;
        name: string;
        datasetId: string;
        url?: string | undefined;
        description?: string | undefined;
        size?: string | undefined;
        domain?: string | undefined;
    }>, "many">>;
    metrics: z.ZodDefault<z.ZodArray<z.ZodObject<{
        metricId: z.ZodString;
        paperId: z.ZodString;
        name: z.ZodString;
        value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        unit: z.ZodOptional<z.ZodString>;
        baseline: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        paperId: string;
        name: string;
        metricId: string;
        value?: string | number | undefined;
        unit?: string | undefined;
        baseline?: string | undefined;
    }, {
        paperId: string;
        name: string;
        metricId: string;
        value?: string | number | undefined;
        unit?: string | undefined;
        baseline?: string | undefined;
    }>, "many">>;
    technicalParams: z.ZodDefault<z.ZodArray<z.ZodObject<{
        paramsId: z.ZodString;
        paperId: z.ZodString;
        sensors: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        samplingRateHz: z.ZodOptional<z.ZodNumber>;
        datasetSize: z.ZodOptional<z.ZodNumber>;
        hardwarePlatform: z.ZodOptional<z.ZodString>;
        powerBudgetMw: z.ZodOptional<z.ZodNumber>;
        latencyMs: z.ZodOptional<z.ZodNumber>;
        throughput: z.ZodOptional<z.ZodString>;
        other: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        extractedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        paperId: string;
        extractedAt: string;
        other: Record<string, unknown>;
        paramsId: string;
        sensors: string[];
        samplingRateHz?: number | undefined;
        datasetSize?: number | undefined;
        hardwarePlatform?: string | undefined;
        powerBudgetMw?: number | undefined;
        latencyMs?: number | undefined;
        throughput?: string | undefined;
    }, {
        paperId: string;
        extractedAt: string;
        paramsId: string;
        other?: Record<string, unknown> | undefined;
        sensors?: string[] | undefined;
        samplingRateHz?: number | undefined;
        datasetSize?: number | undefined;
        hardwarePlatform?: string | undefined;
        powerBudgetMw?: number | undefined;
        latencyMs?: number | undefined;
        throughput?: string | undefined;
    }>, "many">>;
    clusters: z.ZodDefault<z.ZodArray<z.ZodObject<{
        clusterId: z.ZodString;
        label: z.ZodString;
        paperIds: z.ZodArray<z.ZodString, "many">;
        centroid: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        summary: z.ZodOptional<z.ZodString>;
        keyThemes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        clusterId: string;
        label: string;
        paperIds: string[];
        keyThemes: string[];
        centroid?: number[] | undefined;
        summary?: string | undefined;
    }, {
        createdAt: string;
        clusterId: string;
        label: string;
        paperIds: string[];
        centroid?: number[] | undefined;
        summary?: string | undefined;
        keyThemes?: string[] | undefined;
    }>, "many">>;
    contradictions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        contradictionId: z.ZodString;
        claimA: z.ZodObject<{
            claimId: z.ZodString;
            paperId: z.ZodString;
            text: z.ZodString;
            type: z.ZodEnum<["finding", "method", "limitation", "assumption", "hypothesis", "result"]>;
            confidence: z.ZodDefault<z.ZodNumber>;
            evidence: z.ZodOptional<z.ZodString>;
            extractedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
            paperId: string;
            extractedAt: string;
            claimId: string;
            text: string;
            confidence: number;
            evidence?: string | undefined;
        }, {
            type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
            paperId: string;
            extractedAt: string;
            claimId: string;
            text: string;
            confidence?: number | undefined;
            evidence?: string | undefined;
        }>;
        claimB: z.ZodObject<{
            claimId: z.ZodString;
            paperId: z.ZodString;
            text: z.ZodString;
            type: z.ZodEnum<["finding", "method", "limitation", "assumption", "hypothesis", "result"]>;
            confidence: z.ZodDefault<z.ZodNumber>;
            evidence: z.ZodOptional<z.ZodString>;
            extractedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
            paperId: string;
            extractedAt: string;
            claimId: string;
            text: string;
            confidence: number;
            evidence?: string | undefined;
        }, {
            type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
            paperId: string;
            extractedAt: string;
            claimId: string;
            text: string;
            confidence?: number | undefined;
            evidence?: string | undefined;
        }>;
        explanation: z.ZodString;
        severity: z.ZodEnum<["low", "medium", "high"]>;
        detectedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        contradictionId: string;
        claimA: {
            type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
            paperId: string;
            extractedAt: string;
            claimId: string;
            text: string;
            confidence: number;
            evidence?: string | undefined;
        };
        claimB: {
            type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
            paperId: string;
            extractedAt: string;
            claimId: string;
            text: string;
            confidence: number;
            evidence?: string | undefined;
        };
        explanation: string;
        severity: "low" | "medium" | "high";
        detectedAt: string;
    }, {
        contradictionId: string;
        claimA: {
            type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
            paperId: string;
            extractedAt: string;
            claimId: string;
            text: string;
            confidence?: number | undefined;
            evidence?: string | undefined;
        };
        claimB: {
            type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
            paperId: string;
            extractedAt: string;
            claimId: string;
            text: string;
            confidence?: number | undefined;
            evidence?: string | undefined;
        };
        explanation: string;
        severity: "low" | "medium" | "high";
        detectedAt: string;
    }>, "many">>;
    gaps: z.ZodDefault<z.ZodArray<z.ZodObject<{
        gapId: z.ZodString;
        claim: z.ZodString;
        evidence: z.ZodArray<z.ZodString, "many">;
        noveltyScore: z.ZodNumber;
        feasibility: z.ZodNumber;
        impact: z.ZodNumber;
        relatedPapers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        status: z.ZodDefault<z.ZodEnum<["proposed", "under-review", "passed", "rejected"]>>;
        proposedAt: z.ZodString;
        reviewedAt: z.ZodOptional<z.ZodString>;
        reviewIteration: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        status: "proposed" | "under-review" | "passed" | "rejected";
        evidence: string[];
        gapId: string;
        claim: string;
        noveltyScore: number;
        feasibility: number;
        impact: number;
        relatedPapers: string[];
        proposedAt: string;
        reviewIteration: number;
        reviewedAt?: string | undefined;
    }, {
        evidence: string[];
        gapId: string;
        claim: string;
        noveltyScore: number;
        feasibility: number;
        impact: number;
        proposedAt: string;
        status?: "proposed" | "under-review" | "passed" | "rejected" | undefined;
        relatedPapers?: string[] | undefined;
        reviewedAt?: string | undefined;
        reviewIteration?: number | undefined;
    }>, "many">>;
    reviews: z.ZodDefault<z.ZodArray<z.ZodObject<{
        reviewId: z.ZodString;
        gapId: z.ZodString;
        gapClaim: z.ZodString;
        paperSet: z.ZodArray<z.ZodString, "many">;
        adversarialSearchQuery: z.ZodString;
        counterEvidence: z.ZodArray<z.ZodString, "many">;
        verdict: z.ZodEnum<["PASS", "OBJECTION"]>;
        objections: z.ZodArray<z.ZodString, "many">;
        objectionStrength: z.ZodDefault<z.ZodNumber>;
        confidence: z.ZodDefault<z.ZodNumber>;
        reviewedAt: z.ZodString;
        iteration: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        verdict: "PASS" | "OBJECTION";
        confidence: number;
        gapId: string;
        reviewedAt: string;
        reviewId: string;
        gapClaim: string;
        paperSet: string[];
        adversarialSearchQuery: string;
        counterEvidence: string[];
        objections: string[];
        objectionStrength: number;
        iteration: number;
    }, {
        verdict: "PASS" | "OBJECTION";
        gapId: string;
        reviewedAt: string;
        reviewId: string;
        gapClaim: string;
        paperSet: string[];
        adversarialSearchQuery: string;
        counterEvidence: string[];
        objections: string[];
        iteration: number;
        confidence?: number | undefined;
        objectionStrength?: number | undefined;
    }>, "many">>;
    verdicts: z.ZodDefault<z.ZodArray<z.ZodObject<{
        verdictId: z.ZodString;
        gapId: z.ZodString;
        finalVerdict: z.ZodEnum<["PASS", "CONDITIONAL", "REJECT"]>;
        resilienceScore: z.ZodNumber;
        objectionStrength: z.ZodNumber;
        closestPriorYear: z.ZodOptional<z.ZodNumber>;
        citationDensity: z.ZodOptional<z.ZodNumber>;
        reasoning: z.ZodString;
        iterations: z.ZodNumber;
        objections: z.ZodArray<z.ZodString, "many">;
        decidedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        resilienceScore: number;
        gapId: string;
        objections: string[];
        objectionStrength: number;
        verdictId: string;
        finalVerdict: "PASS" | "CONDITIONAL" | "REJECT";
        reasoning: string;
        iterations: number;
        decidedAt: string;
        closestPriorYear?: number | undefined;
        citationDensity?: number | undefined;
    }, {
        resilienceScore: number;
        gapId: string;
        objections: string[];
        objectionStrength: number;
        verdictId: string;
        finalVerdict: "PASS" | "CONDITIONAL" | "REJECT";
        reasoning: string;
        iterations: number;
        decidedAt: string;
        closestPriorYear?: number | undefined;
        citationDensity?: number | undefined;
    }>, "many">>;
    analogies: z.ZodDefault<z.ZodArray<z.ZodObject<{
        analogyId: z.ZodString;
        sourceDomain: z.ZodString;
        targetDomain: z.ZodString;
        sourceTechnique: z.ZodString;
        targetApplication: z.ZodString;
        similarityScore: z.ZodNumber;
        transferability: z.ZodEnum<["high", "medium", "low"]>;
        verificationNotes: z.ZodOptional<z.ZodString>;
        discoveredAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        analogyId: string;
        sourceDomain: string;
        targetDomain: string;
        sourceTechnique: string;
        targetApplication: string;
        similarityScore: number;
        transferability: "low" | "medium" | "high";
        discoveredAt: string;
        verificationNotes?: string | undefined;
    }, {
        analogyId: string;
        sourceDomain: string;
        targetDomain: string;
        sourceTechnique: string;
        targetApplication: string;
        similarityScore: number;
        transferability: "low" | "medium" | "high";
        discoveredAt: string;
        verificationNotes?: string | undefined;
    }>, "many">>;
    citations: z.ZodDefault<z.ZodArray<z.ZodObject<{
        citationId: z.ZodString;
        paperId: z.ZodString;
        style: z.ZodEnum<["IEEE", "APA", "MLA"]>;
        formatted: z.ZodString;
        bibtex: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        paperId: string;
        createdAt: string;
        citationId: string;
        style: "IEEE" | "APA" | "MLA";
        formatted: string;
        bibtex?: string | undefined;
    }, {
        paperId: string;
        createdAt: string;
        citationId: string;
        style: "IEEE" | "APA" | "MLA";
        formatted: string;
        bibtex?: string | undefined;
    }>, "many">>;
    writingChecks: z.ZodDefault<z.ZodArray<z.ZodObject<{
        checkId: z.ZodString;
        section: z.ZodString;
        originalText: z.ZodString;
        checkType: z.ZodEnum<["tone", "ai-generic", "meaning-preserved", "clarity"]>;
        passed: z.ZodBoolean;
        issues: z.ZodArray<z.ZodString, "many">;
        suggestions: z.ZodArray<z.ZodString, "many">;
        checkedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        issues: string[];
        passed: boolean;
        checkId: string;
        section: string;
        originalText: string;
        checkType: "tone" | "ai-generic" | "meaning-preserved" | "clarity";
        suggestions: string[];
        checkedAt: string;
    }, {
        issues: string[];
        passed: boolean;
        checkId: string;
        section: string;
        originalText: string;
        checkType: "tone" | "ai-generic" | "meaning-preserved" | "clarity";
        suggestions: string[];
        checkedAt: string;
    }>, "many">>;
    verificationChecks: z.ZodDefault<z.ZodArray<z.ZodObject<{
        checkId: z.ZodString;
        claimId: z.ZodString;
        checkType: z.ZodEnum<["claim-support", "citation-accuracy", "methodology-consistency", "statistical-validity"]>;
        passed: z.ZodBoolean;
        detail: z.ZodString;
        evidence: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        checkedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        claimId: string;
        evidence: string[];
        passed: boolean;
        checkId: string;
        checkType: "claim-support" | "citation-accuracy" | "methodology-consistency" | "statistical-validity";
        checkedAt: string;
        detail: string;
    }, {
        claimId: string;
        passed: boolean;
        checkId: string;
        checkType: "claim-support" | "citation-accuracy" | "methodology-consistency" | "statistical-validity";
        checkedAt: string;
        detail: string;
        evidence?: string[] | undefined;
    }>, "many">>;
    knowledgeGraph: z.ZodDefault<z.ZodArray<z.ZodObject<{
        subject: z.ZodString;
        relation: z.ZodString;
        object: z.ZodString;
        weight: z.ZodDefault<z.ZodNumber>;
        source: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        object: string;
        createdAt: string;
        subject: string;
        relation: string;
        weight: number;
        source?: string | undefined;
    }, {
        object: string;
        createdAt: string;
        subject: string;
        relation: string;
        weight?: number | undefined;
        source?: string | undefined;
    }>, "many">>;
    overleafProjectId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "completed" | "archived";
    updatedAt: string;
    sessionId: string;
    topic: string;
    createdAt: string;
    datasets: {
        paperId: string;
        name: string;
        datasetId: string;
        url?: string | undefined;
        description?: string | undefined;
        size?: string | undefined;
        domain?: string | undefined;
    }[];
    metrics: {
        paperId: string;
        name: string;
        metricId: string;
        value?: string | number | undefined;
        unit?: string | undefined;
        baseline?: string | undefined;
    }[];
    papers: {
        paperId: string;
        title: string;
        authors: string[];
        year: number;
        citationCount: number;
        quartile: "unknown" | "Q1" | "Q2" | "Q3" | "Q4";
        fieldsOfStudy: string[];
        isOpenAccess: boolean;
        venue?: string | undefined;
        abstract?: string | undefined;
        doi?: string | undefined;
        url?: string | undefined;
        pdfUrl?: string | null | undefined;
        extractedAt?: string | undefined;
    }[];
    priorWork: {
        papers: {
            paperId: string;
            title: string;
            authors: string[];
            year: number;
            citationCount: number;
            quartile: "unknown" | "Q1" | "Q2" | "Q3" | "Q4";
            fieldsOfStudy: string[];
            isOpenAccess: boolean;
            venue?: string | undefined;
            abstract?: string | undefined;
            doi?: string | undefined;
            url?: string | undefined;
            pdfUrl?: string | null | undefined;
            extractedAt?: string | undefined;
        }[];
        repos: {
            url: string;
            name: string;
            stars: number;
            description?: string | null | undefined;
            language?: string | undefined;
            updatedAt?: string | undefined;
            relevanceScore?: number | undefined;
        }[];
        priorSessions: {
            sessionId: string;
            topic: string;
            createdAt: string;
            verdict?: "PASS" | "CONDITIONAL" | "REJECT" | undefined;
            resilienceScore?: number | undefined;
        }[];
    };
    claims: {
        type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
        paperId: string;
        extractedAt: string;
        claimId: string;
        text: string;
        confidence: number;
        evidence?: string | undefined;
    }[];
    methodologies: {
        paperId: string;
        extractedAt: string;
        name: string;
        description: string;
        methodologyId: string;
        category: "experimental" | "theoretical" | "simulation" | "survey" | "literature-review" | "other";
        keyComponents: string[];
        datasets: string[];
        metrics: string[];
    }[];
    technicalParams: {
        paperId: string;
        extractedAt: string;
        other: Record<string, unknown>;
        paramsId: string;
        sensors: string[];
        samplingRateHz?: number | undefined;
        datasetSize?: number | undefined;
        hardwarePlatform?: string | undefined;
        powerBudgetMw?: number | undefined;
        latencyMs?: number | undefined;
        throughput?: string | undefined;
    }[];
    clusters: {
        createdAt: string;
        clusterId: string;
        label: string;
        paperIds: string[];
        keyThemes: string[];
        centroid?: number[] | undefined;
        summary?: string | undefined;
    }[];
    contradictions: {
        contradictionId: string;
        claimA: {
            type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
            paperId: string;
            extractedAt: string;
            claimId: string;
            text: string;
            confidence: number;
            evidence?: string | undefined;
        };
        claimB: {
            type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
            paperId: string;
            extractedAt: string;
            claimId: string;
            text: string;
            confidence: number;
            evidence?: string | undefined;
        };
        explanation: string;
        severity: "low" | "medium" | "high";
        detectedAt: string;
    }[];
    gaps: {
        status: "proposed" | "under-review" | "passed" | "rejected";
        evidence: string[];
        gapId: string;
        claim: string;
        noveltyScore: number;
        feasibility: number;
        impact: number;
        relatedPapers: string[];
        proposedAt: string;
        reviewIteration: number;
        reviewedAt?: string | undefined;
    }[];
    reviews: {
        verdict: "PASS" | "OBJECTION";
        confidence: number;
        gapId: string;
        reviewedAt: string;
        reviewId: string;
        gapClaim: string;
        paperSet: string[];
        adversarialSearchQuery: string;
        counterEvidence: string[];
        objections: string[];
        objectionStrength: number;
        iteration: number;
    }[];
    verdicts: {
        resilienceScore: number;
        gapId: string;
        objections: string[];
        objectionStrength: number;
        verdictId: string;
        finalVerdict: "PASS" | "CONDITIONAL" | "REJECT";
        reasoning: string;
        iterations: number;
        decidedAt: string;
        closestPriorYear?: number | undefined;
        citationDensity?: number | undefined;
    }[];
    analogies: {
        analogyId: string;
        sourceDomain: string;
        targetDomain: string;
        sourceTechnique: string;
        targetApplication: string;
        similarityScore: number;
        transferability: "low" | "medium" | "high";
        discoveredAt: string;
        verificationNotes?: string | undefined;
    }[];
    citations: {
        paperId: string;
        createdAt: string;
        citationId: string;
        style: "IEEE" | "APA" | "MLA";
        formatted: string;
        bibtex?: string | undefined;
    }[];
    writingChecks: {
        issues: string[];
        passed: boolean;
        checkId: string;
        section: string;
        originalText: string;
        checkType: "tone" | "ai-generic" | "meaning-preserved" | "clarity";
        suggestions: string[];
        checkedAt: string;
    }[];
    verificationChecks: {
        claimId: string;
        evidence: string[];
        passed: boolean;
        checkId: string;
        checkType: "claim-support" | "citation-accuracy" | "methodology-consistency" | "statistical-validity";
        checkedAt: string;
        detail: string;
    }[];
    knowledgeGraph: {
        object: string;
        createdAt: string;
        subject: string;
        relation: string;
        weight: number;
        source?: string | undefined;
    }[];
    overleafProjectId?: string | undefined;
}, {
    updatedAt: string;
    sessionId: string;
    topic: string;
    createdAt: string;
    status?: "active" | "completed" | "archived" | undefined;
    datasets?: {
        paperId: string;
        name: string;
        datasetId: string;
        url?: string | undefined;
        description?: string | undefined;
        size?: string | undefined;
        domain?: string | undefined;
    }[] | undefined;
    metrics?: {
        paperId: string;
        name: string;
        metricId: string;
        value?: string | number | undefined;
        unit?: string | undefined;
        baseline?: string | undefined;
    }[] | undefined;
    papers?: {
        paperId: string;
        title: string;
        authors: string[];
        year: number;
        venue?: string | undefined;
        abstract?: string | undefined;
        doi?: string | undefined;
        url?: string | undefined;
        citationCount?: number | undefined;
        quartile?: "unknown" | "Q1" | "Q2" | "Q3" | "Q4" | undefined;
        fieldsOfStudy?: string[] | undefined;
        pdfUrl?: string | null | undefined;
        isOpenAccess?: boolean | undefined;
        extractedAt?: string | undefined;
    }[] | undefined;
    priorWork?: {
        papers?: {
            paperId: string;
            title: string;
            authors: string[];
            year: number;
            venue?: string | undefined;
            abstract?: string | undefined;
            doi?: string | undefined;
            url?: string | undefined;
            citationCount?: number | undefined;
            quartile?: "unknown" | "Q1" | "Q2" | "Q3" | "Q4" | undefined;
            fieldsOfStudy?: string[] | undefined;
            pdfUrl?: string | null | undefined;
            isOpenAccess?: boolean | undefined;
            extractedAt?: string | undefined;
        }[] | undefined;
        repos?: {
            url: string;
            name: string;
            description?: string | null | undefined;
            stars?: number | undefined;
            language?: string | undefined;
            updatedAt?: string | undefined;
            relevanceScore?: number | undefined;
        }[] | undefined;
        priorSessions?: {
            sessionId: string;
            topic: string;
            createdAt: string;
            verdict?: "PASS" | "CONDITIONAL" | "REJECT" | undefined;
            resilienceScore?: number | undefined;
        }[] | undefined;
    } | undefined;
    claims?: {
        type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
        paperId: string;
        extractedAt: string;
        claimId: string;
        text: string;
        confidence?: number | undefined;
        evidence?: string | undefined;
    }[] | undefined;
    methodologies?: {
        paperId: string;
        extractedAt: string;
        name: string;
        description: string;
        methodologyId: string;
        category: "experimental" | "theoretical" | "simulation" | "survey" | "literature-review" | "other";
        keyComponents?: string[] | undefined;
        datasets?: string[] | undefined;
        metrics?: string[] | undefined;
    }[] | undefined;
    technicalParams?: {
        paperId: string;
        extractedAt: string;
        paramsId: string;
        other?: Record<string, unknown> | undefined;
        sensors?: string[] | undefined;
        samplingRateHz?: number | undefined;
        datasetSize?: number | undefined;
        hardwarePlatform?: string | undefined;
        powerBudgetMw?: number | undefined;
        latencyMs?: number | undefined;
        throughput?: string | undefined;
    }[] | undefined;
    clusters?: {
        createdAt: string;
        clusterId: string;
        label: string;
        paperIds: string[];
        centroid?: number[] | undefined;
        summary?: string | undefined;
        keyThemes?: string[] | undefined;
    }[] | undefined;
    contradictions?: {
        contradictionId: string;
        claimA: {
            type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
            paperId: string;
            extractedAt: string;
            claimId: string;
            text: string;
            confidence?: number | undefined;
            evidence?: string | undefined;
        };
        claimB: {
            type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
            paperId: string;
            extractedAt: string;
            claimId: string;
            text: string;
            confidence?: number | undefined;
            evidence?: string | undefined;
        };
        explanation: string;
        severity: "low" | "medium" | "high";
        detectedAt: string;
    }[] | undefined;
    gaps?: {
        evidence: string[];
        gapId: string;
        claim: string;
        noveltyScore: number;
        feasibility: number;
        impact: number;
        proposedAt: string;
        status?: "proposed" | "under-review" | "passed" | "rejected" | undefined;
        relatedPapers?: string[] | undefined;
        reviewedAt?: string | undefined;
        reviewIteration?: number | undefined;
    }[] | undefined;
    reviews?: {
        verdict: "PASS" | "OBJECTION";
        gapId: string;
        reviewedAt: string;
        reviewId: string;
        gapClaim: string;
        paperSet: string[];
        adversarialSearchQuery: string;
        counterEvidence: string[];
        objections: string[];
        iteration: number;
        confidence?: number | undefined;
        objectionStrength?: number | undefined;
    }[] | undefined;
    verdicts?: {
        resilienceScore: number;
        gapId: string;
        objections: string[];
        objectionStrength: number;
        verdictId: string;
        finalVerdict: "PASS" | "CONDITIONAL" | "REJECT";
        reasoning: string;
        iterations: number;
        decidedAt: string;
        closestPriorYear?: number | undefined;
        citationDensity?: number | undefined;
    }[] | undefined;
    analogies?: {
        analogyId: string;
        sourceDomain: string;
        targetDomain: string;
        sourceTechnique: string;
        targetApplication: string;
        similarityScore: number;
        transferability: "low" | "medium" | "high";
        discoveredAt: string;
        verificationNotes?: string | undefined;
    }[] | undefined;
    citations?: {
        paperId: string;
        createdAt: string;
        citationId: string;
        style: "IEEE" | "APA" | "MLA";
        formatted: string;
        bibtex?: string | undefined;
    }[] | undefined;
    writingChecks?: {
        issues: string[];
        passed: boolean;
        checkId: string;
        section: string;
        originalText: string;
        checkType: "tone" | "ai-generic" | "meaning-preserved" | "clarity";
        suggestions: string[];
        checkedAt: string;
    }[] | undefined;
    verificationChecks?: {
        claimId: string;
        passed: boolean;
        checkId: string;
        checkType: "claim-support" | "citation-accuracy" | "methodology-consistency" | "statistical-validity";
        checkedAt: string;
        detail: string;
        evidence?: string[] | undefined;
    }[] | undefined;
    knowledgeGraph?: {
        object: string;
        createdAt: string;
        subject: string;
        relation: string;
        weight?: number | undefined;
        source?: string | undefined;
    }[] | undefined;
    overleafProjectId?: string | undefined;
}>;
export type Session = z.infer<typeof SessionSchema>;
export declare const SearchPapersInputSchema: z.ZodObject<{
    query: z.ZodString;
    yearFrom: z.ZodOptional<z.ZodNumber>;
    yearTo: z.ZodOptional<z.ZodNumber>;
    venues: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    minCitations: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    query: string;
    limit: number;
    yearFrom?: number | undefined;
    yearTo?: number | undefined;
    venues?: string[] | undefined;
    minCitations?: number | undefined;
}, {
    query: string;
    yearFrom?: number | undefined;
    yearTo?: number | undefined;
    venues?: string[] | undefined;
    minCitations?: number | undefined;
    limit?: number | undefined;
}>;
export type SearchPapersInput = z.infer<typeof SearchPapersInputSchema>;
export declare const ScoreRelevanceInputSchema: z.ZodObject<{
    paperId: z.ZodString;
    researchQuestion: z.ZodString;
}, "strip", z.ZodTypeAny, {
    paperId: string;
    researchQuestion: string;
}, {
    paperId: string;
    researchQuestion: string;
}>;
export type ScoreRelevanceInput = z.infer<typeof ScoreRelevanceInputSchema>;
export declare const ExtractClaimsInputSchema: z.ZodObject<{
    paperId: z.ZodString;
    abstract: z.ZodString;
    fullText: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    paperId: string;
    abstract: string;
    fullText?: string | undefined;
}, {
    paperId: string;
    abstract: string;
    fullText?: string | undefined;
}>;
export type ExtractClaimsInput = z.infer<typeof ExtractClaimsInputSchema>;
export declare const ClusterPapersInputSchema: z.ZodObject<{
    paperIds: z.ZodArray<z.ZodString, "many">;
    numClusters: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    paperIds: string[];
    numClusters?: number | undefined;
}, {
    paperIds: string[];
    numClusters?: number | undefined;
}>;
export type ClusterPapersInput = z.infer<typeof ClusterPapersInputSchema>;
export declare const ProposeGapInputSchema: z.ZodObject<{
    topic: z.ZodString;
    priorArtSummary: z.ZodString;
    clusterThemes: z.ZodArray<z.ZodString, "many">;
    excludedPaperIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    topic: string;
    priorArtSummary: string;
    clusterThemes: string[];
    excludedPaperIds?: string[] | undefined;
}, {
    topic: string;
    priorArtSummary: string;
    clusterThemes: string[];
    excludedPaperIds?: string[] | undefined;
}>;
export type ProposeGapInput = z.infer<typeof ProposeGapInputSchema>;
export declare const AdversarialReviewInputSchema: z.ZodObject<{
    gapClaim: z.ZodString;
    paperSet: z.ZodArray<z.ZodString, "many">;
    iteration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    gapClaim: string;
    paperSet: string[];
    iteration: number;
}, {
    gapClaim: string;
    paperSet: string[];
    iteration: number;
}>;
export type AdversarialReviewInput = z.infer<typeof AdversarialReviewInputSchema>;
export declare const ComputeResilienceScoreInputSchema: z.ZodObject<{
    objectionStrength: z.ZodNumber;
    closestPriorAttemptYear: z.ZodOptional<z.ZodNumber>;
    citationDensity: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    objectionStrength: number;
    citationDensity?: number | undefined;
    closestPriorAttemptYear?: number | undefined;
}, {
    objectionStrength: number;
    citationDensity?: number | undefined;
    closestPriorAttemptYear?: number | undefined;
}>;
export type ComputeResilienceScoreInput = z.infer<typeof ComputeResilienceScoreInputSchema>;
export declare const FindAnalogsInputSchema: z.ZodObject<{
    technique: z.ZodString;
    sourceDomain: z.ZodString;
    targetDomain: z.ZodOptional<z.ZodString>;
    excludeDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    sourceDomain: string;
    limit: number;
    technique: string;
    targetDomain?: string | undefined;
    excludeDomains?: string[] | undefined;
}, {
    sourceDomain: string;
    technique: string;
    targetDomain?: string | undefined;
    limit?: number | undefined;
    excludeDomains?: string[] | undefined;
}>;
export type FindAnalogsInput = z.infer<typeof FindAnalogsInputSchema>;
export declare const GenerateCitationInputSchema: z.ZodObject<{
    paperId: z.ZodString;
    style: z.ZodEnum<["IEEE", "APA", "MLA"]>;
}, "strip", z.ZodTypeAny, {
    paperId: string;
    style: "IEEE" | "APA" | "MLA";
}, {
    paperId: string;
    style: "IEEE" | "APA" | "MLA";
}>;
export type GenerateCitationInput = z.infer<typeof GenerateCitationInputSchema>;
export declare const WritingCheckInputSchema: z.ZodObject<{
    section: z.ZodString;
    text: z.ZodString;
    checkTypes: z.ZodDefault<z.ZodArray<z.ZodEnum<["tone", "ai-generic", "meaning-preserved", "clarity"]>, "many">>;
    originalText: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    text: string;
    section: string;
    checkTypes: ("tone" | "ai-generic" | "meaning-preserved" | "clarity")[];
    originalText?: string | undefined;
}, {
    text: string;
    section: string;
    originalText?: string | undefined;
    checkTypes?: ("tone" | "ai-generic" | "meaning-preserved" | "clarity")[] | undefined;
}>;
export type WritingCheckInput = z.infer<typeof WritingCheckInputSchema>;
export declare const VerifyClaimInputSchema: z.ZodObject<{
    claim: z.ZodString;
    evidence: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    evidence: string[];
    claim: string;
}, {
    evidence: string[];
    claim: string;
}>;
export type VerifyClaimInput = z.infer<typeof VerifyClaimInputSchema>;
//# sourceMappingURL=session.schema.d.ts.map