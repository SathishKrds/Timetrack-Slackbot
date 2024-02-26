const app = require('./src/controllers/slackController');

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Slack bot is running!');
})();
