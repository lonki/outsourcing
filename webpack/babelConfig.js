module.exports = {
  presets: [
    [
      'env',
      {
        'browsers': [
          'Chrome >= 52',
          'FireFox >= 44',
          'Safari >= 7',
          'Explorer >= 9',
          'last 4 Edge versions',
        ],
        'useBuiltIns': true, // A way to apply babel-preset-env for polyfills (via babel-preset-env).
        'modules': false,
      },
    ],
    'stage-0',
    'react',
  ],
  plugins: [
    'transform-runtime',
    'transform-decorators-legacy',
    'transform-class-properties',
  ],
};
