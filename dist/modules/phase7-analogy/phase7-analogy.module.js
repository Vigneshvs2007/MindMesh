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
import { AnalogyTools } from './analogy.tools.js';
/**
 * Phase 7: Cross-Domain Analogist Module (Stretch)
 */
let Phase7AnalogyModule = class Phase7AnalogyModule {
};
Phase7AnalogyModule = __decorate([
    Module({
        name: 'phase7-analogy',
        description: 'Cross-domain analogy discovery for technique transfer',
        imports: [MemoryModule, EmbeddingsModule, SemanticScholarModule],
        providers: [AnalogyTools],
        controllers: [AnalogyTools],
    })
], Phase7AnalogyModule);
export { Phase7AnalogyModule };
//# sourceMappingURL=phase7-analogy.module.js.map