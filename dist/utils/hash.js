"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const tslib_1 = require("tslib");
const crypto_1 = (0, tslib_1.__importDefault)(require("crypto"));
const md5_1 = (0, tslib_1.__importDefault)(require("md5"));
const constant_1 = require("../constant");
const hash = (data, hashSecret, type) => {
    let result;
    switch (type) {
        case constant_1.HashType.HASH_TYPE_MD5:
            return (0, md5_1.default)(data).toUpperCase();
        case constant_1.HashType.HASH_TYPE_SHA256:
            result = crypto_1.default.createHash('sha256');
            return result.update(data).digest('hex');
        case constant_1.HashType.HASH_TYPE_SHA512:
            if (hashSecret) {
                result = crypto_1.default.createHmac('sha512', hashSecret);
                return result.update(Buffer.from(data, 'utf-8')).digest('hex');
            }
            return '';
        default:
            return '';
    }
};
exports.hash = hash;
//# sourceMappingURL=hash.js.map