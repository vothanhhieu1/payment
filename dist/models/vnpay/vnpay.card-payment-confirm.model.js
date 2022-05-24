"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VNPayCardPaymentConfirm = void 0;
const tslib_1 = require("tslib");
const vnpay_payment_model_1 = require("./vnpay.payment.model");
const lodash_1 = (0, tslib_1.__importDefault)(require("lodash"));
const constant_1 = require("../../constant");
class VNPayCardPaymentConfirm extends vnpay_payment_model_1.VNPayPayment {
    constructor(request) {
        super(request);
        this.fillData = (paymentData, rawProviderData, config) => {
            const vnpaySecureHash = lodash_1.default.get(rawProviderData, 'vnp_SecureHash');
            const providerData = lodash_1.default.omit(rawProviderData, ['vnp_SecureHash', 'vnp_SecureHashType']);
            const { hashSecretKey, hashSecretType } = config;
            this.paymentData = paymentData;
            this.providerData = providerData;
            this.vnpaySecureHash = vnpaySecureHash;
            this.hashSecretKey = hashSecretKey;
            this.hashSecretType = hashSecretType;
        };
    }
    validChecksum() {
        const secureHash = this.hashData();
        return secureHash === this.vnpaySecureHash;
    }
    found() {
        return Boolean(this.paymentData);
    }
    isConfirmed() {
        var _a;
        return Boolean((_a = this.paymentData) === null || _a === void 0 ? void 0 : _a.confirm);
    }
    validAmount() {
        var _a;
        let vnpAmount = lodash_1.default.get(this.providerData, 'vnp_Amount') || 0;
        vnpAmount = Number(vnpAmount) / 100;
        const { amount } = (_a = this.paymentData) !== null && _a !== void 0 ? _a : {};
        return Number(amount) === vnpAmount;
    }
    confirm() {
        if (!this.validChecksum()) {
            return constant_1.VNPResponseIPN[constant_1.VNPResponseCodeIPN.INVALID_CHECKSUM];
        }
        if (!this.found()) {
            return constant_1.VNPResponseIPN[constant_1.VNPResponseCodeIPN.NOT_FOUND];
        }
        if (!this.validAmount()) {
            return constant_1.VNPResponseIPN[constant_1.VNPResponseCodeIPN.INVALID_AMOUNT];
        }
        if (this.isConfirmed()) {
            return constant_1.VNPResponseIPN[constant_1.VNPResponseCodeIPN.ALREADY_CONFIRMED];
        }
        return constant_1.VNPResponseIPN[constant_1.VNPResponseCodeIPN.SUCCESS];
    }
}
exports.VNPayCardPaymentConfirm = VNPayCardPaymentConfirm;
//# sourceMappingURL=vnpay.card-payment-confirm.model.js.map