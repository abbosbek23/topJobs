import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import "./index.css"
import Layout from './../../layout/layout';
import { toast } from 'react-toastify';
import { editMyArticle } from '../../api/Userdata';


 function EditArticles({isOpen,toggle,currentItem}) {

   
   
 

    const onsubmit= async(event)=>{
        event.preventDefault()
        const title = event.target[0].value;
        const body = event.target[1].value;
        const img = event.target[2].files[0]       
        if(title === ""){
           toast.error("Ma'lumot to'liq emas")
        }
        else {
            const titles = new FormData()
            titles.append("title",title)
            titles.append("description",body)
            titles.append("image",img)
            titles.append("id",+currentItem.id)
            const {data} = await editMyArticle(+currentItem.id,titles)
            toggle(false)
        }
    } 


   
  return (
    <div>
        <Layout>
        <Modal  toggle={toggle} isOpen={isOpen}>
                <ModalHeader>
                    Edit Article
                </ModalHeader>
                <ModalBody>
                   <form onSubmit={onsubmit} id={'user'} className={'form-control'}>
                    <input type="text" defaultValue={currentItem.title}  placeholder='Title' className={'form-control m-1'} name='title'/>
                    <input type="text" defaultValue={currentItem.description} placeholder='Body'  className={'form-control m-1'}  name='body'/>
                    <input type="file" accept="image/*" className={"btn btn-outline-warning btngetimage"}  id={"upload"}/>
                       <label htmlFor="upload" className={"btn btn-outline-warning mx-1"}>Upload Image</label>
                   </form>
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-dark'} type={"submit"} form={'user'}>save</button>
                    <button className={'btn btn-dark'} onClick={toggle}>close</button>
                </ModalFooter>
            </Modal>
            </Layout>
          
    </div>
    
  )
}
export default EditArticles