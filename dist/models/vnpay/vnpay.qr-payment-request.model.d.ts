import { Vnpay } from '../../typing.d';
import { VNPayPayment } from './vnpay.payment.model';
export declare class VNPayQRPaymentRequest extends VNPayPayment<Vnpay.QRPaymentData, Vnpay.ProviderQRPaymentRequestData> {
    constructor(request: Partial<VNPayQRPaymentRequest>);
    fillData(paymentData: Vnpay.QRPaymentData, configuration: Vnpay.QRPaymentConfiguration): void;
}
