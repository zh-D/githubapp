//next集成import css文件的方法 start
const webpack = require("webpack");
const withCss = require("@zeit/next-css");
const config = require("./config");
const WithBundleAnalyzer = require("@zeit/next-bundle-analyzer");

if (typeof require !== "undefined") {
  require.extensions[".css"] = (file) => {};
}

module.exports = WithBundleAnalyzer(
  withCss({
    webpack(config) {
      config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
      return config;
    },
    // distDir: "dest",
    publicRuntimeConfig: {
      GITHUB_OAUTH_URL: config.GITHUB_OAUTH_URL,
      OAUTH_URL: config.OAUTH_URL,
    },
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: "static",
        reportFilename: "../bundles/server.html",
      },
      browser: {
        analyzerMode: "static",
        reportFilename: "../bundles/client.html",
      },
    },
  })
);

// const withCSS = require("@zeit/next-css");
// module.exports = withCSS({
//   /* config options here */
// });
//next集成import css文件的方法 end

// const configs = {
//   //编译文件的输出目录
//   distDir: "dest",
//   //是否给每个路由生成Etag
//   generateEtag: true,
//   //页面内容缓存配置
//   generateEntries: {
//     //内容在内存中的缓存时长
//     maxInactive: 25 * 100,
//     //同时缓存多少个页面
//     pagesBufferLength: 2,
//   },

//   //在pages目录下哪种后缀的文件会被认为是页面
//   pageExtensions: ["jsx", "js"],
//   //配置buildId
//   generateBuildId: async () => {
//     if (process.env.YOU_BUILD_ID) {
//       return process.env.YOU_BUILD_ID;
//     }
//     //返回null默认使用unique id
//     return null;
//   },
//   //手动修改webpack config
//   webpack(config, options) {
//     return config;
//   },

//   //修改webpackDevMiddleware配置
//   webpackDevMiddleware: (config) => {
//     return config;
//   },
//   //可以在页面上通过 procsess.env.customKey 获取 value
//   env: {
//     customKey: "value",
//   },
//   //下面两个要通过 'next/config' 来读取
//   //只有在服务端渲染时才会获取的配置
//   serverRuntimeConfig: {
//     mySecret: "secret",
//     secondSecret: ProcessingInstruction.env.SECOND_SECRET,
//   },

//   //在服务器端和客户端渲染都可获取的配置
//   publicRuntimeConfig: {
//     staticFolder: "./static",
//   },
// };
