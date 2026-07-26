var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { MemoryModule } from '../../core/memory/memory.module.js';
import { SemanticScholarModule } from '../../core/services/semantic-scholar.module.js';
import { QuartileModule } from '../../core/services/quartile.module.js';
import { SearchTools } from './search.tools.js';
/**
 * Phase 1: Paper Search Module
 */
let Phase1SearchModule = class Phase1SearchModule {
};
Phase1SearchModule = __decorate([
    Module({
        name: 'phase1-search',
        description: 'Paper search, relevance scoring, and metadata retrieval',
        imports: [MemoryModule, SemanticScholarModule, QuartileModule],
        providers: [SearchTools],
        controllers: [SearchTools],
    })
], Phase1SearchModule);
export { Phase1SearchModule };
//# sourceMappingURL=phase1-search.module.js.map