import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyAccount } from '../../store/slices/auth/slices';

function VerificationPage () {
    // @hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isRegisterLoading, isVerified } = useSelector(state => {
        return {
            isRegisterLoading : state.auth.isRegisterLoading,
            isVerified : state.auth.isVerified
        }
    })

    useEffect(() => {
       dispatch(verifyAccount())
    }, [])

    // @loading handler
    if (isRegisterLoading) return (
        <div>Verifying...</div>
    )

    // @success handler
    if (isVerified) return (
        <h1 className="mt-5">Verification success, 
            <a className="text-blue-500 cursor-pointer" onClick={() => navigate("/")}> back to home</a>
        </h1>
    )

    console.log("isVerified", isVerified)
    return <div>Verification page</div>
}

export default VerificationPage;