import { ConfigurationMapping } from '../typing.d'

export interface PaymentService<R, C> {

  getConfigurations?(option?: any): Promise<any>

  prepare?(data?: any): Promise<R>

  requestToProvider(paymentRequest: R): Promise<any> | any

  confirmFromProvider?(paymentConfirm: C): Promise<any>

}
