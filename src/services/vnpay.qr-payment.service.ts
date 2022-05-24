import axios from 'axios'
import { PaymentService } from '.'
import { VNPayQRPaymentRequest, VNPayQRPaymentConfirm } from '../models'
import { Vnpay } from '../typing'

export class VNPayQRPaymentService implements PaymentService<
  Vnpay.QRPaymentConfiguration,
  Vnpay.QRPaymentData,
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
    paymentData: Vnpay.QRPaymentConfirmData,
    rawProviderData: Vnpay.ProviderQRPaymentConfirmData
  ): Vnpay.ResponseMMS {
    const cardPaymentConfirm = new VNPayQRPaymentConfirm({})
    cardPaymentConfirm.fillData(paymentData, rawProviderData, this.qrPaymentConfiguration)
    return cardPaymentConfirm.confirm()
  }

}
