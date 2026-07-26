var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { MemoryModule } from '../../core/memory/memory.module.js';
import { VerdictTools } from './verdict.tools.js';
/**
 * Phase 6: Verdict & Resilience Score Module
 */
let Phase6VerdictModule = class Phase6VerdictModule {
};
Phase6VerdictModule = __decorate([
    Module({
        name: 'phase6-verdict',
        description: 'Resilience score computation and PASS/CONDITIONAL/REJECT verdict',
        imports: [MemoryModule],
        providers: [VerdictTools],
        controllers: [VerdictTools],
    })
], Phase6VerdictModule);
export { Phase6VerdictModule };
//# sourceMappingURL=phase6-verdict.module.js.map