"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VNPayCardPaymentRequest = void 0;
const tslib_1 = require("tslib");
const queryString = (0, tslib_1.__importStar)(require("query-string"));
const lodash_1 = (0, tslib_1.__importDefault)(require("lodash"));
const vnpay_payment_model_1 = require("./vnpay.payment.model");
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
class VNPayCardPaymentRequest extends vnpay_payment_model_1.VNPayPayment {
    constructor(request) {
        super(request);
        const { paymentData, providerData, url, hashSecretType, hashSecretKey } = request;
        this.paymentData = paymentData;
        this.providerData = providerData;
        this.url = url;
        this.hashSecretKey = hashSecretType;
        this.hashSecretType = hashSecretKey;
    }
    fillData(paymentData, configuration) {
        const { command, amount, currency, ipAddr, orderInfo, orderType, returnUrl, transactionId } = paymentData;
        const { apiVersion, terminalCode, locale, url, hashSecretKey, hashSecretType } = configuration;
        const providerData = {
            vnp_Version: apiVersion,
            vnp_Command: command,
            vnp_TmnCode: terminalCode,
            vnp_Amount: amount * 100,
            vnp_CreateDate: (0, moment_1.default)().format('YYYYMMDDHHmmss'),
            vnp_CurrCode: currency,
            vnp_IpAddr: ipAddr,
            vnp_Locale: locale,
            vnp_OrderInfo: orderInfo,
            vnp_OrderType: orderType,
            vnp_ReturnUrl: returnUrl,
            vnp_TxnRef: transactionId,
        };
        this.paymentData = paymentData;
        this.providerData = providerData;
        this.url = url;
        this.hashSecretKey = hashSecretKey;
        this.hashSecretType = hashSecretType;
    }
    generateUrl() {
        if (!this.providerData)
            return this.url;
        const signed = this.hashData();
        lodash_1.default.set(this.providerData, 'vnp_SecureHash', signed);
        return `${this.url}?${queryString.stringify(this.providerData, { encode: true })}`;
    }
}
exports.VNPayCardPaymentRequest = VNPayCardPaymentRequest;
//# sourceMappingURL=vnpay.card-payment-request.model.js.map