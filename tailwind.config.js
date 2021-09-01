const colors = require("tailwindcss/colors");
module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                gray: {},
                grey: colors.blueGray,
            },
            fontFamily: {
                openSans: ['"Open Sans"', "sans-serif"],
                robotoMono: ['"Roboto Mono"', "monospace"],
            },
            container: {
                center: true,
            },

            screens: {
                xl: "1170px",
                "2xl": false,
                // => @media (min-width: 1536px) { ... }
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
