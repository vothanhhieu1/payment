import { VNPBankCode } from './constant'

export type ConfigurationMapping = Record<string, string>

export type Locale = 'vn' | 'en'

export namespace Vnpay {

  //export type BankCodeType = VNPBankCode.VNPAYQR | VNPBankCode.VNBANK | VNPBankCode.INTCARD | string

  export type ProviderCardPaymentRequestData = {
    vnp_Version: string // Phiên bản api mà merchant kết nối. Phiên bản hiện tại là : 2.0.1 và 2.1.0
    vnp_Command: string // Mã API sử dụng, mã cho giao dịch thanh toán là: pay
    vnp_TmnCode: string // Mã website của merchant trên hệ thống của VNPAY. Ví dụ: 2QXUI4J4
    vnp_Amount: number // Số tiền thanh toán. Số tiền không mang các ký tự phân tách thập phân, phần nghìn, ký tự tiền tệ. Để gửi số tiền thanh toán là 10,000 VND (mười nghìn VNĐ) thì merchant cần nhân thêm 100 lần (khử phần thập phân), sau đó gửi sang VNPAY là: 1000000
    vnp_BankCode?: string // Mã phương thức thanh toán, mã loại ngân hàng hoặc ví điện tử thanh toán.  Nếu không gửi sang tham số này, chuyển hướng người dùng sang VNPAY chọn phương thức thanh toán.
    vnp_CreateDate: string // Ví dụ: 20170829103111
    vnp_CurrCode: string // Đơn vị tiền tệ sử dụng thanh toán. Hiện tại chỉ hỗ trợ VND
    vnp_IpAddr: string // Địa chỉ IP của khách hàng thực hiện giao dịch. Ví dụ: 13.160.92.202
    vnp_Locale: Locale | string // Ngôn ngữ giao diện hiển thị. Hiện tại hỗ trợ Tiếng Việt (vn), Tiếng Anh (en)
    vnp_OrderInfo: string //Thông tin mô tả nội dung thanh toán (Tiếng Việt, không dấu). Ví dụ: **Nap tien cho thue bao 0123456789. So tien 100,000 VND**
    vnp_OrderType: string | null // Mã danh mục hàng hóa. Mỗi hàng hóa sẽ thuộc một nhóm danh mục do VNPAY quy định. Xem thêm bảng Danh mục hàng hóa
    vnp_ReturnUrl: string // URL thông báo kết quả giao dịch khi Khách hàng kết thúc thanh toán. Ví dụ: https://domain.vn/VnPayReturn
    vnp_TxnRef: string // Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày. Ví dụ: 23554
    vnp_SecureHash?: string // Mã kiểm tra (checksum) để đảm bảo dữ liệu của giao dịch không bị thay đổi trong quá trình chuyển từ merchant sang VNPAY. Việc tạo ra mã này phụ thuộc vào cấu hình của merchant và phiên bản api sử dụng. Phiên bản hiện tại hỗ trợ SHA256, HMACSHA512.
  } | {}

  export type ProviderCardPaymentConfirmData = {
    vnp_TmnCode: string // Mã website của merchant trên hệ thống của VNPAY. Ví dụ: 2QXUI4J4
    vnp_Amount: number // Số tiền thanh toán. VNPAY phản hồi số tiền nhân thêm 100 lần.
    vnp_BankCode: string // Mã Ngân hàng thanh toán. Ví dụ: NCB
    vnp_BankTranNo?: string // Mã giao dịch tại Ngân hàng. Ví dụ: NCB20170829152730
    vnp_CardType?: string // Loại tài khoản/thẻ khách hàng sử dụng:ATM,QRCODE
    vnp_PayDate?: string // Thời gian thanh toán. Định dạng: yyyyMMddHHmmss
    vnp_OrderInfo: string // Thông tin mô tả nội dung thanh toán (Tiếng Việt, không dấu). Ví dụ: **Nap tien cho thue bao 0123456789. So tien 100,000 VND**
    vnp_TransactionNo: string // Mã giao dịch ghi nhận tại hệ thống VNPAY. Ví dụ: 20170829153052
    vnp_ResponseCode: string // Mã phản hồi kết quả thanh toán. Quy định mã trả lời 00 ứng với kết quả Thành công cho tất cả các API
    vnp_TransactionStatus: string // Mã phản hồi kết quả thanh toán. Tình trạng của giao dịch tại Cổng thanh toán VNPAY.  -00: Giao dịch thanh toán được thực hiện thành công tại VNPAY -Khác 00: Giao dịch không thành công tại VNPAY
    vnp_TxnRef: string // Giống mã gửi sang VNPAY khi gửi yêu cầu thanh toán. Ví dụ: 23554
    vnp_SecureHashType?: string // Loại mã băm sử dụng: SHA256, HmacSHA512
    vnp_SecureHash: string // Mã kiểm tra (checksum) để đảm bảo dữ liệu của giao dịch không bị thay đổi trong quá trình chuyển từ VNPAY về Website TMĐT.  Cần kiểm tra đúng checksum khi bắt đầu xử lý yêu cầu (trước khi thực hiện các yêu cầu khác)
  } | {}

