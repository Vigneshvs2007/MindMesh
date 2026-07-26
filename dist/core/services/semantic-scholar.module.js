var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { SemanticScholarService } from './semantic-scholar.service.js';
import { ConfigModule } from '../config/config.module.js';
/**
 * Semantic Scholar Module
 */
let SemanticScholarModule = class SemanticScholarModule {
};
SemanticScholarModule = __decorate([
    Module({
        name: 'semantic-scholar',
        description: 'Semantic Scholar API wrapper for paper search and metadata',
        imports: [ConfigModule],
        providers: [SemanticScholarService],
        exports: [SemanticScholarService],
    })
], SemanticScholarModule);
export { SemanticScholarModule };
//# sourceMappingURL=semantic-scholar.module.js.map