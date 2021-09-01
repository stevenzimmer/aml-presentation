module.exports = {
    style: {
        postcss: {
            plugins: [
                require("postcss-nested"),
                require("tailwindcss"),
                require("postcss-nested"),
                require("autoprefixer"),
            ],
        },
    },
};
