import { VNPBankCodeType, Locale, VNPayCardPaymentData } from '../../typing.d'
import { hash } from '../../utils'
import * as queryString from 'query-string'
import _ from 'lodash'


export class VNPayCardPaymentRequest {

  data?: VNPayCardPaymentData

  constructor(request: Partial<VNPayCardPaymentRequest>) {
    this.data = request.data
  }

  getSignData(): string {
    if (!this.data) return ''
    const fields: string[] = Object.keys(this.data).sort()
    const datum = []
    for (const field of fields) {
      const value = _.get(this.data, field)
      datum.push(`${field}=${value}`)
    }
    return datum.join('&')
  }

  generateUrl(url: string, hashSecretKey: string, hashSecretType: string): string {
    if (!this.data) return url
    const signData = this.getSignData()
    const signed = hash(signData, hashSecretKey, hashSecretType)
    _.set(this.data, 'vnp_SecureHash', signed)
    return `${url}?${queryString.stringify(this.data, { encode: false })}`
  }
}
