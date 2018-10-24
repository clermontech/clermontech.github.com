const fs = require("fs");
const { promisify } = require("util");
const mustache = require("mustache");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports = async (talk, version) => {
  let talkContent = "";
  try {
    talkContent = await readFile(
      __dirname + "/../templates/talk.md.tpl",
      "utf-8"
    );
  } catch (e) {
    console.log("impossible to open talk template");
    process.exit(1);
  }

  const content = mustache.render(talkContent, {
    ...talk,
    version
  });

  await writeFile(__dirname + "/../../_posts/" + talk.slug + ".md", content);
};
