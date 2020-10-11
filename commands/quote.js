const fetch = require("node-fetch");
const trimPrefix = require("../shared/trim-prefix");
module.exports = {
  name: "quote",
  description: "Grabs Quote Information on Stock Ticker Input",
  async execute(msg, args) {
    try {
      let ticker = trimPrefix(msg.content, "$quote");
      if (ticker === "") {
        msg.reply(`Try this: \`$quote <STOCK_TICKER_HERE>\``);
        return;
      }
      ticker = ticker.replace(/\s/g, "");
      const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.API_KEY}`;
      const fetchedQuote = await fetch(quoteUrl);
      const jsonQuote = await fetchedQuote.json();
      if (emptyResponse(jsonQuote)) {
        msg.reply(
          `Sorry, we couldn't find data for \`${ticker}\`. Make sure to use this format: \`$quote <STOCK_TICKER_HERE>\``
        );
        return;
      }
      msg.reply(
        `**${ticker}**: 
        >>> Current Price: **$${jsonQuote.c.toFixed(
          2
        )}**\nOpening Price: **$${jsonQuote.o.toFixed(
          2
        )}**\nLow Price: **$${jsonQuote.l.toFixed(
          2
        )}**\nHigh Price: **$${jsonQuote.h.toFixed(2)}**`
      );
    } catch (e) {
      console.error(e);
    }
  },
};

function emptyResponse(jsonQuote) {
  const keys = Object.keys(jsonQuote);
  for (let key of keys) {
    if (jsonQuote[key] === 0) {
      return true;
    }
  }
  return false;
}
