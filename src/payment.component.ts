import {
  Component,
  Binding,
  inject,
  CoreBindings,
  Application,
} from '@loopback/core';
import {PaymentBindings} from './keys';
import {
  VNPayCardPaymentService,
  VNPayQRPaymentService,
} from './services';

export class PaymentComponent implements Component {
  bindings: Binding[] = [
    Binding.bind(PaymentBindings.VNPAY).toClass(VNPayCardPaymentService),
    Binding.bind(PaymentBindings.VNPAY_QR).toClass(VNPayQRPaymentService)
  ]
  constructor(@inject(CoreBindings.APPLICATION_INSTANCE) private app: Application) {
    this.app.bind(PaymentBindings.VNPAY).toClass(VNPayCardPaymentService)
    this.app.bind(PaymentBindings.VNPAY_QR).toClass(VNPayQRPaymentService)
  }
}
