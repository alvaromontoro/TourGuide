const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
const mediapacker = require("css-mqpacker");

module.exports = {
  plugins: [autoprefixer, pxtorem({ replace: false }), mediapacker]
};
