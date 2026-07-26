/**
 * Design Tokens — Dark Technical / Console Aesthetic
 * Shared across all ScholarPilot widgets for consistent theming
 */
export declare const DESIGN: {
    readonly colors: {
        readonly bg: "#0a0d12";
        readonly bgElevated: "#11161d";
        readonly bgHover: "#171e2a";
        readonly bgActive: "#1c2533";
        readonly border: "#1f2a3a";
        readonly borderBright: "#2d3d52";
        readonly fg: "#e8edf2";
        readonly fgMuted: "#8b98a8";
        readonly fgDim: "#5a6a7a";
        readonly amber: "#ffb800";
        readonly amberDim: "#cc9500";
        readonly amberBg: "rgba(255, 184, 0, 0.12)";
        readonly amberBorder: "rgba(255, 184, 0, 0.3)";
        readonly green: "#22c55e";
        readonly greenBg: "rgba(34, 197, 94, 0.12)";
        readonly greenBorder: "rgba(34, 197, 94, 0.3)";
        readonly red: "#ef4444";
        readonly redBg: "rgba(239, 68, 68, 0.12)";
        readonly redBorder: "rgba(239, 68, 68, 0.3)";
        readonly blue: "#3b82f6";
        readonly blueBg: "rgba(59, 130, 246, 0.12)";
        readonly blueBorder: "rgba(59, 130, 246, 0.3)";
        readonly phaseCore: "#3b82f6";
        readonly phaseStretch: "#a855f7";
        readonly phaseExport: "#14b8a6";
    };
    readonly fonts: {
        readonly sans: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
        readonly mono: "ui-monospace, SFMono-Regular, \"JetBrains Mono\", Menlo, monospace";
    };
    readonly spacing: {
        readonly xs: 4;
        readonly sm: 8;
        readonly md: 12;
        readonly lg: 16;
        readonly xl: 24;
        readonly xxl: 32;
    };
    readonly radius: {
        readonly sm: 4;
        readonly md: 8;
        readonly lg: 12;
        readonly xl: 16;
    };
    readonly shadows: {
        readonly sm: "0 1px 2px rgba(0,0,0,0.3)";
        readonly md: "0 4px 12px rgba(0,0,0,0.4)";
        readonly lg: "0 8px 24px rgba(0,0,0,0.5)";
        readonly glowAmber: "0 0 16px rgba(255,184,0,0.3)";
        readonly glowGreen: "0 0 16px rgba(34,197,94,0.3)";
        readonly glowBlue: "0 0 16px rgba(59,130,246,0.3)";
    };
    readonly transitions: {
        readonly fast: "120ms ease";
        readonly normal: "200ms ease";
        readonly slow: "300ms ease";
    };
    readonly zIndex: {
        readonly base: 1;
        readonly dropdown: 10;
        readonly modal: 100;
        readonly toast: 1000;
    };
};
export type DesignTokens = typeof DESIGN;
interface Phase {
    id: number;
    name: string;
    tools: readonly string[];
}
interface PhaseGroup {
    groupId: string;
    label: string;
    color: string;
    phases: readonly Phase[];
}
export declare const PHASE_GROUPS: readonly PhaseGroup[];
export declare const ALL_PHASES: Phase[];
export declare const TOOL_TO_PHASE: Record<string, number>;
export declare function getPhaseGroup(phaseId: number): PhaseGroup | undefined;
export declare function getPhaseColor(phaseId: number): string;
export declare function getPhaseInfo(phaseId: number): Phase | undefined;
export {};
//# sourceMappingURL=design-tokens.d.ts.map