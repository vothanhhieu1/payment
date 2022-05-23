import {Entity} from '@loopback/repository'
import { hash } from '../../utils'
import _ from 'lodash'


export class VNPayPayment<T, P> extends Entity {

  paymentData?: T
  providerData?: P
  url?: string
  hashSecretKey?: string
  hashSecretType?: string

  constructor(request: Partial<VNPayPayment<T, P>>) {
    super(request)
  }

  getSignData(): string {
    if (!this.providerData) return ''
    const fields: string[] = Object.keys(this.providerData).sort()
    const datum = []
    for (const field of fields) {
      if (field === 'vnp_SecureHashType' || field === 'vnp_SecureHash') continue
      const value = _.get(this.providerData, field)
      datum.push(`${field}=${encodeURIComponent(value)}`)
    }
    return datum.join('&')
  }

  hashData(): string {
    if (!this.hashSecretKey) return ''
    if (!this.hashSecretType) return ''
    const signData = this.getSignData()
    const signed = hash(signData, this.hashSecretKey, this.hashSecretType)
    return signed
  }

  hashQRData(data: any[], type: string): string {
    const signData = data.join('|')
    const signed = hash(signData, undefined, type)
    console.log('signData', signData, this.hashSecretKey, this.hashSecretType, signed)
    return signed
  }
}
