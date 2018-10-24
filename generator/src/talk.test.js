jest.mock("util");
jest.mock("mustache");

const talkGenerator = require("./talk");
const { promisify } = require("util");
const { render } = require("mustache");

describe("test talk generator", async () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("generates a talk file", async () => {
    const talk = {
      peaker: "foo",
      title: "bar",
      description: "baz",
      longTalk: true,
      newTalk: true,
      slug: "slug"
    };

    const readFile = jest.fn(() => Promise.resolve("foo"));
    const writeFile = jest.fn(() => Promise.resolve());
    // readFile
    promisify.mockImplementationOnce(() => readFile);

    //writeFile
    promisify.mockImplementationOnce(() => writeFile);

    render.mockImplementationOnce(() => "rendered template");

    await talkGenerator(talk, 38);

    expect(readFile.mock.calls.length).toEqual(1);
    expect(writeFile.mock.calls.length).toEqual(1);
    expect(writeFile.mock.calls[0][0]).toEqual(
      __dirname + "/../../_posts/slug.md"
    );
    expect(writeFile.mock.calls[0][1]).toEqual("rendered template");
    expect(render.mock.calls.length).toEqual(1);
    expect(render.mock.calls[0][0]).toEqual("foo");
  });

  it("fails to read template file", async () => {
    const talk = {
      peaker: "foo",
      title: "bar",
      description: "baz",
      longTalk: true,
      newTalk: true,
      slug: "slug"
    };

    const readFile = jest.fn(() => Promise.reject());
    const writeFile = jest.fn(() => Promise.resolve());
    // readFile
    promisify.mockImplementationOnce(() => readFile);

    //writeFile
    promisify.mockImplementationOnce(() => writeFile);

    expect.assertions(1);
    try {
      await talkGenerator(talk, 38);
    } catch (e) {
      expect(e.message).toEqual("impossible to open talk template");
    }
  });
});
