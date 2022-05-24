"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VNPayQRPaymentService = void 0;
const tslib_1 = require("tslib");
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
const models_1 = require("../models");
class VNPayQRPaymentService {
    setConfigurations(qrPaymentConfiguration) {
        this.qrPaymentConfiguration = qrPaymentConfiguration;
    }
    async requestToProvider(paymentData) {
        const qrPaymentRequest = new models_1.VNPayQRPaymentRequest({});
        qrPaymentRequest.fillData(paymentData, this.qrPaymentConfiguration);
        const { providerData } = qrPaymentRequest;
        const qrResponse = await axios_1.default.post(this.qrPaymentConfiguration.url, providerData, {
            headers: {
                'Content-type': 'text/plain'
            }
        });
        return qrResponse.data;
    }
    confirmFromProvider(paymentData, rawProviderData) {
        const cardPaymentConfirm = new models_1.VNPayQRPaymentConfirm({});
        cardPaymentConfirm.fillData(paymentData, rawProviderData, this.qrPaymentConfiguration);
        return cardPaymentConfirm.confirm();
    }
}
exports.VNPayQRPaymentService = VNPayQRPaymentService;
//# sourceMappingURL=vnpay.qr-payment.service.js.map