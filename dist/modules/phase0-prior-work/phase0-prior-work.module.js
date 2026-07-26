var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { ConfigModule } from '../../core/config/config.module.js';
import { MemoryModule } from '../../core/memory/memory.module.js';
import { SemanticScholarModule } from '../../core/services/semantic-scholar.module.js';
import { GithubModule } from '../../core/services/github.module.js';
import { PriorWorkTools } from './prior-work.tools.js';
import { PriorWorkResources } from './prior-work.resources.js';
/**
 * Phase 0: Prior Work Module
 * Import core modules for DI injection. Tools in both providers & controllers.
 */
let Phase0PriorWorkModule = class Phase0PriorWorkModule {
};
Phase0PriorWorkModule = __decorate([
    Module({
        name: 'phase0-prior-work',
        description: 'Prior work discovery - papers, repos, and previous AI sessions',
        imports: [ConfigModule, MemoryModule, SemanticScholarModule, GithubModule],
        providers: [PriorWorkTools, PriorWorkResources],
        controllers: [PriorWorkTools, PriorWorkResources],
    })
], Phase0PriorWorkModule);
export { Phase0PriorWorkModule };
//# sourceMappingURL=phase0-prior-work.module.js.map