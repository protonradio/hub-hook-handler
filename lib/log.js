const pkg = require("../package.json");
const config = require("../config/config");

module.exports = (level, message) => {
  if (config.debug === true) {
    const formattedMessage =
      typeof message === "object"
        ? JSON.stringify(message, Object.getOwnPropertyNames(message))
        : message;
    console.log(
      `[${level.toUpperCase()}] ${new Date().toUTCString()} ${pkg.name}: ${formattedMessage}`
    );
  }
};
