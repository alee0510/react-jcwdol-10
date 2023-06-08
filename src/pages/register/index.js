import { useRef } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Navigate } from "react-router-dom"
import { register } from "../../store/slices/auth/slices"

function RegisterPage () {
    // @ref
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const rePasswordRef = useRef()

    // @hooks
    const dispatch = useDispatch()
    const { token } = useSelector(state => {
        return {
            token : state.auth.token
        }
    })

    // @event handler
    const onButtonRegister = () => {
        dispatch(register({
            username : usernameRef.current?.value,
            email : emailRef.current?.value,
            password : passwordRef.current?.value,
            rePassword : rePasswordRef.current?.value
        }))
    }

    // @redirect
    if (token) return <Navigate to="/" replace/>

    return (
        <div className="w-full h-full bg-slate-200 flex flex-row justify-center items-center">
            <div className="w-1/3 h-1/2 bg-white shadow-sm rounded px-10 py-10 relative flex flex-col items-center">
                <h1 className="mb-10 w-full text-left text-4xl">Register</h1>
                <input ref={usernameRef} placeholder="Username" 
                    className="input input-bordered w-full mb-10"
                />
                <input ref={emailRef} placeholder="email" type="email"
                    className="input input-bordered w-full mb-5"
                />
                <input ref={passwordRef} placeholder="Password" type="password"
                    className="input input-bordered w-full mb-5"
                />
                <input ref={rePasswordRef} placeholder="Re-password" type="password"
                    className="input input-bordered w-full mb-5"
                />
                <button onClick={onButtonRegister}
                    className="btn btn-secondary absolute bottom-10 w-1/2"
                >
                    Register
                </button>
            </div>
        </div>
    )
}

export default RegisterPage