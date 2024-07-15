import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors:{

        'neutral-100': '#1c1e1d',
            'neutral-200': '#5e5c59',
            'neutral-300': '#99989c',
            'primary-100': '#f5b256',
            'primary-200': '#f3c693',
            'primary-300': '#f4d6b5',
            'primary-400': '#f5ebdc',
            'secondary-100': '#564451',
            'secondary-200': '#665560',
            'secondary-300': '#74686e',
      }
    },
  },
  plugins: [],
};
export default config;
