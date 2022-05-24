import { PaymentService } from '.';
import { Vnpay } from '../typing';
export declare class VNPayQRPaymentService implements PaymentService<Vnpay.QRPaymentConfiguration, Vnpay.QRPaymentData, Vnpay.ProviderQRPaymentConfirmData> {
    private qrPaymentConfiguration;
    setConfigurations(qrPaymentConfiguration: Vnpay.QRPaymentConfiguration): void;
    requestToProvider(paymentData: Vnpay.PaymentData): Promise<Vnpay.ProviderQRPaymentResponseData>;
    confirmFromProvider(paymentData: Vnpay.QRPaymentConfirmData, rawProviderData: Vnpay.ProviderQRPaymentConfirmData): Vnpay.ResponseMMS;
}
