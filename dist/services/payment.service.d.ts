export interface PaymentService<S, R, C> {
    setConfigurations?(option?: S): void;
    requestToProvider(paymentRequest: R): Promise<any> | any;
    confirmFromProvider?(providerPaymentConfirm: R, paymentConfirm: C): Promise<any> | any;
}
