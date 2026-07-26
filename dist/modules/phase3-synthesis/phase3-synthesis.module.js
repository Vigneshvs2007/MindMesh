var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { MemoryModule } from '../../core/memory/memory.module.js';
import { EmbeddingsModule } from '../../core/services/embeddings.module.js';
import { SynthesisTools } from './synthesis.tools.js';
/**
 * Phase 3: Literature Synthesis Module
 *
 * Clusters papers, finds contradictions, and synthesizes themes.
 */
let Phase3SynthesisModule = class Phase3SynthesisModule {
};
Phase3SynthesisModule = __decorate([
    Module({
        name: 'phase3-synthesis',
        description: 'Paper clustering, contradiction detection, and theme synthesis',
        imports: [MemoryModule, EmbeddingsModule],
        providers: [SynthesisTools],
        controllers: [SynthesisTools],
    })
], Phase3SynthesisModule);
export { Phase3SynthesisModule };
//# sourceMappingURL=phase3-synthesis.module.js.map