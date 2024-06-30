import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}', // Pages directory
        './components/**/*.{js,ts,jsx,tsx,mdx}', // Components directory
        './layouts/**/*.{js,ts,jsx,tsx,mdx}', // Layouts directory (added this line)
        './app/**/*.{js,ts,jsx,tsx,mdx}', // App directory
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};

export default config;
