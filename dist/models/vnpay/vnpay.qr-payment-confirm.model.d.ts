import { Vnpay } from '../../typing.d';
import { VNPayPayment } from './vnpay.payment.model';
export declare class VNPayQRPaymentConfirm extends VNPayPayment<Vnpay.QRPaymentConfirmData, Vnpay.ProviderQRPaymentConfirmData> {
    isValidChecksum: boolean;
    constructor(request: Partial<VNPayQRPaymentConfirm>);
    fillData: (paymentData: Vnpay.QRPaymentConfirmData, rawProviderData: Vnpay.ProviderQRPaymentConfirmData, config: Vnpay.QRPaymentConfiguration) => void;
    found(): boolean;
    isConfirmed(): boolean;
    available(): boolean;
    enoughQuantity(): {
        result: boolean;
        data?: {
            productId?: string;
            qty?: number;
        }[];
    };
    validAmount(): boolean;
    confirm(): Vnpay.ResponseMMS;
}
