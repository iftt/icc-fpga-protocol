import crypto from 'crypto'

export function seedGenerator (length: number = 81) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
  let key = ''

  while (key.length < length) {
    let byte = crypto.randomBytes(1)
    if (byte[0] < 243) { key += charset.charAt(byte[0] % 27) }
  }
  return key
}

export default {
  seedGenerator
}
