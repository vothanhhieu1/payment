import crypto from 'crypto'
import _md5 from 'md5'
import { HashType } from '../constant'

export const hash = (data: string, hashSecret: string, type: string) => {
  switch(type) {
    case HashType.HASH_TYPE_MD5:
      return _md5(data)
    case HashType.HASH_TYPE_SHA256:
      const hash = crypto.createHash('sha256')
      return hash.update(data).digest('hex')
    case HashType.HASH_TYPE_SHA512:
      const hmacSHA512Crypto = crypto.createHmac('sha512', hashSecret)
      return hmacSHA512Crypto.update(Buffer.from(data, 'utf-8')).digest('hex')
    default:
      return ''
  }
}
