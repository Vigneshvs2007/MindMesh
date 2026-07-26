var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { MemoryModule } from '../../core/memory/memory.module.js';
import { MemoryResources } from './memory.resources.js';
/**
 * Phase 12: Memory Persistence Module
 *
 * Session resources for persistent memory across research sessions.
 * Provides URI-based access to session state and knowledge graphs.
 */
let Phase12MemoryModule = class Phase12MemoryModule {
};
Phase12MemoryModule = __decorate([
    Module({
        name: 'phase12-memory',
        description: 'Persistent memory resources across research sessions',
        imports: [MemoryModule],
        providers: [MemoryResources],
        controllers: [MemoryResources],
    })
], Phase12MemoryModule);
export { Phase12MemoryModule };
//# sourceMappingURL=phase12-memory.module.js.map