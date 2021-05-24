import { writeFileSync, readFileSync, existsSync } from "fs";
import { set, get, has, unset } from "lodash";
class FSAdapter {
  public set(value: string): { [prop: string]: unknown } {
    writeFileSync(`./database.json`, value);
    const data = JSON.parse(value);
    return data;
  }

  public get(): { [prop: string]: unknown } {
    const file = readFileSync(`./database.json`, "utf-8");
    const data = JSON.parse(file);
    return data;
  }
}
class Database {
  private adapter: FSAdapter;
  private json: {[prop: string]: unknown } = {};

  constructor(adapter: FSAdapter = new FSAdapter()) {
    this.adapter = adapter;
    if (!existsSync(`./database.json`)) {
      writeFileSync(`./database.json`, "{}");
    }
  }

  private getDefaultData() {
    const data = this.adapter.get();
    return data;
  }

  public set(name: string, value: unknown) {
    const data = this.getDefaultData();
    set(data, name, value);
    this.json = data;
    this.adapter.set(JSON.stringify(data));
    return get(data, name);
  }

  public push(name: string, value: unknown) {
    let savedData = this.get(name);
    if (typeof savedData === "undefined") savedData = [];
    if (!Array.isArray(savedData))
      throw new Error("Data to push should be an array");
    savedData.push(value);
    this.set(name, savedData);
    return savedData;
  }

  public pop(name: string) {
    let savedData = this.get(name);
    if (typeof savedData === "undefined") savedData = [];
    if (!Array.isArray(savedData))
      throw new Error("Data to pop should be an array");
    const value = savedData.pop();
    this.set(name, savedData);
    return value;
  }

  public shift(name: string) {
    let savedData = this.get(name);
    if (typeof savedData === "undefined") savedData = [];
    if (!Array.isArray(savedData))
      throw new Error("Data to shift should be an array");
    const value = savedData.shift();
    this.set(name, savedData);
    return value;
  }

  public unshift(name: string, value: unknown) {
    let savedData = this.get(name);
    if (typeof savedData === "undefined") savedData = [];
    if (!Array.isArray(savedData))
      throw new Error("Data to unshift should be an array");
    savedData.unshift(value);
    this.set(name, savedData);
    return savedData;
  }

  public add(name: string, value: number) {
    let savedData = this.get(name);
    if (typeof savedData === "undefined") savedData = 0;
    if (typeof savedData !== "number")
      throw new Error("Data to add should be a number");
    savedData += value;
    this.set(name, savedData);
    return savedData;
  }

  public subtract(name: string, value: number) {
    let savedData = this.get(name);
    if (typeof savedData === "undefined") savedData = 0;
    if (typeof savedData !== "number")
      throw new Error("Data to subtract should be a number");
    savedData -= value;
    this.set(name, savedData);
    return savedData;
  }

  public delete(name: string) {
    unset(this.json, name);
    this.adapter.set(JSON.stringify(this.json));
    return this.json;
  }

  public all = () => this.json;
  public get = (name: string) => get(this.json, name);
  public fetch = this.get;
  public has = (name: string) => has(this.json, name);
}
export = new Database();
