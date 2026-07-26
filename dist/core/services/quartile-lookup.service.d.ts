import { OnModuleInit } from '@nitrostack/core';
/**
 * Quartile Lookup Service
 *
 * Maps venue names to SJR/Scimago quartiles using a static CSV file.
 * Data should be downloaded from Scimago and placed in data/scimago-quartiles.csv
 */
export declare class QuartileLookupService implements OnModuleInit {
    private quartiles;
    private dataPath;
    constructor();
    onModuleInit(): void;
    /**
     * Load quartile mapping from CSV
     */
    private loadQuartiles;
    /**
     * Populate with common CS venues as fallback
     */
    private populateDefaults;
    /**
     * Look up quartile for a venue name
     */
    lookup(venueName: string): 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'unknown';
    /**
     * Get all loaded quartiles (for debugging)
     */
    getAll(): Map<string, 'Q1' | 'Q2' | 'Q3' | 'Q4'>;
    /**
     * Reload from disk
     */
    reload(): void;
}
//# sourceMappingURL=quartile-lookup.service.d.ts.map