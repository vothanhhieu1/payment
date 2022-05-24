import { PaymentService } from '.';
import { Vnpay } from '../types';
export declare class VNPayCardPaymentService implements PaymentService<Vnpay.PaymentConfiguration, Vnpay.PaymentData, Vnpay.ProviderCardPaymentConfirmData> {
    private cardPaymentConfiguration;
    setConfigurations(cardPaymentConfiguration: Vnpay.PaymentConfiguration): void;
    requestToProvider(paymentData: Vnpay.PaymentData): string | undefined;
    confirmFromProvider(paymentData: Vnpay.PaymentConfirmData, rawProviderData: Vnpay.ProviderCardPaymentConfirmData): Vnpay.ResponseIPN;
}
