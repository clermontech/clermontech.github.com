const fs = require("fs");
const { promisify } = require("util");
const request = require("request-promise-native");
const qs = require("querystring");
const mustache = require("mustache");
const { DateTime } = require("luxon");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports = async (info, date, talks) => {
  let apiHourContent = "";
  let longTalk = false;
  talks.forEach(talk => {
    if (talk.longTalk === true) {
      longTalk = true;
    }
  });
  try {
    apiHourContent = await readFile(
      __dirname + "/../templates/apiHour.md.tpl",
      "utf-8"
    );
  } catch (e) {
    console.log("impossible to open api hour template");
    process.exit(1);
  }

  const ApiHourDate = DateTime.fromJSDate(info.date);
  const eventbriteDate = DateTime.fromJSDate(info.eventbrite_date);

  let osm = "";
  try {
    let apiHourOSM = await request.get({
      uri: "https://nominatim.openstreetmap.org/search",
      qs: {
        q: info.address,
        format: "json",
        email: "hello@clermontech.org"
      }
    });

    apiHourOSM = JSON.parse(apiHourOSM);
    const bb = apiHourOSM[0].boundingbox.sort((a, b) => {
      return Number(a) - Number(b);
    });

    osm = qs.stringify({
      bbox: bb[0] + "," + bb[2] + "," + bb[1] + "," + bb[3],
      layer: "mapnik",
      marker: apiHourOSM[0].lat + "," + apiHourOSM[0].lon
    });
  } catch (e) {
    console.log("impossible to fetch opendata position for this address");
  }

  const apiHour = mustache.render(apiHourContent, {
    apiHour: {
      ...info,
      date: ApiHourDate.setLocale("fr").toFormat("dd LLLL yyyy"),
      eventbrite_date: eventbriteDate.setLocale("fr").toFormat("dd LLLL yyyy")
    },
    talks,
    longTalk,
    osmQs: osm
  });

  await writeFile(
    __dirname + "/../../_posts/" + date + "-api-hour-" + info.version + ".md",
    apiHour
  );
};
