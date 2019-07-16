const config = require("../config");
const pkg = require("../package.json");

module.exports = (level, message) => {
  if (config.debug === true) {
    const formattedMessage =
      typeof message === "object" ? JSON.stringify(message) : message;
    console.log(
      `[${level.toUpperCase()}] ${new Date().toUTCString()} ${pkg.name} - ${
        pkg.version
      }: ${formattedMessage}`
    );
  }
};
