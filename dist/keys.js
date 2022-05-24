"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentBindings = exports.VNPayBindings = void 0;
const core_1 = require("@loopback/core");
var VNPayBindings;
(function (VNPayBindings) {
    VNPayBindings.CARD_PAYMENT_URL = core_1.BindingKey.create('vnpay.card.payment.url');
    VNPayBindings.CARD_PAYMENT_HASH_SECRET_TYPE = core_1.BindingKey.create('vnpay.card.payment.hash_secret_key');
    VNPayBindings.CARD_PAYMENT_HASH_SECRET_KEY = core_1.BindingKey.create('vnpay.card.payment.card_payment_secret_key');
    VNPayBindings.CARD_PAYMENT_API_VERSION = core_1.BindingKey.create('vnpay.card.payment.card_payment_api_version');
    VNPayBindings.CARD_PAYMENT_TERMINAL_CODE = core_1.BindingKey.create('vnpay.payment.card_payment_terminal_code');
})(VNPayBindings = exports.VNPayBindings || (exports.VNPayBindings = {}));
var PaymentBindings;
(function (PaymentBindings) {
    PaymentBindings.COMPONENT = core_1.BindingKey.create('components.payment');
    PaymentBindings.VNPAY = core_1.BindingKey.create('services.vnpay');
    PaymentBindings.VNPAY_QR = core_1.BindingKey.create('services.vnpay.qr');
})(PaymentBindings = exports.PaymentBindings || (exports.PaymentBindings = {}));
//# sourceMappingURL=keys.js.map