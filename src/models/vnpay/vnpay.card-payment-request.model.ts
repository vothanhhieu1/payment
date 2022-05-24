import { Vnpay } from '../../types'
import * as queryString from 'query-string'
import _ from 'lodash'
import {VNPayPayment} from './vnpay.payment.model'
import moment from 'moment'

export class VNPayCardPaymentRequest extends VNPayPayment<
  Vnpay.PaymentData,
  Vnpay.ProviderCardPaymentRequestData
 > {

  constructor(request: Partial<VNPayCardPaymentRequest>) {
    super(request)
    const { paymentData, providerData, url, hashSecretType, hashSecretKey } = request
    this.paymentData = paymentData
    this.providerData = providerData
    this.url = url
    this.hashSecretKey = hashSecretType
    this.hashSecretType = hashSecretKey
  }

  fillData(paymentData: Vnpay.PaymentData, configuration: Vnpay.PaymentConfiguration) {
    const { command, amount, currency, ipAddr, orderInfo, orderType, returnUrl, transactionId  } = paymentData
    const { apiVersion, terminalCode, locale, url, hashSecretKey, hashSecretType  } = configuration
    const providerData: Vnpay.ProviderCardPaymentRequestData = {
      vnp_Version: apiVersion,
      vnp_Command: command,
      vnp_TmnCode: terminalCode,
      vnp_Amount: amount * 100,
      vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
      vnp_CurrCode: currency,
      vnp_IpAddr: ipAddr,
      vnp_Locale: locale,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_ReturnUrl: returnUrl,
      vnp_TxnRef: transactionId,
    }
    this.paymentData = paymentData
    this.providerData = providerData
    this.url = url
    this.hashSecretKey = hashSecretKey
    this.hashSecretType = hashSecretType
  }

  generateUrl(): string | undefined {
    if (!this.providerData) return this.url
    const signed = this.hashData()
    _.set(this.providerData, 'vnp_SecureHash', signed)
    return `${this.url}?${queryString.stringify(this.providerData, { encode: true })}`
  }
}
