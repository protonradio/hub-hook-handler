const scripts = {
  "protonradio/test": "hello.sh parameter1 parameter2",
  "protonradio/tag:prod": "tag.sh", // repo/image:tag
  "protonradio/tag:release-[0-9.]+": "tag.sh",
  "protonradio/fail": "fail.sh"
};

module.exports = (repoName, tag) => {
  const hook = Object.keys(scripts).find(key => {
    const regex = new RegExp(`^${key}$`, "gm");
    const image = tag ? `${repoName}:${tag}` : repoName;
    const match = image.match(regex);

    return match && match[0] === image;
  });

  return scripts[hook];
};
