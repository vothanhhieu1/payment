import { BindingKey } from '@loopback/core'
import {VNPayCardPaymentConfiguration} from './models'

export namespace VNPayBindings {

  export const CARD_PAYMENT_URL = BindingKey.create<string>('vnpay.card.payment.url')
  export const CARD_PAYMENT_HASH_SECRET_TYPE = BindingKey.create<string>('vnpay.card.payment.hash_secret_key')
  export const CARD_PAYMENT_HASH_SECRET_KEY = BindingKey.create<string>('vnpay.card.payment.card_payment_secret_key')
  export const CARD_PAYMENT_API_VERSION = BindingKey.create<string>('vnpay.card.payment.card_payment_api_version')
  export const CARD_PAYMENT_TERMINAL_CODE = BindingKey.create<string>('vnpay.payment.card_payment_terminal_code')
  export const CARD_PAYMENT_CONFIGURATION = BindingKey.create<VNPayCardPaymentConfiguration>('vnpay.payment.card_payment_configuration')

}

export namespace PaymentBindings {
  export const COMPONENT = BindingKey.create('components.payment')
  export const VNPAY = BindingKey.create('services.vnpay')
}
