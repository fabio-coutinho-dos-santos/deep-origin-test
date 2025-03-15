import { FaRegCopy } from 'react-icons/fa';
import './MyModal.sass'
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from 'react';

interface Props {
  image: string;
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
  title: string;
  shortUrl?: string;
}

const MyModal = (props: Props) => {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setShowToast(true);
    });
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(
        () => {
          setShowToast(false)
          props.onHide()
        },
        2000
      );
      return () => clearTimeout(timer);
    }
  }, [showToast]);

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
            {props.shortUrl && <span onClick={() => handleCopy(props.shortUrl as string)}>{props.shortUrl} <FaRegCopy /></span>
            }
          </div>
          {showToast && (
            <div
              className="position-fixed top-50 start-50 translate-middle toast show"
              role="alert"
            >
              <div className="toast-body bg-success text-white p-3 rounded">
                ✅ Text copied successfully!
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button type='submit' onClick={() => { props.onHide() }} className='btn btn-outline-secondary'>Ok</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MyModal