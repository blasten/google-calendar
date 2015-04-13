module.exports = {
  entry: './src/index.js',
  sass: './src/*.scss',
  dest: './build',
  webpackConfig: {
    stats: {
      version: false,
      assets: false
    },
    output: {
      filename: 'event-calendar.js',
      chunkFilename: '[id].chunk.js'
    }
  }
};