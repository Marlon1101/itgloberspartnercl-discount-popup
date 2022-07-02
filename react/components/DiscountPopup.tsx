import React, {useState, useEffect} from "react";
import { Modal, Input  } from 'vtex.styleguide'

const DiscountPopup = () => {
  const [modal, setModal] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(()=>{
    setModal(!modal)
  }, [])


  const handleChange = (element: {target:{value: string}}) => {
    setEmail(element.target.value)
  }
  const handleModal = () => {
    setModal(!modal)
    console.log(email)
  }
  return(
    <>
    <Modal centered isOpen={modal} onClose={handleModal}>
      <div>
        <Input onChange={(element:{target:{value: string}}) => handleChange(element)} type="email" placeholder="Correo Electrónico"/>
      </div>
    </Modal>
    </>
  )
}

export default DiscountPopup
