export class VNPayCardPaymentConfirm {
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
  constructor(data: Partial<VNPayCardPaymentConfirm>) {}
}
