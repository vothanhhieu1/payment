import {Component, ContextTags, injectable, createServiceBinding} from '@loopback/core';
import {PaymentBindings} from './keys';
import {
  VNPayCardPaymentService,
} from './services';


@injectable({tags: {[ContextTags.KEY]: PaymentBindings.COMPONENT}})
export class PaymentComponent implements Component {
  bindings = [createServiceBinding(VNPayCardPaymentService)]
}
