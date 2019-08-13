const { parse } = require("url");
const { json, send } = require("micro");
const logger = require("./lib/log");
const runScript = require("./lib/run-script");
const validateReq = require("./lib/validate-req");

module.exports = async (req, res) => {
  const hooks = require("./config/hook");
  const { pathname } = await parse(req.url, false); // gets url path

  if (pathname === "/ping") return send(res, 200, "pong");

  let payload;
  try {
    payload = await json(req);
  } catch (e) {
    logger("err", "Missing JSON payload");
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
    logger("err", e);
  }
};
