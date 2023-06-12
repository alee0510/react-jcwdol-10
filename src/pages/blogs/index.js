import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getArticles } from "../../store/slices/blogs/slices"

function BlogsPage () {
    // @state and hooks
    const dispatch = useDispatch()

    // @side-effect
    useEffect(() => {
        dispatch(getArticles({ id_cat : 3, page : 1, sort : "ASC" }))
    }, [])
    return (
        <div></div>
    )
}

export default BlogsPage