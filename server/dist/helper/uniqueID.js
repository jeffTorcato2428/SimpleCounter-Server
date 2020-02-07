"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getUniqueID = function () {
    var s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return s4() + s4() + "-" + s4();
};
exports.default = getUniqueID;
//# sourceMappingURL=uniqueID.js.map