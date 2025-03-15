import { useState, useEffect } from "react";
import "./Home.sass";
import { useHttp } from "../../hooks/useHttp";
import { CONSTANTS } from "../../config/constants";
import MyModal from "../../components/MyModal/MyModal";
import { errorImage } from "../../components/MyModal/Images";
import { FaRegCopy } from "react-icons/fa"; // Import copy icon

function Home() {
  const { post } = useHttp();
  const [modalTitle, setModalTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalImage, setModalImage] = useState("");
  const [url, setUrl] = useState("");
  const [urlShort, setUrlShort] = useState("");
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handlerSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const response = await post(CONSTANTS.url.create, { url });
      const shortened = `${CONSTANTS.url.host}/${response.shortened}`;
      setUrlShort(shortened);
    } catch (e) {
      setModalTitle(CONSTANTS.messages.errorLoadingFileTitle);
      setShowModal(true);
      setModalImage(errorImage);
      setModalContent(CONSTANTS.messages.errorLoadingFileContent);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(urlShort).then(() => {
      setCopied(true);
      setShowToast(true);
    });
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000); // Hide after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="Home container">
      <MyModal
        title={modalTitle}
        show={showModal}
        image={modalImage}
        onHide={() => setShowModal(false)}
      >
        {" "}
        {modalContent}{" "}
      </MyModal>

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

      <div className="row mt-5 justify-content-center form-container">
        <div className="col-12 col-sm-6">
          <div className='form-floating mb-3'>
            <input type="email" onChange={(e) => setUrl(e.target.value)} className='form-control' value={url} id='url' name='url' placeholder='Type the url' />
            <label htmlFor="label" className='form-label'>Url</label>
          </div>
          <div className="row">
            <div className="col-6 col-sm-3">
              <input type="submit" className='btn btn-primary' value={'Create'} onClick={handlerSubmit} />
            </div>
          </div>
          <div className="row mt-3 justify-content-end">
            {urlShort && (
              <div className="col-12 col-sm-6 offset-sm-3mt-2">
                <span onClick={handleCopy}>{urlShort} <FaRegCopy /></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
