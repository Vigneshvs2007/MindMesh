import { OnModuleInit, OnModuleDestroy } from '@nitrostack/core';
import { ConfigService } from '../config/config.service.js';
import { Session, Paper, Repo, PriorSession, Claim, Methodology, Dataset, Metric, TechnicalParams, Cluster, Contradiction, ResearchGap, ReviewResult, Verdict, Analogy, Citation, WritingCheck, VerificationCheck, KnowledgeGraphEdge } from './session.schema.js';
/**
 * Memory Store
 *
 * In-memory session storage with periodic JSON persistence.
 * Provides fast access for tool execution with durability across restarts.
 */
export declare class MemoryStore implements OnModuleInit, OnModuleDestroy {
    private config;
    private sessions;
    private persistTimer;
    private persistPath;
    private persistIntervalMs;
    constructor(config: ConfigService);
    onModuleInit(): void;
    onModuleDestroy(): void;
    /**
     * Load sessions from JSON file on startup
     */
    private loadFromDisk;
    /**
     * Save sessions to JSON file
     */
    private saveToDisk;
    private startPersistenceTimer;
    private stopPersistenceTimer;
    /**
     * Create a new session
     */
    createSession(sessionId: string, topic: string): Session;
    /**
     * Get a session by ID
     */
    getSession(sessionId: string): Session | undefined;
    /**
     * Get or create a session
     */
    getOrCreateSession(sessionId: string, topic: string): Session;
    /**
     * Update a session
     */
    updateSession(sessionId: string, updates: Partial<Session>): Session | undefined;
    /**
     * Delete a session
     */
    deleteSession(sessionId: string): boolean;
    /**
     * List all sessions (optional topic filter)
     */
    listSessions(topicFilter?: string): Session[];
    /**
     * Get all sessions as a Map
     */
    getAllSessions(): Map<string, Session>;
    /**
     * Find sessions by topic
     */
    findSessionsByTopic(topic: string): Session[];
    addPapers(sessionId: string, papers: Paper[]): Session | undefined;
    getPapers(sessionId: string): Paper[];
    getPaper(sessionId: string, paperId: string): Paper | undefined;
    hasPaper(sessionId: string, paperId: string): boolean;
    addRepos(sessionId: string, repos: Repo[]): Session | undefined;
    addClaims(sessionId: string, claims: Claim[]): Session | undefined;
    getClaims(sessionId: string, paperId?: string): Claim[];
    addMethodologies(sessionId: string, methodologies: Methodology[]): Session | undefined;
    getMethodologies(sessionId: string): Methodology[];
    addDatasets(sessionId: string, datasets: Dataset[]): Session | undefined;
    getDatasets(sessionId: string): Dataset[];
    addMetrics(sessionId: string, metrics: Metric[]): Session | undefined;
    getMetrics(sessionId: string): Metric[];
    addTechnicalParams(sessionId: string, params: TechnicalParams[]): Session | undefined;
    getTechnicalParams(sessionId: string): TechnicalParams[];
    addClusters(sessionId: string, clusters: Cluster[]): Session | undefined;
    getClusters(sessionId: string): Cluster[];
    addContradictions(sessionId: string, contradictions: Contradiction[]): Session | undefined;
    getContradictions(sessionId: string): Contradiction[];
    addGaps(sessionId: string, gaps: ResearchGap[]): Session | undefined;
    updateGap(sessionId: string, gapId: string, updates: Partial<ResearchGap>): ResearchGap | undefined;
    getGaps(sessionId: string): ResearchGap[];
    getGap(sessionId: string, gapId: string): ResearchGap | undefined;
    addReview(sessionId: string, review: ReviewResult): Session | undefined;
    getReviews(sessionId: string): ReviewResult[];
    getLatestReview(sessionId: string): ReviewResult | undefined;
    addVerdict(sessionId: string, verdict: Verdict): Session | undefined;
    getVerdicts(sessionId: string): Verdict[];
    getLatestVerdict(sessionId: string): Verdict | undefined;
    addAnalogies(sessionId: string, analogies: Analogy[]): Session | undefined;
    getAnalogies(sessionId: string): Analogy[];
    addCitations(sessionId: string, citations: Citation[]): Session | undefined;
    getCitations(sessionId: string): Citation[];
    addWritingChecks(sessionId: string, checks: WritingCheck[]): Session | undefined;
    getWritingChecks(sessionId: string): WritingCheck[];
    addVerificationChecks(sessionId: string, checks: VerificationCheck[]): Session | undefined;
    getVerificationChecks(sessionId: string): VerificationCheck[];
    addKnowledgeGraphEdges(sessionId: string, edges: KnowledgeGraphEdge[]): Session | undefined;
    getKnowledgeGraph(sessionId: string): KnowledgeGraphEdge[];
    setPriorWork(sessionId: string, papers: Paper[], repos: Repo[], priorSessions: PriorSession[]): Session | undefined;
    getPriorWork(sessionId: string): Session['priorWork'];
    setOverleafProjectId(sessionId: string, projectId: string): Session | undefined;
    getOverleafProjectId(sessionId: string): string | undefined;
    /**
     * Force immediate persistence
     */
    flush(): Promise<void>;
    /**
     * Get session count
     */
    getSessionCount(): number;
    /**
     * Clear all sessions (for testing)
     */
    clear(): void;
}
//# sourceMappingURL=memory.store.d.ts.map