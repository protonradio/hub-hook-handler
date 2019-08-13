const { existsSync } = require("fs");
const { promisify } = require("util");
const { join: joinPath } = require("path");
const exec = promisify(require("child_process").exec);

/**
 * @param {string} cmd
 * @param {{ push_data: Object, repository: Object }} payload
 * @returns {Promise<string>}
 */
module.exports = async (cmd, payload = { push_data: {}, repository: {} }) => {
  const env = Object.assign({}, process.env, {
    TAG: payload.push_data.tag,
    REPO_NAME: payload.repository.repo_name
  });

  try {
    const { stderr, stdout } = await exec(fullCommand(cmd), { env });
    return stderr || stdout;
  } catch (e) {
    throw e.stderr || e.stdout;
  }
};

/**
 * @param {string} cmd
 * @returns {string}
 */
function fullCommand(cmd = "") {
  const configPath = joinPath(__dirname, "../config/");
  const firstWord = cmd.substr(0, cmd.indexOf(" "));
  if (existsSync(`${configPath}${firstWord}`)) {
    return `${configPath}${cmd}`;
  }
  return cmd;
}
