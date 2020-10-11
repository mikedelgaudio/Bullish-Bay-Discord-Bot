module.exports = {
  name: "quote",
  description: "Quote!",
  execute(msg, args) {
    msg.reply("quote");
    console.log(msg);
    console.log(args);
  },
};
