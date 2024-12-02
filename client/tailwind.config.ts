import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        './pages/**/*.{js,ts,jsx,tsx}'
        // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require("daisyui")],
    daisyui: {
        darkTheme: "light", // name of one of the included themes for dark mode
    },
} satisfies Config;
