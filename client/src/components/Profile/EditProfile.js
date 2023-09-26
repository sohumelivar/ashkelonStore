import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import {observer} from 'mobx-react-lite'
import userStore from "../../store/userStore"
import Button from "react-bootstrap/esm/Button"
import { getUserProfileApi, saveChangesApi } from "../../api/userApi"


const EditProfile = observer(()=>{
  const navigate = useNavigate()

  useEffect(()=>{
    const getUser = async ()=>{
      await getUserProfileApi()
      setName(userStore.editProfile.name)
      setPhone(userStore.editProfile.phone)
    }
    getUser()
  },[])

  const [name,setName]=useState(userStore.editProfile.name || '')
  const [phone,setPhone]=useState(userStore.editProfile.phone || '')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]= useState("")
  const [img,setImg] =useState('')

  const saveChanges = async ()=>{
    try {
      if(password === confirmPassword){
        await saveChangesApi(name,phone,password,img)
        navigate("/profile")
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <div>Изменить профиль</div>
<div>
  <p>Введите Имя<input value={name} onChange={(e)=>setName(e.target.value)} type="text"/></p>
</div>
<div>
  <p>Введите Телефон<input value={phone} onChange={(e)=>setPhone(e.target.value)} type="text"/></p>
</div>
<div>
  <p>Введите пароль<input value={password} onChange={(e)=>setPassword(e.target.value)} type="password"/></p>
</div>
<div>
  <p>Подтвердите пароль<input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password"/></p>
</div>
<div>
  <p> Изменить аватар<input value={img} onChange={(e)=>setImg(e.target.files[0])} type="file"/></p>
</div>
<Button onClick={saveChanges}>Сохранить изменения</Button>
    </div>
  )
})

export default EditProfile
