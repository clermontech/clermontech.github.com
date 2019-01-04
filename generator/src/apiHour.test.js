jest.mock("util");
jest.mock("request-promise-native");
jest.mock("mustache");

const { DateTime } = require("luxon");
const apiHour = require("./apiHour");
const { promisify } = require("util");
const { get } = require("request-promise-native");
const { render } = require("mustache");

describe("test apiHour generator function", async () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("successfuly save a new api hour", async () => {
    const info = {
      version: 38,
      location: "celtill",
      address: "11 rue Niel 63100 Clermont-Ferrand",
      date: DateTime.local(),
      eventbrite_date: DateTime.local()
    };

    const talks = [
      {
        peaker: "foo",
        title: "bar",
        description: "baz",
        longTalk: true,
        newTalk: true,
        slug: "slug"
      }
    ];

    const date = DateTime.local()
      .setLocale("fr")
      .toFormat("yyyy-LL-dd");

    const readFile = jest.fn(() => Promise.resolve("foo"));
    const writeFile = jest.fn(() => Promise.resolve());
    // readFile
    promisify.mockImplementationOnce(() => readFile);

    //writeFile
    promisify.mockImplementationOnce(() => writeFile);

    get.mockImplementationOnce(() =>
      Promise.resolve(
        JSON.stringify([
          {
            boundingbox: ["45.7813783", "45.7814913", "3.1041998", "3.1043267"],
            lat: "45.7814518",
            lon: "3.1042658"
          }
        ])
      )
    );

    render.mockImplementationOnce(() => "rendered template");

    await apiHour(info, date, talks);

    expect(readFile.mock.calls.length).toEqual(1);
    expect(writeFile.mock.calls.length).toEqual(1);
    expect(writeFile.mock.calls[0][0]).toEqual(
      __dirname + "/../../_posts/" + date + "-api-hour-38.md"
    );
    expect(writeFile.mock.calls[0][1]).toEqual("rendered template");
    expect(render.mock.calls.length).toEqual(1);
    expect(render.mock.calls[0][0]).toEqual("foo");
  });

  it("throws an error when it is not possible to read template file", async () => {
    const info = {
      version: 38,
      location: "celtill",
      address: "11 rue Niel 63100 Clermont-Ferrand",
      date: DateTime.local(),
      eventbrite_date: DateTime.local()
    };

    const talks = [
      {
        peaker: "foo",
        title: "bar",
        description: "baz",
        longTalk: true,
        newTalk: true,
        slug: "slug"
      }
    ];

    const date = DateTime.local()
      .setLocale("fr")
      .toFormat("yyyy-LL-dd");

    const readFile = jest.fn(() => Promise.reject());
    const writeFile = jest.fn(() => Promise.resolve());
    // readFile
    promisify.mockImplementationOnce(() => readFile);

    //writeFile
    promisify.mockImplementationOnce(() => writeFile);
    expect.assertions(1);

    try {
      await apiHour(info, date, talks);
    } catch (e) {
      expect(e.message).toEqual("impossible to open api hour template");
    }
  });
});
