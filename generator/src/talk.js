const fs = require("fs");
const { promisify } = require("util");
const mustache = require("mustache");

module.exports = async (talk, version) => {
  const readFile = promisify(fs.readFile);
  const writeFile = promisify(fs.writeFile);
  let talkContent = "";
  try {
    talkContent = await readFile(
      __dirname + "/../templates/talk.md.tpl",
      "utf-8"
    );
  } catch (e) {
    throw new Error("impossible to open talk template");
  }

  const content = mustache.render(talkContent, {
    ...talk,
    version
  });

  await writeFile(__dirname + "/../../_posts/" + talk.slug + ".md", content);
};
