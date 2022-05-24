"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VNPayPayment = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const utils_1 = require("../../utils");
const lodash_1 = (0, tslib_1.__importDefault)(require("lodash"));
class VNPayPayment extends repository_1.Entity {
    constructor(request) {
        super(request);
    }
    getSignData() {
        if (!this.providerData)
            return '';
        const fields = Object.keys(this.providerData).sort();
        const datum = [];
        for (const field of fields) {
            if (field === 'vnp_SecureHashType' || field === 'vnp_SecureHash')
                continue;
            const value = lodash_1.default.get(this.providerData, field);
            datum.push(`${field}=${encodeURIComponent(value)}`);
        }
        return datum.join('&');
    }
    hashData() {
        if (!this.hashSecretKey)
            return '';
        if (!this.hashSecretType)
            return '';
        const signData = this.getSignData();
        const signed = (0, utils_1.hash)(signData, this.hashSecretKey, this.hashSecretType);
        return signed;
    }
    hashQRData(data, type) {
        const signData = data.join('|');
        const signed = (0, utils_1.hash)(signData, undefined, type);
        console.log('signData', signData, this.hashSecretKey, this.hashSecretType, signed);
        return signed;
    }
}
exports.VNPayPayment = VNPayPayment;
//# sourceMappingURL=vnpay.payment.model.js.map