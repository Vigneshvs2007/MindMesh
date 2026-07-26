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
 * Embeddings Service
 *
 * Generates text embeddings for clustering, similarity search, and novelty detection.
 * Supports both local (Xenova/transformers) and remote (OpenAI) providers.
 */
let EmbeddingsService = class EmbeddingsService {
    config;
    provider;
    apiKey;
    model;
    localModel = null;
    embeddingCache = new Map();
    constructor(config) {
        this.config = config;
        this.provider = config.getEmbeddingProvider();
        this.apiKey = config.getOpenAiApiKey();
        this.model = config.getOpenAiEmbeddingModel();
    }
    /**
     * Initialize the service (call before use for local provider)
     */
    async initialize() {
        if (this.provider === 'local') {
            await this.loadLocalModel();
        }
    }
    /**
     * Load local embedding model (Xenova/transformers)
     */
    async loadLocalModel() {
        try {
            // Dynamic import to avoid issues if not installed
            const { pipeline } = await import('@xenova/transformers');
            this.localModel = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', { quantized: true });
            console.log('[EmbeddingsService] Local model loaded: all-MiniLM-L6-v2');
        }
        catch (error) {
            console.error('[EmbeddingsService] Failed to load local model:', error);
            throw new Error('Local embedding model not available. Install @xenova/transformers or set EMBEDDING_PROVIDER=openai');
        }
    }
    /**
     * Generate embedding for a single text
     */
    async embed(text) {
        // Check cache first
        const cacheKey = this.hashText(text);
        if (this.embeddingCache.has(cacheKey)) {
            return this.embeddingCache.get(cacheKey);
        }
        let embedding;
        if (this.provider === 'local') {
            embedding = await this.embedLocal(text);
        }
        else {
            embedding = await this.embedOpenAI(text);
        }
        // Cache the result
        this.embeddingCache.set(cacheKey, embedding);
        return embedding;
    }
    /**
     * Generate embeddings for multiple texts
     */
    async embedBatch(texts) {
        if (this.provider === 'local') {
            return Promise.all(texts.map(t => this.embedLocal(t)));
        }
        else {
            return this.embedBatchOpenAI(texts);
        }
    }
    /**
     * Local embedding using Xenova transformers
     */
    async embedLocal(text) {
        if (!this.localModel) {
            await this.loadLocalModel();
        }
        // Truncate text to model max length (256 tokens for MiniLM)
        const truncated = this.truncateText(text, 256);
        const output = await this.localModel(truncated, { pooling: 'mean', normalize: true });
        return Array.from(output.data);
    }
    /**
     * OpenAI embedding API
     */
    async embedOpenAI(text) {
        const response = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: this.model,
                input: text,
                encoding_format: 'float',
            }),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`OpenAI API error: ${response.status} - ${error}`);
        }
        const data = await response.json();
        return data.data[0].embedding;
    }
    /**
     * Batch OpenAI embeddings
     */
    async embedBatchOpenAI(texts) {
        const response = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: this.model,
                input: texts,
                encoding_format: 'float',
            }),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`OpenAI API error: ${response.status} - ${error}`);
        }
        const data = await response.json();
        return data.data.map(d => d.embedding);
    }
    /**
     * Compute cosine similarity between two embeddings
     */
    cosineSimilarity(a, b) {
        if (a.length !== b.length) {
            throw new Error('Embedding dimensions must match');
        }
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        for (let i = 0; i < a.length; i++) {
            dotProduct += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }
        if (normA === 0 || normB === 0)
            return 0;
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }
    /**
     * Find most similar texts to a query
     */
    async findSimilar(query, candidates, topK = 10) {
        const queryEmbedding = await this.embed(query);
        const candidateTexts = candidates.map(c => c.text);
        const candidateEmbeddings = await this.embedBatch(candidateTexts);
        const scored = candidates.map((c, i) => ({
            id: c.id,
            text: c.text,
            score: this.cosineSimilarity(queryEmbedding, candidateEmbeddings[i]),
        }));
        scored.sort((a, b) => b.score - a.score);
        return scored.slice(0, topK);
    }
    /**
     * Cluster embeddings using k-means (simple implementation)
     */
    async cluster(items, numClusters) {
        const texts = items.map(i => i.text);
        const embeddings = await this.embedBatch(texts);
        // Simple k-means
        const clusters = this.kmeans(embeddings, numClusters);
        return items.map((item, i) => ({
            id: item.id,
            cluster: clusters[i],
            text: item.text,
        }));
    }
    /**
     * Simple k-means clustering
     */
    kmeans(embeddings, k) {
        const n = embeddings.length;
        const dim = embeddings[0].length;
        // Initialize centroids randomly
        const centroids = Array.from({ length: k }, () => {
            const idx = Math.floor(Math.random() * n);
            return [...embeddings[idx]];
        });
        let assignments = new Array(n).fill(0);
        let changed = true;
        let iterations = 0;
        const maxIterations = 100;
        while (changed && iterations < maxIterations) {
            changed = false;
            iterations++;
            // Assign each point to nearest centroid
            for (let i = 0; i < n; i++) {
                let bestDist = Infinity;
                let bestCluster = 0;
                for (let c = 0; c < k; c++) {
                    const dist = this.euclideanDistance(embeddings[i], centroids[c]);
                    if (dist < bestDist) {
                        bestDist = dist;
                        bestCluster = c;
                    }
                }
                if (assignments[i] !== bestCluster) {
                    assignments[i] = bestCluster;
                    changed = true;
                }
            }
            // Update centroids
            const counts = new Array(k).fill(0);
            const newCentroids = Array.from({ length: k }, () => new Array(dim).fill(0));
            for (let i = 0; i < n; i++) {
                const cluster = assignments[i];
                counts[cluster]++;
                for (let d = 0; d < dim; d++) {
                    newCentroids[cluster][d] += embeddings[i][d];
                }
            }
            for (let c = 0; c < k; c++) {
                if (counts[c] > 0) {
                    for (let d = 0; d < dim; d++) {
                        centroids[c][d] = newCentroids[c][d] / counts[c];
                    }
                }
            }
        }
        return assignments;
    }
    /**
     * Euclidean distance between two vectors
     */
    euclideanDistance(a, b) {
        let sum = 0;
        for (let i = 0; i < a.length; i++) {
            const diff = a[i] - b[i];
            sum += diff * diff;
        }
        return Math.sqrt(sum);
    }
    /**
     * Truncate text to approximate token limit
     */
    truncateText(text, maxTokens) {
        // Rough estimate: 1 token ≈ 4 characters
        const maxChars = maxTokens * 4;
        if (text.length <= maxChars)
            return text;
        return text.slice(0, maxChars);
    }
    /**
     * Simple hash for cache keys
     */
    hashText(text) {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36) + text.length.toString(36);
    }
    /**
     * Get cache size
     */
    getCacheSize() {
        return this.embeddingCache.size;
    }
    /**
     * Clear embedding cache
     */
    clearCache() {
        this.embeddingCache.clear();
    }
};
EmbeddingsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], EmbeddingsService);
export { EmbeddingsService };
//# sourceMappingURL=embeddings.service.js.map