import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getArticles, likeArticle } from "../../store/slices/blogs/slices"

import Navbar from "../../components/navbar"

// @local component
import RenderBlogCards from "./component.card"
import Pagination from "./component.pagination"

function BlogsPage () {
    // @state and hooks
    const dispatch = useDispatch()
    const { loading, currentPage, totalPage, articles } = useSelector(state => {
        return {
            loading : state.blogs.isLoading,
            articles : state.blogs.articles,
            currentPage : state.blogs.currentPage,
            totalPage : state.blogs.totalPage,
        }
    })

    // @side-effect
    useEffect(() => {
        dispatch(getArticles({ id_cat : 3, page : 1, sort : "ASC" }))
    }, [])

    // @event handler
    const onChangePagination = (type) => {
        dispatch(getArticles({ 
            id_cat : 3, 
            page : type === "prev" ? currentPage - 1 : currentPage + 1, 
            sort : "ASC" 
        }))
    }

    const onButtonLike = (id) => dispatch(likeArticle({ BlogId : id }))

    // @render loading
    if (loading) return (
        <div className="h-screen w-screen flex flex-row align-bottom justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    )

    return (
        <div className="w-full h-full px-40 py-10 flex flex-row flex-wrap gap-5 justify-between ">
            <Navbar />
            <RenderBlogCards articles={articles} onButtonLike={onButtonLike}/>
            <div className="flex flex-row w-full h-auto justify-end">
                <Pagination 
                    onChangePagination={onChangePagination}
                    disabledPrev={currentPage === 1}
                    disabledNext={currentPage >= totalPage}
                />
            </div>
        </div>
    )
}

export default BlogsPage