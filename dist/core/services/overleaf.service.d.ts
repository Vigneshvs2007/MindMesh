import { ConfigService } from '../config/config.service.js';
/**
 * Overleaf Service
 *
 * Manages Overleaf projects via Git bridge.
 * Clones project repo, allows section-level commits, and pushes changes.
 */
export declare class OverleafService {
    private config;
    private git;
    private projectsDir;
    private gitUrl;
    private gitToken;
    private currentProjectId;
    private currentProjectPath;
    constructor(config: ConfigService);
    /**
     * Initialize and create a new Overleaf project from template
     */
    createProject(title: string, authors: string[], template?: 'ieee' | 'acm' | 'elsevier'): Promise<{
        projectId: string;
        projectPath: string;
    }>;
    /**
     * Initialize project with IEEE template structure
     */
    private initializeTemplate;
    /**
     * Generate main.tex template
     */
    private generateMainTex;
    /**
     * Push content to a specific section
     */
    pushSection(section: string, content: string): Promise<void>;
    /**
     * Pull limitations from reviewer objections
     */
    pushLimitations(objections: string[]): Promise<void>;
    /**
     * Add bibliography entries
     */
    addBibliography(bibtex: string): Promise<void>;
    /**
     * Commit and push changes to Overleaf
     */
    commit(message: string): Promise<void>;
    /**
     * Export project as ZIP (for download)
     */
    exportZip(): Promise<string>;
    /**
     * Get current project info
     */
    getProjectInfo(): {
        projectId?: string;
        projectPath?: string;
    };
    /**
     * Extract project ID from Overleaf Git URL
     */
    private extractProjectId;
}
//# sourceMappingURL=overleaf.service.d.ts.map