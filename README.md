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
yarn install nexpando-payment
```
## Cách dùng

### Thanh toán qua VNPAY
#### Thanh toán qua Cổng Thanh Toán VNPAY
Tạo URL payment:
```sh
 @inject(PaymentBindings.VNPAY) private vnpayPaymentService: VNPayCardPaymentService
 ....
 
 Lấy các thông tin cấu hình của các nhà cung cấp được VNPAY cung cấp và tạo ra 1 object config
 
 const config: Vnpay.PaymentConfiguration = {
      apiVersion: '2.1.0',
      url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
      hashSecretType: 'HMACSHA512',
      hashSecretKey: 'UWRYROJTAJSJQYRBAQDUEQCWUUZYGYPJ',
      terminalCode: 'DJHOVPJF',
      locale: 'vn'
    }
    
 Lấy các thông tin thanh toán và tạo ra 1 object paymentData
 
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
    
 this.vnpayPaymentService.setConfigurations(config)
 const url = this.vnpayPaymentService.requestToProvider(paymentData)
 
```
Tham khảo [VNPAY Payment project example](https://github.com/vothanhhieu1/vnpay-payment-example)
