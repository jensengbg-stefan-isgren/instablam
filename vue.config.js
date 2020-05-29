const fs = require("fs");

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync("./certs/localhost+3-key.pem"),
      cert: fs.readFileSync("./certs/localhost+3.pem"),
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/global.scss"; `,
      },
    },
  },
};
