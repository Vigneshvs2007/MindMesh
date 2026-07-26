var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { MemoryModule } from '../../core/memory/memory.module.js';
import { OverleafModule } from '../../core/services/overleaf.module.js';
import { OverleafTools } from './overleaf.tools.js';
/**
 * Phase 13: Overleaf Integration Module (Mode 2)
 *
 * Paper drafting via Overleaf Git integration.
 * Creates projects from IEEE template, pushes sections, auto-generates limitations.
 */
let Phase13OverleafModule = class Phase13OverleafModule {
};
Phase13OverleafModule = __decorate([
    Module({
        name: 'phase13-overleaf',
        description: 'Overleaf paper drafting via Git integration',
        imports: [MemoryModule, OverleafModule],
        providers: [OverleafTools],
        controllers: [OverleafTools],
    })
], Phase13OverleafModule);
export { Phase13OverleafModule };
//# sourceMappingURL=phase13-overleaf.module.js.map