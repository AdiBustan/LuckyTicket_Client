// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: 'LuckyTicket_Client',
        script: "vite preview --port 4000 --host --config vite.prod.config.ts",
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };