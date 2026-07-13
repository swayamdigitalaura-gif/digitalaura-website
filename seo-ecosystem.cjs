module.exports = {
  apps: [{
    name: 'seo-landing',
    script: '/home/landing-seo/.output/server/index.mjs',
    env: { PORT: 5003, NODE_ENV: 'production' }
  }]
}
