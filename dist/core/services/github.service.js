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
 * GitHub Service
 *
 * Searches GitHub repositories for prior art code implementations.
 */
let GithubService = class GithubService {
    config;
    apiKey;
    baseUrl = 'https://api.github.com';
    constructor(config) {
        this.config = config;
        this.apiKey = config.getGithubToken();
    }
    /**
     * Search repositories by topic
     */
    async searchRepos(topic, maxResults = 10) {
        const query = encodeURIComponent(`${topic} in:name,description,readme stars:>10`);
        const url = `${this.baseUrl}/search/repositories?q=${query}&sort=stars&order=desc&per_page=${maxResults}`;
        const response = await this.fetch(url);
        if (!response.items)
            return [];
        return response.items.map((repo) => ({
            name: repo.full_name,
            url: repo.html_url,
            description: repo.description,
            stars: repo.stargazers_count,
            language: repo.language,
            updatedAt: repo.updated_at,
            relevanceScore: this.calculateRelevance(repo, topic),
        }));
    }
    /**
     * Search code by topic
     */
    async searchCode(topic, maxResults = 10) {
        const query = encodeURIComponent(`${topic} in:file language:python,typescript,rust,cpp,java`);
        const url = `${this.baseUrl}/search/code?q=${query}&per_page=${maxResults}`;
        const response = await this.fetch(url);
        if (!response.items)
            return [];
        return response.items.map((item) => ({
            repository: item.repository.full_name,
            path: item.path,
            url: item.html_url,
            repositoryUrl: item.repository.html_url,
            stars: item.repository.stargazers_count,
        }));
    }
    /**
     * Get repository details
     */
    async getRepo(owner, repo) {
        const url = `${this.baseUrl}/repos/${owner}/${repo}`;
        return this.fetch(url);
    }
    /**
     * Calculate relevance score based on topic match
     */
    calculateRelevance(repo, topic) {
        let score = 0;
        const topicLower = topic.toLowerCase();
        if (repo.name?.toLowerCase().includes(topicLower))
            score += 30;
        if (repo.description?.toLowerCase().includes(topicLower))
            score += 20;
        if (repo.topics?.some((t) => t.toLowerCase().includes(topicLower)))
            score += 25;
        // Star bonus (capped)
        score += Math.min(Math.log10(repo.stargazers_count + 1) * 10, 25);
        return Math.min(100, score);
    }
    /**
     * Fetch from GitHub API
     */
    async fetch(url) {
        const headers = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'ScholarPilot/1.0',
        };
        if (this.apiKey) {
            headers['Authorization'] = `Bearer ${this.apiKey}`;
        }
        const response = await fetch(url, { headers });
        if (response.status === 403) {
            const remaining = response.headers.get('x-ratelimit-remaining');
            if (remaining === '0') {
                throw new Error('GitHub API rate limit exceeded');
            }
        }
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        return response.json();
    }
};
GithubService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], GithubService);
export { GithubService };
//# sourceMappingURL=github.service.js.map