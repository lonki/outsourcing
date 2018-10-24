const webpack = require('webpack');
const ip = require('ip');

const ENV = process.env.ENV || 'local';
const hostIP = ip.address();

const defaultDomain = {
  __TIMESTAMP__: new Date().getTime(),
  __ENV__: ENV,
  __DEVELOPMENT__: false,
  __OPEN_COUNTDOWN__: true,
  __COUNTDOWN_TIME__: 'October 30, 2018 12:00:00',
};

const config = {
  local: {
    webpack: './webpack/config.local.js',
    domain: Object.assign({}, defaultDomain, {
      __DEVELOPMENT__: true,
    }),
  },
  production: {
    webpack: './webpack/config.prod.js',
    domain: defaultDomain,
  },
};

const getEnvConfig = () => {
  if (ENV && config[ENV]) {
    return config[ENV];
  }
  return config.local;
};

const build = {
  defineJsConstants() {
    const constants = config[ENV].domain;

    Object.keys(constants).forEach((key) => {
      constants[key] = JSON.stringify(constants[key]);
    });

    if (ENV === 'production') {
      constants['process.env'] = {
        NODE_ENV: JSON.stringify('production'),
      };
    }

    return new webpack.DefinePlugin(constants);
  },
  getWebpackConfig() {
    return getEnvConfig().webpack;
  },
  getDomainConfig() {
    return getEnvConfig().domain;
  },
  getLanguages() {
    return ['en', 'zh-cn', 'zh-tw'];
  },
  getHostIP() {
    return hostIP;
  },
};

module.exports = build;
