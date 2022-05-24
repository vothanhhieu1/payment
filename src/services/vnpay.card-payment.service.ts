import { PaymentService } from '.'
import { VNPayCardPaymentConfirm, VNPayCardPaymentRequest } from '../models'
import { Vnpay } from '../types'

export class VNPayCardPaymentService implements PaymentService<
  Vnpay.PaymentConfiguration,
  Vnpay.PaymentData,
  Vnpay.ProviderCardPaymentConfirmData
  > {

  private cardPaymentConfiguration: Vnpay.PaymentConfiguration

  setConfigurations(cardPaymentConfiguration: Vnpay.PaymentConfiguration) {
    this.cardPaymentConfiguration = cardPaymentConfiguration
  }

  requestToProvider(paymentData: Vnpay.PaymentData): string | undefined {
    const cardPaymentRequest = new VNPayCardPaymentRequest({})
    cardPaymentRequest.fillData(paymentData, this.cardPaymentConfiguration)
    return cardPaymentRequest.generateUrl()
  }

  confirmFromProvider(
    paymentData: Vnpay.PaymentConfirmData,
    rawProviderData: Vnpay.ProviderCardPaymentConfirmData,
  ): Vnpay.ResponseIPN {
    const cardPaymentConfirm = new VNPayCardPaymentConfirm({})
    cardPaymentConfirm.fillData(paymentData, rawProviderData, this.cardPaymentConfiguration)
    return cardPaymentConfirm.confirm()
  }

}
