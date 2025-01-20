const path = require('node:path')
const webpack = require('webpack')

const config = (env, argv) => {
  const backendBaseUrl =
    argv.mode === 'production' ? '' : 'http://localhost:4300'

  return {
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      compress: true,
      port: 9000,
      open: false,
      historyApiFallback: true
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: 'defaults',
                    },
                  ],
                  '@babel/preset-react',
                ],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader', 
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'tailwindcss',
                    'autoprefixer',
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource'
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(argv.mode),
        BACKEND_BASE_URL: JSON.stringify(backendBaseUrl),
      }),
    ],
  }
}
module.exports = config
