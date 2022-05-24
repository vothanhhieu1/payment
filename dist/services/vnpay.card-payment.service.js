"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VNPayCardPaymentService = void 0;
const models_1 = require("../models");
class VNPayCardPaymentService {
    setConfigurations(cardPaymentConfiguration) {
        this.cardPaymentConfiguration = cardPaymentConfiguration;
    }
    requestToProvider(paymentData) {
        const cardPaymentRequest = new models_1.VNPayCardPaymentRequest({});
        cardPaymentRequest.fillData(paymentData, this.cardPaymentConfiguration);
        return cardPaymentRequest.generateUrl();
    }
    confirmFromProvider(paymentData, rawProviderData) {
        const cardPaymentConfirm = new models_1.VNPayCardPaymentConfirm({});
        cardPaymentConfirm.fillData(paymentData, rawProviderData, this.cardPaymentConfiguration);
        return cardPaymentConfirm.confirm();
    }
}
exports.VNPayCardPaymentService = VNPayCardPaymentService;
//# sourceMappingURL=vnpay.card-payment.service.js.map