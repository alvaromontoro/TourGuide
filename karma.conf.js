module.exports = config => {
  config.set({
    autoWatch: true,
    basePath: '',
    colors: true,
    concurrency: Infinity,
    exclude: ['demos/**/*'],
    files: ['spec.bundle.js'],
    frameworks: ['jasmine'],
    plugins: [
      'karma-chrome-launcher',
      'karma-spec-reporter',
      'karma-coverage',
      'karma-jasmine',
      'karma-threshold-reporter',
      'karma-babel-preprocessor',
      'karma-webpack'
    ],
    port: 9876,
    preprocessors: {
      './src/**/!(*.spec).js': ['coverage'],
      'spec.bundle.js': ['webpack']
    },
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    thresholdReporter: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    },
    reporters: ['spec', 'threshold', 'coverage'],
    webpack: require('./webpack.karma.config'),
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    }
  });
};
