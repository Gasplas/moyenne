const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	purge: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				foreground: "var(--foreground)",
				background: "var(--background)",
				accent: {
					1: "var(--accent-1)",
					2: "var(--accent-2)",
					3: "var(--accent-3)",
					4: "var(--accent-4)",
					5: "var(--accent-5)",
					6: "var(--accent-6)",
				},
				blue: {
					DEFAULT: "var(--blue)",
					hover: "var(--blue-hover)",
					background: "var(--blue-background)",
				},
				green: {
					DEFAULT: "var(--green)",
					background: "var(--green-background)",
				},
				red: {
					DEFAULT: "var(--red)",
					background: "var(--red-background)",
				},
				"light-gray": "var(--light-gray)",
				darken: "var(--darken)",
				"white-transparent": "var(--white-transparent)",
			},
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
			},
			borderRadius: {
				DEFAULT: "0.375rem",
			},
			boxShadow: {
				bottom: "inset 0 -1px var(--accent-2)",
			},
		},
	},
	variants: {
		extend: {
			margin: ["children"],
			textColor: ["children"],
		},
	},
	plugins: [
		plugin(function ({ addVariant, e }) {
			addVariant("children", ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.${e(`children${separator}${className}`)} > *`;
				});
			});
		}),
	],
};
