module.exports = {
  apps: [{
    name: "zoliba-bot",
    script: "index.js",
    watch: true,
    env: {
      NODE_ENV: "production",
    },
    error_file: "logs/error.log",
    out_file: "logs/output.log",
    time: true
  }]
}