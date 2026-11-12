/** Defaults shared by the icons under a provider: colours, size, finish. */
import { createContext, createElement, forwardRef, useMemo, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';
import type { IconModel, ThemeInput } from 'triolet/core';
import { TrioletIcon, type TrioletIconHandle, type TrioletIconProps } from './TrioletIcon.tsx';

export interface TrioletDefaults {
  /** Default size of the icons inside, in points. */
  size?: number;
  /** Colours of the icons inside. */
  colors?: ThemeInput;
  finish?: 'relief' | 'flat';
}

export const TrioletContext = createContext<TrioletDefaults>({});

export interface TrioletProviderProps extends TrioletDefaults {
  children?: ReactNode;
}

/**
 *     <TrioletProvider colors={{ main: '#1f5a3d', accent: '#e8a13a', surface: '#f7f9f3' }} size={28}>
 *       <Toolbar />
 *     </TrioletProvider>
 */
export function TrioletProvider({ children, size, colors, finish }: TrioletProviderProps): ReactNode {
  const value = useMemo(() => ({ size, colors, finish }), [size, colors, finish]);
  return createElement(TrioletContext.Provider, { value }, children);
}

export type IconComponentProps = Omit<TrioletIconProps, 'icon'>;
export type IconComponent = ForwardRefExoticComponent<IconComponentProps & RefAttributes<TrioletIconHandle>>;

/** Makes the component of one icon. */
export function createIcon(data: { model: IconModel }, displayName: string): IconComponent {
  const Icon = forwardRef<TrioletIconHandle, IconComponentProps>(function Icon(props, ref) {
    return createElement(TrioletIcon, { ...props, icon: data.model, ref });
  });
  Icon.displayName = displayName;
  return Icon;
}
