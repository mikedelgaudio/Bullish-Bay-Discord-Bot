module.exports = {
  name: `help`,
  description: "Display help message to user",
  execute(msg, args) {
    msg.reply(`I'm here to help!
    >>> \`$ping\`: for a surprise\n\`$quote <STOCK_TICKER>\`: search up prices for requested stock`);
  },
};
