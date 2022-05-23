import { HashType } from '../../constant'
import { Vnpay } from '../../typing.d'
import {VNPayPayment} from './vnpay.payment.model'

export class VNPayQRPaymentRequest extends VNPayPayment<
  Vnpay.PaymentData,
  Vnpay.ProviderQRPaymentRequestData
 > {

   constructor(request: Partial<VNPayQRPaymentRequest>) {
     super(request)
   }

   fillData(paymentData: Vnpay.PaymentData, configuration: Vnpay.QRPaymentConfiguration) {
    const {
      amount,
      ccy,
      expDate,
      desc,
      purpose,
      transactionId,
    } = paymentData
    const {
      appId,
      merchantName,
      serviceCode,
      countryCode,
      merchantCode,
      merchantType,
      terminalId,
      payType,
      masterMerCode,
      hashSecretKey,
      hashSecretType = HashType.HASH_TYPE_MD5
    } = configuration
     const checksum = this.hashQRData([
       appId,
       merchantName,
       serviceCode,
       countryCode,
       masterMerCode,
       merchantType,
       merchantCode,
       terminalId,
       payType,
       '',
       transactionId,
       amount,
       '',
       ccy,
       expDate,
       hashSecretKey
     ], hashSecretType)
    const providerData: Vnpay.ProviderQRPaymentRequestData = {
      appId,
      merchantName,
      serviceCode,
      countryCode,
      merchantCode,
      terminalId,
      payType,
      txnId: transactionId,
      billNumber: transactionId,
      amount,
      ccy,
      expDate,
      desc,
      masterMerCode,
      merchantType,
      purpose,
      checksum,
      tipAndFee: '',
      productId: '',
    }
    this.paymentData = paymentData
    this.providerData = providerData
    this.hashSecretKey = hashSecretKey
    this.hashSecretType = hashSecretType
   }
}
