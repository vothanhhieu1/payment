import axios from 'axios'
import { PaymentService } from '.'
import { VNPayQRPaymentRequest } from '../models'
import { Vnpay } from '../typing'

export class VNPayQRPaymentService implements PaymentService<
  Vnpay.QRPaymentConfiguration,
  Vnpay.PaymentData,
  Vnpay.ProviderQRPaymentConfirmData
  > {

  private qrPaymentConfiguration: Vnpay.QRPaymentConfiguration

  setConfigurations(qrPaymentConfiguration: Vnpay.QRPaymentConfiguration) {
    this.qrPaymentConfiguration = qrPaymentConfiguration
  }

  async requestToProvider(paymentData: Vnpay.PaymentData): Promise<Vnpay.ProviderQRPaymentResponseData> {
    const qrPaymentRequest = new VNPayQRPaymentRequest({})
    qrPaymentRequest.fillData(paymentData, this.qrPaymentConfiguration)
    const { providerData } = qrPaymentRequest
    const qrResponse = await axios.post(this.qrPaymentConfiguration.url, providerData, {
      headers: {
        'Content-type': 'text/plain'
      }
    })
    return qrResponse.data
  }

  confirmFromProvider(
    paymentData: Vnpay.PaymentConfirmData,
    rawProviderData: Vnpay.ProviderQRPaymentConfirmData
  ): Vnpay.ResponseQRIPN {
    const cardPaymentConfirm = new VNPayQRPaymentConfirm({})
    cardPaymentConfirm.fillData(paymentData, rawProviderData, this.qrPaymentConfiguration)
    return cardPaymentConfirm.confirm()
  }

}
