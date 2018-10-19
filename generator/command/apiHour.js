const { prompt } = require("inquirer");
const mustache = require("mustache");
const fs = require("fs");
const { promisify } = require("util");
const slugify = require("slugify");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const questions = [
  {
    type: "input",
    name: "version",
    message: "API Hour version",
    filter: input => parseInt(input, 10),
    validate: input => Number.isInteger(input)
  },
  {
    type: "input",
    name: "location",
    message: "location name"
  },
  {
    type: "input",
    name: "address",
    message: "location address"
  },
  {
    type: "input",
    name: "date",
    message: "API Hour date"
  },
  {
    type: "input",
    name: "eventbrite_date",
    message: "when eventbrite reservation will be open?"
  }
];

const talkQuestion = [
  {
    type: "input",
    name: "speaker",
    message: "speaker name"
  },
  {
    type: "input",
    name: "title",
    message: "talk title"
  },
  {
    type: "input",
    name: "description",
    message: "talk description"
  },
  {
    type: "confirm",
    name: "longTalk",
    message: "is this a 30 min talk ?",
    default: false
  },
  {
    type: "confirm",
    name: "newTalk",
    message: "add a new talk ?"
  }
];

const apiHour = async () => {
  const answers = await prompt(questions);
  const talkAnswers = [];

  let newTalk = false;
  let longTalk = false;
  const today = new Date();
  const printedDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  do {
    const talkAnswer = await prompt(talkQuestion);
    newTalk = talkAnswer.newTalk;
    if (talkAnswer.longTalk === true) {
      longTalk = true;
    }
    talkAnswers.push({
      slug: printedDate + "-" + slugify(talkAnswer.speaker) + "-" + slugify(talkAnswer.title),
      ...talkAnswer,
    });
  } while (newTalk === true);

  let apiHourContent = "";
  let talkContent = "";

  try {
    apiHourContent = await readFile(
      __dirname + "/../templates/apiHour.md.tpl",
      "utf-8"
    );
  } catch (e) {
    console.log("impossible to open api hour template");
    process.exit(1);
  }

  try {
    talkContent = await readFile(
      __dirname + "/../templates/talk.md.tpl",
      "utf-8"
    );
    mustache.parse(talkContent);
  } catch (e) {
    console.log("impossible to open talk template");
    process.exit(1);
  }

  const apiHour = mustache.render(apiHourContent, {
    apiHour: answers,
    talks: talkAnswers,
    longTalk
  });

  await writeFile(
    __dirname +
      "/../../_posts/" +
      printedDate +
      "-api-hour-" +
      answers.version +
      ".md",
    apiHour
  );

  talkAnswers.forEach(async (talk) => {
    const content = mustache.render(talkContent, {
      ...talk,
      version: answers.version
    });

    await writeFile(__dirname + "/../../_posts/" + talk.slug + ".md", content);
  });
};

module.exports = apiHour;
