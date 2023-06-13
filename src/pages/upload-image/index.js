import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useDropzone } from "react-dropzone"
import bgimage from "../../assets/image.svg"
import { updateImageProfile } from "../../store/slices/auth/slices"

export default function FormUploadImage () {
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()
    const { loading } = useSelector(state => {
        return {
            loading : state.auth.isUploadImageLoading
        }
    })

    // @event handler
    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles)
        setFile(acceptedFiles[0])
    }

    // @hooks
    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
        onDrop , 
        maxFiles: 1 , 
        accept : {'image/*' : [ ".jpg" , ".png" , ".jpeg" ]} ,
        noClick : true ,
        noKeyboard : true
    })

    // @another event handler
    const onButtonUpload = () => {
        // @create form data
        const formData = new FormData()
        formData.append('file', file)
        dispatch(updateImageProfile(formData))
        setFile(null)
    }

    return (
        <div className="w-full h-screen bg-grey flex justify-center items-center">
            <div className='flex flex-col h-[50vh] drop-shadow-lg p-5 justify-between bg-white w-4/5 md:w-2/6 sm:w-4/6 rounded-md'>
                <p className='text-center font-semibold text-lg md:text-xl mb-2'>Upload your image</p>
                <p className='text-center font-thin text-xs text-slate-400 mb-2'>File should be Jpeg , Png...</p>
                <div  {...getRootProps({ className :`md:h-52 sm:h-44 h-auto bg-light-grey ${!isDragActive ? 'border-light-blue' : 'border-lime-500'} border-2 border-dashed rounded-md`})}>
                    <input {...getInputProps({ name : 'image' })}/>
                    <img src={bgimage} className='max-w-1/3 mx-auto mt-4' />
                    <p className='text-slate-400 md:text-md text-center mt-4 text-sm'>Drag & Drop your image here</p>
                </div>
                <p className='text-center font-normal text-slate-400 text-md mt-2 mb-2'>Or</p>
                {
                    file ? 
                    <button className='text-white bg-lime-500 font-normal p-1 rounded-lg w-auto mx-auto px-4 py-2 text-md' onClick={onButtonUpload} disabled={loading}>
                        { loading ?  <span className="loading loading-spinner"></span> : null }
                        Upload
                    </button> 
                    :
                    <button onClick={open} className='text-white bg-sky-500 font-normal p-1 rounded-lg w-auto mx-auto px-4 py-2 text-md'>
                        Choose a file
                    </button>
                }
            </div>
        </div>
    )
}