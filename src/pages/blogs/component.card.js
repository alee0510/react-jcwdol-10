function BlogCard ({
    title = "",
    content = "",
    thumbnail = "",
}) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={process.env.REACT_APP_IMAGE_URL + thumbnail} alt="card-image" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{content}</p>
            </div>
        </div>
    )
}


export default function RenderBlogCards ({
    articles = [],
}) {
    return articles.map((article, index) => {
        return (
            <BlogCard key={article.id}
                title={article.title}
                content={article.content}
                thumbnail={article.imageURL}
            />
        )
    })
}