import { VNPBankCodeType, Locale } from '../../typing.d'

export class CardPaymentRequest {
  vnp_Version: string // Phiên bản api mà merchant kết nối. Phiên bản hiện tại là : 2.0.1 và 2.1.0
  vnp_Command: string // Mã API sử dụng, mã cho giao dịch thanh toán là: pay
  vnp_TmnCode: string // Mã website của merchant trên hệ thống của VNPAY. Ví dụ: 2QXUI4J4
  vnp_Amount: number // Số tiền thanh toán. Số tiền không mang các ký tự phân tách thập phân, phần nghìn, ký tự tiền tệ. Để gửi số tiền thanh toán là 10,000 VND (mười nghìn VNĐ) thì merchant cần nhân thêm 100 lần (khử phần thập phân), sau đó gửi sang VNPAY là: 1000000
  vnp_BankCode?: VNPBankCodeType // Mã phương thức thanh toán, mã loại ngân hàng hoặc ví điện tử thanh toán.  Nếu không gửi sang tham số này, chuyển hướng người dùng sang VNPAY chọn phương thức thanh toán.
  vnp_CreateDate: string // Ví dụ: 20170829103111
  vnp_CurrCode: string // Đơn vị tiền tệ sử dụng thanh toán. Hiện tại chỉ hỗ trợ VND
  vnp_IpAddr: string // Địa chỉ IP của khách hàng thực hiện giao dịch. Ví dụ: 13.160.92.202
  vnp_Locale: Locale // Ngôn ngữ giao diện hiển thị. Hiện tại hỗ trợ Tiếng Việt (vn), Tiếng Anh (en)
  vnp_OrderInfo: string //Thông tin mô tả nội dung thanh toán (Tiếng Việt, không dấu). Ví dụ: **Nap tien cho thue bao 0123456789. So tien 100,000 VND**
  vnp_OrderType: string // Mã danh mục hàng hóa. Mỗi hàng hóa sẽ thuộc một nhóm danh mục do VNPAY quy định. Xem thêm bảng Danh mục hàng hóa
  vnp_ReturnUrl: string // URL thông báo kết quả giao dịch khi Khách hàng kết thúc thanh toán. Ví dụ: https://domain.vn/VnPayReturn
  vnp_TxnRef: string // Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày. Ví dụ: 23554
  vnp_SecureHash: string // Mã kiểm tra (checksum) để đảm bảo dữ liệu của giao dịch không bị thay đổi trong quá trình chuyển từ merchant sang VNPAY. Việc tạo ra mã này phụ thuộc vào cấu hình của merchant và phiên bản api sử dụng. Phiên bản hiện tại hỗ trợ SHA256, HMACSHA512.
  constructor(data: Partial<CardPaymentRequest>) {}
}
