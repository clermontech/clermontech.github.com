const { prompt, registerPrompt } = require("inquirer");
const slugify = require("slugify");
const { DateTime } = require("luxon");
const apiHourGenerator = require("../apiHour");
const talkGenerator = require("../talk");
const questions = require("../questions/apiHour");
const talkQuestion = require("../questions/talk");

registerPrompt("datetime", require("inquirer-datepicker-prompt"));

module.exports = async () => {
  const answers = await prompt(questions);
  const talkAnswers = [];

  let newTalk = false;
  const AHdate = DateTime.fromJSDate(answers.date);
  AHdate.setLocale("fr");
  const printedDate = AHdate.toFormat("yyyy-LL-dd");

  do {
    const talkAnswer = await prompt(talkQuestion);
    newTalk = talkAnswer.newTalk;
    talkAnswers.push({
      slug:
        printedDate +
        "-" +
        slugify(talkAnswer.speaker) +
        "-" +
        slugify(talkAnswer.title),
      ...talkAnswer
    });
  } while (newTalk === true);

  try {
    await apiHourGenerator(answers, printedDate, talkAnswers);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }

  try {
    talkAnswers.forEach(async talk => {
      await talkGenerator(talk, answers.version);
    });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};
