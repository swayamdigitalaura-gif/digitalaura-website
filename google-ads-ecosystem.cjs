module.exports = {
  apps: [{
    name: 'google-ads-landing',
    script: '/home/landing-google-ads/.output/server/index.mjs',
    env: { PORT: 5004, NODE_ENV: 'production' }
  }]
}
