import { ConfigService } from '../config/config.service.js';
/**
 * Embeddings Service
 *
 * Generates text embeddings for clustering, similarity search, and novelty detection.
 * Supports both local (Xenova/transformers) and remote (OpenAI) providers.
 */
export declare class EmbeddingsService {
    private config;
    private provider;
    private apiKey;
    private model;
    private localModel;
    private embeddingCache;
    constructor(config: ConfigService);
    /**
     * Initialize the service (call before use for local provider)
     */
    initialize(): Promise<void>;
    /**
     * Load local embedding model (Xenova/transformers)
     */
    private loadLocalModel;
    /**
     * Generate embedding for a single text
     */
    embed(text: string): Promise<number[]>;
    /**
     * Generate embeddings for multiple texts
     */
    embedBatch(texts: string[]): Promise<number[][]>;
    /**
     * Local embedding using Xenova transformers
     */
    private embedLocal;
    /**
     * OpenAI embedding API
     */
    private embedOpenAI;
    /**
     * Batch OpenAI embeddings
     */
    private embedBatchOpenAI;
    /**
     * Compute cosine similarity between two embeddings
     */
    cosineSimilarity(a: number[], b: number[]): number;
    /**
     * Find most similar texts to a query
     */
    findSimilar(query: string, candidates: Array<{
        id: string;
        text: string;
    }>, topK?: number): Promise<Array<{
        id: string;
        score: number;
        text: string;
    }>>;
    /**
     * Cluster embeddings using k-means (simple implementation)
     */
    cluster(items: Array<{
        id: string;
        text: string;
    }>, numClusters: number): Promise<Array<{
        id: string;
        cluster: number;
        text: string;
    }>>;
    /**
     * Simple k-means clustering
     */
    private kmeans;
    /**
     * Euclidean distance between two vectors
     */
    private euclideanDistance;
    /**
     * Truncate text to approximate token limit
     */
    private truncateText;
    /**
     * Simple hash for cache keys
     */
    private hashText;
    /**
     * Get cache size
     */
    getCacheSize(): number;
    /**
     * Clear embedding cache
     */
    clearCache(): void;
}
//# sourceMappingURL=embeddings.service.d.ts.map