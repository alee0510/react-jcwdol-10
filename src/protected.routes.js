import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute ({
    children
}) {
    const { id } = useSelector(state => {
        return {
            id : state.auth.id
        }
    })
    return id ? children : <Navigate to="/login" replace/>
}