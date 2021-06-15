"use strict";
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var Database = /** @class */ (function () {
	function Database() {
		var _this = this;
		this.fetch = this.get;
		this.has = function (name) {
			return lodash_1.has(_this.all, name);
		};
		if (!fs_1.existsSync("database.astroide")) {
			fs_1.writeFileSync("database.astroide", "{}");
		}
	}
	Database.prototype.all = function () {
		var file = fs_1.readFileSync("./database.astroide", "utf-8");
		var data = JSON.parse(file);
		return data;
	};
	Database.prototype.set = function (name, value) {
		var data = this.all();
		lodash_1.set(data, name, value);
		fs_1.writeFileSync("./database.astroide", JSON.stringify(data));
		return lodash_1.get(this.all(), name);
	};
	Database.prototype.push = function (name, value) {
		var savedData = this.get(name);
		if (typeof savedData === "undefined") savedData = [];
		if (!Array.isArray(savedData))
			throw new Error("Data to push should be an array");
		savedData.push(value);
		this.set(name, savedData);
		return savedData;
	};
	Database.prototype.pop = function (name) {
		var savedData = this.get(name);
		if (typeof savedData === "undefined") savedData = [];
		if (!Array.isArray(savedData))
			throw new Error("Data to pop should be an array");
		var value = savedData.pop();
		this.set(name, savedData);
		return value;
	};
	Database.prototype.shift = function (name) {
		var savedData = this.get(name);
		if (typeof savedData === "undefined") savedData = [];
		if (!Array.isArray(savedData))
			throw new Error("Data to shift should be an array");
		var value = savedData.shift();
		this.set(name, savedData);
		return value;
	};
	Database.prototype.unshift = function (name, value) {
		var savedData = this.get(name);
		if (typeof savedData === "undefined") savedData = [];
		if (!Array.isArray(savedData))
			throw new Error("Data to unshift should be an array");
		savedData.unshift(value);
		this.set(name, savedData);
		return savedData;
	};
	Database.prototype.add = function (name, value) {
		var savedData = this.get(name);
		if (typeof savedData === "undefined") savedData = 0;
		if (typeof savedData !== "number")
			throw new Error("Data to add should be a number");
		savedData += value;
		this.set(name, savedData);
		return savedData;
	};
	Database.prototype.subtract = function (name, value) {
		var savedData = this.get(name);
		if (typeof savedData === "undefined") savedData = 0;
		if (typeof savedData !== "number")
			throw new Error("Data to subtract should be a number");
		savedData -= value;
		this.set(name, savedData);
		return savedData;
	};
	Database.prototype.delete = function (name) {
		if (!this.get(name)) return false;
		lodash_1.unset(this.all, name);
		fs_1.writeFileSync("./database.astroide", JSON.stringify(this.all));
		return true;
	};
	Database.prototype.get = function (name) {
		var gets = lodash_1.get(this.all, name);
		if (gets === undefined) return false;
		if (!gets) return false;
		return gets;
	};
	return Database;
})();
module.exports = new Database();
