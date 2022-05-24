import { Vnpay } from './types'

export const VNPBankCode = {
  VNPAYQR: 'VNPAYQR', //Thanh toán quét mã QR
  VNBANK: 'VNBANK', // Thẻ ATM - Tài khoản ngân hàng nội địa
  INTCARD: 'INTCARD', // Thẻ thanh toán quốc tế
}

export const VNPTransactionStatus = {
  SUCCESS: '00',
  NOT_COMPLETE: '01',
  EXCEPTION: '02',
  REVERSE: '04',
  PROCESSING: '05',
  REFUNDED: '06',
  UNUSUAL: '07',
  REJECT_REFUND: '09'
}

export const VNPResponseCode = {
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
}

export const HashType = {
  HASH_TYPE_MD5:'MD5',
  HASH_TYPE_SHA256: 'SHA256',
  HASH_TYPE_SHA512: 'HMACSHA512',
}

export const VNPResponseCodeIPN = {
  SUCCESS: '00',
  NOT_FOUND: '01',
  ALREADY_CONFIRMED: '02',
  INVALID_AMOUNT: '04',
  INVALID_CHECKSUM: '97',
  EXCEPTION: '99',
}

export const VNPResponseIPN: Record<string, Vnpay.ResponseIPN> = {
  [VNPResponseCodeIPN.SUCCESS]: {
    'RspCode': VNPResponseCodeIPN.SUCCESS,
    'Message': 'Success',
  },
  [VNPResponseCodeIPN.NOT_FOUND]: {
    'RspCode': VNPResponseCodeIPN.NOT_FOUND,
    'Message': 'Order not found',
  },
  [VNPResponseCodeIPN.ALREADY_CONFIRMED]: {
    'RspCode': VNPResponseCodeIPN.ALREADY_CONFIRMED,
    'Message': 'Order already confirmed',
  },
  [VNPResponseCodeIPN.INVALID_AMOUNT]: {
    'RspCode': VNPResponseCodeIPN.INVALID_AMOUNT,
    'Message': 'Invalid amount',
  },
  [VNPResponseCodeIPN.INVALID_CHECKSUM]: {
    'RspCode': VNPResponseCodeIPN.INVALID_CHECKSUM,
    'Message': 'Invalid Checksum',
  },
  [VNPResponseCodeIPN.EXCEPTION]: {
    'RspCode': VNPResponseCodeIPN.EXCEPTION,
    'Message': 'Exception',
  },
}

export const VNPayQRResponseCode = {
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
}

export const VNPayMMSResponseCode = {
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
}
