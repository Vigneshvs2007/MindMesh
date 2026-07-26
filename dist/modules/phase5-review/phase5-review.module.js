var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { MemoryModule } from '../../core/memory/memory.module.js';
import { SemanticScholarModule } from '../../core/services/semantic-scholar.module.js';
import { Phase4GapFinderModule } from '../phase4-gap-finder/phase4-gap-finder.module.js';
import { ReviewTools } from './review.tools.js';
import { GapFinderTools } from '../phase4-gap-finder/gap-finder.tools.js';
/**
 * Phase 5: Adversarial Review Module
 */
let Phase5ReviewModule = class Phase5ReviewModule {
};
Phase5ReviewModule = __decorate([
    Module({
        name: 'phase5-review',
        description: 'Adversarial review with retry loop - core differentiator',
        imports: [MemoryModule, SemanticScholarModule, Phase4GapFinderModule],
        providers: [ReviewTools, GapFinderTools],
        controllers: [ReviewTools],
    })
], Phase5ReviewModule);
export { Phase5ReviewModule };
//# sourceMappingURL=phase5-review.module.js.map