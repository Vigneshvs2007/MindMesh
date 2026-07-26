import { z } from 'zod';
/**
 * Environment Configuration Schema
 *
 * Validates all required environment variables at startup.
 */
export declare const EnvSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "production", "test"]>>;
    LOG_LEVEL: z.ZodDefault<z.ZodEnum<["debug", "info", "warn", "error"]>>;
    SEMANTIC_SCHOLAR_API_KEY: z.ZodOptional<z.ZodString>;
    GITHUB_TOKEN: z.ZodOptional<z.ZodString>;
    EMBEDDING_PROVIDER: z.ZodDefault<z.ZodEnum<["local", "openai"]>>;
    OPENAI_API_KEY: z.ZodOptional<z.ZodString>;
    OPENAI_EMBEDDING_MODEL: z.ZodDefault<z.ZodString>;
    OVERLEAF_GIT_URL: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    OVERLEAF_GIT_TOKEN: z.ZodOptional<z.ZodString>;
    MEMORY_PERSIST_PATH: z.ZodDefault<z.ZodString>;
    MEMORY_PERSIST_INTERVAL_MS: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    NODE_ENV: "development" | "production" | "test";
    LOG_LEVEL: "debug" | "info" | "warn" | "error";
    EMBEDDING_PROVIDER: "local" | "openai";
    OPENAI_EMBEDDING_MODEL: string;
    MEMORY_PERSIST_PATH: string;
    MEMORY_PERSIST_INTERVAL_MS: number;
    SEMANTIC_SCHOLAR_API_KEY?: string | undefined;
    GITHUB_TOKEN?: string | undefined;
    OPENAI_API_KEY?: string | undefined;
    OVERLEAF_GIT_URL?: string | undefined;
    OVERLEAF_GIT_TOKEN?: string | undefined;
}, {
    NODE_ENV?: "development" | "production" | "test" | undefined;
    LOG_LEVEL?: "debug" | "info" | "warn" | "error" | undefined;
    SEMANTIC_SCHOLAR_API_KEY?: string | undefined;
    GITHUB_TOKEN?: string | undefined;
    EMBEDDING_PROVIDER?: "local" | "openai" | undefined;
    OPENAI_API_KEY?: string | undefined;
    OPENAI_EMBEDDING_MODEL?: string | undefined;
    OVERLEAF_GIT_URL?: string | undefined;
    OVERLEAF_GIT_TOKEN?: string | undefined;
    MEMORY_PERSIST_PATH?: string | undefined;
    MEMORY_PERSIST_INTERVAL_MS?: number | undefined;
}>;
export type EnvConfig = z.infer<typeof EnvSchema>;
/**
 * Validates and parses environment variables.
 * Throws on validation failure with descriptive error.
 */
export declare function validateEnv(): EnvConfig;
//# sourceMappingURL=validation.schema.d.ts.map