import { Entity } from '@loopback/repository';
export declare class VNPayPayment<T, P> extends Entity {
    paymentData?: T;
    providerData?: P;
    url?: string;
    hashSecretKey?: string;
    hashSecretType?: string;
    constructor(request: Partial<VNPayPayment<T, P>>);
    getSignData(): string;
    hashData(): string;
    hashQRData(data: any[], type: string): string;
}
