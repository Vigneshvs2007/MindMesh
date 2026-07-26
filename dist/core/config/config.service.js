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
import { ConfigService as NitroConfigService } from '@nitrostack/core';
import { validateEnv } from './validation.schema.js';
/**
 * Configuration Service
 *
 * Wraps NitroStack ConfigService with validated environment access.
 * Provides type-safe getters for all configured environment variables.
 */
let ConfigService = class ConfigService {
    nitroConfig;
    env;
    constructor(nitroConfig) {
        this.nitroConfig = nitroConfig;
        this.env = validateEnv();
    }
    /**
     * Get raw environment variable
     */
    get(key) {
        return this.nitroConfig.get(key);
    }
    /**
     * Get required environment variable (throws if missing)
     */
    getOrThrow(key) {
        const value = this.nitroConfig.get(key);
        if (value === undefined) {
            throw new Error(`Required environment variable ${key} is not set`);
        }
        return value;
    }
    // ========== Semantic Scholar ==========
    getSemanticScholarApiKey() {
        return this.env.SEMANTIC_SCHOLAR_API_KEY;
    }
    // ========== GitHub ==========
    getGithubToken() {
        return this.env.GITHUB_TOKEN;
    }
    // ========== Embeddings ==========
    getEmbeddingProvider() {
        return this.env.EMBEDDING_PROVIDER;
    }
    getOpenAiApiKey() {
        return this.env.OPENAI_API_KEY;
    }
    getOpenAiEmbeddingModel() {
        return this.env.OPENAI_EMBEDDING_MODEL;
    }
    // ========== Overleaf ==========
    getOverleafConfig() {
        return {
            gitUrl: this.env.OVERLEAF_GIT_URL,
            gitToken: this.env.OVERLEAF_GIT_TOKEN,
        };
    }
    // ========== Memory Persistence ==========
    getMemoryConfig() {
        return {
            persistPath: this.env.MEMORY_PERSIST_PATH,
            intervalMs: this.env.MEMORY_PERSIST_INTERVAL_MS,
        };
    }
    // ========== Core ==========
    getNodeEnv() {
        return this.env.NODE_ENV;
    }
    getLogLevel() {
        return this.env.LOG_LEVEL;
    }
    // ========== Full validated config ==========
    getValidatedConfig() {
        return this.env;
    }
};
ConfigService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NitroConfigService])
], ConfigService);
export { ConfigService };
//# sourceMappingURL=config.service.js.map