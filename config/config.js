module.exports = {
  debug: process.env.DEBUG || true,
  token: process.env.TOKEN || "foo",
  slackConfig: {
    url: "https://hooks.slack.com/services/FOO/BAR/BAZ",
    channel: "#general",
    username: "Hub Hook Handler",
    icon_emoji: ":fire:"
  }
};
