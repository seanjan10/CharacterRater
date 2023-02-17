import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [errorLogin, setErrorLogin] = useState(null)
    const [isLoadingLogin, setIsLoadingLogin] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async ( username, password) => {
        setIsLoadingLogin(true)
        setErrorLogin(null)
        const response = await fetch('http://localhost:3500/users/login', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoadingLogin(false)
            setErrorLogin(json.error)
        }
        if (response.ok) {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoadingLogin(false)
        }

    }
    return { login, isLoadingLogin, errorLogin}
}