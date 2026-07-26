import { ConfigService as NitroConfigService } from '@nitrostack/core';
import { EnvConfig } from './validation.schema.js';
/**
 * Configuration Service
 *
 * Wraps NitroStack ConfigService with validated environment access.
 * Provides type-safe getters for all configured environment variables.
 */
export declare class ConfigService {
    private nitroConfig;
    private env;
    constructor(nitroConfig: NitroConfigService);
    /**
     * Get raw environment variable
     */
    get<T = string>(key: string): T | undefined;
    /**
     * Get required environment variable (throws if missing)
     */
    getOrThrow<T = string>(key: string): T;
    getSemanticScholarApiKey(): string | undefined;
    getGithubToken(): string | undefined;
    getEmbeddingProvider(): 'local' | 'openai';
    getOpenAiApiKey(): string | undefined;
    getOpenAiEmbeddingModel(): string;
    getOverleafConfig(): {
        gitUrl?: string;
        gitToken?: string;
    };
    getMemoryConfig(): {
        persistPath: string;
        intervalMs: number;
    };
    getNodeEnv(): string;
    getLogLevel(): string;
    getValidatedConfig(): EnvConfig;
}
//# sourceMappingURL=config.service.d.ts.map