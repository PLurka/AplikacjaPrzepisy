const path = require('path');

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, '../AplikacjaPrzepisy/'),
  entry: './src/main.ts',
  module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            {
              loader: 'awesome-typescript-loader',
              options: { configFileName: 'tsconfig.json' }
            } 
          ]
        }
      ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolve: {
	extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  watch: true
};