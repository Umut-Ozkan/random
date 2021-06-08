"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var FSAdapter = /** @class */ (function () {
    function FSAdapter() {
    }
    FSAdapter.prototype.set = function (value) {
        fs_1.writeFileSync("./database.astroide", value);
        var data = JSON.parse(value);
        return data;
    };
    FSAdapter.prototype.get = function () {
        var file = fs_1.readFileSync("./database.astroide", "utf-8");
        var data = JSON.parse(file);
        return data;
    };
    FSAdapter.prototype.init = function () {
        if (!fs_1.existsSync("database.astroide")) {
            fs_1.writeFileSync("database.astroide", "{}");
        }
    };
    return FSAdapter;
}());
var Database = /** @class */ (function () {
    function Database(adapter) {
        var _this = this;
        if (adapter === void 0) { adapter = new FSAdapter(); }
        this.fetch = this.get;
        this.has = function (name) { return lodash_1.has(_this.all, name); };
        this.adapter = adapter;
        this.adapter.init();
    }
    Database.prototype.all = function () {
        var data = this.adapter.get();
        return data;
    };
    Database.prototype.set = function (name, value) {
        var data = this.all();
        lodash_1.set(data, name, value);
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.get("a"))
                            return [2 /*return*/, false];
                        lodash_1.unset(this.all, name);
                        return [4 /*yield*/, this.adapter.set(JSON.stringify(this.all))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Database.prototype.get = function (name) {
        var gets = lodash_1.get(this.all, name);
        if (gets === undefined)
            return false;
        if (!gets)
            return false;
        return gets;
    };
    return Database;
}());
module.exports = new Database();