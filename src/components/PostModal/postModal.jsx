import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import "./index.css"
import Layout from './../../layout/layout';
import { SavePost } from '../../api/Post';
import { toast } from 'react-toastify';

 function PostModal({isOpen,toggle}) {

    const checkPost= async(event)=>{
        event.preventDefault()
        const title = event.target[0].value
        const body = event.target[1].value
        const img = event.target[2].files[0]
        if (title === '' && body === ''){
            alert("Xato")
        }
        else {
            const titles = new FormData()
            titles.append("title",title)
            titles.append("description",body)
            titles.append("image",img)
            const data = await SavePost(titles)
            toast.success("Your Article was sent for review by Admin")
            toggle()
        }
    } 



  return (
    <div>
        <Layout>
        <Modal  toggle={toggle} isOpen={isOpen}>
                <ModalHeader>
                    Add Post
                </ModalHeader>
                <ModalBody>
                   <form onSubmit={checkPost} id={'user'} className={'form-control'}>
                    <input type="text" placeholder='Title' className={'form-control m-1'}  name='title'/>
                    <input type="text" placeholder='Body' className={'form-control m-1'} name='body'/>
                    <input type="file" accept="image/*" className={"btn btn-outline-warning btngetimage"} id={"upload"}/>
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
export default PostModal