import { API } from "@/constants/Backend";
import axios from "axios";

const BASE_URL = API.BASE_URL;

/**
 * Register a new user
 * @param {Object} userData - User details
 * @returns {Promise} - Axios response
 */
export const register = async (userData: {
  nom: string;
  nomEtablissement: string;
  adresseMap: string;
  email: string;
  password: string;
  telephone: string;
  businessActivity: string;
  typeActeur: string;
}) => {
  try {
    console.log("Register URL:", `${BASE_URL}${API.REGISTER}`);
    const response = await axios.post(`${BASE_URL}${API.REGISTER}`, userData);
    return response;
} catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Registration error details:", {
        message: error.message,
        code: error.code,
        config: error.config,
        response: error.response
      });
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Axios response
 */
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}${API.LOGIN}`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
