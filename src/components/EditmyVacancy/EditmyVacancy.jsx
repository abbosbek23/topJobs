import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import Layout from './../../layout/layout';
import { toast } from 'react-toastify';
import { editMyVacancy } from '../../api/Userdata';


 function EditVacancy({isOpen,toggle,currentItem}) {

   
   
 

    const onsubmit= async(event)=>{
        event.preventDefault()
        const company = event.target[0].value;
        const job = event.target[1].value;
        const experience = event.target[2].value;
        const working_time = event.target[3].value;
        const address = event.target[4].value;
        const phone_number = event.target[5].value;
        const tg_link = event.target[6].value;
        const salary = event.target[7].value;
        const requirements = event.target[8].value;
        const conditions = event.target[9].value;    
        if(company === ""){
           toast.error("Ma'lumot to'liq emas")
        }
        else {
            const titles = new FormData()
            titles.append("company",company)
            titles.append("job",job)
            titles.append("experience",experience)
            titles.append("working_time",working_time)
            titles.append("address",address)
            titles.append("phone_number",phone_number)
            titles.append("tg_link",tg_link)
            titles.append("salary",salary)
            titles.append("requirements",requirements)
            titles.append("conditions",conditions)
            const {data} = await editMyVacancy(+currentItem.id,titles)
           
            toggle(false)
        }
    } 


   
  return (
    <div>
        <Layout>
        <Modal  toggle={toggle} isOpen={isOpen}>
                <ModalHeader>
                   Edit Vacancy
                </ModalHeader>
                <ModalBody>
                   <form onSubmit={onsubmit} id={'user'} className={'form-control'}>
                    <input type="text" defaultValue={currentItem.company} className={'form-control m-1'} name='title'/>
                    <input type="text" defaultValue={currentItem.job} className={'form-control m-1'}  name='body'/>
                    <input type="text" defaultValue={currentItem.experience} className={'form-control m-1'}  name='body'/>
                    <input type="text" defaultValue={currentItem.working_time}  className={'form-control m-1'}  name='body'/>
                    <input type="text" defaultValue={currentItem.address}  className={'form-control m-1'}  name='body'/>
                    <input type="text" defaultValue={currentItem.phone_number}  className={'form-control m-1'}  name='body'/>
                    <input type="text" defaultValue={currentItem.tg_link}  className={'form-control m-1'}  name='body'/>
                    <input type="text" defaultValue={currentItem.salary}  className={'form-control m-1'}  name='body'/>
                    <input type="text" defaultValue={currentItem.requirements} className={'form-control m-1'}  name='body'/>
                    <input type="text" defaultValue={currentItem.conditions}  className={'form-control m-1'}  name='body'/>
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
export default EditVacancy