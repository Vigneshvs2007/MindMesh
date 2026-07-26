var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { MemoryModule } from '../../core/memory/memory.module.js';
import { CitationTools } from './citation.tools.js';
/**
 * Phase 9: Citation Management Module
 */
let Phase9CitationsModule = class Phase9CitationsModule {
};
Phase9CitationsModule = __decorate([
    Module({
        name: 'phase9-citations',
        description: 'Citation generation in IEEE, APA, MLA formats and BibTeX export',
        imports: [MemoryModule],
        providers: [CitationTools],
        controllers: [CitationTools],
    })
], Phase9CitationsModule);
export { Phase9CitationsModule };
//# sourceMappingURL=phase9-citations.module.js.map