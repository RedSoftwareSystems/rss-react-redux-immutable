const lessLoader = require('less-loader');
const getOptions = require('less-loader/dist/getOptions');

function devlessLoader(source) {
    const loaderContext = this;
    lessLoader.bind(loaderContext);

    const options = getOptions(loaderContext);


    lessLoader.call(loaderContext, options.inject ? `${[].concat(source, options.inject).join("\n")}` : source);
}

module.exports = devlessLoader;