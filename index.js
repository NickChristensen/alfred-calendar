#!/usr/bin/env /usr/local/bin/node
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");
const alfy = require("alfy");
const { format, parseISO } = require("date-fns");

const readFile = promisify(fs.readFile);

const cachePath = path.join("/", "tmp", "icalbuddy-cache.json");

const readCache = () => {
  return readFile(cachePath)
    .then((cache) => JSON.parse(cache))
    .catch(() => alfy.error("Looks like the cache doesn't exist yet"));
};

readCache().then((upcomingEvents) => {
  alfy.output(
    upcomingEvents.map((event) => ({
      title: event.title,
      subtitle: format(parseISO(event.start), "h:mm"),
      arg: event.title,
    }))
  );
});
