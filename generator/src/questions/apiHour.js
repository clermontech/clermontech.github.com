const isNotEmpty = input => input.length > 0;

module.exports = [
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
    message: "location name",
    validate: isNotEmpty
  },
  {
    type: "input",
    name: "address",
    message: "location address",
    validate: isNotEmpty
  },
  {
    type: "datetime",
    name: "date",
    message: "API Hour date",
    format: ["d", "/", "m", "/", "yy"]
  },
  {
    type: "datetime",
    name: "eventbrite_date",
    message: "when eventbrite reservation will be open?",
    format: ["d", "/", "m", "/", "yy"]
  }
];