const { parse } = require("url");
const { text, send } = require("micro");
const logger = require("./lib/log");
const runScript = require("./lib/run-script");
const validateReq = require("./lib/validate-req");
const slackNotification = require("./lib/slack-notification");

module.exports = async (req, res) => {
  const hooks = require("./config/hook");
  const { slackConfig } = require("./config/config");
  const { pathname } = await parse(req.url, false); // gets url path

  if (pathname === "/ping") return send(res, 200, "pong");

  let payload, rawBody;
  try {
    rawBody = await text(req);
    payload = JSON.parse(rawBody);
  } catch (e) {
    logger("err", "Error parsing request:");
    logger("err", e);
    logger("err", {
      method: req.method,
      path: pathname,
      contentType: req.headers["content-type"],
      bodyLength: rawBody?.length,
      bodyPreview: rawBody?.slice(0, 200)
    });
    return send(res, 400, "Missing JSON payload");
  }

  logger("debug", `Requesting ${pathname}`);
  logger(
    "debug",
    `Payload from docker hub:\n ${JSON.stringify(
      payload,
      null,
      2
    )} \nRunning hook on repo: ${payload.repository.repo_name}`
  );

  try {
    await validateReq({ pathname, payload, hooks }); // validates token and payload
  } catch (e) {
    logger("err", e.message);
    return send(res, 400, e.message);
  }
  // everything is on it's right place...
  send(res, 204); // sends 'no content' to client

  const hook = hooks(payload.repository.repo_name, payload.push_data.tag);

  try {
    const result = await runScript(hook, payload); // runs script
    logger(
      "debug",
      `${result}\nFinished running hook "${hook}" for repository "${payload.repository.repo_name}"`
    );
  } catch (e) {
    slackNotification(slackConfig, `Error running hook: ${e.toString()}`);
    logger("err", e);
  }
};
