import { customAlphabet } from 'nanoid'

const alphaNumeric = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 4)

export function generateGiftCode() {
  return `BONA-${alphaNumeric()}`
}
