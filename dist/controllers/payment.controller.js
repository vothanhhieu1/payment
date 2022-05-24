"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
const keys_1 = require("../keys");
const services_1 = require("../services");
/**
 * A simple controller to bounce back http requests
 */
let PaymentController = class PaymentController {
    constructor(req, res, vnpayPaymentService, vnpayQRPaymentService) {
        this.req = req;
        this.res = res;
        this.vnpayPaymentService = vnpayPaymentService;
        this.vnpayQRPaymentService = vnpayQRPaymentService;
    }
    requestCardPayment() {
        // Reply with a greeting, the current time, the url, and request headers
        const config = {
            apiVersion: '2.1.0',
            url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
            hashSecretType: 'HMACSHA512',
            hashSecretKey: 'UWRYROJTAJSJQYRBAQDUEQCWUUZYGYPJ',
            terminalCode: 'DJHOVPJF',
            locale: 'vn'
        };
        const paymentData = {
            transactionId: '902',
            returnUrl: 'http://localhost:3000',
            amount: 20000,
            command: 'pay',
            orderInfo: '889',
            orderType: 'payment',
            ipAddr: '10.198.41.106',
            currency: 'VND'
        };
        this.vnpayPaymentService.setConfigurations(config);
        const url = this.vnpayPaymentService.requestToProvider(paymentData);
        if (url) {
            this.res.redirect(url);
        }
        this.res.end();
    }
    ipn(request) {
        const vnpayConfirmData = request.query;
        const config = {
            apiVersion: '2.1.0',
            url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
            hashSecretType: 'HMACSHA512',
            hashSecretKey: 'UWRYROJTAJSJQYRBAQDUEQCWUUZYGYPJ',
            terminalCode: 'DJHOVPJF',
            locale: 'vn'
        };
        const paymentData = {
            transactionId: '900',
            amount: 20000,
            currency: 'VND',
            confirm: false
        };
        this.vnpayPaymentService.setConfigurations(config);
        const confirmResponse = this.vnpayPaymentService.confirmFromProvider(paymentData, vnpayConfirmData);
        return confirmResponse;
    }
    async createQR() {
        // Reply with a greeting, the current time, the url, and request headers
        const config = {
            url: 'http://14.160.87.123:18080/QRCreateAPIRestV2/rest/CreateQrcodeApi/createQrcode',
            appId: 'MERCHANT',
            merchantName: 'NEWWAY',
            serviceCode: '06',
            countryCode: 'VN',
            masterMerCode: 'A000000775',
            merchantType: '9999',
            merchantCode: '0106921949',
            terminalId: 'NEWWAY05',
            payType: '03',
            hashSecretKey: 'vnpay@MERCHANT'
        };
        const paymentInfo = {
            transactionId: '902',
            amount: 20000,
            expDate: (0, moment_1.default)().add(2, 'days').format('YYMMDDHHmm'),
            ccy: '704',
            purpose: '902',
        };
        this.vnpayQRPaymentService.setConfigurations(config);
        const res = await this.vnpayQRPaymentService.requestToProvider(paymentInfo);
        return res;
    }
    async mms(request, vnpayConfirmData) {
        // Reply with a greeting, the current time, the url, and request headers
        const config = {
            url: 'http://14.160.87.123:18080/QRCreateAPIRestV2/rest/CreateQrcodeApi/createQrcode',
            appId: 'MERCHANT',
            merchantName: 'NEWWAY',
            serviceCode: '06',
            countryCode: 'VN',
            masterMerCode: 'A000000775',
            merchantType: '9999',
            merchantCode: '0106921949',
            terminalId: 'NEWWAY05',
            payType: '03',
            hashSecretKey: 'vnpay@MERCHANT'
        };
        const paymentInfo = {
            transactionId: '902',
            amount: 20000,
            expDate: (0, moment_1.default)().add(2, 'days').format('YYMMDDHHmm'),
            ccy: '704',
            purpose: '902',
            confirm: false,
        };
        this.vnpayQRPaymentService.setConfigurations(config);
        const res = this.vnpayQRPaymentService.confirmFromProvider(paymentInfo, vnpayConfirmData);
        return res;
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/card-payment-request'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], PaymentController.prototype, "requestCardPayment", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/ipn'),
    (0, tslib_1.__param)(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], PaymentController.prototype, "ipn", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/create-qr'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PaymentController.prototype, "createQR", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/mms'),
    (0, tslib_1.__param)(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PaymentController.prototype, "mms", null);
PaymentController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__param)(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    (0, tslib_1.__param)(2, (0, core_1.inject)(keys_1.PaymentBindings.VNPAY)),
    (0, tslib_1.__param)(3, (0, core_1.inject)(keys_1.PaymentBindings.VNPAY_QR)),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object, services_1.VNPayCardPaymentService,
        services_1.VNPayQRPaymentService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map