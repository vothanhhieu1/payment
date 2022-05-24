export declare type ConfigurationMapping = Record<string, string>;
export declare type Locale = 'vn' | 'en';
export declare namespace Vnpay {
    type ProviderCardPaymentRequestData = {
        vnp_Version: string;
        vnp_Command: string;
        vnp_TmnCode: string;
        vnp_Amount: number;
        vnp_BankCode?: string;
        vnp_CreateDate: string;
        vnp_CurrCode: string;
        vnp_IpAddr: string;
        vnp_Locale: Locale | string;
        vnp_OrderInfo: string;
        vnp_OrderType: string | null;
        vnp_ReturnUrl: string;
        vnp_TxnRef: string;
        vnp_SecureHash?: string;
    } | {};
    type ProviderCardPaymentConfirmData = {
        vnp_TmnCode: string;
        vnp_Amount: number;
        vnp_BankCode: string;
        vnp_BankTranNo?: string;
        vnp_CardType?: string;
        vnp_PayDate?: string;
        vnp_OrderInfo: string;
        vnp_TransactionNo: string;
        vnp_ResponseCode: string;
        vnp_TransactionStatus: string;
        vnp_TxnRef: string;
        vnp_SecureHashType?: string;
        vnp_SecureHash: string;
    } | {};
    interface PaymentData {
        transactionId: string;
        returnUrl?: string;
        amount: number;
        command?: string;
        orderInfo?: string;
        orderType?: string;
        ipAddr?: string;
        currency?: string;
    }
    interface PaymentConfirmData extends PaymentData {
        confirm: {
            (): Promise<boolean> | boolean;
        } | boolean;
    }
    interface QRPaymentData {
        transactionId: string;
        amount: number;
        ccy?: string;
        expDate?: string;
        desc?: string;
        purpose?: string;
        tipAndFee?: string;
    }
    type ProductQuantity = Record<string, number>;
    interface QRPaymentConfirmData extends QRPaymentData {
        productQuantity?: ProductQuantity;
        confirm: {
            (): Promise<boolean> | boolean;
        } | boolean;
    }
    type PaymentConfiguration = {
        apiVersion: string;
        url: string;
        hashSecretType: string;
        hashSecretKey: string;
        terminalCode: string;
        locale: string;
    };
    type QRPaymentConfiguration = {
        url: string;
        appId: string;
        merchantName: string;
        serviceCode: string;
        countryCode: string;
        masterMerCode: string;
        merchantType: string;
        merchantCode: string;
        terminalId: string;
        payType: string;
        hashSecretType?: string;
        hashSecretKey: string;
    };
    type ResponseIPN = {
        RspCode: string;
        Message: string;
    };
    type ProviderQRPaymentRequestData = {
        appId: string;
        merchantName: string;
        serviceCode: string;
        countryCode: string;
        merchantCode: string;
        terminalId: string;
        payType: string;
        productId: string;
        txnId: string;
        billNumber: string;
        amount: string;
        ccy: string;
        expDate: string;
        desc: string;
        masterMerCode: string;
        merchantType: string;
        tipAndFee?: string;
        consumerID?: string;
        purpose?: string;
        checksum: string;
    } | {};
    type ProviderQRPaymentResponseData = {
        code: string;
        message: string;
        data: string;
        checkSum: string;
        idQrcode: string;
    } | {};
    type QRItemPayment = {
        merchantType: string;
        serviceCode: string;
        masterMerCode: string;
        merchantCode: string;
        terminalId: string;
        productId: string;
        amount: string;
        ccy: string;
        qty: string;
        note: string;
    };
    type ProviderQRPaymentConfirmData = {
        code: string;
        message: string;
        msgType: string;
        txnId: string;
        qrTrace: string;
        bankCode: string;
        mobile?: string;
        accountNo?: string;
        amount: string;
        payDate: string;
        merchantCode: string;
        terminalId: string;
        name?: string;
        phone?: string;
        province_id?: string;
        district_id?: string;
        address?: string;
        email?: string;
        addData: QRItemPayment[];
        checksum: string;
        ccy: string;
    };
    type ResponseMMS = {
        code: string;
        message: string;
        data?: any;
    };
}
