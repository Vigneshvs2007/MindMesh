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
import { EmbeddingsService } from '../../core/services/embeddings.service.js';
import { SemanticScholarService } from '../../core/services/semantic-scholar.service.js';
import { generateId } from '../../utils/id-generator.js';
/**
 * Phase 2: Paper Extraction Tools
 *
 * Extracts claims, methodologies, datasets, metrics, and technical parameters from papers.
 */
let ExtractionTools = class ExtractionTools {
    memory;
    embeddings;
    semanticScholar;
    constructor(memory, embeddings, semanticScholar) {
        this.memory = memory;
        this.embeddings = embeddings;
        this.semanticScholar = semanticScholar;
    }
    async extractPaperClaims(input, ctx) {
        const { paperId, abstract, fullText, sessionId } = input;
        ctx.logger.info('Extracting claims', { paperId, hasFullText: !!fullText });
        const text = fullText || abstract;
        const claims = this.extractClaims(text, paperId);
        if (sessionId) {
            this.memory.addClaims(sessionId, claims);
        }
        return {
            paperId,
            claimsCount: claims.length,
            claims,
        };
    }
    /**
     * Heuristic claim extraction from text.
     * In production, use LLM with structured output.
     */
    extractClaims(text, paperId) {
        const claims = [];
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
        const claimKeywords = {
            finding: ['we find', 'we show', 'results show', 'demonstrate', 'outperform', 'achieve', 'improve'],
            method: ['we propose', 'we introduce', 'our method', 'our approach', 'we design', 'we develop'],
            limitation: ['limitation', 'limited', 'future work', 'does not', 'cannot', 'fail'],
            assumption: ['assume', 'suppose', 'assumption', 'assumes'],
            hypothesis: ['hypothesize', 'hypothesis', 'conjecture', 'predict'],
            result: ['result', 'accuracy', 'f1', 'precision', 'recall', 'performance', 'metric'],
        };
        for (const sentence of sentences) {
            const lower = sentence.toLowerCase();
            let type = 'finding';
            let maxMatches = 0;
            for (const [claimType, keywords] of Object.entries(claimKeywords)) {
                const matches = keywords.filter(k => lower.includes(k)).length;
                if (matches > maxMatches) {
                    maxMatches = matches;
                    type = claimType;
                }
            }
            if (maxMatches > 0) {
                claims.push({
                    claimId: generateId('claim'),
                    paperId,
                    text: sentence.trim(),
                    type,
                    confidence: Math.min(90, 50 + maxMatches * 10),
                    evidence: maxMatches > 1 ? sentence.trim() : undefined,
                    extractedAt: new Date().toISOString(),
                });
            }
        }
        return claims.slice(0, 20);
    }
    async extractMethodology(input, ctx) {
        const { paperId, abstract, fullText, sessionId } = input;
        ctx.logger.info('Extracting methodology', { paperId });
        const text = fullText || abstract;
        const methodology = this.extractMethodologyDetails(text, paperId);
        if (sessionId) {
            this.memory.addMethodologies(sessionId, [methodology]);
        }
        return methodology;
    }
    extractMethodologyDetails(text, paperId) {
        const lower = text.toLowerCase();
        let category = 'other';
        if (lower.includes('experiment') || lower.includes('empirical') || lower.includes('evaluation')) {
            category = 'experimental';
        }
        else if (lower.includes('theoretical') || lower.includes('proof') || lower.includes('theorem')) {
            category = 'theoretical';
        }
        else if (lower.includes('simulation') || lower.includes('simulated')) {
            category = 'simulation';
        }
        else if (lower.includes('survey') || lower.includes('review') || lower.includes('literature')) {
            category = 'survey';
        }
        else if (lower.includes('literature review')) {
            category = 'literature-review';
        }
        const components = [];
        const componentKeywords = [
            'algorithm', 'model', 'network', 'architecture', 'framework',
            'pipeline', 'system', 'method', 'approach', 'technique',
            'module', 'component', 'layer', 'encoder', 'decoder',
        ];
        for (const kw of componentKeywords) {
            if (lower.includes(kw))
                components.push(kw);
        }
        const datasets = [];
        const datasetPatterns = [
            /(?:on|using|with)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:dataset|benchmark|corpus)/gi,
            /\b(ImageNet|COCO|MNIST|CIFAR|GLUE|SQuAD|WMT|LibriSpeech)\b/gi,
        ];
        for (const pattern of datasetPatterns) {
            const matches = text.matchAll(pattern);
            for (const match of matches) {
                datasets.push(match[1] || match[0]);
            }
        }
        const metrics = [];
        const metricKeywords = ['accuracy', 'f1', 'precision', 'recall', 'auc', 'bleu', 'rouge', 'perplexity', 'mse', 'rmse'];
        for (const kw of metricKeywords) {
            if (lower.includes(kw))
                metrics.push(kw);
        }
        return {
            methodologyId: generateId('method'),
            paperId,
            name: this.extractMethodName(text),
            description: text.slice(0, 500),
            category,
            keyComponents: [...new Set(components)],
            datasets: [...new Set(datasets)],
            metrics: [...new Set(metrics)],
            extractedAt: new Date().toISOString(),
        };
    }
    extractMethodName(text) {
        const patterns = [
            /(?:we propose|we introduce|our method|our approach)\s+(?:called|named)?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
            /\b([A-Z][a-z]+(?:Net|Model|Framework|System|Method|Algorithm))\b/i,
        ];
        for (const pattern of patterns) {
            const match = text.match(pattern);
            if (match)
                return match[1];
        }
        return 'Unnamed Method';
    }
    async extractDatasets(input, ctx) {
        const { paperId, text, sessionId } = input;
        const datasets = [];
        const patterns = [
            /(?:on|using|with|evaluate on)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:dataset|benchmark|corpus)/gi,
            /\b(ImageNet|COCO|MNIST|CIFAR-1[09]|GLUE|SQuAD|WMT|LibriSpeech|SQuAD|CoNLL|PTB|WikiText|Penn Treebank)\b/gi,
        ];
        for (const pattern of patterns) {
            const matches = text.matchAll(pattern);
            for (const match of matches) {
                datasets.push({
                    datasetId: generateId('dataset'),
                    paperId,
                    name: match[1] || match[0],
                    description: undefined,
                    size: undefined,
                    domain: undefined,
                    url: undefined,
                });
            }
        }
        const unique = datasets.filter((d, i, arr) => arr.findIndex(x => x.name.toLowerCase() === d.name.toLowerCase()) === i);
        if (sessionId) {
            this.memory.addDatasets(sessionId, unique);
        }
        return { paperId, datasetCount: unique.length, datasets: unique };
    }
    async extractMetrics(input, ctx) {
        const { paperId, text, sessionId } = input;
        const metrics = [];
        const metricPatterns = [
            /(accuracy|f1|precision|recall|auc|bleu|rouge|perplexity|mse|rmse|mape)\s*[=:]\s*([\d.]+)/gi,
            /(?:achieves?|reaches?|obtains?)\s+([\d.]+)%?\s+(?:accuracy|f1|precision|recall)/gi,
        ];
        for (const pattern of metricPatterns) {
            const matches = text.matchAll(pattern);
            for (const match of matches) {
                metrics.push({
                    metricId: generateId('metric'),
                    paperId,
                    name: match[1] || 'metric',
                    value: parseFloat(match[2]) || undefined,
                    unit: match[0].includes('%') ? '%' : undefined,
                    baseline: undefined,
                });
            }
        }
        if (sessionId) {
            this.memory.addMetrics(sessionId, metrics);
        }
        return { paperId, metricCount: metrics.length, metrics };
    }
    async extractTechnicalParameters(input, ctx) {
        const { paperId, fullText, sessionId } = input;
        ctx.logger.info('Extracting technical parameters', { paperId });
        const params = this.extractParams(fullText, paperId);
        if (sessionId) {
            this.memory.addTechnicalParams(sessionId, [params]);
        }
        return params;
    }
    extractParams(text, paperId) {
        const lower = text.toLowerCase();
        const sensors = [];
        const sensorKeywords = ['accelerometer', 'gyroscope', 'ecg', 'eeg', 'emg', 'ppg', 'camera', 'lidar', 'radar', 'microphone'];
        for (const kw of sensorKeywords) {
            if (lower.includes(kw))
                sensors.push(kw);
        }
        let samplingRateHz;
        const srMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:hz|khz)/);
        if (srMatch) {
            samplingRateHz = srMatch[1].includes('k') ? parseFloat(srMatch[1]) * 1000 : parseFloat(srMatch[1]);
        }
        let datasetSize;
        const dsMatch = lower.match(/(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:samples|records|examples|participants|subjects)/);
        if (dsMatch) {
            datasetSize = parseInt(dsMatch[1].replace(/,/g, ''), 10);
        }
        const hwKeywords = ['fpga', 'asic', 'gpu', 'cpu', 'tpu', 'microcontroller', 'mcu', 'raspberry pi', 'arduino', 'jetson'];
        const hardwarePlatform = hwKeywords.find(kw => lower.includes(kw));
        let powerBudgetMw;
        const pwrMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:mw|milliwatt)/);
        if (pwrMatch)
            powerBudgetMw = parseFloat(pwrMatch[1]);
        return {
            paramsId: generateId('params'),
            paperId,
            sensors: [...new Set(sensors)],
            samplingRateHz,
            datasetSize,
            hardwarePlatform,
            powerBudgetMw,
            latencyMs: undefined,
            throughput: undefined,
            other: {},
            extractedAt: new Date().toISOString(),
        };
    }
    async fetchPaperFullText(input, ctx) {
        ctx.logger.info('Fetching full text', { paperId: input.paperId });
        const paper = await this.semanticScholar.getPaper(input.paperId);
        if (!paper) {
            throw new Error(`Paper ${input.paperId} not found`);
        }
        if (!paper.isOpenAccess || !paper.pdfUrl) {
            return {
                paperId: input.paperId,
                available: false,
                reason: paper.isOpenAccess ? 'No PDF URL available' : 'Not open access',
            };
        }
        try {
            const response = await fetch(paper.pdfUrl);
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const pdfParse = await import('pdf-parse');
            const data = await pdfParse.default(buffer);
            return {
                paperId: input.paperId,
                available: true,
                pageCount: data.numpages,
                text: data.text,
                textLength: data.text.length,
            };
        }
        catch (error) {
            return {
                paperId: input.paperId,
                available: false,
                reason: error instanceof Error ? error.message : String(error),
            };
        }
    }
};
__decorate([
    Tool({
        name: 'extract_paper_claims',
        description: 'Extract structured claims from a paper abstract/text',
        inputSchema: z.object({
            paperId: z.string().describe('Paper ID'),
            abstract: z.string().describe('Paper abstract'),
            fullText: z.string().optional().describe('Full text if available'),
            sessionId: z.string().optional().describe('Session ID to store results'),
        }),
        invocation: {
            invoking: 'Extracting claims from paper...',
            invoked: 'Claims extraction complete'
        },
        examples: {
            request: { paperId: 'p1', abstract: 'We propose FlashAttention, a fast and memory-efficient exact attention algorithm...' },
            response: { paperId: 'p1', claimsCount: 12, claims: [{ claimId: 'c1', paperId: 'p1', text: 'FlashAttention uses tiling to compute attention in blocks', type: 'method', confidence: 95 }, { claimId: 'c2', paperId: 'p1', text: 'FlashAttention is 2-4x faster than standard attention', type: 'finding', confidence: 90 }] }
        }
    }),
    Widget('phase-search-bar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExtractionTools.prototype, "extractPaperClaims", null);
__decorate([
    Tool({
        name: 'extract_methodology',
        description: 'Extract methodology details from a paper',
        inputSchema: z.object({
            paperId: z.string().describe('Paper ID'),
            abstract: z.string().describe('Paper abstract'),
            fullText: z.string().optional().describe('Full text if available'),
            sessionId: z.string().optional().describe('Session ID to store results'),
        }),
        invocation: {
            invoking: 'Extracting methodology details...',
            invoked: 'Methodology extracted'
        },
        examples: {
            request: { paperId: 'p1', abstract: 'We propose FlashAttention...' },
            response: { methodologyId: 'm1', paperId: 'p1', name: 'FlashAttention', category: 'experimental', keyComponents: ['algorithm', 'kernel', 'tiling'], datasets: ['Long-Range-Arena'], metrics: ['speed', 'memory'] }
        }
    }),
    Widget('phase-search-bar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExtractionTools.prototype, "extractMethodology", null);
__decorate([
    Tool({
        name: 'extract_datasets',
        description: 'Extract datasets mentioned in a paper',
        inputSchema: z.object({
            paperId: z.string().describe('Paper ID'),
            text: z.string().describe('Paper text (abstract or full)'),
            sessionId: z.string().optional().describe('Session ID to store results'),
        }),
        invocation: {
            invoking: 'Extracting datasets from paper...',
            invoked: 'Datasets extracted'
        },
        examples: {
            request: { paperId: 'p1', text: 'We evaluate on ImageNet and CIFAR-10...' },
            response: { paperId: 'p1', datasetCount: 2, datasets: [{ datasetId: 'd1', name: 'ImageNet' }, { datasetId: 'd2', name: 'CIFAR-10' }] }
        }
    }),
    Widget('phase-search-bar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExtractionTools.prototype, "extractDatasets", null);
__decorate([
    Tool({
        name: 'extract_metrics',
        description: 'Extract metrics reported in a paper',
        inputSchema: z.object({
            paperId: z.string().describe('Paper ID'),
            text: z.string().describe('Paper text'),
            sessionId: z.string().optional().describe('Session ID to store results'),
        }),
        invocation: {
            invoking: 'Extracting metrics from paper...',
            invoked: 'Metrics extracted'
        },
        examples: {
            request: { paperId: 'p1', text: 'Our method achieves 97.5% accuracy...' },
            response: { paperId: 'p1', metricCount: 3, metrics: [{ metricId: 'm1', name: 'accuracy', value: 97.5, unit: '%' }] }
        }
    }),
    Widget('phase-search-bar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExtractionTools.prototype, "extractMetrics", null);
__decorate([
    Tool({
        name: 'extract_technical_parameters',
        description: 'Extract technical parameters from paper (stretch feature for engineering topics)',
        inputSchema: z.object({
            paperId: z.string().describe('Paper ID'),
            fullText: z.string().describe('Full paper text'),
            sessionId: z.string().optional().describe('Session ID to store results'),
        }),
        invocation: {
            invoking: 'Extracting technical parameters...',
            invoked: 'Technical parameters extracted'
        },
        examples: {
            request: { paperId: 'p1', fullText: 'We use 8x A100 GPUs with NVLink...' },
            response: { paramsId: 'tp1', paperId: 'p1', sensors: [], hardwarePlatform: '8x A100', powerBudgetMw: undefined }
        }
    }),
    Widget('phase-search-bar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExtractionTools.prototype, "extractTechnicalParameters", null);
__decorate([
    Tool({
        name: 'fetch_paper_full_text',
        description: 'Attempt to fetch full text PDF for a paper',
        inputSchema: z.object({
            paperId: z.string().describe('Semantic Scholar paper ID'),
        }),
        invocation: {
            invoking: 'Fetching full text PDF...',
            invoked: 'Full text retrieved'
        },
        examples: {
            request: { paperId: 'p12345' },
            response: { paperId: 'p12345', available: true, pageCount: 12, textLength: 45000 }
        }
    }),
    Widget('phase-search-bar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExtractionTools.prototype, "fetchPaperFullText", null);
ExtractionTools = __decorate([
    Injectable({ deps: [MemoryStore, EmbeddingsService, SemanticScholarService] }),
    __metadata("design:paramtypes", [MemoryStore,
        EmbeddingsService,
        SemanticScholarService])
], ExtractionTools);
export { ExtractionTools };
//# sourceMappingURL=extraction.tools.js.map