var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { MemoryModule } from '../../core/memory/memory.module.js';
import { MemoryStore } from '../../core/memory/memory.store.js';
import { WritingTools } from './writing.tools.js';
/**
 * Phase 10: Writing Assistance Module
 */
let Phase10WritingModule = class Phase10WritingModule {
};
Phase10WritingModule = __decorate([
    Module({
        name: 'phase10-writing',
        description: 'Writing checks: tone, AI-generic phrasing, meaning preservation, clarity',
        imports: [MemoryModule],
        providers: [WritingTools, MemoryStore],
        controllers: [WritingTools],
    })
], Phase10WritingModule);
export { Phase10WritingModule };
//# sourceMappingURL=phase10-writing.module.js.map