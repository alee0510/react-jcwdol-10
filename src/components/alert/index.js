export default function Alert ({
    title = "Alert",
    message = "",
    show = false,
    onClick = () => {}
}) {
    return (
        <div className={`h-full w-full flex align-middle justify-center absolute top-0 left-0 ${!show && "hidden"}`}>
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

// export default function Alert () {
//     return (
//         <div className="alert">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//             <span>we use cookies for no reason.</span>
//             <div>
//                 <button className="btn btn-sm">Deny</button>
//                 <button className="btn btn-sm btn-primary">Accept</button>
//             </div>
//         </div>
//     )
// }