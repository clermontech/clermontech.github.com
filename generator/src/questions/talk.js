const isNotEmpty = input => input.length > 0;

module.exports = [
  {
    type: "input",
    name: "speaker",
    message: "speaker name",
    validate: isNotEmpty
  },
  {
    type: "input",
    name: "title",
    message: "talk title",
    validate: isNotEmpty
  },
  {
    type: "editor",
    name: "description",
    message: "talk description",
    validate: isNotEmpty
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