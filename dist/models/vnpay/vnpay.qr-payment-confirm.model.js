"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VNPayQRPaymentConfirm = void 0;
const tslib_1 = require("tslib");
const vnpay_payment_model_1 = require("./vnpay.payment.model");
const constant_1 = require("../../constant");
const lodash_1 = (0, tslib_1.__importDefault)(require("lodash"));
class VNPayQRPaymentConfirm extends vnpay_payment_model_1.VNPayPayment {
    constructor(request) {
        super(request);
        this.fillData = (paymentData, rawProviderData, config) => {
            const { code, msgType, txnId, qrTrace, bankCode, mobile, accountNo, amount, payDate, merchantCode, checksum: vnpayChecksum, } = rawProviderData;
            const { hashSecretKey, hashSecretType = constant_1.HashType.HASH_TYPE_MD5 } = config;
            this.paymentData = paymentData;
            this.providerData = rawProviderData;
            this.hashSecretKey = hashSecretType;
            this.hashSecretType = hashSecretKey;
            const checksum = this.hashQRData([
                code,
                msgType,
                txnId,
                qrTrace,
                bankCode,
                mobile,
                accountNo,
                amount,
                payDate,
                merchantCode,
                hashSecretKey
            ], hashSecretType);
            this.isValidChecksum = checksum === vnpayChecksum;
        };
    }
    found() {
        return Boolean(this.paymentData);
    }
    isConfirmed() {
        var _a;
        return Boolean((_a = this.paymentData) === null || _a === void 0 ? void 0 : _a.confirm);
    }
    available() {
        var _a, _b;
        const { addData = [] } = (_a = this.providerData) !== null && _a !== void 0 ? _a : {};
        const { productQuantity = {} } = (_b = this.paymentData) !== null && _b !== void 0 ? _b : {};
        if (lodash_1.default.isEmpty(productQuantity) || lodash_1.default.isEmpty(addData))
            return true;
        const invalidProducts = [];
        for (const data of addData) {
            const { productId } = data;
            let rest = productQuantity[productId];
            rest = Number(rest);
            if (!Number.isNaN(rest)) {
                if (Number(rest) === 0) {
                    invalidProducts.push(productId);
                }
            }
        }
        return invalidProducts.length !== addData.length;
    }
    enoughQuantity() {
        var _a, _b;
        const { addData = [] } = (_a = this.providerData) !== null && _a !== void 0 ? _a : {};
        const { productQuantity = {} } = (_b = this.paymentData) !== null && _b !== void 0 ? _b : {};
        if (lodash_1.default.isEmpty(productQuantity) || lodash_1.default.isEmpty(addData))
            return { result: true };
        const invalidProducts = [];
        for (const data of addData) {
            const { productId, qty } = data;
            let rest = productQuantity[productId];
            rest = Number(rest);
            if (!Number.isNaN(rest)) {
                if (Number(qty) > rest) {
                    invalidProducts.push({ productId, qty: rest });
                }
            }
        }
        if (!lodash_1.default.isEmpty(invalidProducts)) {
            return { result: false, data: invalidProducts };
        }
        return { result: true };
    }
    validAmount() {
        var _a, _b;
        const { amount: vnpAmount } = (_a = this.providerData) !== null && _a !== void 0 ? _a : {};
        const { amount } = (_b = this.paymentData) !== null && _b !== void 0 ? _b : {};
        return Number(amount) === Number(vnpAmount);
    }
    confirm() {
        var _a, _b, _c;
        if (!this.isValidChecksum) {
            return { code: constant_1.VNPayMMSResponseCode.INVALID_AUTHENTICATION, message: 'Invalid checksum' };
        }
        if (!this.found()) {
            return { code: constant_1.VNPayMMSResponseCode.INVALID_AUTHENTICATION, message: 'Đơn hàng không tồn tại' };
        }
        if (this.isConfirmed()) {
            return {
                code: constant_1.VNPayMMSResponseCode.CONFIRMED,
                message: 'Đơn hàng đã được thanh toán',
                data: {
                    txnId: (_a = this.paymentData) === null || _a === void 0 ? void 0 : _a.transactionId
                }
            };
        }
        if (!this.validAmount()) {
            return {
                code: constant_1.VNPayMMSResponseCode.INVALID_AMOUNT,
                message: 'Số tiền không chính xác',
                data: {
                    amount: (_b = this.paymentData) === null || _b === void 0 ? void 0 : _b.amount
                }
            };
        }
        if (!this.available()) {
            return {
                code: constant_1.VNPayMMSResponseCode.NOT_AVALIBLE,
                message: 'Kho hàng đã hết sản phẩm',
            };
        }
        const checkQuantity = this.enoughQuantity();
        if (!checkQuantity.result) {
            return {
                code: constant_1.VNPayMMSResponseCode.NOT_ENOUGH_QUANTITY,
                message: 'Kho hàng không đủ sản phẩm',
                data: checkQuantity.data
            };
        }
        return {
            code: constant_1.VNPayMMSResponseCode.SUCCESS,
            message: 'Đặt hàng thành công',
            data: {
                amount: (_c = this.paymentData) === null || _c === void 0 ? void 0 : _c.transactionId
            }
        };
    }
}
exports.VNPayQRPaymentConfirm = VNPayQRPaymentConfirm;
//# sourceMappingURL=vnpay.qr-payment-confirm.model.js.map