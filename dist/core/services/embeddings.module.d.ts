import { EmbeddingsService } from './embeddings.service.js';
/**
 * Embeddings Module
 *
 * Provides text embedding generation for clustering and similarity.
 */
export declare class EmbeddingsModule {
    private embeddings;
    constructor(embeddings: EmbeddingsService);
    onModuleInit(): Promise<void>;
}
//# sourceMappingURL=embeddings.module.d.ts.map