var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { MemoryStore } from './memory.store.js';
import { ConfigModule } from '../config/config.module.js';
/**
 * Memory Module
 *
 * Provides the MemoryStore for session persistence across runs.
 * This is the backbone of the "persistent memory" feature.
 */
let MemoryModule = class MemoryModule {
};
MemoryModule = __decorate([
    Module({
        name: 'memory',
        description: 'Persistent session memory with JSON file storage',
        imports: [ConfigModule],
        providers: [MemoryStore],
        exports: [MemoryStore],
    })
], MemoryModule);
export { MemoryModule };
//# sourceMappingURL=memory.module.js.map