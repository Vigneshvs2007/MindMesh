var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ToolDecorator as Tool, Widget, z, Injectable } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
import { generateId } from '../../utils/id-generator.js';
/**
 * Phase 9: Citation Management Tools
 *
 * Generate citations in IEEE, APA, MLA formats and export BibTeX.
 */
let CitationTools = class CitationTools {
    memory;
    constructor(memory) {
        this.memory = memory;
    }
    async generateCitation(input, ctx) {
        const { paperId, style, sessionId } = input;
        ctx.logger.info('Generating citation', { paperId, style });
        let paper;
        if (sessionId) {
            paper = this.memory.getPaper(sessionId, paperId);
        }
        if (!paper) {
            throw new Error(`Paper ${paperId} not found in session ${sessionId || 'any'}`);
        }
        const formatted = this.formatCitation(paper, style);
        const bibtex = this.generateBibTeX(paper);
        const citation = {
            citationId: generateId('citation'),
            paperId,
            style,
            formatted,
            bibtex,
            createdAt: new Date().toISOString(),
        };
        if (sessionId) {
            this.memory.addCitations(sessionId, [citation]);
        }
        return {
            paperId,
            style,
            formatted,
            bibtex,
        };
    }
    formatCitation(paper, style) {
        const authors = paper.authors;
        const authorStr = this.formatAuthors(authors, style);
        const title = paper.title;
        const venue = paper.venue || 'Unknown venue';
        const year = paper.year || 'n.d.';
        switch (style) {
            case 'IEEE':
                return `[${this.getShortAuthor(authors)}] ${authorStr}, "${title}," ${venue}, ${year}.`;
            case 'APA':
                return `${authorStr} (${year}). ${title}. ${venue}.`;
            case 'MLA':
                return `${authorStr}. "${title}." ${venue}, ${year}.`;
            default:
                return `${authorStr}. ${title}. ${venue}, ${year}.`;
        }
    }
    formatAuthors(authors, style) {
        if (authors.length === 0)
            return 'Unknown author';
        if (authors.length === 1)
            return authors[0];
        if (style === 'IEEE') {
            if (authors.length <= 3) {
                return authors.slice(0, -1).join(', ') + ' and ' + authors[authors.length - 1];
            }
            return authors[0] + ' et al.';
        }
        if (style === 'APA') {
            if (authors.length <= 20) {
                return authors.slice(0, -1).join(', ') + ', & ' + authors[authors.length - 1];
            }
            return authors.slice(0, 19).join(', ') + ', ..., ' + authors[authors.length - 1];
        }
        // MLA
        if (authors.length <= 2) {
            return authors.join(' and ');
        }
        return authors[0] + ' et al.';
    }
    getShortAuthor(authors) {
        if (authors.length === 0)
            return 'Anonymous';
        if (authors.length === 1)
            return authors[0].split(' ').pop() || '';
        return authors[0].split(' ').pop() + ' et al.';
    }
    generateBibTeX(paper) {
        const key = `${paper.authors[0]?.split(' ').pop() || 'unknown'}${paper.year || 'nodate'}`
            .replace(/[^a-zA-Z0-9]/g, '');
        const authors = paper.authors.map(a => a.replace(/,/g, '')).join(' and ');
        return `@article{${key},
  title = {${paper.title}},
  author = {${authors}},
  journal = {${paper.venue || 'Unknown'}},
  year = {${paper.year || 'n.d.'}},
  doi = {${paper.doi || ''}},
  url = {${paper.url || ''}},
}`;
    }
    async exportBibTeX(input, ctx) {
        const { sessionId, style = 'IEEE' } = input;
        const citations = this.memory.getCitations(sessionId);
        if (citations.length === 0) {
            // Generate from papers
            const papers = this.memory.getPapers(sessionId);
            const entries = papers.map(p => this.generateBibTeX(p)).join('\n\n');
            return { sessionId, bibtex: entries, count: papers.length };
        }
        const entries = citations.map(c => c.bibtex).join('\n\n');
        return { sessionId, bibtex: entries, count: citations.length };
    }
    async manageBibliography(input, ctx) {
        const { sessionId, action, paperIds } = input;
        if (action === 'list') {
            const papers = this.memory.getPapers(sessionId);
            return {
                sessionId,
                papers: papers.map(p => ({ paperId: p.paperId, title: p.title, year: p.year })),
                count: papers.length,
            };
        }
        if (!paperIds || paperIds.length === 0) {
            throw new Error('paperIds required for add/remove');
        }
        const papers = this.memory.getPapers(sessionId);
        const selected = papers.filter(p => paperIds.includes(p.paperId));
        const citations = selected.map(p => ({
            citationId: generateId('citation'),
            paperId: p.paperId,
            style: 'IEEE',
            formatted: this.formatCitation(p, 'IEEE'),
            bibtex: this.generateBibTeX(p),
            createdAt: new Date().toISOString(),
        }));
        if (action === 'add') {
            this.memory.addCitations(sessionId, citations);
        }
        else {
            // For remove, we'd need to track which citations to remove
            // Simplified: just return current state
        }
        return {
            sessionId,
            action,
            affected: selected.length,
            citations: citations.map(c => ({ paperId: c.paperId, formatted: c.formatted })),
        };
    }
};
__decorate([
    Tool({
        name: 'generate_citation',
        description: 'Generate formatted citation for a paper in IEEE, APA, or MLA style',
        inputSchema: z.object({
            paperId: z.string().describe('Paper ID'),
            style: z.enum(['IEEE', 'APA', 'MLA']).describe('Citation style'),
            sessionId: z.string().optional().describe('Session ID to get paper from'),
        }),
        invocation: {
            invoking: 'Generating citation...',
            invoked: 'Citation generated'
        },
        examples: {
            request: { paperId: 'p123', style: 'IEEE', sessionId: 'sess_001' },
            response: { paperId: 'p123', style: 'IEEE', formatted: '[Smith] Smith, J. and Doe, J., "DP-FedAvg: Differentially Private Federated Learning," ICML, 2023.', bibtex: '@article{smith2023dp-fedavg,\n  title = {DP-FedAvg: Differentially Private Federated Learning},\n  author = {Smith, J. and Doe, J.},\n  journal = {ICML},\n  year = {2023}\n}' }
        }
    }),
    Widget('research-pilot-shell'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CitationTools.prototype, "generateCitation", null);
__decorate([
    Tool({
        name: 'export_bibtex',
        description: 'Export all citations in session as BibTeX',
        inputSchema: z.object({
            sessionId: z.string().describe('Session ID'),
            style: z.enum(['IEEE', 'APA', 'MLA']).optional().describe('Style to use for tags (default: IEEE)'),
        }),
        invocation: {
            invoking: 'Exporting BibTeX bibliography...',
            invoked: 'BibTeX exported'
        },
        examples: {
            request: { sessionId: 'sess_001', style: 'IEEE' },
            response: { sessionId: 'sess_001', bibtex: '@article{smith2023dp-fedavg,\n  title = {DP-FedAvg: Differentially Private Federated Learning},\n  author = {Smith, J. and Doe, J.},\n  journal = {ICML},\n  year = {2023}\n}\n\n@article{lee2022byzantine-robust,\n  title = {Byzantine-Robust FL with DP},\n  author = {Lee, C.},\n  journal = {IEEE S&P},\n  year = {2022}\n}', count: 2 }
        }
    }),
    Widget('research-pilot-shell'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CitationTools.prototype, "exportBibTeX", null);
__decorate([
    Tool({
        name: 'manage_bibliography',
        description: 'Add or remove papers from session bibliography',
        inputSchema: z.object({
            sessionId: z.string().describe('Session ID'),
            action: z.enum(['add', 'remove', 'list']).describe('Action to perform'),
            paperIds: z.array(z.string()).optional().describe('Paper IDs to add/remove'),
        }),
        invocation: {
            invoking: 'Managing bibliography...',
            invoked: 'Bibliography updated'
        },
        examples: {
            request: { sessionId: 'sess_001', action: 'add', paperIds: ['p1', 'p2'] },
            response: { sessionId: 'sess_001', action: 'add', affected: 2, citations: [{ paperId: 'p1', formatted: '[Smith] Smith, J. and Doe, J., "DP-FedAvg...", ICML, 2023.' }, { paperId: 'p2', formatted: '[Lee] Lee, C., "Byzantine-Robust FL...", IEEE S&P, 2022.' }] }
        }
    }),
    Widget('research-pilot-shell'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CitationTools.prototype, "manageBibliography", null);
CitationTools = __decorate([
    Injectable({ deps: [MemoryStore] }),
    __metadata("design:paramtypes", [MemoryStore])
], CitationTools);
export { CitationTools };
//# sourceMappingURL=citation.tools.js.map