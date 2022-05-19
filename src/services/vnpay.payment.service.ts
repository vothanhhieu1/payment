import { inject } from '@loopback/core'
import { PaymentService } from '.'
import { VNPayCardPaymentConfirm, PaymentInfo, VNPayCardPaymentConfiguration } from '../models'
import { VNPayBindings } from '../keys'

export class VNPayCardPaymentService implements PaymentService<PaymentInfo, VNPayCardPaymentConfirm> {

  constructor(
    @inject.getter(VNPayBindings.CARD_PAYMENT_CONFIGURATION)
    private cardPaymentConfiguration: VNPayCardPaymentConfiguration,
    @inject.getter(VNPayBindings.CARD_PAYMENT_URL)
    private cardPaymentUrl: string,
    @inject.getter(VNPayBindings.CARD_PAYMENT_HASH_SECRET_KEY)
    private hashSecretKey: string,
    @inject.getter(VNPayBindings.CARD_PAYMENT_HASH_SECRET_TYPE)
    private hashSecretType: string
  ) {}

  requestToProvider(paymentInfo: PaymentInfo): string {
    const cardPaymentRequest = paymentInfo.toVNPayCardPaymentRequest(this.cardPaymentConfiguration)
    return cardPaymentRequest.generateUrl(this.cardPaymentUrl, this.hashSecretKey, this.hashSecretType)
  }

  //confirmFromProvider(confirmData: VNPayCardPaymentConfirm) {

  //}

}
