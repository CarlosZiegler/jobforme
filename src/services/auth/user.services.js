import Router from 'next/router';
import api from "@services/Api";

export const userSignup = async (newUserData) => {
  try {
    const { data } = await api.post("/signup", newUserData);
    if (data?.hasOwnProperty('error')) {
      return data.error
    }
    return data
  } catch (error) {
    console.log(error)
    return { error }
  }
}

export const userLogin = async (email, password) => {
  try {
    const { data } = await api.post("/login", {
      email, password
    });
    if (data?.hasOwnProperty('error')) {
      return data.error
    }
    localStorage.clear()
    localStorage.setItem('token', data?.token)
    return true
  } catch (error) {
    console.log(error)
    return error
  }
}

export const userLogout = async () => {
  try {
    localStorage.clear()
    Router.push('/login')
  } catch (error) {
    console.log(error)
    return { error }
  }
}
