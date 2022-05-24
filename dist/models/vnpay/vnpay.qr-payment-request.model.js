"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VNPayQRPaymentRequest = void 0;
const constant_1 = require("../../constant");
const vnpay_payment_model_1 = require("./vnpay.payment.model");
class VNPayQRPaymentRequest extends vnpay_payment_model_1.VNPayPayment {
    constructor(request) {
        super(request);
    }
    fillData(paymentData, configuration) {
        const { amount, ccy, expDate, desc, purpose, transactionId, } = paymentData;
        const { appId, merchantName, serviceCode, countryCode, merchantCode, merchantType, terminalId, payType, masterMerCode, hashSecretKey, hashSecretType = constant_1.HashType.HASH_TYPE_MD5 } = configuration;
        const checksum = this.hashQRData([
            appId,
            merchantName,
            serviceCode,
            countryCode,
            masterMerCode,
            merchantType,
            merchantCode,
            terminalId,
            payType,
            '',
            transactionId,
            amount,
            '',
            ccy,
            expDate,
            hashSecretKey
        ], hashSecretType);
        const providerData = {
            appId,
            merchantName,
            serviceCode,
            countryCode,
            merchantCode,
            terminalId,
            payType,
            txnId: transactionId,
            billNumber: transactionId,
            amount,
            ccy,
            expDate,
            desc,
            masterMerCode,
            merchantType,
            purpose,
            checksum,
            tipAndFee: '',
            productId: '',
        };
        this.paymentData = paymentData;
        this.providerData = providerData;
        this.hashSecretKey = hashSecretKey;
        this.hashSecretType = hashSecretType;
    }
}
exports.VNPayQRPaymentRequest = VNPayQRPaymentRequest;
//# sourceMappingURL=vnpay.qr-payment-request.model.js.map