import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function VerificationPage () {
    const location = useLocation();

    console.log('VerificationPage', location.pathname);

    useEffect(() => {
        // @request verification
        // dispatch(verification(token))
    }, [])

    return (
        <div>Redirect to home...</div>
    )
}

export default VerificationPage;