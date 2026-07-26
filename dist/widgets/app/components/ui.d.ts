import { DESIGN } from './design-tokens';
interface PhaseBadgeProps {
    phase: number;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}
export declare function PhaseBadge({ phase, size, showLabel }: PhaseBadgeProps): import("react").JSX.Element;
interface ToolChipProps {
    name: string;
    phase?: number;
    active?: boolean;
    onClick?: () => void;
    showPhase?: boolean;
    size?: 'sm' | 'md' | 'lg';
}
export declare function ToolChip({ name, phase, active, onClick, showPhase, size }: ToolChipProps): import("react").JSX.Element;
interface StatusDotProps {
    status: 'idle' | 'pending' | 'in-progress' | 'synced' | 'completed' | 'error' | 'review' | 'creating' | 'syncing' | 'modified';
    size?: number;
    label?: string;
}
export declare function StatusDot({ status, size, label }: StatusDotProps): import("react").JSX.Element;
interface StatusIndicatorProps {
    status: StatusDotProps['status'];
    text?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare function StatusIndicator({ status, text, className, style }: StatusIndicatorProps): import("react").JSX.Element;
interface SeparatorProps {
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}
export declare function Separator({ orientation, className }: SeparatorProps): import("react").JSX.Element;
interface CardProps {
    children: React.ReactNode;
    elevated?: boolean;
    padding?: keyof typeof DESIGN.spacing;
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}
export declare function Card({ children, elevated, padding, className, onClick, style }: CardProps): import("react").JSX.Element;
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
    label?: string;
    icon?: React.ReactNode;
    error?: string;
    style?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
}
export declare function Input({ label, icon, error, className, style, inputStyle, ...props }: InputProps): import("react").JSX.Element;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
export declare function Button({ variant, size, loading, leftIcon, rightIcon, disabled, children, className, style, onClick, ...props }: ButtonProps): import("react").JSX.Element;
interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md';
    style?: React.CSSProperties;
}
export declare function Badge({ children, variant, size, style }: BadgeProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ui.d.ts.map