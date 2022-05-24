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

Thêm payment component vào `application.js`

```sh
this.component(PaymentComponent);
```

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

Tài liệu:
- [Thanh toán qua QR Code](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/73b902ba-08d2-40a4-995f-91b9a090052c/VIE_Tai_lieu_ket_noi_VNPAYQR.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220524%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220524T021554Z&X-Amz-Expires=86400&X-Amz-Signature=65c8250ff3e0327e3b79f9d16d83187d1c6ea1270e6ab904e4d8d5951c5f2fb6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%255BVIE%255D%2520Tai%2520lieu%2520ket%2520noi%2520VNPAYQR.pdf%22&x-id=GetObject)
- [Thanh toán qua Công Thanh Toán](https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html)
