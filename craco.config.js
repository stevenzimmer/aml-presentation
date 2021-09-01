module.exports = {
    babel: {
        loaderOptions: {
            ignore: ["./node_modules/mapbox-gl/dist/mapbox-gl.js"],
        },
    },
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
