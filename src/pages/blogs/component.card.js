function BlogCard ({
    title = "",
    content = "",
    thumbnail = "",
    onClick = (id) => {},
}) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={process.env.REACT_APP_IMAGE_URL + thumbnail} alt="card-image" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{content}</p>
                <button className="btn" onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Like
                </button>
            </div>
        </div>
    )
}


export default function RenderBlogCards ({
    articles = [],
    onButtonLike = (id) => {},
}) {
    return articles.map((article, index) => {
        return (
            <BlogCard key={article.id}
                title={article.title}
                content={article.content}
                thumbnail={article.imageURL}
                onClick={() => onButtonLike(article.id)}
            />
        )
    })
}