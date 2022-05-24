import { Vnpay } from '../../types';
import { VNPayPayment } from './vnpay.payment.model';
export declare class VNPayCardPaymentRequest extends VNPayPayment<Vnpay.PaymentData, Vnpay.ProviderCardPaymentRequestData> {
    constructor(request: Partial<VNPayCardPaymentRequest>);
    fillData(paymentData: Vnpay.PaymentData, configuration: Vnpay.PaymentConfiguration): void;
    generateUrl(): string | undefined;
}
