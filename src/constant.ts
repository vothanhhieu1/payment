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
