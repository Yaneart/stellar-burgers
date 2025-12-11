import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:4000",
    experimentalFetchPolyfill: true,
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: {
        mode: 'development',
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              loader: 'ts-loader',
              exclude: /node_modules/
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            }
          ]
        },
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.jsx']
        }
      }
    }
  }
});
