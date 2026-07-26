var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '../config/config.service.js';
import { SessionSchema, } from './session.schema.js';
/**
 * Memory Store
 *
 * In-memory session storage with periodic JSON persistence.
 * Provides fast access for tool execution with durability across restarts.
 */
let MemoryStore = class MemoryStore {
    config;
    sessions = new Map();
    persistTimer = null;
    persistPath;
    persistIntervalMs;
    constructor(config) {
        this.config = config;
        const memConfig = config.getMemoryConfig();
        this.persistPath = memConfig.persistPath;
        this.persistIntervalMs = memConfig.intervalMs;
    }
    onModuleInit() {
        this.loadFromDisk();
        this.startPersistenceTimer();
    }
    onModuleDestroy() {
        this.stopPersistenceTimer();
        this.saveToDisk();
    }
    /**
     * Load sessions from JSON file on startup
     */
    loadFromDisk() {
        try {
            if (fs.existsSync(this.persistPath)) {
                const data = fs.readFileSync(this.persistPath, 'utf-8');
                const parsed = JSON.parse(data);
                const validated = SessionSchema.array().safeParse(parsed);
                if (validated.success) {
                    for (const session of validated.data) {
                        this.sessions.set(session.sessionId, session);
                    }
                    console.log(`[MemoryStore] Loaded ${this.sessions.size} sessions from disk`);
                }
                else {
                    console.warn('[MemoryStore] Failed to validate persisted sessions, starting fresh');
                }
            }
        }
        catch (error) {
            console.warn('[MemoryStore] Failed to load from disk:', error);
        }
    }
    /**
     * Save sessions to JSON file
     */
    saveToDisk() {
        try {
            const dir = path.dirname(this.persistPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const data = Array.from(this.sessions.values());
            fs.writeFileSync(this.persistPath, JSON.stringify(data, null, 2));
        }
        catch (error) {
            console.error('[MemoryStore] Failed to save to disk:', error);
        }
    }
    startPersistenceTimer() {
        this.persistTimer = setInterval(() => {
            this.saveToDisk();
        }, this.persistIntervalMs);
        // Don't prevent process exit
        this.persistTimer.unref?.();
    }
    stopPersistenceTimer() {
        if (this.persistTimer) {
            clearInterval(this.persistTimer);
            this.persistTimer = null;
        }
    }
    // ========== Session CRUD ==========
    /**
     * Create a new session
     */
    createSession(sessionId, topic) {
        const now = new Date().toISOString();
        const session = SessionSchema.parse({
            sessionId,
            topic,
            createdAt: now,
            updatedAt: now,
            status: 'active',
        });
        this.sessions.set(sessionId, session);
        return session;
    }
    /**
     * Get a session by ID
     */
    getSession(sessionId) {
        return this.sessions.get(sessionId);
    }
    /**
     * Get or create a session
     */
    getOrCreateSession(sessionId, topic) {
        let session = this.sessions.get(sessionId);
        if (!session) {
            session = this.createSession(sessionId, topic);
        }
        return session;
    }
    /**
     * Update a session
     */
    updateSession(sessionId, updates) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        const updated = SessionSchema.parse({
            ...session,
            ...updates,
            updatedAt: new Date().toISOString(),
        });
        this.sessions.set(sessionId, updated);
        return updated;
    }
    /**
     * Delete a session
     */
    deleteSession(sessionId) {
        return this.sessions.delete(sessionId);
    }
    /**
     * List all sessions (optional topic filter)
     */
    listSessions(topicFilter) {
        const sessions = Array.from(this.sessions.values());
        if (topicFilter) {
            return sessions.filter(s => s.topic.toLowerCase().includes(topicFilter.toLowerCase()));
        }
        return sessions;
    }
    /**
     * Get all sessions as a Map
     */
    getAllSessions() {
        return new Map(this.sessions);
    }
    /**
     * Find sessions by topic
     */
    findSessionsByTopic(topic) {
        return this.listSessions(topic);
    }
    // ========== Paper Management ==========
    addPapers(sessionId, papers) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        const existingIds = new Set(session.papers.map(p => p.paperId));
        const newPapers = papers.filter(p => !existingIds.has(p.paperId));
        session.papers.push(...newPapers);
        return this.updateSession(sessionId, { papers: session.papers });
    }
    getPapers(sessionId) {
        return this.sessions.get(sessionId)?.papers ?? [];
    }
    getPaper(sessionId, paperId) {
        return this.sessions.get(sessionId)?.papers.find(p => p.paperId === paperId);
    }
    hasPaper(sessionId, paperId) {
        return this.sessions.get(sessionId)?.papers.some(p => p.paperId === paperId) ?? false;
    }
    // ========== Repo Management ==========
    addRepos(sessionId, repos) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.priorWork.repos.push(...repos);
        return this.updateSession(sessionId, { priorWork: session.priorWork });
    }
    // ========== Claim Management ==========
    addClaims(sessionId, claims) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.claims.push(...claims);
        return this.updateSession(sessionId, { claims: session.claims });
    }
    getClaims(sessionId, paperId) {
        const claims = this.sessions.get(sessionId)?.claims ?? [];
        if (paperId)
            return claims.filter(c => c.paperId === paperId);
        return claims;
    }
    // ========== Methodology Management ==========
    addMethodologies(sessionId, methodologies) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.methodologies.push(...methodologies);
        return this.updateSession(sessionId, { methodologies: session.methodologies });
    }
    getMethodologies(sessionId) {
        return this.sessions.get(sessionId)?.methodologies ?? [];
    }
    // ========== Dataset Management ==========
    addDatasets(sessionId, datasets) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.datasets.push(...datasets);
        return this.updateSession(sessionId, { datasets: session.datasets });
    }
    getDatasets(sessionId) {
        return this.sessions.get(sessionId)?.datasets ?? [];
    }
    // ========== Metric Management ==========
    addMetrics(sessionId, metrics) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.metrics.push(...metrics);
        return this.updateSession(sessionId, { metrics: session.metrics });
    }
    getMetrics(sessionId) {
        return this.sessions.get(sessionId)?.metrics ?? [];
    }
    // ========== Technical Params ==========
    addTechnicalParams(sessionId, params) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.technicalParams.push(...params);
        return this.updateSession(sessionId, { technicalParams: session.technicalParams });
    }
    getTechnicalParams(sessionId) {
        return this.sessions.get(sessionId)?.technicalParams ?? [];
    }
    // ========== Cluster Management ==========
    addClusters(sessionId, clusters) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.clusters.push(...clusters);
        return this.updateSession(sessionId, { clusters: session.clusters });
    }
    getClusters(sessionId) {
        return this.sessions.get(sessionId)?.clusters ?? [];
    }
    // ========== Contradiction Management ==========
    addContradictions(sessionId, contradictions) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.contradictions.push(...contradictions);
        return this.updateSession(sessionId, { contradictions: session.contradictions });
    }
    getContradictions(sessionId) {
        return this.sessions.get(sessionId)?.contradictions ?? [];
    }
    // ========== Gap Management ==========
    addGaps(sessionId, gaps) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            throw new Error(`addGaps failed: session ${sessionId} does not exist`);
        }
        session.gaps.push(...gaps);
        return this.updateSession(sessionId, { gaps: session.gaps });
    }
    updateGap(sessionId, gapId, updates) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        const idx = session.gaps.findIndex(g => g.gapId === gapId);
        if (idx === -1)
            return undefined;
        session.gaps[idx] = { ...session.gaps[idx], ...updates };
        this.updateSession(sessionId, { gaps: session.gaps });
        return session.gaps[idx];
    }
    getGaps(sessionId) {
        return this.sessions.get(sessionId)?.gaps ?? [];
    }
    getGap(sessionId, gapId) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            return undefined;
        }
        return session.gaps.find(g => g.gapId === gapId);
    }
    // ========== Review Management ==========
    addReview(sessionId, review) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.reviews.push(review);
        return this.updateSession(sessionId, { reviews: session.reviews });
    }
    getReviews(sessionId) {
        return this.sessions.get(sessionId)?.reviews ?? [];
    }
    getLatestReview(sessionId) {
        const reviews = this.getReviews(sessionId);
        return reviews[reviews.length - 1];
    }
    // ========== Verdict Management ==========
    addVerdict(sessionId, verdict) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.verdicts.push(verdict);
        return this.updateSession(sessionId, { verdicts: session.verdicts });
    }
    getVerdicts(sessionId) {
        return this.sessions.get(sessionId)?.verdicts ?? [];
    }
    getLatestVerdict(sessionId) {
        const verdicts = this.getVerdicts(sessionId);
        return verdicts[verdicts.length - 1];
    }
    // ========== Analogy Management ==========
    addAnalogies(sessionId, analogies) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.analogies.push(...analogies);
        return this.updateSession(sessionId, { analogies: session.analogies });
    }
    getAnalogies(sessionId) {
        return this.sessions.get(sessionId)?.analogies ?? [];
    }
    // ========== Citation Management ==========
    addCitations(sessionId, citations) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.citations.push(...citations);
        return this.updateSession(sessionId, { citations: session.citations });
    }
    getCitations(sessionId) {
        return this.sessions.get(sessionId)?.citations ?? [];
    }
    // ========== Writing Check Management ==========
    addWritingChecks(sessionId, checks) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.writingChecks.push(...checks);
        return this.updateSession(sessionId, { writingChecks: session.writingChecks });
    }
    getWritingChecks(sessionId) {
        return this.sessions.get(sessionId)?.writingChecks ?? [];
    }
    // ========== Verification Management ==========
    addVerificationChecks(sessionId, checks) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.verificationChecks.push(...checks);
        return this.updateSession(sessionId, { verificationChecks: session.verificationChecks });
    }
    getVerificationChecks(sessionId) {
        return this.sessions.get(sessionId)?.verificationChecks ?? [];
    }
    // ========== Knowledge Graph ==========
    addKnowledgeGraphEdges(sessionId, edges) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.knowledgeGraph.push(...edges);
        return this.updateSession(sessionId, { knowledgeGraph: session.knowledgeGraph });
    }
    getKnowledgeGraph(sessionId) {
        return this.sessions.get(sessionId)?.knowledgeGraph ?? [];
    }
    // ========== Prior Work ==========
    setPriorWork(sessionId, papers, repos, priorSessions) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.priorWork = { papers, repos, priorSessions };
        return this.updateSession(sessionId, { priorWork: session.priorWork });
    }
    getPriorWork(sessionId) {
        return this.sessions.get(sessionId)?.priorWork ?? { papers: [], repos: [], priorSessions: [] };
    }
    // ========== Overleaf ==========
    setOverleafProjectId(sessionId, projectId) {
        return this.updateSession(sessionId, { overleafProjectId: projectId });
    }
    getOverleafProjectId(sessionId) {
        return this.sessions.get(sessionId)?.overleafProjectId;
    }
    // ========== Utility ==========
    /**
     * Force immediate persistence
     */
    async flush() {
        this.saveToDisk();
    }
    /**
     * Get session count
     */
    getSessionCount() {
        return this.sessions.size;
    }
    /**
     * Clear all sessions (for testing)
     */
    clear() {
        this.sessions.clear();
    }
};
MemoryStore = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], MemoryStore);
export { MemoryStore };
//# sourceMappingURL=memory.store.js.map