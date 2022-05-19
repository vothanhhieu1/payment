import {
  VNPayCardPaymentRequest,
  VNPayCardPaymentConfiguration,
} from '.'
import {VNPayCardPaymentData} from '../../typing.d'
import moment from 'moment'

export class PaymentInfo {

  transactionId: string
  returnUrl: string
  amount: number
  command: string
  orderInfo: string
  orderType: string
  ipAddr: string
  currency: string

  constructor(data: Partial<PaymentInfo>) {}

  toVNPayCardPaymentRequest(configuration: VNPayCardPaymentConfiguration): VNPayCardPaymentRequest {
    const data: VNPayCardPaymentData = {
      vnp_Version: configuration.apiVersion,
      vnp_Command: this.command,
      vnp_TmnCode: configuration.terminalCode,
      vnp_Amount: this.amount * 100,
      vnp_BankCode: null,
      vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
      vnp_CurrCode: this.currency,
      vnp_IpAddr: this.ipAddr,
      vnp_Locale: configuration.locale,
      vnp_OrderInfo: this.orderInfo,
      vnp_OrderType: this.orderType,
      vnp_ReturnUrl: this.returnUrl,
      vnp_TxnRef: this.transactionId,
    }
    return new VNPayCardPaymentRequest({ data })
  }
}
