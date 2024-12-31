// validators.js
export const validators = {
    email: (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    },

    password: (value) => {
        return value.length >= 8 &&
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /[0-9]/.test(value);
    },

    phoneNumber: (value) => {
        const regex = /^\+?[\d\s-]{10,}$/;
        return regex.test(value);
    },

    url: (value) => {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    },
};