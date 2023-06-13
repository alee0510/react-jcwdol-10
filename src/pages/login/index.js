import { Navigate, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Formik } from "formik"
import { login } from "../../store/slices/auth/slices"
import { loginValidationSchema } from "../../store/slices/auth/validation" 

function LoginPage () {
    // @hooks
    const dispatch = useDispatch()
    const navigate =  useNavigate()
    const { id, loading } = useSelector(state => {
        return {
            id : state.auth.id,
            loading : state.auth.isLoginLoading
        }
    })

    // @redirect
    if (id) {
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
                            loginValidationSchema.validateSync(values)
                            return {}
                        } catch (error) {
                            console.log("error", error?.message)
                            return { message : error?.message }
                        }
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(login(values))
                        setSubmitting(false)
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                            <input type="text" 
                                name="username" 
                                placeholder="Username"
                                className="input input-bordered w-full mb-10"
                                value={values.username} 
                                onChange={handleChange} 
                                onBlur={handleBlur}
                            />
                            <input type="password" 
                                name="password" 
                                placeholder="Password" 
                                className="input input-bordered w-full mb-10"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                errors.message && (
                                    <div className="alert alert-error mb-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>{errors.message}</span>
                                    </div>
                                )
                            }
                            <button type="submit" className="btn btn-secondary w-full" disabled={isSubmitting || loading}>
                                { isSubmitting || loading ?  <span className="loading loading-spinner"></span> : null }
                                Login
                            </button>
                            <h1 className="mt-5">Belum punya akun ? 
                                <a className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}> Register</a>
                            </h1>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LoginPage