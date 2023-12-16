import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import Layout from './../../layout/layout';



 function ForApplyModals({isOpen,toggle,phone_number,telegramlink}) {

   


  return (
    <div>
        <Layout>
        <Modal  toggle={toggle} isOpen={isOpen}>
                <ModalHeader>
                   Contacts
                </ModalHeader>
                <ModalBody>
                  <p>Phone Number:{phone_number}</p>
                  <p>Telegram:<a href={telegramlink}>{telegramlink}</a></p>
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-dark'} onClick={toggle}>close</button>
                </ModalFooter>
            </Modal>
            </Layout>
    </div>
    
  )
}
export default ForApplyModals