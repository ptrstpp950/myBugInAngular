const path = require('path');
// var PROD = (process.env.NODE_ENV === 'production');
const PROD = process.argv.indexOf('--prod') !== -1;

const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');


const { NoEmitOnErrorsPlugin, NamedModulesPlugin } = require('webpack');
const { GlobCopyWebpackPlugin, BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AotPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";
const postcssPlugins = function () {
        // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
        const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
        const minimizeOptions = {
            autoprefixer: false,
            safe: true,
            mergeLonghand: false,
            discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
        };
        return [
            postcssUrl({
                url: (URL) => {
                    // Only convert root relative URLs, which CSS-Loader won't process into require().
                    if (!URL.startsWith('/') || URL.startsWith('//')) {
                        return URL;
                    }
                    if (deployUrl.match(/:\/\//)) {
                        // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                        return `${deployUrl.replace(/\/$/, '')}${URL}`;
                    }
                    else if (baseHref.match(/:\/\//)) {
                        // If baseHref contains a scheme, include it as is.
                        return baseHref.replace(/\/$/, '') +
                            `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                    }
                    else {
                        // Join together base-href, deploy-url and the original URL.
                        // Also dedupe multiple slashes into single ones.
                        return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                    }
                }
            }),
            autoprefixer(),
        ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
    };




module.exports = {
  "devtool": "source-map",
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules",
      "./node_modules"
    ]
  },
  "resolveLoader": {
    "modules": [
      "./node_modules"
    ]
  },
  "entry": {
    "index": [
      "./src\\_index.ts"
    ],
    "main": [
      "./src\\app.ts"
    ],
    "polyfills": [
      "./src\\polyfills.ts"
    ],
    "styles": [
      "./src\\css\\main.scss"
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": process.env.NODE_ENV === 'production' ? '[name].bundle.min.js' : '[name].bundle.js',
    "chunkFilename": "[id].chunk.js"
  },
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "test": /\.js$/,
        "loader": "source-map-loader",
        "exclude": [
          /\/node_modules\//
        ]
      },
      {
        "test": /\.json$/,
        "loader": "json-loader"
      },
      {
        "test": /\.html$/,
        "loader": "raw-loader"
      },
      {
        "test": /\.(eot|svg)$/,
        "loader": "file-loader?name=[name].[hash:20].[ext]"
      },
      {
        "test": /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
        "loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
      },
      {
        "exclude": [
          path.join(process.cwd(), "src\\css\\main.scss"),
          path.join(process.cwd(), "src\\css\\main.css"),
          path.join(process.cwd(), "src\\css\\main.less")
        ],
        "test": /\.css$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src\\css\\main.scss"),
          path.join(process.cwd(), "src\\css\\main.css"),
          path.join(process.cwd(), "src\\css\\main.less")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src\\css\\main.scss"),
          path.join(process.cwd(), "src\\css\\main.css"),
          path.join(process.cwd(), "src\\css\\main.less")
        ],
        "test": /\.less$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src\\css\\main.scss"),
          path.join(process.cwd(), "src\\css\\main.css"),
          path.join(process.cwd(), "src\\css\\main.less")
        ],
        "test": /\.styl$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src\\css\\main.scss"),
          path.join(process.cwd(), "src\\css\\main.css"),
          path.join(process.cwd(), "src\\css\\main.less")
        ],
        "test": /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
                "loader": "css-loader",
                "options": {
                  "minimize": true
                }
              }]

          })

      },
      {
        "include": [
          path.join(process.cwd(), "src\\css\\main.scss"),
          path.join(process.cwd(), "src\\css\\main.css"),
          path.join(process.cwd(), "src\\css\\main.less")
        ],
        "test": /\.scss$|\.sass$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
                "loader": "css-loader",
                "options": {
                  "sourceMap": false,
                  "importLoaders": 1,
                  "minimize": true
                }
              },
              {
                "loader": "postcss-loader",
                "options": {
                  "ident": "postcss",
                  "plugins": postcssPlugins
                }
              },
              {
                "loader": "sass-loader",
                "options": {
                  "sourceMap": false,
                  "precision": 8,
                  "includePaths": []
                }
              }]
          })
        // "use": [
        //   "style-loader",
        //   {
        //     "loader": "css-loader",
        //     "options": {
        //       "sourceMap": false,
        //       "importLoaders": 1
        //     }
        //   },
        //   {
        //     "loader": "postcss-loader",
        //     "options": {
        //       "ident": "postcss",
        //       "plugins": postcssPlugins
        //     }
        //   },
        //   {
        //     "loader": "sass-loader",
        //     "options": {
        //       "sourceMap": false,
        //       "precision": 8,
        //       "includePaths": []
        //     }
        //   }
        // ]
      },
      {
        "include": [
          path.join(process.cwd(), "src\\css\\main.scss"),
          path.join(process.cwd(), "src\\css\\main.css"),
          path.join(process.cwd(), "src\\css\\main.less")
        ],
        "test": /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
              "loader": "css-loader",
              "options": {
                "sourceMap": false,
                "importLoaders": 1,
                "minimize": true
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            },
            {
              "loader": "less-loader",
              "options": {
                "sourceMap": false
              }
            }]
        })
        // "use": [
        //   "style-loader",
        //   {
        //     "loader": "css-loader",
        //     "options": {
        //       "sourceMap": false,
        //       "importLoaders": 1
        //     }
        //   },
        //   {
        //     "loader": "postcss-loader",
        //     "options": {
        //       "ident": "postcss",
        //       "plugins": postcssPlugins
        //     }
        //   },
        //   {
        //     "loader": "less-loader",
        //     "options": {
        //       "sourceMap": false
        //     }
        //   }
        // ]
      },
      {
        "include": [
          path.join(process.cwd(), "src\\css\\main.scss"),
          path.join(process.cwd(), "src\\css\\main.css"),
          path.join(process.cwd(), "src\\css\\main.less")
        ],
        "test": /\.styl$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1,
              "minimize": true
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack"
      }
    ]
  },
  "plugins": [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new NoEmitOnErrorsPlugin(),
    new GlobCopyWebpackPlugin({
      "patterns": [
        "assets",
        "favicon.ico",
        "web.config"
      ],
      "globOptions": {
        "cwd": "C:\\_repo\\Bikomat\\src",
        "dot": true,
        "ignore": "**/.gitkeep"
      }
    }),

    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      "template": "./src\\index.html",
      "filename": "./index.html",
      "hash": true,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": true,
      "cache": false,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [],
      "title": "Webpack App",
      "xhtml": true,
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
            return 1;
        }
        else if (leftIndex < rightindex) {
            return -1;
        }
        else {
            return 0;
        }
    }
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      "name": [
        "inline"
      ],
      "minChunks": null
    }),
    new CommonsChunkPlugin({
      "name": [
        "vendor"
      ],
      "minChunks": (module) => module.resource &&
                (module.resource.startsWith(nodeModules) || module.resource.startsWith(genDirNodeModules)),
      "chunks": [
        "main"
      ]
    }),
    new NamedModulesPlugin({}),
    new AotPlugin({
      "mainPath": "main.ts",
      "hostReplacementPaths": {
        "environments\\environment.ts": "environments\\environment.ts"
      },
      "exclude": [],
      "tsConfigPath": "src\\tsconfig.app.json",
      "skipCodeGeneration": true
    }),
    new ExtractTextPlugin({
      "filename": "[name][contenthash].css"
    }),

    PROD ? new UglifyJSPlugin({
      uglifyOptions: {
        ie8: false,
        ecma: 8,
        parallel: 4,
        output: {
          comments: false,
          beautify: false,
        },
        compress: {
          drop_console:true,
          passes:4
        },
        warnings: false
      }
    }) : new UglifyJSPlugin({
      compress: false,
      sourceMap: true,
      beautify:true
    }),
    new TypedocWebpackPlugin({}, ['./src', './other'])
  ],
  "node": {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  },
  "devServer": {
    "historyApiFallback": true
  }
};