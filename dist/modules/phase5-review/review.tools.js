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
import { SemanticScholarService } from '../../core/services/semantic-scholar.service.js';
import { GapFinderTools } from '../phase4-gap-finder/gap-finder.tools.js';
import { generateId } from '../../utils/id-generator.js';
/**
 * Phase 5: Adversarial Review Tools
 *
 * Core differentiator - actively searches for counter-evidence against proposed gaps.
 */
let ReviewTools = class ReviewTools {
    memory;
    semanticScholar;
    gapFinder;
    constructor(memory, semanticScholar, gapFinder) {
        this.memory = memory;
        this.semanticScholar = semanticScholar;
        this.gapFinder = gapFinder;
    }
    async simulateAdversarialReview(input, ctx) {
        const { gapId, sessionId, adversarialQueries } = input;
        ctx.logger.info('Running adversarial review', { gapId, sessionId });
        const gap = this.memory.getGap(sessionId, gapId);
        if (!gap) {
            throw new Error(`Gap ${gapId} not found`);
        }
        // Generate adversarial search queries
        const queries = adversarialQueries || this.generateAdversarialQueries(gap.claim);
        // Search for counter-evidence papers
        const allCounterPapers = [];
        for (const query of queries) {
            try {
                const papers = await this.semanticScholar.searchPapers(query, { limit: 5 });
                allCounterPapers.push(...papers);
            }
            catch (error) {
                ctx.logger.warn('Adversarial search failed', { query, error: String(error) });
            }
        }
        // Deduplicate
        const uniquePapers = this.deduplicatePapers(allCounterPapers);
        // Extract counter-evidence from papers
        const counterEvidence = this.extractCounterEvidence(gap.claim, uniquePapers);
        // Generate review verdict (in production, use LLM)
        const review = this.generateReview(gap.claim, counterEvidence, gap.reviewIteration + 1);
        // Create review result
        const reviewResult = {
            reviewId: generateId('review'),
            gapId,
            gapClaim: gap.claim,
            paperSet: uniquePapers.map(p => p.paperId),
            adversarialSearchQuery: queries.join('; '),
            counterEvidence,
            verdict: review.verdict,
            objections: review.objections,
            objectionStrength: review.objectionStrength,
            confidence: review.confidence,
            reviewedAt: new Date().toISOString(),
            iteration: gap.reviewIteration + 1,
        };
        // Store review
        this.memory.addReview(sessionId, reviewResult);
        // Update gap with review info
        this.memory.updateGap(sessionId, gapId, {
            status: review.verdict === 'PASS' ? 'passed' : 'under-review',
            reviewedAt: new Date().toISOString(),
            reviewIteration: gap.reviewIteration + 1,
        });
        return {
            gapId,
            gapClaim: gap.claim,
            iteration: reviewResult.iteration,
            adversarialQueries: queries,
            papersFound: uniquePapers.length,
            counterEvidence: counterEvidence,
            verdict: review.verdict,
            objections: review.objections,
            objectionStrength: review.objectionStrength,
            confidence: review.confidence,
            reviewedAt: reviewResult.reviewedAt,
        };
    }
    generateAdversarialQueries(gapClaim) {
        const base = gapClaim.toLowerCase();
        return [
            `limitations of ${base}`,
            `${base} failed`,
            `${base} does not work`,
            `problems with ${base}`,
            `challenges ${base}`,
            `drawbacks ${base}`,
            `failed ${base}`,
        ];
    }
    deduplicatePapers(papers) {
        const seen = new Set();
        return papers.filter(p => {
            if (seen.has(p.paperId))
                return false;
            seen.add(p.paperId);
            return true;
        });
    }
    extractCounterEvidence(gapClaim, papers) {
        // Simple heuristic: look for negative/limitation language
        const evidence = [];
        const negativeTerms = ['fail', 'limitation', 'challenge', 'problem', 'issue', 'drawback', 'unable', 'cannot', 'did not', 'unsuccessful'];
        for (const paper of papers.slice(0, 10)) {
            const text = `${paper.title} ${paper.abstract || ''}`.toLowerCase();
            for (const term of negativeTerms) {
                if (text.includes(term)) {
                    // Extract sentence containing negative term
                    const sentences = text.split(/[.!?]+/);
                    const negSentence = sentences.find(s => s.includes(term));
                    if (negSentence) {
                        evidence.push(`${paper.paperId}: ${negSentence.trim()}`);
                        break;
                    }
                }
            }
        }
        return evidence;
    }
    generateReview(gapClaim, counterEvidence, iteration) {
        // Heuristic review logic
        const evidenceStrength = counterEvidence.length;
        const baseStrength = Math.min(evidenceStrength * 15, 80);
        // In production, this would be an LLM call with sophisticated reasoning
        if (evidenceStrength >= 3) {
            return {
                verdict: 'OBJECTION',
                objections: [
                    `Found ${evidenceStrength} papers with potential counter-evidence`,
                    'Prior work suggests similar approaches face significant limitations',
                    'Gap claim may not be as novel as proposed',
                ],
                objectionStrength: Math.min(baseStrength + 10, 90),
                confidence: 70,
            };
        }
        else if (evidenceStrength >= 1) {
            return {
                verdict: 'OBJECTION',
                objections: [
                    `Found ${evidenceStrength} paper(s) with relevant limitations`,
                    'Further investigation needed on whether gap is truly open',
                ],
                objectionStrength: Math.min(baseStrength, 60),
                confidence: 60,
            };
        }
        else {
            return {
                verdict: 'PASS',
                objections: [],
                objectionStrength: 10,
                confidence: 85,
            };
        }
    }
    async runGapReviewCycle(input, ctx) {
        const { topic, sessionId, maxRetries } = input;
        let objections = [];
        ctx.logger.info('Starting gap review cycle', { topic, sessionId, maxRetries });
        for (let i = 0; i < maxRetries; i++) {
            ctx.logger.info(`Review cycle ${i + 1}/${maxRetries}`);
            // Propose gap (with knowledge of previous objections)
            let gapResult;
            if (objections.length > 0) {
                // In production, feed objections into gap proposal via LLM
                // For now, use the regular gap finder
                if (this.gapFinder && typeof this.gapFinder.proposeGap === 'function') {
                    gapResult = await this.gapFinder.proposeGap({ topic, sessionId, excludedPaperIds: [] }, ctx);
                }
                else {
                    // Fallback if gapFinder not available
                    gapResult = await this.proposeGapLocally({ topic, sessionId, excludedPaperIds: [] }, ctx);
                }
            }
            else {
                if (this.gapFinder && typeof this.gapFinder.proposeGap === 'function') {
                    gapResult = await this.gapFinder.proposeGap({ topic, sessionId, excludedPaperIds: [] }, ctx);
                }
                else {
                    gapResult = await this.proposeGapLocally({ topic, sessionId, excludedPaperIds: [] }, ctx);
                }
            }
            const gap = gapResult.gap;
            // Run adversarial review
            const review = await this.simulateAdversarialReview({ gapId: gap.gapId, sessionId }, ctx);
            ctx.logger.info(`Cycle ${i + 1} verdict: ${review.verdict}`);
            if (review.verdict === 'PASS') {
                return {
                    passed: true,
                    gap,
                    finalReview: review,
                    iterations: i + 1,
                };
            }
            // Update objections for next iteration
            objections = review.objections;
            // If last iteration, return best attempt
            if (i === maxRetries - 1) {
                return {
                    passed: false,
                    gap,
                    finalReview: review,
                    objections,
                    iterations: i + 1,
                    note: 'Max retries reached. Returning strongest variant with objections.',
                };
            }
        }
        // Should not reach here
        return { passed: false, error: 'Unexpected error in review cycle' };
    }
    // Local fallback gap proposal (if gapFinder not injected)
    async proposeGapLocally(input, ctx) {
        const gap = {
            gapId: generateId('gap'),
            claim: `Improved approach for ${input.topic}`,
            evidence: [],
            noveltyScore: 70,
            feasibility: 70,
            impact: 75,
            relatedPapers: [],
            status: 'proposed',
            proposedAt: new Date().toISOString(),
            reviewedAt: undefined,
            reviewIteration: 0,
        };
        this.memory.addGaps(input.sessionId, [gap]);
        return { gap };
    }
    async getReviewHistory(input, ctx) {
        const { gapId, sessionId } = input;
        const reviews = this.memory.getReviews(sessionId).filter(r => r.gapId === gapId);
        return {
            gapId,
            sessionId,
            totalReviews: reviews.length,
            reviews: reviews.map(r => ({
                reviewId: r.reviewId,
                iteration: r.iteration,
                verdict: r.verdict,
                objections: r.objections,
                objectionStrength: r.objectionStrength,
                confidence: r.confidence,
                reviewedAt: r.reviewedAt,
            })),
        };
    }
};
__decorate([
    Tool({
        name: 'simulate_adversarial_review',
        description: 'Simulate adversarial reviewer - search for counter-evidence and critique gap',
        inputSchema: z.object({
            gapId: z.string().describe('Gap ID to review'),
            sessionId: z.string().describe('Session ID'),
            adversarialQueries: z.array(z.string()).optional().describe('Custom adversarial search queries'),
        }),
        invocation: {
            invoking: 'Running adversarial review against gap...',
            invoked: 'Adversarial review complete'
        },
        examples: {
            request: { gapId: 'gap_123', sessionId: 'sess_001' },
            response: { gapId: 'gap_123', gapClaim: 'Adaptive DP with dynamic budget', iteration: 1, adversarialQueries: ['limitations of adaptive differential privacy', 'adaptive differential privacy failed'], papersFound: 3, counterEvidence: ['p1: Dynamic sensitivity estimation leaks privacy budget'], verdict: 'OBJECTION', objections: ['Found 3 papers with potential counter-evidence'], objectionStrength: 55, confidence: 70 }
        }
    }),
    Widget('research-pilot-shell'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewTools.prototype, "simulateAdversarialReview", null);
__decorate([
    Tool({
        name: 'run_gap_review_cycle',
        description: 'Orchestrator: Run gap proposal -> adversarial review loop (max 3 iterations)',
        inputSchema: z.object({
            topic: z.string().describe('Research topic'),
            sessionId: z.string().describe('Session ID'),
            maxRetries: z.number().int().default(3).describe('Maximum review iterations'),
        }),
        invocation: {
            invoking: 'Running gap review cycle (max 3 iterations)...',
            invoked: 'Review cycle complete - gap survived or rejected'
        },
        examples: {
            request: { topic: 'federated learning privacy', sessionId: 'sess_001', maxRetries: 3 },
            response: { passed: true, gap: { gapId: 'gap_123', claim: 'Adaptive DP with dynamic budget' }, finalReview: { verdict: 'PASS', objections: [] }, iterations: 2 }
        }
    }),
    Widget('research-pilot-shell'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewTools.prototype, "runGapReviewCycle", null);
__decorate([
    Tool({
        name: 'get_review_history',
        description: 'Get review history for a gap',
        inputSchema: z.object({
            gapId: z.string().describe('Gap ID'),
            sessionId: z.string().describe('Session ID'),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewTools.prototype, "getReviewHistory", null);
ReviewTools = __decorate([
    Injectable({ deps: [MemoryStore, SemanticScholarService, GapFinderTools] }),
    __metadata("design:paramtypes", [MemoryStore,
        SemanticScholarService,
        GapFinderTools])
], ReviewTools);
export { ReviewTools };
//# sourceMappingURL=review.tools.js.map