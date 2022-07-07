import React, {useState, useEffect} from "react";
import { Modal, Input, Alert, Button  } from 'vtex.styleguide'
import axios from "axios"

type Props = {
  accountName: string
  environment: string
  percentageDiscount: number
}

const DiscountPopup = ({accountName, environment, percentageDiscount}: Props) => {
  const [modal, setModal] = useState(false)
  const [modalAlert, setModalAlert] = useState({state: false, type: ""})
  const [email, setEmail] = useState("")
  const [error, setError] = useState({state:false, message: ""})
  const link = `https://${accountName}--${environment}.myvtex.com/api/dataentities/CL/search?email=${email}`

  useEffect(()=>{
    !localStorage.getItem("ingreso")
    ? setModal(!modal)
    : setModal(false)
  }, [])


  const handleChange = (element: {target:{value: string}}) => {
    setEmail(element.target.value)
  }
  const handleModal = () => {
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)){
    setModal(!modal)
    axios.get(link).then((res)=> {
      if(res.data.length > 0){
        setModalAlert({...modalAlert, state: true})
        localStorage.setItem("ingreso", "1")
      }else{
        localStorage.setItem("emailForDiscount", email)
        setModalAlert({state: true, type: "success"})
        localStorage.setItem("ingreso", "1")
    }
    })
  }else{
    setError({state: true, message: "Debe ser un correo válido"})
  }
  }

  const handleModalAlert = () => {
    setModalAlert({...modalAlert, state: false})
  }
  return(
    <>
    {
      modalAlert.type === "success"
      ? <Modal centered isOpen={modalAlert.state} onClose={handleModalAlert}>
        <Alert type="success">Felicidades, registrate para obtener tu descuento</Alert>
        </Modal>
      : <Modal centered isOpen={modalAlert.state} onClose={handleModalAlert}>
        <Alert type="warning">Ya estás registrado</Alert>
        </Modal>
    }
    <Modal centered isOpen={modal} onClose={()=> {
      setModal(!modal)
      localStorage.setItem("ingreso", "1")
      }}>
      <div>
        <h1>{percentageDiscount}% en tu primera compra</h1>
        <Input error={error.state} errorMessage={error.message} onChange={(element:{target:{value: string}}) => handleChange(element)} type="email" placeholder="Correo Electrónico"/>
        <div>
        <Button onClick={handleModal}>Enviar</Button>
        </div>
      </div>
    </Modal>
    </>
  )
}

export default DiscountPopup
