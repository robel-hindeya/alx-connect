export const ALXTheme = {
  colors: {
    bg: '#F6F7FB',
    card: '#FFFFFF',
    text: '#0F172A',
    subtext: '#64748B',
    border: '#E2E8F0',
    primary: '#2563EB',
    primarySoft: '#E8EEFF',
    danger: '#EF4444',
    success: '#16A34A',
    tabBar: '#FFFFFF',
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 18,
    pill: 999,
  },
  typography: {
    title: 22,
    h2: 18,
    body: 15,
    caption: 13,
  },
  shadow: {
    card: {
      shadowColor: '#0B1220',
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
  },
} as const;

