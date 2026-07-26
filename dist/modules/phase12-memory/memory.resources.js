var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ResourceDecorator as Resource, Injectable } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
/**
 * Phase 12: Memory Persistence Resources
 *
 * Provides session-level resources for persistent memory across sessions.
 */
let MemoryResources = class MemoryResources {
    memory;
    constructor(memory) {
        this.memory = memory;
    }
    async getSession(sessionId) {
        if (sessionId) {
            const session = this.memory.getSession(sessionId);
            return session ? [session] : [];
        }
        return this.memory.listSessions();
    }
    async getKnowledgeGraph(sessionId) {
        const session = this.memory.getSession(sessionId);
        if (!session) {
            return { sessionId, entities: [], relationships: [] };
        }
        // knowledgeGraph is an array of KnowledgeGraphEdge with subject, relation, object
        const edges = session.knowledgeGraph || [];
        // Extract unique entities from subject and object
        const entities = [...new Set(edges.flatMap(e => [e.subject, e.object]))];
        return {
            sessionId,
            entities: entities.map(e => ({ name: e })),
            relationships: edges.map(e => ({
                subject: e.subject,
                relation: e.relation,
                object: e.object,
                weight: e.weight,
                source: e.source,
            })),
        };
    }
    async listAllSessions() {
        const sessions = this.memory.listSessions();
        return sessions.map((s) => ({
            sessionId: s.sessionId,
            topic: s.topic,
            createdAt: s.createdAt,
            updatedAt: s.updatedAt,
            paperCount: s.papers.length,
            claimCount: s.claims.length,
            gapCount: s.gaps.length,
            reviewCycleCount: s.reviews.length, // schema has 'reviews' not 'reviewCycles'
        }));
    }
    async findSessionsByTopic(topic) {
        const sessions = this.memory.findSessionsByTopic(topic);
        const results = [];
        const topicLower = topic.toLowerCase();
        for (const session of sessions) {
            if (session.topic.toLowerCase().includes(topicLower) ||
                session.papers.some(p => p.title.toLowerCase().includes(topicLower)) ||
                session.claims.some(c => c.text.toLowerCase().includes(topicLower))) {
                results.push({
                    sessionId: session.sessionId,
                    topic: session.topic,
                    createdAt: session.createdAt,
                    paperCount: session.papers.length,
                    claimCount: session.claims.length,
                    matchType: session.topic.toLowerCase().includes(topicLower) ? 'topic' : 'content',
                });
            }
        }
        return results;
    }
};
__decorate([
    Resource({
        uri: 'session://{sessionId?}',
        name: 'Research Session',
        description: 'Full research session state with all extracted knowledge',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemoryResources.prototype, "getSession", null);
__decorate([
    Resource({
        uri: 'session://{sessionId}/knowledge-graph',
        name: 'Session Knowledge Graph',
        description: 'Entities and relationships extracted from the session',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemoryResources.prototype, "getKnowledgeGraph", null);
__decorate([
    Resource({
        uri: 'memory://sessions',
        name: 'All Sessions',
        description: 'List all persisted research sessions',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MemoryResources.prototype, "listAllSessions", null);
__decorate([
    Resource({
        uri: 'memory://sessions/topic/{topic}',
        name: 'Sessions by Topic',
        description: 'Find prior sessions by research topic',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemoryResources.prototype, "findSessionsByTopic", null);
MemoryResources = __decorate([
    Injectable({ deps: [MemoryStore] }),
    __metadata("design:paramtypes", [MemoryStore])
], MemoryResources);
export { MemoryResources };
//# sourceMappingURL=memory.resources.js.map