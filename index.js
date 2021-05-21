const { set, get, has, unset } = require("lodash");
const { writeFileSync, readFileSync, existsSync } = require("fs");

class Database {
  constructor() {
    if (!existsSync(`./database.json`)) writeFileSync(`./database.json`, "{}");
  }

  set(name, value) {
    const data = getDefaultData();
    set(data, name, value);
    set1(JSON.stringify(data));
    return get(data, name);
  }

  add(name, value) {
    let savedData = this.get(name);
    if (typeof savedData === "undefined") savedData = 0;
    if (typeof savedData !== "number")
      throw new Error("Data to add should be a number");
    savedData += value;
    this.set(name, savedData);
    return savedData;
  }

  subtract(name, value) {
    let savedData = this.get(name);
    if (typeof savedData === "undefined") savedData = 0;
    if (typeof savedData !== "number")
      throw new Error("Data to subtract should be a number");
    savedData -= value;
    this.set(name, savedData);
    return savedData;
  }
  delete(name) {
    unset(getDefaultData(), name);
    set1(JSON.stringify(getDefaultData()));
    return getDefaultData();
  }
  fetchAll() {
    return getDefaultData();
  }
  all() {
    return getDefaultData();
  }
  getAll() {
    return getDefaultData();
  }

  get(name) {
    return get(getDefaultData(), name);
  }
  fetch(name) {
    return this.get(name);
  }
  has(name) {
    return has(getDefaultData(), name);
  }
}
function set1(value) {
  writeFileSync(`./database.json`, value);
  const data = JSON.parse(value);
  return data;
}
function getDefaultData() {
  const file = readFileSync(`./database.json`, "utf-8");
  const data = JSON.parse(file);
  return data;
}
module.exports = new Database;
