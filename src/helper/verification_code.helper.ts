export function generateVerifyCode(): string {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return code;
}

export function getExpirationDate(): Date {
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 5);
  return expirationDate;
}
