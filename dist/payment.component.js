"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const keys_1 = require("./keys");
const services_1 = require("./services");
let PaymentComponent = class PaymentComponent {
    constructor(app) {
        this.app = app;
        this.bindings = [
            core_1.Binding.bind(keys_1.PaymentBindings.VNPAY).toClass(services_1.VNPayCardPaymentService),
            core_1.Binding.bind(keys_1.PaymentBindings.VNPAY_QR).toClass(services_1.VNPayQRPaymentService)
        ];
        this.app.bind(keys_1.PaymentBindings.VNPAY).toClass(services_1.VNPayCardPaymentService);
        this.app.bind(keys_1.PaymentBindings.VNPAY_QR).toClass(services_1.VNPayQRPaymentService);
    }
};
PaymentComponent = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE)),
    (0, tslib_1.__metadata)("design:paramtypes", [core_1.Application])
], PaymentComponent);
exports.PaymentComponent = PaymentComponent;
//# sourceMappingURL=payment.component.js.map