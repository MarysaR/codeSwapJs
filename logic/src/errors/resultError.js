"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Err = exports.Ok = void 0;
class Ok {
    value;
    constructor(value) {
        this.value = value;
    }
    static of(value) {
        return new Ok(value);
    }
    isOk() {
        return true;
    }
    isErr() {
        return false;
    }
}
exports.Ok = Ok;
class Err {
    error;
    constructor(error) {
        this.error = error;
    }
    static of(error) {
        return new Err(error);
    }
    isOk() {
        return false;
    }
    isErr() {
        return true;
    }
}
exports.Err = Err;
