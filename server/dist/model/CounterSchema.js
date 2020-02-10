"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var counterSchema = new mongoose_1.Schema({
    counter: {
        type: Number,
        required: true
    }
});
exports.default = mongoose_1.model("counter", counterSchema);
//# sourceMappingURL=CounterSchema.js.map