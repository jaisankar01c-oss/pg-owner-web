export const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const;
export type BreakpointKey = keyof typeof breakpoints;
export function cn(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(' ');
}
export const sectionPadding = 'px-4 sm:px-6 lg:px-8 py-12 sm:py-16';
