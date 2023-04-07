const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlInlineCssWebpackPlugin = require('html-inline-css-webpack-plugin').default
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin')
const {addBabelPlugins, override} = require('customize-cra')

const myOverrides = config => {
  if (process.env.NODE_ENV === 'production') {
    const inlineChunkHtmlPlugin = config.plugins.find(element => element.constructor.name === 'InlineChunkHtmlPlugin')
    if (inlineChunkHtmlPlugin) {
      config.plugins.splice(config.plugins.indexOf(inlineChunkHtmlPlugin), 0,
        new HtmlInlineCssWebpackPlugin(),
        new HtmlInlineScriptPlugin()
      )
    }
    const htmlWebpackPlugin = config.plugins.find(element => element.constructor.name === 'HtmlWebpackPlugin')
    config.plugins.splice(config.plugins.indexOf(htmlWebpackPlugin), 1,
      new HtmlWebpackPlugin(
        {
          ...htmlWebpackPlugin.userOptions,
          inject: 'body'
        }
      )
    )
  }
  return config
}

module.exports = override(
  myOverrides,
  ...addBabelPlugins(
    'inline-react-svg'
  )
)