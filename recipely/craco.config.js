const CracoLessPlugin = require("craco-less")
// const CracoAlias = require("craco-alias")

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    }
    // {
    //   plugin: CracoAlias,
    //   options: {
    //     source: "tsconfig",
    //     baseUrl: "./src",
    //     tsConfigPath: "./tsconfig.extend.json"
    //   }
    // }
  ]
}
