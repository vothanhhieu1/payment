import { Provider } from '@loopback/core'

export class VNPayCardPaymentProvider implements Provider<string> {

  constructor(){}

  value(): string {
    return 'hello'
  }

}
