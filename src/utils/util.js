import axios from "axios";

export const customFetch = axios.create(
    {
        baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit"
    }
);

export const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user')) || null;
}

export const removeUserFromLocalStorage = () => {
    return localStorage.removeItem('user');
}

export const addUserToLocalStorage = user => {
    return localStorage.setItem('user', JSON.stringify(user));
}