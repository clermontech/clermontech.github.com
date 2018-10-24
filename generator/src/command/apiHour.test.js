const apiHour = require("./apiHour");

describe('api hour genetor command', () => {
  it('run the command', async () => {
    await apiHour();
  });
});