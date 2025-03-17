import './EditModal.sass'
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from 'react';
import { useHttp } from '../../hooks/useHttp';
import { CONSTANTS } from '../../config/constants';

interface Props {
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
  urlId: number;
}

const EditModal = (props: Props) => {

  const [showToast, setShowToast] = useState(false);
  const [shortened, setShortened] = useState('');
  const { update } = useHttp();

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(
        () => {
          setShowToast(false)
          props.onHide()
          window.location.reload();
        },
        1500
      );
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handlerSubmit = async (event: any) => {
    try {
      event.preventDefault();
      await update(`${CONSTANTS.url.updatedUrl}/${props.urlId}`, { shortened });
      setShowToast(true);
    } catch (e) {
      console.log(e);
      alert('Failed to update URL');
    }
  }

  return (
    <div className='myModal'>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header> <h3>Update shortened url</h3></Modal.Header>
        <Modal.Body>

          <form onSubmit={handlerSubmit}>
            <div className='form-floating mb-3'>
              <input type="text" minLength={5} required onChange={(e) => setShortened(e.target.value)} className='form-control' value={shortened} id='shortened' name='shortened' />
              <label htmlFor="label" className='form-label'>Enter new shortened url</label>
            </div>

            <div className="row justify-content-center">
              <div className="col-6 col-sm-3">
                <input type="submit" disabled={shortened.length < 5} className='btn btn-primary' value={'Update'} />
              </div>

            </div>
          </form>

          {showToast && (
            <div
              className="position-fixed top-50 start-50 translate-middle toast show"
              role="alert"
              style={{
                zIndex: 9999,
              }}
            >
              <div className="toast-body bg-success text-white p-3 rounded">
                ✅ Url updated
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default EditModal