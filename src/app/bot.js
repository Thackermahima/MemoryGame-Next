const { Telegraf } = require("telegraf");
require('dotenv')

// const TOKEN = process.env.TELEGRAM_BOT_API;
const TOKEN = "6828784540:AAFgUkH_mq2GK4AVcIUlIPEsQWm8qVy9p98";

const bot = new Telegraf(TOKEN);

const web_link = "https://memory-game-next--dun.vercel.app/";

bot.start((ctx) =>
  ctx.reply("Welcome to the Memory Game Bot!", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();