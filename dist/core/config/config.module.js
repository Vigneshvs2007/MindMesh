var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { ConfigModule as NitroConfigModule, ConfigService as NitroConfigService } from '@nitrostack/core';
import { ConfigService } from './config.service.js';
/**
 * Configuration Module
 *
 * Provides validated environment configuration via ConfigService.
 * Uses Zod for schema validation at startup.
 * Also configures NitroStack's built-in ConfigModule for DI.
 */
let ConfigModule = class ConfigModule {
};
ConfigModule = __decorate([
    Module({
        name: 'config',
        description: 'Application configuration',
        imports: [
            NitroConfigModule.forRoot({
                validate: (config) => true, // We handle validation in our ConfigService
            }),
        ],
        providers: [ConfigService],
        exports: [ConfigService, NitroConfigService],
    })
], ConfigModule);
export { ConfigModule };
//# sourceMappingURL=config.module.js.map