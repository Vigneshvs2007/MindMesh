var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { QuartileLookupService } from './quartile-lookup.service.js';
/**
 * Quartile Module
 *
 * Provides venue to quartile mapping from Scimago data.
 */
let QuartileModule = class QuartileModule {
};
QuartileModule = __decorate([
    Module({
        name: 'quartile',
        description: 'Scimago quartile lookup for venue quality assessment',
        providers: [QuartileLookupService],
        exports: [QuartileLookupService],
    })
], QuartileModule);
export { QuartileModule };
//# sourceMappingURL=quartile.module.js.map