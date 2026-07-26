var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { MemoryModule } from '../../core/memory/memory.module.js';
import { MemoryStore } from '../../core/memory/memory.store.js';
import { VerificationTools } from './verification.tools.js';
/**
 * Phase 11: Research Verification Module
 */
let Phase11VerificationModule = class Phase11VerificationModule {
};
Phase11VerificationModule = __decorate([
    Module({
        name: 'phase11-verification',
        description: 'Research verification: claim support, citation accuracy, methodology consistency',
        imports: [MemoryModule],
        providers: [VerificationTools, MemoryStore],
        controllers: [VerificationTools],
    })
], Phase11VerificationModule);
export { Phase11VerificationModule };
//# sourceMappingURL=phase11-verification.module.js.map