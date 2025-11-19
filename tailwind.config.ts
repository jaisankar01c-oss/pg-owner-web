import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fe8141',
      },
      container: { center: true, padding: '1rem' },
      borderRadius: { '2xl': '1rem' },
    },
  },
  plugins: [],
} satisfies Config;
