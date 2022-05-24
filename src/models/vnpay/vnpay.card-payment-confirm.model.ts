import { Vnpay } from '../../types'
import {VNPayPayment} from './vnpay.payment.model'
import _ from 'lodash'
import { VNPResponseCodeIPN, VNPResponseIPN } from '../../constant'

export class VNPayCardPaymentConfirm extends VNPayPayment<
  Vnpay.PaymentConfirmData,
  Vnpay.ProviderCardPaymentConfirmData
 > {

  vnpaySecureHash: string

  constructor(request: Partial<VNPayCardPaymentConfirm>) {
    super(request)
  }

  fillData = (
    paymentData: Vnpay.PaymentConfirmData,
    rawProviderData: Vnpay.ProviderCardPaymentConfirmData,
    config: Vnpay.PaymentConfiguration,
  ) => {
    const vnpaySecureHash = _.get(rawProviderData, 'vnp_SecureHash')
    const providerData = _.omit(rawProviderData, ['vnp_SecureHash', 'vnp_SecureHashType'])
    const { hashSecretKey, hashSecretType } = config
    this.paymentData = paymentData
    this.providerData = providerData
    this.vnpaySecureHash = vnpaySecureHash
    this.hashSecretKey = hashSecretKey
    this.hashSecretType = hashSecretType
  }

  validChecksum() : boolean {
    const secureHash = this.hashData()
    return secureHash === this.vnpaySecureHash
  }

  found() : boolean {
    return Boolean(this.paymentData)
  }

  isConfirmed() : boolean {
    return Boolean(this.paymentData?.confirm)
  }

  validAmount() : boolean {
    let vnpAmount = _.get(this.providerData, 'vnp_Amount') || 0
    vnpAmount = Number(vnpAmount) / 100
    const { amount } = this.paymentData ?? {}
    return Number(amount) === vnpAmount
  }

  confirm(): Vnpay.ResponseIPN {
    if (!this.validChecksum()) {
      return VNPResponseIPN[VNPResponseCodeIPN.INVALID_CHECKSUM]
    }

    if (!this.found()) {
      return VNPResponseIPN[VNPResponseCodeIPN.NOT_FOUND]
    }

    if (!this.validAmount()) {
      return VNPResponseIPN[VNPResponseCodeIPN.INVALID_AMOUNT]
    }

    if (this.isConfirmed()) {
      return VNPResponseIPN[VNPResponseCodeIPN.ALREADY_CONFIRMED]
    }
    return VNPResponseIPN[VNPResponseCodeIPN.SUCCESS]
  }

}
