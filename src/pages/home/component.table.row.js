const RenderTableRows = ({
    users = [],
    id = null,
    actionType = "",
    refEditedUserName = null,
    refEditedUserGender = null,
    refEditedUserBirthdate = null,
    refEditedUserAddress = null,
    refEditedUserSkills = null,
    onButtonEdit = (id) => {},
    onButtonDelete = (id, name)=> {},
    onButtonSave = () => {},
    onButtonCancel = () => {}
}) => users.map((user, index) => {
    if (user.id === id && actionType !== "DELETE") {
        return (
            <EditedRow key={index}
                user={user}
                refEditedUserName={refEditedUserName}
                refEditedUserGender={refEditedUserGender}
                refEditedUserBirthdate={refEditedUserBirthdate}
                refEditedUserAddress={refEditedUserAddress}
                refEditedUserSkills={refEditedUserSkills}
                onButtonSave={onButtonSave}
                onButtonCancel={onButtonCancel}
            />
        )
    } else {
        return (
            <NormalRow key={index}
                user={user} 
                onButtonEdit={onButtonEdit} 
                onButtonDelete={onButtonDelete}
            />
        )
    }
})

function NormalRow ({
    user = { id : null, name : "",  birthdate : "", address : "", skills : [] }, 
    onButtonEdit = (id) => {},
    onButtonDelete = (id, name) => {}
}) {
    return (
        <tr className="hover:bg-slate-100 hover:shadow capitalize">
            <td className="border border-slate-300 text-center py-2 ">{user.id}</td>
            <td className="border border-slate-300 px-2 py-2">{user.name}</td>
            <td className="border border-slate-300 px-2 py-2">{user.gender}</td>
            <td className="border border-slate-300 text-center py-2">{user.birthdate}</td>
            <td className="border border-slate-300 px-2 py-2">{user.address}</td>
            <td className="border border-slate-300 px-2 py-2">{user.skills?.join(", ")}</td>
            <td className="border border-slate-300 px-2 py-2 flex flex-row justify-between gap-2">
                <button className="py-1 rounded text-white bg-amber-500 grow shadow-sm active:scale-90 transition-all ease-in duration-200 capitalize"
                    onClick={() => onButtonEdit(user.id)}
                >
                    edit
                </button>
                <button className="py-1 rounded text-white bg-red-500 grow shadow-sm active:scale-90 transition-all ease-in duration-200 capitalize"
                    onClick={() => onButtonDelete(user.id, user.name)}
                >
                    delete
                </button>
            </td>
        </tr>
    )
}

function EditedRow ({
    user = { id : null, name : "",  birthdate : "", address : "", skills : [] },
    refEditedUserName = { current : null },
    refEditedUserGender = { current : null },
    refEditedUserBirthdate = { current : null },
    refEditedUserAddress = { current : null },
    refEditedUserSkills = { current : null },
    onButtonCancel = () => {},
    onButtonSave = () => {}
}) {
    return (
        <tr className="hover:bg-slate-100 hover:shadow capitalize">
            <td className="border border-slate-300 text-center py-2 ">{user.id}</td>
            <td className="border border-slate-300 px-2 py-2">
                <input type="text" ref={refEditedUserName}
                    defaultValue={refEditedUserName?.current?.value || user.name}
                    placeholder="user's name"
                    className="border border-slate-300 px-2 py-1 rounded-md w-full" 
                />
            </td>
            <td className="border border-slate-300 px-2 py-2">
                <select ref={refEditedUserGender}
                    className="border border-slate-300 px-2 py-1 rounded-md w-full"
                >
                    <option selected={refEditedUserGender?.current?.value === "Male" || user.gender === "Male"}>male</option>
                    <option selected={refEditedUserGender?.current?.value === "Female" || user.gender === "Female"}>female</option>
                </select>
            </td>
            <td className="border border-slate-300 text-center py-2">
                <input type="date" ref={refEditedUserBirthdate}
                    defaultValue={refEditedUserBirthdate?.current?.value || user.birthdate} 
                    placeholder="birthdate"
                    className="border border-slate-300 px-2 py-1 rounded-md w-full"
                />
            </td>
            <td className="border border-slate-300 px-2 py-2">
                <input type="text" ref={refEditedUserAddress}
                    defaultValue={refEditedUserAddress?.current?.value || user.address} 
                    placeholder="address"
                    className="border border-slate-300 px-2 py-1 rounded-md w-full"
                />
            </td>
            <td className="border border-slate-300 px-2 py-2">
                <input type="text" ref={refEditedUserSkills}
                    defaultValue={refEditedUserSkills?.current?.value || user.skills?.join(", ")} 
                    placeholder="skills"
                    className="border border-slate-300 px-2 py-1 rounded-md w-full"
                />
            </td>
            <td className="border h-full border-slate-300 px-2 py-2 flex flex-row justify-between gap-2">
                <button onClick={onButtonCancel}
                    className="py-1 rounded text-white bg-sky-500 grow shadow-sm active:scale-90 transition-all ease-in duration-200 capitalize"
                >
                    cancel
                </button>
                <button onClick={onButtonSave}
                    className="py-1 rounded text-white bg-green-500 grow shadow-sm active:scale-90 transition-all ease-in duration-200 capitalize"
                >
                    save
                </button>
            </td>
        </tr>
    )
}

export default RenderTableRows