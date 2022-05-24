# Nexpando Payment Component

Component hổ trợ cách thực hiện các bước thanh toán từ nhiều nhà cung cấp như: vnpay
Component phát triển trên nền tảng [Loopback4](https://loopback.io/doc/en/lb4)

## Cài đặt
Copy dòng bên dưới đặt vào mục `dependencies` trong file `package.json`
```sh
"nexpando-payment": "git+https://github.com/vothanhhieu1/payment.git"
```
Chạy lệnh dưới để download payment component về project
```sh
npm install nexpando-payment
```
## Cách dùng

### Thanh toán qua VNPAY

#### Thanh toán qua Cổng Thanh Toán VNPAY

Tạo URL payment:
```sh
 @inject(PaymentBindings.VNPAY) private vnpayPaymentService: VNPayCardPaymentService
 ....
  @get('/card-payment-request')
  requestCardPayment() {
    
    //Lấy các thông tin cấu hình của các nhà cung cấp được VNPAY cung cấp và tạo ra 1 object config
    const config: Vnpay.PaymentConfiguration = {
      apiVersion: '2.1.0',
      url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
      hashSecretType: 'HMACSHA512',
      hashSecretKey: 'UWRYROJTAJSJQYRBAQDUEQCWUUZYGYPJ',
      terminalCode: 'DJHOVPJF',
      locale: 'vn'
    }
    //Lấy các thông tin thanh toán và tạo ra 1 object paymentData
    const paymentData: Vnpay.PaymentData ={
      transactionId: '902',
      returnUrl: 'http://localhost:3000',
      amount: 20000,
      command: 'pay',
      orderInfo: '889',
      orderType: 'payment',
      ipAddr: '10.198.41.106',
      currency: 'VND'
    }

    // Render URL Payment
    this.vnpayPaymentService.setConfigurations(config)
    const url = this.vnpayPaymentService.requestToProvider(paymentData)

    if (url) {
      this.res.redirect(url)
    }

    this.res.end()
  }
 
```

Xác thực thông tin từ VNPAY:

- Tạo 1 api IPN (`Ghttp://domain/ipn`).
- VNPAY sẽ gọi về api trên xác thực lại thông tin thanh toán

```sh
 @inject(PaymentBindings.VNPAY) private vnpayPaymentService: VNPayCardPaymentService
 ....
  @get('/ipn')
  ipn(@inject(RestBindings.Http.REQUEST) request: Request) {
    // Thông tin thanh toán từ VNPAY truyền vê
    const vnpayConfirmData: Vnpay.ProviderCardPaymentConfirmData = request.query
    
    //Lấy các thông tin cấu hình của các nhà cung cấp được VNPAY cung cấp và tạo ra 1 object config
    const config: Vnpay.PaymentConfiguration = {
      apiVersion: '2.1.0',
      url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
      hashSecretType: 'HMACSHA512',
      hashSecretKey: 'UWRYROJTAJSJQYRBAQDUEQCWUUZYGYPJ',
      terminalCode: 'DJHOVPJF',
      locale: 'vn'
    }
    
    //Lấy các thông tin thanh toán và tạo ra 1 object paymentData
    const paymentData: Vnpay.PaymentConfirmData = {
      transactionId: '900',
      amount: 20000,
      currency: 'VND',
      confirm: false
    }
    // Trả về kết quả cho VNPAY theo cấu trúc { RspCode: Mã code từ VNPAY, Message: str}
    this.vnpayPaymentService.setConfigurations(config)
    const confirmResponse = this.vnpayPaymentService.confirmFromProvider(paymentData, vnpayConfirmData)
    
    // TODO Có thể handle thêm một số Logic từ kết quả trên
    ...
    
    return confirmResponse
  }
```
#### Thanh toán qua QR VNPAY

Tạo QR Data

```sh
@inject(PaymentBindings.VNPAY_QR) private vnpayQRPaymentService: VNPayQRPaymentService
....
@get('/create-qr')
  async createQR() {
  
     //Lấy các thông tin cấu hình của các nhà cung cấp được VNPAY cung cấp và tạo ra 1 object config
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
    
    //Lấy các thông tin thanh toán và tạo ra 1 object paymentData
    const paymentInfo: Vnpay.QRPaymentData ={
      transactionId: '902',
      amount: 20000,
      expDate: moment().add(2, 'days').format('YYMMDDHHmm'),
      ccy: '704',
      purpose: '902',
    }

    // Gọi đến nhà cung cấp VNPAY để tạo 1 QR Code
    this.vnpayQRPaymentService.setConfigurations(config)
    const res = await this.vnpayQRPaymentService.requestToProvider(paymentInfo)
    return res
  }
  
  Kết quả trả về thành công:
  {
    "code": "00",
    "message": "Success",
    // QR text
    "data": "00020101021226280010A000000775011001069219495204999953037045405200005802VN5906NEWWAY6005HANOI624401039020314NEWWAY OFFLINE0708NEWWAY050803902630406FA",
    "url": null,
    "checksum": "54C6B23D974F0FFE150D9C4F10F30747",
    "isDelete": false,
    "idQrcode": "441028",
    "visa": null,
    "master": null,
    "unionPay": null
  }
  
```
Xác thực thông tin từ VNPAY:

- Tạo 1 api MMS (`POST http://domain/mms`).
- VNPAY sẽ gọi về api trên xác thực lại thông tin thanh toán

```sh
@inject(PaymentBindings.VNPAY_QR) private vnpayQRPaymentService: VNPayQRPaymentService
...
 @post('/mms')
  async mms(
    @inject(RestBindings.Http.REQUEST) request: Request,
    // Thông tin thanh toán VNPAY truyền về
    @requestBody() vnpayConfirmData: Vnpay.ProviderQRPaymentConfirmData
  ) {
    //Lấy các thông tin cấu hình của các nhà cung cấp được VNPAY cung cấp và tạo ra 1 object config
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
    
    //Lấy các thông tin thanh toán và tạo ra 1 object paymentData
    const paymentInfo: Vnpay.QRPaymentConfirmData ={
      transactionId: '902',
      amount: 20000,
      expDate: moment().add(2, 'days').format('YYMMDDHHmm'),
      ccy: '704',
      purpose: '902',
      confirm: false,
    }
    
   // Trả về kết quả cho VNPAY theo cấu trúc { code: Mã code từ VNPAY, message: str, data?: }
    this.vnpayQRPaymentService.setConfigurations(config)
    const res = this.vnpayQRPaymentService.confirmFromProvider(paymentInfo, vnpayConfirmData)
    // TODO Có thể handle thêm một số Logic từ kết quả trên
    ...
    
    return res
  }
}
```

Tham khảo chi tiết [VNPAY Payment project example](https://github.com/vothanhhieu1/vnpay-payment-example)
