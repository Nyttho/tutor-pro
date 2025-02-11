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
