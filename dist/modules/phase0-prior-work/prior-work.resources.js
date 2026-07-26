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
 * Phase 0: Prior Work Resources
 *
 * Provides access to prior work data through MCP Resources.
 */
let PriorWorkResources = class PriorWorkResources {
    memory;
    constructor(memory) {
        this.memory = memory;
    }
    async getSessionsByTopic(uri, ctx) {
        const topic = uri.replace('memory://sessions/', '');
        ctx.logger.info('Fetching prior sessions', { topic });
        const sessions = this.memory.findSessionsByTopic(topic);
        return {
            contents: [{
                    uri,
                    mimeType: 'application/json',
                    text: JSON.stringify({
                        topic,
                        count: sessions.length,
                        sessions: sessions.map(s => ({
                            sessionId: s.sessionId,
                            topic: s.topic,
                            status: s.status,
                            verdict: s.verdicts[s.verdicts.length - 1]?.finalVerdict,
                            resilienceScore: s.verdicts[s.verdicts.length - 1]?.resilienceScore,
                            createdAt: s.createdAt,
                            paperCount: s.papers.length,
                        })),
                    }, null, 2),
                }],
        };
    }
    async getSession(uri, ctx) {
        const sessionId = uri.replace('memory://session/', '');
        ctx.logger.info('Fetching session', { sessionId });
        const session = this.memory.getSession(sessionId);
        if (!session) {
            throw new Error(`Session ${sessionId} not found`);
        }
        return {
            contents: [{
                    uri,
                    mimeType: 'application/json',
                    text: JSON.stringify(session, null, 2),
                }],
        };
    }
    async getPapers(uri, ctx) {
        const sessionId = uri.replace('memory://papers/', '');
        ctx.logger.info('Fetching session papers', { sessionId });
        const papers = this.memory.getPapers(sessionId);
        return {
            contents: [{
                    uri,
                    mimeType: 'application/json',
                    text: JSON.stringify({ sessionId, count: papers.length, papers }, null, 2),
                }],
        };
    }
};
__decorate([
    Resource({
        uri: 'memory://sessions/{topic}',
        name: 'Prior Sessions by Topic',
        description: 'List of prior AI research sessions matching a topic',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PriorWorkResources.prototype, "getSessionsByTopic", null);
__decorate([
    Resource({
        uri: 'memory://session/{sessionId}',
        name: 'Session Details',
        description: 'Full details of a research session',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PriorWorkResources.prototype, "getSession", null);
__decorate([
    Resource({
        uri: 'memory://papers/{sessionId}',
        name: 'Session Papers',
        description: 'Papers collected in a research session',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PriorWorkResources.prototype, "getPapers", null);
PriorWorkResources = __decorate([
    Injectable({ deps: [MemoryStore] }),
    __metadata("design:paramtypes", [MemoryStore])
], PriorWorkResources);
export { PriorWorkResources };
//# sourceMappingURL=prior-work.resources.js.map