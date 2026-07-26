import { HealthCheckInterface, HealthCheckResult } from '@nitrostack/core';
/**
 * System Health Check
 *
 * Verifies core system dependencies are available.
 */
export declare class SystemHealthCheck implements HealthCheckInterface {
    private startTime;
    constructor();
    check(): Promise<HealthCheckResult>;
}
//# sourceMappingURL=system.health.d.ts.map