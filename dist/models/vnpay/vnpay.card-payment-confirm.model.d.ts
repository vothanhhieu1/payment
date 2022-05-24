import { Vnpay } from '../../typing.d';
import { VNPayPayment } from './vnpay.payment.model';
export declare class VNPayCardPaymentConfirm extends VNPayPayment<Vnpay.PaymentConfirmData, Vnpay.ProviderCardPaymentConfirmData> {
    vnpaySecureHash: string;
    constructor(request: Partial<VNPayCardPaymentConfirm>);
    fillData: (paymentData: Vnpay.PaymentConfirmData, rawProviderData: Vnpay.ProviderCardPaymentConfirmData, config: Vnpay.PaymentConfiguration) => void;
    validChecksum(): boolean;
    found(): boolean;
    isConfirmed(): boolean;
    validAmount(): boolean;
    confirm(): Vnpay.ResponseIPN;
}
