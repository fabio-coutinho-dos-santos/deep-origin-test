import './MyModal.sass'
import Modal from "react-bootstrap/Modal";

interface Props {
  image: string;
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
  title: string;
}

const MyModal = (props: Props) => {
  return (
    <div className='myModal'>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header> <h3>{props.title}</h3></Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-center mb-5'>
            <img className='img-fluid' src={props.image} alt="" width={'80%'} />
          </div>
          <div className="text-center">
            <h6>{props.children}</h6>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type='submit' onClick={() => { props.onHide() }} className='btn btn-outline-secondary'>Ok</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MyModal