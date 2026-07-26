import { MemoryStore } from '../../core/memory/memory.store.js';
import { Session } from '../../core/memory/session.schema.js';
/**
 * Phase 12: Memory Persistence Resources
 *
 * Provides session-level resources for persistent memory across sessions.
 */
export declare class MemoryResources {
    private memory;
    constructor(memory: MemoryStore);
    getSession(sessionId?: string): Promise<Session[]>;
    getKnowledgeGraph(sessionId: string): Promise<{
        sessionId: string;
        entities: {
            name: string;
        }[];
        relationships: {
            subject: string;
            relation: string;
            object: string;
            weight: number;
            source: string | undefined;
        }[];
    }>;
    listAllSessions(): Promise<{
        sessionId: string;
        topic: string;
        createdAt: string;
        updatedAt: string;
        paperCount: number;
        claimCount: number;
        gapCount: number;
        reviewCycleCount: number;
    }[]>;
    findSessionsByTopic(topic: string): Promise<{
        sessionId: string;
        topic: string;
        createdAt: string;
        paperCount: number;
        claimCount: number;
        matchType: string;
    }[]>;
}
//# sourceMappingURL=memory.resources.d.ts.map