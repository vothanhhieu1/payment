import {
  ConfigurationMapping,
  PaymentRequest,
  PaymentConfirm,
} from '../typing.d'

export interface PaymentService {

  getConfigurations(option: any): Promise<ConfigurationMapping>

  prepare(data: any): Promise<PaymentRequest>

  process(paymentRequest: PaymentRequest): Promise<any>

  confirm(paymentConfirm: PaymentConfirm): Promise<any>

}
