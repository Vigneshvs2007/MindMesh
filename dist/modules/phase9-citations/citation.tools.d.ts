import { ExecutionContext } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
/**
 * Phase 9: Citation Management Tools
 *
 * Generate citations in IEEE, APA, MLA formats and export BibTeX.
 */
export declare class CitationTools {
    private memory;
    constructor(memory: MemoryStore);
    generateCitation(input: {
        paperId: string;
        style: 'IEEE' | 'APA' | 'MLA';
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        paperId: string;
        style: "IEEE" | "APA" | "MLA";
        formatted: string;
        bibtex: string;
    }>;
    private formatCitation;
    private formatAuthors;
    private getShortAuthor;
    private generateBibTeX;
    exportBibTeX(input: {
        sessionId: string;
        style?: 'IEEE' | 'APA' | 'MLA';
    }, ctx: ExecutionContext): Promise<{
        sessionId: string;
        bibtex: string;
        count: number;
    }>;
    manageBibliography(input: {
        sessionId: string;
        action: 'add' | 'remove' | 'list';
        paperIds?: string[];
    }, ctx: ExecutionContext): Promise<{
        sessionId: string;
        papers: {
            paperId: string;
            title: string;
            year: number;
        }[];
        count: number;
        action?: undefined;
        affected?: undefined;
        citations?: undefined;
    } | {
        sessionId: string;
        action: "add" | "remove";
        affected: number;
        citations: {
            paperId: string;
            formatted: string;
        }[];
        papers?: undefined;
        count?: undefined;
    }>;
}
//# sourceMappingURL=citation.tools.d.ts.map