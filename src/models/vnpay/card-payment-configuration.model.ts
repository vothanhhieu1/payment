export class VNPayCardPaymentConfiguration {

  apiVersion: string
  paymentUrl: string
  hashSecretType: string
  hashSecretKey: string
  terminalCode: string
  locale: string

  constructor(data: Partial<VNPayCardPaymentConfiguration>) {}
}
