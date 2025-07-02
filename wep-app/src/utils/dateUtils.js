/**
 * Utilidades para manejo de fechas
 */

/**
 * Compara dos fechas solo por fecha (ignorando la hora)
 * @param {Date|string} date1 - Primera fecha
 * @param {Date|string} date2 - Segunda fecha
 * @returns {number} -1 si date1 < date2, 0 si son iguales, 1 si date1 > date2
 */
export const compareDatesOnly = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  // Establecer hora a medianoche para comparación exacta
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  
  if (d1.getTime() < d2.getTime()) return -1;
  if (d1.getTime() > d2.getTime()) return 1;
  return 0;
};

/**
 * Verifica si una fecha es hoy
 * @param {Date|string} date - Fecha a verificar
 * @returns {boolean}
 */
export const isToday = (date) => {
  const today = new Date();
  return compareDatesOnly(date, today) === 0;
};

/**
 * Verifica si una fecha es futura (upcoming)
 * @param {Date|string} date - Fecha a verificar
 * @returns {boolean}
 */
export const isUpcoming = (date) => {
  const today = new Date();
  return compareDatesOnly(date, today) >= 0;
};

/**
 * Verifica si una fecha es pasada
 * @param {Date|string} date - Fecha a verificar
 * @returns {boolean}
 */
export const isPast = (date) => {
  const today = new Date();
  return compareDatesOnly(date, today) < 0;
};

/**
 * Convierte una fecha a formato string YYYY-MM-DD
 * @param {Date|string} date - Fecha a convertir
 * @returns {string}
 */
export const formatDateToString = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

/**
 * Convierte una fecha a formato de visualización
 * @param {Date|string} date - Fecha a convertir
 * @param {string} locale - Locale para el formato (default: 'en-GB')
 * @returns {string}
 */
export const formatDateForDisplay = (date, locale = 'en-GB') => {
  const d = new Date(date);
  return d.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  });
};
