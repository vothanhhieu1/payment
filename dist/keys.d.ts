import { BindingKey } from '@loopback/core';
import { PaymentComponent } from './payment.component';
import { VNPayCardPaymentService, VNPayQRPaymentService } from './services';
export declare namespace VNPayBindings {
    const CARD_PAYMENT_URL: BindingKey<string>;
    const CARD_PAYMENT_HASH_SECRET_TYPE: BindingKey<string>;
    const CARD_PAYMENT_HASH_SECRET_KEY: BindingKey<string>;
    const CARD_PAYMENT_API_VERSION: BindingKey<string>;
    const CARD_PAYMENT_TERMINAL_CODE: BindingKey<string>;
}
export declare namespace PaymentBindings {
    const COMPONENT: BindingKey<PaymentComponent>;
    const VNPAY: BindingKey<VNPayCardPaymentService>;
    const VNPAY_QR: BindingKey<VNPayQRPaymentService>;
}
