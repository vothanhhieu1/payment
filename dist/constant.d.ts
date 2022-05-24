import { Vnpay } from './typing.d';
export declare const VNPBankCode: {
    VNPAYQR: string;
    VNBANK: string;
    INTCARD: string;
};
export declare const VNPTransactionStatus: {
    SUCCESS: string;
    NOT_COMPLETE: string;
    EXCEPTION: string;
    REVERSE: string;
    PROCESSING: string;
    REFUNDED: string;
    UNUSUAL: string;
    REJECT_REFUND: string;
};
export declare const VNPResponseCode: {
    SUCCESS: string;
    UNUSUAL: string;
    NO_REGISTER_INTERNET_BANKING: string;
    VERIFY_WRONG_EXCEED_3_TIMES: string;
    EXPIRED_PAYMENT_TIME: string;
    BLOCK_ACCOUNT: string;
    WRONG_OTP: string;
    CANCELLED_BY_CUSTOMER: string;
    NOT_ENOUGH_BALANCE: string;
    EXCEED_CREDIT: string;
    MAINTAINING: string;
    WRONG_PASSWORD_MANY_TIMES: string;
    OTHER: string;
};
export declare const HashType: {
    HASH_TYPE_MD5: string;
    HASH_TYPE_SHA256: string;
    HASH_TYPE_SHA512: string;
};
export declare const VNPResponseCodeIPN: {
    SUCCESS: string;
    NOT_FOUND: string;
    ALREADY_CONFIRMED: string;
    INVALID_AMOUNT: string;
    INVALID_CHECKSUM: string;
    EXCEPTION: string;
};
export declare const VNPResponseIPN: Record<string, Vnpay.ResponseIPN>;
export declare const VNPayQRResponseCode: {
    SUCCESS: string;
    INVALID_INPUT: string;
    INSERT_QR_DATA_FAIL: string;
    DENY_IP: string;
    INVALID_CHECKSUM: string;
    MERCHANT_NOT_FOUND: string;
    INVALID_SERVICE_CODE: string;
    INVALID_APP_ID: string;
    INACTIVE_MERCHANT: string;
    EMPTY_MASTER_MERCHANT_CODE: string;
    EMPTY_CUSTOMER_ID: string;
    EMPTY_PURPOSE: string;
    INVALID_TERMINAL: string;
    INACTIVE_TERMINAL: string;
    INTERNAL_ERROR: string;
};
export declare const VNPayMMSResponseCode: {
    SUCCESS: string;
    NOT_ENOUGH_QUANTITY: string;
    NOT_AVALIBLE: string;
    CONFIRMED: string;
    CREATE_ORDER_FAIL: string;
    ORDER_PROCESSING: string;
    INVALID_AUTHENTICATION: string;
    INVALID_AMOUNT: string;
    TIMEOUT: string;
    QR_EXPIRED: string;
    AUTHORIZATION_IP: string;
};
