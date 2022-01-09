#!/usr/bin/env /usr/local/bin/node
import { promisify } from "util";
import fs from "fs";
import path from "path";
import alfy from "alfy";
import { format, parseISO } from "date-fns";

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
