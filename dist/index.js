"use strict";
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var FSAdapter = /** @class */ (function () {
    function FSAdapter() {
    }
    FSAdapter.prototype.set = function (value) {
        fs_1.writeFileSync("./database.json", value);
        var data = JSON.parse(value);
        return data;
    };
    FSAdapter.prototype.get = function () {
        var file = fs_1.readFileSync("./database.json", "utf-8");
        var data = JSON.parse(file);
        return data;
    };
    FSAdapter.prototype.init = function () {
        if (!fs_1.existsSync("./database.json")) {
            fs_1.writeFileSync("./database.json", "{}");
        }
    };
    return FSAdapter;
}());
var Database = /** @class */ (function () {
    function Database(adapter) {
        var _this = this;
        if (adapter === void 0) { adapter = new FSAdapter(); }
        this.json = {};
        this.all = function () { return _this.json; };
        this.get = function (name) { return lodash_1.get(_this.json, name); };
        this.fetch = this.get;
        this.has = function (name) { return lodash_1.has(_this.json, name); };
        this.adapter = adapter;
        this.adapter.init();
    }
    Database.prototype.getDefaultData = function () {
        var data = this.adapter.get();
        return data;
    };
    Database.prototype.set = function (name, value) {
        var data = this.getDefaultData();
        lodash_1.set(data, name, value);
        this.json = data;
        this.adapter.set(JSON.stringify(data));
        return lodash_1.get(data, name);
    };
    Database.prototype.push = function (name, value) {
        var savedData = this.get(name);
        if (typeof savedData === "undefined")
            savedData = [];
        if (!Array.isArray(savedData))
            throw new Error("Data to push should be an array");
        savedData.push(value);
        this.set(name, savedData);
        return savedData;
    };
    Database.prototype.pop = function (name) {
        var savedData = this.get(name);
        if (typeof savedData === "undefined")
            savedData = [];
        if (!Array.isArray(savedData))
            throw new Error("Data to pop should be an array");
        var value = savedData.pop();
        this.set(name, savedData);
        return value;
    };
    Database.prototype.shift = function (name) {
        var savedData = this.get(name);
        if (typeof savedData === "undefined")
            savedData = [];
        if (!Array.isArray(savedData))
            throw new Error("Data to shift should be an array");
        var value = savedData.shift();
        this.set(name, savedData);
        return value;
    };
    Database.prototype.unshift = function (name, value) {
        var savedData = this.get(name);
        if (typeof savedData === "undefined")
            savedData = [];
        if (!Array.isArray(savedData))
            throw new Error("Data to unshift should be an array");
        savedData.unshift(value);
        this.set(name, savedData);
        return savedData;
    };
    Database.prototype.add = function (name, value) {
        var savedData = this.get(name);
        if (typeof savedData === "undefined")
            savedData = 0;
        if (typeof savedData !== "number")
            throw new Error("Data to add should be a number");
        savedData += value;
        this.set(name, savedData);
        return savedData;
    };
    Database.prototype.subtract = function (name, value) {
        var savedData = this.get(name);
        if (typeof savedData === "undefined")
            savedData = 0;
        if (typeof savedData !== "number")
            throw new Error("Data to subtract should be a number");
        savedData -= value;
        this.set(name, savedData);
        return savedData;
    };
    Database.prototype.delete = function (name) {
        lodash_1.unset(this.json, name);
        this.adapter.set(JSON.stringify(this.json));
        return this.json;
    };
    return Database;
}());
module.exports = new Database();
