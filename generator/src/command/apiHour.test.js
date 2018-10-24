jest.mock("inquirer");
jest.mock("../apiHour");
jest.mock("../talk");

const { prompt } = require("inquirer");
const apiHourGenerator = require("../apiHour");
const talkGenerator = require("../talk");
const apiHour = require("./apiHour");
const { DateTime } = require("luxon");

describe("api hour genetor command", async () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("runs the command with 1 api hour and 1 talk", async () => {
    const answers = {
      version: 38,
      location: "celtill",
      address: "11 rue Niel 63100 Clermont-Ferrand",
      date: DateTime.local(),
      eventbrite_date: DateTime.local()
    };
    const talkAnswer = {
      speaker: "foo",
      title: "bar",
      description: "baz",
      longTalk: true,
      newTalk: false
    };
    prompt.mockImplementationOnce(() => Promise.resolve(answers));
    prompt.mockImplementationOnce(() => Promise.resolve(talkAnswer));

    await apiHour();

    expect(apiHourGenerator.mock.calls[0][0]).toEqual(answers);
    expect(apiHourGenerator.mock.calls[0][2]).toHaveLength(1);
    expect(talkGenerator).toHaveBeenCalled();
    expect(talkGenerator.mock.calls[0][0]).toEqual(apiHourGenerator.mock.calls[0][2][0]);
    expect(talkGenerator.mock.calls[0][1]).toEqual(answers.version);
  });

  it("runs the command with 1 api hour and 2 talks", async () => {
    const answers = {
      version: 38,
      location: "celtill",
      address: "11 rue Niel 63100 Clermont-Ferrand",
      date: DateTime.local(),
      eventbrite_date: DateTime.local()
    };
    const talkAnswer1 = {
      speaker: "foo",
      title: "bar",
      description: "baz",
      longTalk: true,
      newTalk: true
    };
    const talkAnswer2 = {
      speaker: "foo",
      title: "bar",
      description: "baz",
      longTalk: true,
      newTalk: false
    };
    prompt.mockImplementationOnce(() => Promise.resolve(answers));
    prompt.mockImplementationOnce(() => Promise.resolve(talkAnswer1));
    prompt.mockImplementationOnce(() => Promise.resolve(talkAnswer2));

    await apiHour();

    expect(apiHourGenerator.mock.calls[0][0]).toEqual(answers);
    expect(apiHourGenerator.mock.calls[0][2]).toHaveLength(2);
    expect(talkGenerator).toHaveBeenCalledTimes(2);
    expect(talkGenerator.mock.calls[0][0]).toEqual(apiHourGenerator.mock.calls[0][2][0]);
    expect(talkGenerator.mock.calls[0][1]).toEqual(answers.version);
    expect(talkGenerator.mock.calls[1][0]).toEqual(apiHourGenerator.mock.calls[0][2][1]);
    expect(talkGenerator.mock.calls[1][1]).toEqual(answers.version);
  });
});
