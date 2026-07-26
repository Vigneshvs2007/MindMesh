import { ExecutionContext } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
/**
 * Phase 0: Prior Work Resources
 *
 * Provides access to prior work data through MCP Resources.
 */
export declare class PriorWorkResources {
    private memory;
    constructor(memory: MemoryStore);
    getSessionsByTopic(uri: string, ctx: ExecutionContext): Promise<{
        contents: {
            uri: string;
            mimeType: string;
            text: string;
        }[];
    }>;
    getSession(uri: string, ctx: ExecutionContext): Promise<{
        contents: {
            uri: string;
            mimeType: string;
            text: string;
        }[];
    }>;
    getPapers(uri: string, ctx: ExecutionContext): Promise<{
        contents: {
            uri: string;
            mimeType: string;
            text: string;
        }[];
    }>;
}
//# sourceMappingURL=prior-work.resources.d.ts.map