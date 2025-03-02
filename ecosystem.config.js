module.exports = {
  apps: [{
    name: "zoliba-bot",
    script: "index.js",
    watch: true,
    env: {
      NODE_ENV: "production",
    }
  }]
}