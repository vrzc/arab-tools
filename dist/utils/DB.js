"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class JsonDB {
    constructor(options) {
        this.filePath = options.filePath;
        this.autoSave = options.autoSave || false;
        this.data = this.load();
    }
    load() {
        if (fs.existsSync(this.filePath)) {
            const fileData = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(fileData);
        }
        else {
            return {};
        }
    }
    save() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    }
    get(path) {
        const keys = path.split('/');
        let result = this.data;
        for (const key of keys) {
            if (result[key] !== undefined) {
                result = result[key];
            }
            else {
                return undefined;
            }
        }
        return result;
    }
    set(path, value) {
        const keys = path.split('/');
        let result = this.data;
        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                result[key] = value;
            }
            else {
                if (result[key] === undefined) {
                    result[key] = {};
                }
                result = result[key];
            }
        });
        if (this.autoSave) {
            this.save();
        }
    }
    increment(path, value = 1) {
        const current = this.get(path);
        if (typeof current === 'number') {
            this.set(path, current + value);
        }
        else {
            this.set(path, value);
        }
        if (this.autoSave) {
            this.save();
        }
    }
    exists(path) {
        const keys = path.split('/');
        let result = this.data;
        for (const key of keys) {
            if (result[key] !== undefined) {
                result = result[key];
            }
            else {
                return false;
            }
        }
        return true;
    }
    saveManually() {
        this.save();
    }
}
exports.default = JsonDB;
