import { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Alert from "../../components/alert"
import Confirmation from "../../components/confirmation"
import RenderTableRows from "./component.table.row"

// @hook and actions
import { deleteUser, addUser, editUser, searchUser, clearSearch, sorting } from "../../store/slices/users"

function HomePage () {
    const [id, setId] = useState(null)
    const [alert, setAlert] = useState({ show : false, message : "" })
    const [confirmation, setConfirmation] = useState({ show : false, actionType : null, message : "" })
    const [search, setSearch] = useState("")

    // @hooks and redux
    const dispatch = useDispatch()
    const { users, filteredUsers } = useSelector(state => {
        return {
            users : state.users?.data,
            filteredUsers : state.users?.filteredData
        }
    })

    // @input add new user's data
    const name = useRef(null)
    const address = useRef(null)
    const birthdate = useRef(null)
    const gender = useRef(null)
    const skills = useRef(null)

    // @input edit user's data
    const editedUserName = useRef(null)
    const editedUserAddress = useRef(null)
    const editedUserBirthdate = useRef(null)
    const editedUserGender = useRef(null)
    const editedUserSkills = useRef(null)

    const onButtonAdd = () => {
        // @validation => all fields are required
        if (!name.current.value) {
            setAlert({ show : true, message : "name is required!" })
            return
        }

        if (!address.current.value) {
            setAlert({ show : true, message : "address is required!" })
            return
        }

        if (!birthdate.current.value) {
            setAlert({ show : true, message : "birthdate is required!" })
            return
        }

        if (!skills.current.value) {
            setAlert({ show : true, message : "skills is required!" })
            return
        }

        // @validate => check if user's name already exist
        const isExist = users.some(user => user.name === name.current.value)
        if (isExist) {
            setAlert({ show : true, message : "user's name already exist!" })
            return
        }

        // @create new user
        const newUser = {
            id : users.length + 1,
            name : name.current?.value,
            address : address.current?.value,
            birthdate : birthdate.current?.value,
            gender : gender.current?.value,
            skills : skills.current?.value?.split(",")
        }

        // @set new user to users state
        dispatch(addUser(newUser))

        // @reset input fields
        name.current.value = ""
        address.current.value = ""
        birthdate.current.value = ""
        skills.current.value = ""
    }

    const onButtonCancel = () => {
        // @rest confirmation state and id
        setConfirmation({ show : false, actionType : null, message : "" })
        setId(null)
    }

    const onButtonConfirm = () => {
        if (confirmation.actionType === "DELETE") { 
            dispatch(deleteUser({ id }))
        }

        if (confirmation.actionType === "UPDATE") {
            dispatch(editUser({
                id,
                name : editedUserName.current?.value,
                address :editedUserAddress.current?.value,
                birthdate : editedUserBirthdate.current?.value,
                gender : editedUserGender.current?.value,
                skills : editedUserSkills.current?.value?.split(",")
            }))
        }

        // @reset id and confirmation state
        setId(null)
        setConfirmation({ show : false, actionType : null, message : "" })
    }

    const onClearSearch = () => {
        // guard
        if (!search) return

        dispatch(clearSearch())
        setSearch("")
    }

    const onSorting = (event) => {
        event?.preventDefault()
        dispatch(sorting(event?.target?.value))
    }

    // @side-effect -> debounce search
    useEffect(() => {
        // guard
        if (!search) return

        const timeoutID = setTimeout(() => {
            dispatch(searchUser(search))
        }, 800)

        return () => clearTimeout(timeoutID)
    }, [search])

    return (
        <div className="h-full w-full px-40 py-10 bg-neutral-50">
            <h1 className="mb-2 text-cyan-950 font-bold text-2xl">User's Table</h1>
            <h2 className="mb-4 text-cyan-950 font-bold">CRUD (Create, Read, Update, and Delete Operation)</h2>

            {/* @seacrbox */}
            <div className="w-full flex flex-row align-middle gap-2 my-2">
                <input value={search} 
                    type="text" 
                    placeholder="search by name" 
                    className="input input-bordered w-full" 
                    onChange={(event) => {
                        event?.preventDefault()
                        setSearch(event?.target?.value)
                    }}
                />
                <select className="select select-bordered w-full max-w-xs" 
                    onChange={onSorting}
                >
                    <option value="AZ">Sort Name A-Z</option>
                    <option value="ZA">Sort Name Z-A</option>
                </select>
                <button className="btn btn-square btn-secondary" onClick={onClearSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            {/* @table */}
            <table className="border-collapse border rounded border-slate-400 w-full overflow-hidden shadow-sm">
                <thead className="bg-slate-200 shadow-sm">
                    <tr>
                        <th className="border border-slate-300 text-center px-2">ID</th>
                        <th className="border border-slate-300 px-4 py-2">Name</th>
                        <th className="border border-slate-300 px-4 py-2">Gender</th>
                        <th className="border border-slate-300 px-4 py-2">Birthdate</th>
                        <th className="border border-slate-300 px-4 py-2">Address</th>
                        <th className="border border-slate-300 px-4 py-2">Skils</th>
                        <th className="border border-slate-300 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="h-10 overflow-hidden">
                    <RenderTableRows
                        users={filteredUsers.length ? filteredUsers : users}
                        id={id}
                        actionType={confirmation.actionType}
                        refEditedUserName={editedUserName}
                        refEditedUserAddress={editedUserAddress}
                        refEditedUserBirthdate={editedUserBirthdate}
                        refEditedUserGender={editedUserGender}
                        refEditedUserSkills={editedUserSkills}
                        onButtonCancel={() => setId(null)}
                        onButtonDelete={(id, name) => {
                            setId(id)
                            setConfirmation({ show : true, actionType : "DELETE", message : `Are you sure you want to delete ${name}?` })
                        }}
                        onButtonEdit={(id) => setId(id)}
                        onButtonSave={() => {
                            setConfirmation({ show : true, actionType : "UPDATE", message : `Are you sure you want to save?` })
                        }}
                    />
                </tbody>
            </table>

            {/* @new input */}
            <div className="w-full my-3 flex flex-row flex-wrap item-center justify-between gap-2">
                <input type="text" ref={name}
                    className="border border-slate-300 px-4 py-2 rounded-md grow" 
                    placeholder="user's name"
                />
                <select ref={gender}
                    className="border border-slate-300 px-2 py-2 rounded-md grow"
                >
                    <option>male</option>
                    <option>female</option>
                </select>
                <input type="date" ref={birthdate}
                    className="border border-slate-300 px-4 py-2 rounded-md grow"
                    placeholder="birthdate"
                />
                <input type="text" ref={address}
                    className="border border-slate-300 px-4 py-2 rounded-md grow"
                    placeholder="address"
                />
                <input type="text" ref={skills}
                    className="border border-slate-300 px-4 py-2 rounded-md grow"
                    placeholder="skills"
                />
                <button onClick={onButtonAdd}
                    className="btn btn-secondary w-full max-w-sm"
                >
                    Add
                </button>
            </div>
            {/* Alert */}
            <Alert show={alert.show} 
                message={alert.message} 
                onClick={() => setAlert({ show : false, message : "" })}
            />

            {/* @confirmation */}
            <Confirmation show={confirmation.show}
                message={confirmation.message}
                onCancel={onButtonCancel}
                onConfirm={onButtonConfirm}
            />
        </div>
    )
}

export default HomePage