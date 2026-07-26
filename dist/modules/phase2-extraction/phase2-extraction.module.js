var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { MemoryModule } from '../../core/memory/memory.module.js';
import { EmbeddingsModule } from '../../core/services/embeddings.module.js';
import { SemanticScholarModule } from '../../core/services/semantic-scholar.module.js';
import { ExtractionTools } from './extraction.tools.js';
/**
 * Phase 2: Paper Extraction Module
 */
let Phase2ExtractionModule = class Phase2ExtractionModule {
};
Phase2ExtractionModule = __decorate([
    Module({
        name: 'phase2-extraction',
        description: 'Paper claim extraction, methodology, datasets, metrics, and technical parameters',
        imports: [MemoryModule, EmbeddingsModule, SemanticScholarModule],
        providers: [ExtractionTools],
        controllers: [ExtractionTools],
    })
], Phase2ExtractionModule);
export { Phase2ExtractionModule };
//# sourceMappingURL=phase2-extraction.module.js.map