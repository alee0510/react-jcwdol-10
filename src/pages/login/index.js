import { useRef } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Formik } from "formik"
import { login } from "../../store/slices/auth"
import { registerValidationSchema } from "../../store/slices/auth/validation" 

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
                <Formik 
                    initialValues={{ username : "", password: "" }}
                    validate={values => {
                        try {
                            registerValidationSchema.validateSync(values)
                            return {}
                        } catch (error) {
                            console.log("error", error?.message)
                            return { message : error?.message }
                        }
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch.login(values)
                        setSubmitting(false)
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit} className="w-full">
                            <input type="text" 
                                name="username" 
                                placeholder="Username"
                                className="input input-bordered w-full max-w-xs"
                                value={values.username} 
                                onChange={handleChange} 
                                onBlur={handleBlur}
                            />
                            <input type="password" 
                                name="password" 
                                placeholder="Password" 
                                className="input input-bordered w-full max-w-xs"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                errors.message && (
                                    <div className="alert alert-error">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>{errors.message}</span>
                                    </div>
                                )
                            }
                            <button type="submit" className="btn btn-secondary" disabled={isSubmitting}>
                                Login
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LoginPage