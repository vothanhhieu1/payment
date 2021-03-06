import { Vnpay } from '../../types'
import {VNPayPayment} from './vnpay.payment.model'
import { VNPayMMSResponseCode, HashType } from '../../constant'
import _ from 'lodash'

export class VNPayQRPaymentConfirm extends VNPayPayment<
  Vnpay.QRPaymentConfirmData,
  Vnpay.ProviderQRPaymentConfirmData
 > {

  isValidChecksum: boolean

  constructor(request: Partial<VNPayQRPaymentConfirm>) {
    super(request)
  }

  fillData = (
    paymentData: Vnpay.QRPaymentConfirmData,
    rawProviderData: Vnpay.ProviderQRPaymentConfirmData,
    config: Vnpay.QRPaymentConfiguration,
  ) => {
    const {
      code,
      msgType,
      txnId,
      qrTrace,
      bankCode,
      mobile,
      accountNo,
      amount,
      payDate,
      merchantCode,
      checksum: vnpayChecksum,
    } = rawProviderData

    const { hashSecretKey, hashSecretType = HashType.HASH_TYPE_MD5 } = config
    this.paymentData = paymentData
    this.providerData = rawProviderData
    this.hashSecretKey = hashSecretType
    this.hashSecretType = hashSecretKey

    const checksum = this.hashQRData([
      code,
      msgType,
      txnId,
      qrTrace,
      bankCode,
      mobile,
      accountNo,
      amount,
      payDate,
      merchantCode,
      hashSecretKey
    ], hashSecretType)

    this.isValidChecksum = checksum === vnpayChecksum
  }

  found() : boolean {
    return Boolean(this.paymentData)
  }

  isConfirmed() : boolean {
    return Boolean(this.paymentData?.confirm)
  }

  available() : boolean {
    const { addData = [] } = this.providerData ?? {}
    const { productQuantity = {} } = this.paymentData ?? {}

    if (_.isEmpty(productQuantity) || _.isEmpty(addData)) return true

    const invalidProducts = []

    for (const data of addData) {
      const { productId } = data
      let rest = productQuantity[productId]
      rest = Number(rest)
      if (!Number.isNaN(rest)) {
        if(Number(rest) === 0) {
          invalidProducts.push(productId)
        }
      }
    }
    return invalidProducts.length !== addData.length
  }

  enoughQuantity(): { result: boolean, data?: { productId?: string, qty?: number }[] } {
    const { addData = [] } = this.providerData ?? {}
    const { productQuantity = {} } = this.paymentData ?? {}

    if (_.isEmpty(productQuantity) || _.isEmpty(addData)) return { result:  true }
    const invalidProducts = []
    for (const data of addData) {
      const { productId, qty } = data
      let rest = productQuantity[productId]
      rest = Number(rest)
      if (!Number.isNaN(rest)) {
        if(Number(qty) > rest) {
          invalidProducts.push({ productId, qty: rest })
        }
      }
    }
    if (!_.isEmpty(invalidProducts)) {
      return { result: false, data: invalidProducts }
    }
    return { result:  true }
  }

  validAmount() : boolean {
    const { amount: vnpAmount } = this.providerData ?? {}
    const { amount } = this.paymentData ?? {}
    return Number(amount) === Number(vnpAmount)
  }

  confirm(): Vnpay.ResponseMMS {
    if (!this.isValidChecksum) {
      return { code: VNPayMMSResponseCode.INVALID_AUTHENTICATION, message: 'Invalid checksum' }
    }

    if (!this.found()) {
      return { code: VNPayMMSResponseCode.INVALID_AUTHENTICATION, message: '????n h??ng kh??ng t???n t???i' }
    }

    if (this.isConfirmed()) {
      return {
        code: VNPayMMSResponseCode.CONFIRMED,
        message: '????n h??ng ???? ???????c thanh to??n',
        data: {
          txnId: this.paymentData?.transactionId
        }
      }
    }

    if (!this.validAmount()) {
      return {
        code: VNPayMMSResponseCode.INVALID_AMOUNT,
        message: 'S??? ti???n kh??ng ch??nh x??c',
        data: {
          amount: this.paymentData?.amount
        }
      }
    }

    if (!this.available()) {
      return {
        code: VNPayMMSResponseCode.NOT_AVALIBLE,
        message: 'Kho h??ng ???? h???t s???n ph???m',
      }
    }

    const checkQuantity = this.enoughQuantity()

    if (!checkQuantity.result) {
      return {
        code: VNPayMMSResponseCode.NOT_ENOUGH_QUANTITY,
        message: 'Kho h??ng kh??ng ????? s???n ph???m',
        data: checkQuantity.data
      }
    }

    return {
      code: VNPayMMSResponseCode.SUCCESS,
      message: '?????t h??ng th??nh c??ng',
      data: {
        amount: this.paymentData?.transactionId
      }
    }
  }

}
