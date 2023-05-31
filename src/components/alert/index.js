export default function Alert ({
    title = "Alert",
    message = "",
    show = false,
    onClick = () => {}
}) {
    return (
        <div className="h-full w-full flex align-middle justify-center absolute top-0 left-0" hidden={!show}>
            <div className="h-full w-full absolute bg-slate-900 opacity-60"/>
            <div className="h-1/5 w-1/4 bg-white opacity-100 shadow rounded flex flex-col px-8 py-4 z-10 m-10">
                <h1 className="text-xl font-bold">{title}</h1>
                <h2 className="grow mt-2">{message}</h2>
                <button className="w-1/4 self-end bg-sky-500 px-10 py-2 rounded text-white uppercase shadow-sm active:scale-90 transition-all ease-in duration-200" onClick={onClick}>
                    ok
                </button>
            </div>
        </div>
    )
}