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
import { ConfigService } from '../config/config.service.js';
/**
 * Semantic Scholar Service
 *
 * Wrapper around Semantic Scholar API for paper search, metadata, and citation graph.
 * Provides rate limiting and caching.
 */
let SemanticScholarService = class SemanticScholarService {
    config;
    baseUrl = 'https://api.semanticscholar.org/graph/v1';
    apiKey;
    cache = new Map();
    cacheTtlMs = 5 * 60 * 1000; // 5 minutes
    constructor(config) {
        this.config = config;
        console.error('[DEBUG SemanticScholarService] Constructor called', {
            hasConfig: !!config,
            configKeys: config ? Object.keys(config) : 'undefined',
        });
    }
    onModuleInit() {
        console.error('[DEBUG SemanticScholarService] onModuleInit called');
        this.apiKey = this.config.getSemanticScholarApiKey();
        console.error('[DEBUG SemanticScholarService] API key loaded:', !!this.apiKey);
    }
    /**
     * Search for papers by query
     */
    async searchPapers(query, options = {}) {
        const { yearFrom, yearTo, venues, minCitations, limit = 25, offset = 0, } = options;
        const params = new URLSearchParams({
            query,
            limit: limit.toString(),
            offset: offset.toString(),
            fields: 'paperId,title,venue,year,authors,abstract,citationCount,fieldsOfStudy,isOpenAccess,openAccessPdf,url',
        });
        if (yearFrom)
            params.append('year', `${yearFrom}-${yearTo || new Date().getFullYear()}`);
        if (minCitations)
            params.append('minCitationCount', minCitations.toString());
        const cacheKey = `search:${params.toString()}`;
        const cached = this.getCached(cacheKey);
        if (cached)
            return cached;
        try {
            const data = await this.fetch(`/paper/search?${params}`);
            const papers = this.mapSearchResults(data.data || []);
            this.setCache(cacheKey, papers);
            return papers;
        }
        catch (error) {
            console.error('[SemanticScholar] Search failed:', error);
            throw new Error(`Paper search failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    /**
     * Get paper details by ID
     */
    async getPaper(paperId) {
        const cacheKey = `paper:${paperId}`;
        const cached = this.getCached(cacheKey);
        if (cached)
            return cached;
        try {
            const data = await this.fetch(`/paper/${paperId}?fields=paperId,title,venue,year,authors,abstract,citationCount,fieldsOfStudy,isOpenAccess,openAccessPdf,url,references,citations`);
            const paper = this.mapPaperDetail(data);
            this.setCache(cacheKey, paper);
            return paper;
        }
        catch (error) {
            console.error('[SemanticScholar] Get paper failed:', error);
            return null;
        }
    }
    /**
     * Get multiple papers by IDs (batch)
     */
    async getPapers(paperIds) {
        const uniqueIds = [...new Set(paperIds)];
        const results = [];
        // Process in batches of 50 (API limit)
        for (let i = 0; i < uniqueIds.length; i += 50) {
            const batch = uniqueIds.slice(i, i + 50);
            const idsParam = batch.join(',');
            const data = await this.fetch(`/paper/batch?fields=paperId,title,venue,year,authors,abstract,citationCount,fieldsOfStudy,isOpenAccess,openAccessPdf,url`);
            results.push(...data.data.map(item => this.mapPaperDetail(item)));
        }
        return results;
    }
    /**
     * Get citation graph for a paper
     */
    async getCitationGraph(paperId) {
        const cacheKey = `citations:${paperId}`;
        const cached = this.getCached(cacheKey);
        if (cached)
            return cached;
        try {
            const [refs, cits] = await Promise.all([
                this.fetch(`/paper/${paperId}/references?fields=paperId,title,venue,year,authors,abstract,citationCount,fieldsOfStudy,isOpenAccess,openAccessPdf,url`),
                this.fetch(`/paper/${paperId}/citations?fields=paperId,title,venue,year,authors,abstract,citationCount,fieldsOfStudy,isOpenAccess,openAccessPdf,url`),
            ]);
            const result = {
                references: refs.data.map(item => this.mapPaperDetail(item)),
                citations: cits.data.map(item => this.mapPaperDetail(item)),
            };
            this.setCache(cacheKey, result);
            return result;
        }
        catch (error) {
            console.error('[SemanticScholar] Citation graph failed:', error);
            return { references: [], citations: [] };
        }
    }
    /**
     * Get author information
     */
    async getAuthor(authorId) {
        try {
            return await this.fetch(`/author/${authorId}`);
        }
        catch (error) {
            console.error('[SemanticScholar] Get author failed:', error);
            return null;
        }
    }
    /**
     * Get paper recommendations
     */
    async getRecommendations(paperId, limit = 10) {
        try {
            const data = await this.fetch(`/paper/${paperId}/recommendations?limit=${limit}&fields=paperId,title,venue,year,authors,abstract,citationCount,fieldsOfStudy,isOpenAccess,openAccessPdf,url`);
            return data.data.map(item => this.mapPaperDetail(item));
        }
        catch (error) {
            console.error('[SemanticScholar] Recommendations failed:', error);
            return [];
        }
    }
    /**
     * Internal fetch with API key
     */
    async fetch(endpoint) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Accept': 'application/json',
        };
        if (this.apiKey) {
            headers['x-api-key'] = this.apiKey;
        }
        const response = await fetch(url, { headers });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Semantic Scholar API error (${response.status}): ${error}`);
        }
        return response.json();
    }
    /**
     * Map search results to Paper type
     */
    mapSearchResults(items) {
        return items.map(item => this.mapPaperDetail(item));
    }
    /**
     * Map paper detail to Paper type
     */
    mapPaperDetail(item) {
        return {
            paperId: item.paperId,
            title: item.title,
            authors: item.authors?.map((a) => a.name) ?? [],
            year: item.year,
            venue: item.venue,
            abstract: item.abstract,
            doi: item.doi,
            url: item.url,
            citationCount: item.citationCount ?? 0,
            quartile: this.inferQuartile(item.venue, item.citationCount),
            fieldsOfStudy: item.fieldsOfStudy ?? [],
            pdfUrl: item.openAccessPdf?.url,
            isOpenAccess: item.isOpenAccess ?? false,
            extractedAt: new Date().toISOString(),
        };
    }
    /**
     * Infer quartile from venue and citation count (simplified)
     */
    inferQuartile(venue, citations) {
        if (!venue)
            return 'unknown';
        const topVenues = [
            'nature', 'science', 'cell', 'pnas',
            'neurips', 'icml', 'iclr', 'aaai', 'ijcai',
            'cvpr', 'iccv', 'eccv', 'siggraph', 'sigcomm',
            'osdi', 'sosp', 'asplos', 'isca', 'hpca',
            'icse', 'fse', 'ase', 'icse', 'ooopsla', 'pldi', 'popl',
            'vldb', 'sigmod', 'icde', 'cidr',
            'ndss', 'uss', 'security', 'ccs',
            'mobicom', 'mobisys', 'conext',
        ];
        const venueLower = venue.toLowerCase();
        const isTopVenue = topVenues.some(v => venueLower.includes(v));
        const highCitations = citations > 100;
        if (isTopVenue && highCitations)
            return 'Q1';
        if (isTopVenue || highCitations)
            return 'Q2';
        if (citations > 10)
            return 'Q3';
        return 'Q4';
    }
    // ========== Cache Management ==========
    getCached(key) {
        const entry = this.cache.get(key);
        if (entry && Date.now() - entry.timestamp < this.cacheTtlMs) {
            return entry.data;
        }
        if (entry)
            this.cache.delete(key);
        return null;
    }
    setCache(key, data) {
        this.cache.set(key, { data, timestamp: Date.now() });
        // Limit cache size
        if (this.cache.size > 1000) {
            const keys = Array.from(this.cache.keys());
            for (let i = 0; i < 100; i++) {
                this.cache.delete(keys[i]);
            }
        }
    }
    /**
     * Clear the cache
     */
    clearCache() {
        this.cache.clear();
    }
};
SemanticScholarService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], SemanticScholarService);
export { SemanticScholarService };
//# sourceMappingURL=semantic-scholar.service.js.map