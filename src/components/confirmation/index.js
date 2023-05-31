export default function Confirmation ({
    message = "",
    show = false,
    onCancel = () => {},
    onConfirm = () => {}
}) {
    return (
        <div className="h-full w-full flex align-middle justify-center absolute top-0 left-0" hidden={!show}>
            <div className="h-full w-full absolute bg-slate-900 opacity-60"/>
            <div className="h-1/5 w-1/4 bg-white opacity-100 shadow rounded flex flex-col px-8 py-4 z-10 m-10">
                <h1 className="text-xl font-bold">Confirmation</h1>
                <h2 className="grow mt-2">{message}</h2>
                <div className="flex flex-row align-middle justify-end gap-2">
                    <button 
                        className="w-1/4 self-end py-2 rounded text-white uppercase shadow-sm active:scale-90 transition-all ease-in duration-200 bg-slate-400" 
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button 
                        className="w-1/4 self-end py-2 rounded text-white uppercase shadow-sm active:scale-90 transition-all ease-in duration-200 bg-sky-500" 
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}