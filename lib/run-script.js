const { join: joinPath } = require("path");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

module.exports = async (cmd, payload = { push_data: {}, repository: {} }) => {
  const fullCommand = isShellCommand(cmd)
    ? cmd
    : `${joinPath(__dirname, "../scripts/")}${cmd}`;

  const env = Object.assign({}, process.env, {
    TAG: payload.push_data.tag,
    REPO_NAME: payload.repository.repo_name
  });

  try {
    const { stderr, stdout } = await exec(fullCommand, { env });
    return stderr || stdout;
  } catch (e) {
    throw e.stderr || e.stdout;
  }
};

/**
 * @param {string} cmd
 */
function isShellCommand(cmd) {
  const firstPart = cmd.split(" ")[0] || "";
  return firstPart.indexOf(".") < 0;
}