  export interface PaymentData {
    transactionId: string
    returnUrl?: string
    amount: number
    command?: string
    orderInfo?: string
    orderType?: string
    ipAddr?: string
    currency?: string
  }

  export interface PaymentConfirmData extends PaymentData {
    confirm: { (): Promise<boolean> | boolean } | boolean
  }

  export interface QRPaymentData {
    transactionId: string
    amount: number
    ccy?: string
    expDate?: string
    desc?: string
    purpose?: string
    tipAndFee?: string,
  }

  export type ProductQuantity = Record<string, number>

  export interface QRPaymentConfirmData extends QRPaymentData {
    productQuantity?: ProductQuantity
    confirm: { (): Promise<boolean> | boolean } | boolean
  }

  export type PaymentConfiguration = {
    apiVersion: string
    url: string
    hashSecretType: string
    hashSecretKey: string
    terminalCode: string
    locale: string
  }

  export type QRPaymentConfiguration = {
    url: string
    appId: string
    merchantName: string
    serviceCode: string
    countryCode: string
    masterMerCode: string
    merchantType: string
    merchantCode: string
    terminalId: string
    payType: string
    hashSecretType?: string
    hashSecretKey: string
  }

  export type ResponseIPN = { RspCode: string, Message: string }

  export type ProviderQRPaymentRequestData = {
    appId: string // Được VNPAY cung cấp riêng cho từng đối tác đi kèm nó là private Key
    merchantName: string // Tên viêt tắt của Merchant
    serviceCode: string // Mã dịch vụ QR. Giá trị mặc định là 03
    countryCode: string // Mã Vùng: default VN
    merchantCode: string // Mã merchantCode
    terminalId: string // Mã điểm thu
    payType: string // Kiểu QR: - 01 : Qrcode Cổng thanh toán - 02 : Qr Billing - 03 : Qr Hóa đơn - 04 : Qr Offline
    productId: string // Mã sản phẩm (Để trống nếu tạo QR type = 01,03,04)
    txnId: string // Mã đơn hàng, Mã GD . Required ( Dùng cho payType = 01)
    billNumber: string // Số hóa đơn QR terminal. payType = 03 nếu có số hóa đơn
    amount: string // Số tiền
    ccy: string //Mã tiền tệ : Giá trị mặc định 704
    expDate: string // g Thời gian hết hạn thanh toán, định dạng: yyMMddHHmm
    desc: string // Mô tả thêm thông tin khong được quá 19 ký tự
    masterMerCode: string // Mã doanh nghiệp phát triển merchant: default : A000000775
    merchantType: string // Loại hình doanh nghiệp. Giá trị mặc định để empty.
    tipAndFee?: string // Tiền tip and fee. Giá trị mặc định để empty
    consumerID?: string // Mã khách hàng , dành cho QR type 04
    purpose?: string // Mã dịch vụ billing cho QR type 04
    checksum: string // data =EncodeMD5(appId|merchantName|serviceCode|countryCode|masterMerCode|merchantType|merchantCode|terminalId|payType|productId|txnId|amount|tipAndFee|ccy|expDate|secretKey)
  }  | {}

  export type ProviderQRPaymentResponseData = {
    code: string // Mã lỗi
    message: string // Mô tả mã lỗi chi đính kèm
    data: string // Dữ liệu qrcode trả về
    checkSum: string // data = code|message|data|url|secretKey;
    idQrcode: string
  } | {}

  export type QRItemPayment = {
    merchantType: string
    serviceCode: string
    masterMerCode: string
    merchantCode: string
    terminalId: string
    productId: string
    amount: string
    ccy: string
    qty: string
    note: string
  }

  export type ProviderQRPaymentConfirmData = {
    code: string
    message: string
    msgType: string
    txnId: string
    qrTrace: string
    bankCode: string
    mobile?: string
    accountNo?: string
    amount: string
    payDate: string
    merchantCode: string
    terminalId: string
    name?: string
    phone?: string
    province_id?: string
    district_id?: string
    address?: string
    email?: string
    addData: QRItemPayment[],
    checksum: string
    ccy: string
  }

  export type ResponseMMS = { code: string, message: string, data?: any }
}
