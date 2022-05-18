import {
  CardPaymentRequest,
  CardPaymentConfirm,
  QRPaymentRequest,
  QRPaymentConfirm
} from './models'
import { VNPBankCode } from './constant'

export type ConfigurationMapping = Record<string, string>
export type PaymentRequest = CardPaymentRequest | QRPaymentRequest
export type PaymentConfirm = CardPaymentConfirm | QRPaymentConfirm

export type VNPBankCodeType = VNPBankCode.VNPAYQR | VNPBankCode.VNBANK | VNPBankCode.INTCARD | string

export type Locale = 'vn' | 'en'
