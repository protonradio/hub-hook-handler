const request = require("request");

module.exports = (config, text) => {
  if (typeof config.url !== "string") return;

  const data = {
    channel: config.channel || "#general",
    username: config.username || "Hub Hook Handler",
    icon_emoji: config.icon_emoji || ":fire:",
    link_names: 1,
    text
  };

  const options = {
    url: config.url,
    method: "POST",
    body: JSON.stringify(data)
  };

  request(options, (error, response, body) => {
    if (error || body !== "ok") {
      console.error(`Error sending Slack notification: ${error || body}`);
    }
  });
};
