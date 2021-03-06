require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
bot.commands = new Discord.Collection();
const botCommands = require("./commands");
const prefix = "$";

Object.keys(botCommands).map((key) => {
  bot.commands.set(prefix + botCommands[key].name, botCommands[key]);
});

try {
  bot.login(TOKEN);
  bot.on("ready", () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  });
} catch (e) {
  console.error(`Unable to login to Discord: ${e}`);
}

bot.on("message", (msg) => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!bot.commands.has(command) || !msg.content.startsWith(prefix)) return;

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("there was an error trying to execute that command!");
  }
});
