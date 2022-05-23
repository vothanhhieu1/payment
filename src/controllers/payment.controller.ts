import {inject} from '@loopback/core';
import {
  RestBindings,
  get,
  post,
  Response,
  response,
  ResponseObject,
  Request
} from '@loopback/rest';
import moment from 'moment';
import {PaymentBindings} from '../keys';
import { VNPayCardPaymentService, VNPayQRPaymentService } from '../services'
import {Vnpay} from '../typing';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PaymentController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(RestBindings.Http.RESPONSE) private res: Response,
    @inject(PaymentBindings.VNPAY) private vnpayPaymentService: VNPayCardPaymentService,
    @inject(PaymentBindings.VNPAY_QR) private vnpayQRPaymentService: VNPayQRPaymentService,
  ) {}

  @get('/card-payment-request')
  @response(200, PING_RESPONSE)
  requestCardPayment() {
    // Reply with a greeting, the current time, the url, and request headers
    const config: Vnpay.PaymentConfiguration = {
      apiVersion: '2.1.0',
      url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
      hashSecretType: 'HMACSHA512',
      hashSecretKey: 'UWRYROJTAJSJQYRBAQDUEQCWUUZYGYPJ',
      terminalCode: 'DJHOVPJF',
      locale: 'vn'
    }

    const paymentInfo: Vnpay.PaymentData ={
      transactionId: '902',
      returnUrl: 'http://localhost:3000',
      amount: 20000,
      command: 'pay',
      orderInfo: '889',
      orderType: 'payment',
      ipAddr: '10.198.41.106',
      currency: 'VND'
    }

    this.vnpayPaymentService.setConfigurations(config)
    const url = this.vnpayPaymentService.requestToProvider(paymentInfo)

    if (url) {
      this.res.redirect(url)
    }

    this.res.end()
  }

  @get('/ipn')
  @response(200, PING_RESPONSE)
  ipn(@inject(RestBindings.Http.REQUEST) request: Request) {
    const vnpayConfirmData: Vnpay.ProviderCardPaymentConfirmData = request.query
    const config: Vnpay.PaymentConfiguration = {
      apiVersion: '2.1.0',
      url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
      hashSecretType: 'HMACSHA512',
      hashSecretKey: 'UWRYROJTAJSJQYRBAQDUEQCWUUZYGYPJ',
      terminalCode: 'DJHOVPJF',
      locale: 'vn'
    }

    const paymentConfirm: Vnpay.PaymentConfirmData = {
      transactionId: '900',
      amount: 20000,
      currency: 'VND',
      confirm: false
    }
    this.vnpayPaymentService.setConfigurations(config)
    const confirmResponse = this.vnpayPaymentService.confirmFromProvider(paymentConfirm, vnpayConfirmData)
    return confirmResponse
  }

  @get('/create-qr')
  @response(200, PING_RESPONSE)
  async createQR() {
    // Reply with a greeting, the current time, the url, and request headers
    const config: Vnpay.QRPaymentConfiguration = {
      url: 'http://14.160.87.123:18080/QRCreateAPIRestV2/rest/CreateQrcodeApi/createQrcode',
      appId: 'MERCHANT',
      merchantName: 'NEWWAY',
      serviceCode: '06',
      countryCode: 'VN',
      masterMerCode: 'A000000775',
      merchantType: '9999',
      merchantCode: '0106921949',
      terminalId: 'NEWWAY05',
      payType: '03',
      hashSecretKey: 'vnpay@MERCHANT'
    }

    const paymentInfo: Vnpay.PaymentData ={
      transactionId: '902',
      amount: 20000,
      expDate: moment().add(2, 'days').format('YYMMDDHHmm'),
      ccy: '704',
      purpose: '902',
    }

    this.vnpayQRPaymentService.setConfigurations(config)
    const res = await this.vnpayQRPaymentService.requestToProvider(paymentInfo)
    return res
  }

  @post('/create-qr')
  @response(200, PING_RESPONSE)
  async ipnQR(@inject(RestBindings.Http.REQUEST) request: Request) {
    // Reply with a greeting, the current time, the url, and request headers
    const vnpayConfirmData: Vnpay.ProviderQRPaymentConfirmData = request.body
    const config: Vnpay.QRPaymentConfiguration = {
      url: 'http://14.160.87.123:18080/QRCreateAPIRestV2/rest/CreateQrcodeApi/createQrcode',
      appId: 'MERCHANT',
      merchantName: 'NEWWAY',
      serviceCode: '06',
      countryCode: 'VN',
      masterMerCode: 'A000000775',
      merchantType: '9999',
      merchantCode: '0106921949',
      terminalId: 'NEWWAY05',
      payType: '03',
      hashSecretKey: 'vnpay@MERCHANT'
    }

    const paymentInfo: Vnpay.PaymentConfirmData ={
      transactionId: '902',
      amount: 20000,
      expDate: moment().add(2, 'days').format('YYMMDDHHmm'),
      ccy: '704',
      purpose: '902',
      confirm: false
    }

    this.vnpayQRPaymentService.setConfigurations(config)
    const res = await this.vnpayQRPaymentService.confirmFromProvider(paymentInfo, vnpayConfirmData)
    return res
  }
}
