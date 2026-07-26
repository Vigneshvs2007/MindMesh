var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Module } from '@nitrostack/core';
import { EmbeddingsService } from './embeddings.service.js';
import { ConfigModule } from '../config/config.module.js';
/**
 * Embeddings Module
 *
 * Provides text embedding generation for clustering and similarity.
 */
let EmbeddingsModule = class EmbeddingsModule {
    embeddings;
    constructor(embeddings) {
        this.embeddings = embeddings;
    }
    async onModuleInit() {
        await this.embeddings.initialize();
    }
};
EmbeddingsModule = __decorate([
    Module({
        name: 'embeddings',
        description: 'Text embeddings for clustering, similarity, and novelty detection',
        imports: [ConfigModule],
        providers: [EmbeddingsService],
        exports: [EmbeddingsService],
    }),
    __metadata("design:paramtypes", [EmbeddingsService])
], EmbeddingsModule);
export { EmbeddingsModule };
//# sourceMappingURL=embeddings.module.js.map