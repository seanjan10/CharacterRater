import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [errorSignup, setErrorSignup] = useState(null)
    const [isLoadingSignup, setIsLoadingSignup] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, username, password, roles) => {
        setIsLoadingSignup(true)
        setErrorSignup(null)
        roles = ["User"]
        const response = await fetch('http://localhost:3500/users', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, username, password, roles})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoadingSignup(false)
            setErrorSignup(json.error)
        }
        if (response.ok) {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoadingSignup(false)
        }

    }
    return { signup, isLoadingSignup, errorSignup}
}