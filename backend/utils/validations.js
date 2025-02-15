/**
 * Validates whether a given email address is in the correct format.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns `true` if the email is valid; otherwise, `false`.
 */
export const emailValidator = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates whether a given postal code matches a specified city by querying the French government's address API.
 *
 * @param {string} postCode - The postal code to verify.
 * @param {string} city - The name of the city to verify.
 * @returns {Promise<boolean>} - Returns a promise that resolves to `true` if the postal code matches the city, otherwise `false`.
 * @throws {Error} - Throws an error if the API request fails or if the returned data is invalid.
 */
export const postCodeCityValidator = async (postCode, city) => {
  try {
    const url = `https://api-adresse.data.gouv.fr/search/?q=${city}`;
    const res = await fetch(url);
    const data = await res.json();
    const dataCp = data.features[0].properties.postcode;
    return dataCp === postCode;
  } catch (err) {
    console.error(err.message);
    throw new Error("Error validating the postal code and city.");
  }
};

/**
 * Validates a phone number using a regular expression.
 * The validated format is for French phone numbers, which can start with `0` or `+33`, followed by a 9-digit number.
 * Allowed separators between digit groups are space, dash, period, or underscore.
 *
 * @param {string} tel - The phone number to validate.
 * @returns {boolean} - Returns `true` if the phone number is valid, otherwise `false`.
 *
 * @example
 * validatePhoneNumber("0123456789"); // true
 * validatePhoneNumber("+33 1 23 45 67 89"); // true
 * validatePhoneNumber("01234-567-89"); // true
 * validatePhoneNumber("1234567890"); // false
 */
export function validateFrenchPhoneNumber(tel) {
  const regex = /^(?:\+33|0)[1-9](?:[ _.-]?\d{2}){4}$/;
  return regex.test(tel);
}

