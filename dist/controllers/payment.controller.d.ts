/// <reference types="express" />
import { Response, Request } from '@loopback/rest';
import { VNPayCardPaymentService, VNPayQRPaymentService } from '../services';
import { Vnpay } from '../typing';
/**
 * A simple controller to bounce back http requests
 */
export declare class PaymentController {
    private req;
    private res;
    private vnpayPaymentService;
    private vnpayQRPaymentService;
    constructor(req: Request, res: Response, vnpayPaymentService: VNPayCardPaymentService, vnpayQRPaymentService: VNPayQRPaymentService);
    requestCardPayment(): void;
    ipn(request: Request): Vnpay.ResponseIPN;
    createQR(): Promise<Vnpay.ProviderQRPaymentResponseData>;
    mms(request: Request, vnpayConfirmData: Vnpay.ProviderQRPaymentConfirmData): Promise<Vnpay.ResponseMMS>;
}
