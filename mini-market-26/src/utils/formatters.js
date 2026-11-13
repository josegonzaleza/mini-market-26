export const formatCRC = (amount) => `₡${Math.round(amount).toLocaleString('es-CR')}`

export const normalize = (text) =>
  text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
