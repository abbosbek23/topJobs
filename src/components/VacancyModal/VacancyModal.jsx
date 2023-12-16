import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import "./index.css"
import Layout from './../../layout/layout';

import { toast } from 'react-toastify';
import { SaveVacancy } from '../../api/Vacancy';
import "./index.css"

function VacancyModal({isOpen,toggle}) {

    const checkVacancy= async(event)=>{
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
        if (company === ''){
            alert("Xato")
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
            const data = await SaveVacancy(titles)
            toast.success("Add New Vacancy")
            toggle()
        }
    } 



  return (
    <div>
        <Layout>
        <Modal  toggle={toggle} isOpen={isOpen}>
                <ModalHeader>
                    Add Vacancy
                </ModalHeader>
                <ModalBody>
                   <form onSubmit={checkVacancy} id={'user'} className={'form-control'}>
                    <input type="text"  placeholder='Company' className={'form-control m-1'}  name='company'/>
                    <input type="text" placeholder='Job' className={'form-control m-1'} name='job'/>
                    <input type="text" placeholder='experience' className={'form-control m-1'} name='experience'/>
                    <input type="text" placeholder='working_time' className={'form-control m-1'} name='working_time'/>
                    <input type="text" placeholder='address ' className={'form-control m-1'} name='address '/>
                    <input type="text" placeholder='phone_number' className={'form-control m-1'} name='phone_number'/>
                    <input type="text"  placeholder='tg_link' className={'form-control m-1'} name='tg_link'/>
                    <input type="text" placeholder='salary' className={'form-control m-1'} name='salary'/>
                    <input type="text" placeholder='requirements' className={'form-control m-1'} name='requirements'/>
                    <input type="text" placeholder='conditions' className={'form-control m-1'} name='conditions'/>
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
export default VacancyModal;