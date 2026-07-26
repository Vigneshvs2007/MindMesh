var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { MemoryModule } from '../../core/memory/memory.module.js';
import { EmbeddingsModule } from '../../core/services/embeddings.module.js';
import { GapFinderTools } from './gap-finder.tools.js';
/**
 * Phase 4: Gap Finder Module
 */
let Phase4GapFinderModule = class Phase4GapFinderModule {
};
Phase4GapFinderModule = __decorate([
    Module({
        name: 'phase4-gap-finder',
        description: 'Novelty assessment and research gap proposal',
        imports: [MemoryModule, EmbeddingsModule],
        providers: [GapFinderTools],
        controllers: [GapFinderTools],
        exports: [GapFinderTools],
    })
], Phase4GapFinderModule);
export { Phase4GapFinderModule };
//# sourceMappingURL=phase4-gap-finder.module.js.map