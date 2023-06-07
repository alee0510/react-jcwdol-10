import { useRef } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/slices/auth"

function LoginPage () {
    // @hooks
    const dispatch = useDispatch()
    const { token, loading } = useSelector(state => {
        return {
            token : state.auth.token,
            loading : state.auth.loading
        }
    })

    // @ref
    const usernameRef = useRef()
    const passwordRef = useRef()

    // @event handler
    const onButtonLogin = () => {
        const username = usernameRef.current.value
        const password = passwordRef.current.value

        dispatch(login({ username, password }))
    }

    // @redirect
    if (token) {
        return <Navigate to="/" replace/>
    }

    return (
        <div className="w-full h-full bg-slate-200 flex flex-row justify-center items-center">
            <div className="w-1/3 h-1/2 bg-white shadow-sm rounded px-10 py-10 relative flex flex-col items-center">
                <h1 className="mb-10 w-full text-left text-4xl">Login</h1>
                <input ref={usernameRef} placeholder="Username" 
                    className="input input-bordered w-full mb-10"
                />
                <input ref={passwordRef} placeholder="Password" type="password"
                    className="input input-bordered w-full mb-10"
                />
                <button onClick={onButtonLogin}
                    className="btn btn-secondary absolute bottom-10 w-1/2"
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default LoginPage