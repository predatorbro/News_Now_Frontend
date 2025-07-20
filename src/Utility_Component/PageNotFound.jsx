function NotFoundPage({ status, title }) {
    const path = window.location.pathname
    return (
        <div className="min-h-[90vh] flex text-start justify-center flex-col items-center">
            <div>
                <h1 className="text-3xl font-bold text-[var(--primary)]">{status || "404"} - {title || "Page Not Found"}</h1>
                <h1 className="text-base  text-[var(--primary)]">Couldn't reach : {path}</h1>
            </div>
        </div>
    )
}


export default NotFoundPage;
