"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VNPayMMSResponseCode = exports.VNPayQRResponseCode = exports.VNPResponseIPN = exports.VNPResponseCodeIPN = exports.HashType = exports.VNPResponseCode = exports.VNPTransactionStatus = exports.VNPBankCode = void 0;
exports.VNPBankCode = {
    VNPAYQR: 'VNPAYQR',
    VNBANK: 'VNBANK',
    INTCARD: 'INTCARD', // Thẻ thanh toán quốc tế
};
exports.VNPTransactionStatus = {
    SUCCESS: '00',
    NOT_COMPLETE: '01',
    EXCEPTION: '02',
    REVERSE: '04',
    PROCESSING: '05',
    REFUNDED: '06',
    UNUSUAL: '07',
    REJECT_REFUND: '09'
};
exports.VNPResponseCode = {
    SUCCESS: '00',
    UNUSUAL: '07',
    NO_REGISTER_INTERNET_BANKING: '09',
    VERIFY_WRONG_EXCEED_3_TIMES: '10',
    EXPIRED_PAYMENT_TIME: '11',
    BLOCK_ACCOUNT: '12',
    WRONG_OTP: '13',
    CANCELLED_BY_CUSTOMER: '24',
    NOT_ENOUGH_BALANCE: '51',
    EXCEED_CREDIT: '65',
    MAINTAINING: '75',
    WRONG_PASSWORD_MANY_TIMES: '79',
    OTHER: '99'
};
exports.HashType = {
    HASH_TYPE_MD5: 'MD5',
    HASH_TYPE_SHA256: 'SHA256',
    HASH_TYPE_SHA512: 'HMACSHA512',
};
exports.VNPResponseCodeIPN = {
    SUCCESS: '00',
    NOT_FOUND: '01',
    ALREADY_CONFIRMED: '02',
    INVALID_AMOUNT: '04',
    INVALID_CHECKSUM: '97',
    EXCEPTION: '99',
};
exports.VNPResponseIPN = {
    [exports.VNPResponseCodeIPN.SUCCESS]: {
        'RspCode': exports.VNPResponseCodeIPN.SUCCESS,
        'Message': 'Success',
    },
    [exports.VNPResponseCodeIPN.NOT_FOUND]: {
        'RspCode': exports.VNPResponseCodeIPN.NOT_FOUND,
        'Message': 'Order not found',
    },
    [exports.VNPResponseCodeIPN.ALREADY_CONFIRMED]: {
        'RspCode': exports.VNPResponseCodeIPN.ALREADY_CONFIRMED,
        'Message': 'Order already confirmed',
    },
    [exports.VNPResponseCodeIPN.INVALID_AMOUNT]: {
        'RspCode': exports.VNPResponseCodeIPN.INVALID_AMOUNT,
        'Message': 'Invalid amount',
    },
    [exports.VNPResponseCodeIPN.INVALID_CHECKSUM]: {
        'RspCode': exports.VNPResponseCodeIPN.INVALID_CHECKSUM,
        'Message': 'Invalid Checksum',
    },
    [exports.VNPResponseCodeIPN.EXCEPTION]: {
        'RspCode': exports.VNPResponseCodeIPN.EXCEPTION,
        'Message': 'Exception',
    },
};
exports.VNPayQRResponseCode = {
    SUCCESS: '00',
    INVALID_INPUT: '01',
    INSERT_QR_DATA_FAIL: '04',
    DENY_IP: '05',
    INVALID_CHECKSUM: '06',
    MERCHANT_NOT_FOUND: '07',
    INVALID_SERVICE_CODE: '09',
    INVALID_APP_ID: '10',
    INACTIVE_MERCHANT: '11',
    EMPTY_MASTER_MERCHANT_CODE: '12',
    EMPTY_CUSTOMER_ID: '15',
    EMPTY_PURPOSE: '16',
    INVALID_TERMINAL: '21',
    INACTIVE_TERMINAL: '24',
    INTERNAL_ERROR: '99'
};
exports.VNPayMMSResponseCode = {
    SUCCESS: '00',
    NOT_ENOUGH_QUANTITY: '01',
    NOT_AVALIBLE: '02',
    CONFIRMED: '03',
    CREATE_ORDER_FAIL: '04',
    ORDER_PROCESSING: '05',
    INVALID_AUTHENTICATION: '06',
    INVALID_AMOUNT: '07',
    TIMEOUT: '08',
    QR_EXPIRED: '09',
    AUTHORIZATION_IP: '10',
};
//# sourceMappingURL=constant.js.map