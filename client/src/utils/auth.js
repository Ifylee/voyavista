// client/src/utils/auth.js

import decode from 'jwt-decode';

class AuthService {
  // Retrieve the token from local storage
    getToken() {
        return localStorage.getItem('id_token');
    }

    // Decode the token to get the user information
    getProfile() {
        return decode(this.getToken());
    }

    // Check if the user is logged in by verifying the token
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // Check if the token is expired
    isTokenExpired(token) {
        try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
            return true;
        } else {
            return false;
        }
        } catch (err) {
        return false;
        }
    }

    // Save the token to local storage
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        // window.location.assign('/');
    }

    // Remove the token from local storage
    logout() {
        localStorage.removeItem('id_token');
    }
}

export default new AuthService();