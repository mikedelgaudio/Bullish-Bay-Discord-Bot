const fetch = require("node-fetch");
const emptyResponse = require("../shared/empty-response");

module.exports = {
  name: "news",
  description: "Grabs Latest Stock News on Wall Street",
  async execute(msg, args) {
    try {
      const newsUrl = `https://finnhub.io/api/v1/news?category=general&token=${process.env.API_KEY}`;
      const fetchedNews = await fetch(newsUrl);
      const jsonNews = await fetchedNews.json();
      const trimmedResponse = jsonNews.slice(0, 3);
      if (emptyResponse(jsonNews)) {
        msg.reply(
          `Sorry, we couldn't find data for the news'. Make sure to use this format: \`$news \``
        );
        return;
      }
      msg.reply(`**Here's your news update!**`);
      for (let i = 0; i < trimmedResponse.length; i++) {
        msg.channel.send(
          `${jsonNews[i].headline} - ${jsonNews[i].source} - ${jsonNews[i].url}`
        );
      }
    } catch (e) {
      console.error(e);
      msg.reply(
        `Sorry, an unexpected error happened, please message @Mike D#0188`
      );
    }
  },
};
