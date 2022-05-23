import crypto from 'crypto'
import _md5 from 'md5'
import { HashType } from '../constant'

export const hash = (data: string, hashSecret?: string, type?: string) => {
  let result
  switch(type) {
    case HashType.HASH_TYPE_MD5:
      return _md5(data).toUpperCase()
    case HashType.HASH_TYPE_SHA256:
      result = crypto.createHash('sha256')
      return result.update(data).digest('hex')
    case HashType.HASH_TYPE_SHA512:
      if (hashSecret) {
        result = crypto.createHmac('sha512', hashSecret)
        return result.update(Buffer.from(data, 'utf-8')).digest('hex')
      }
      return ''
    default:
      return ''
  }
}
