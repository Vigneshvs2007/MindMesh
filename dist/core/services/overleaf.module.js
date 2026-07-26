var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { OverleafService } from './overleaf.service.js';
import { ConfigModule } from '../config/config.module.js';
import { MemoryModule } from '../memory/memory.module.js';
/**
 * Overleaf Module
 *
 * Provides Overleaf Git integration for paper drafting (Mode 2).
 */
let OverleafModule = class OverleafModule {
};
OverleafModule = __decorate([
    Module({
        name: 'overleaf',
        description: 'Overleaf Git integration for paper drafting',
        imports: [ConfigModule, MemoryModule],
        providers: [OverleafService],
        exports: [OverleafService],
    })
], OverleafModule);
export { OverleafModule };
//# sourceMappingURL=overleaf.module.js.map