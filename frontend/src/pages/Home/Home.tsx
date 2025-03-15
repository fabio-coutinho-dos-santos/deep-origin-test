import { useState, useEffect } from "react";
import "./Home.sass";
import { useHttp } from "../../hooks/useHttp";
import { CONSTANTS } from "../../config/constants";
import MyModal from "../../components/MyModal/MyModal";
import { errorImage, successImage } from "../../components/MyModal/Images";
import { FaRegCopy } from "react-icons/fa"; // Import copy icon
import UrlsDataTable from "../../components/Datatables/UrlsDataTable";

function Home() {
  const { post, get } = useHttp();
  const [modalTitle, setModalTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalImage, setModalImage] = useState("");
  const [modalShortUrl, setModalShortUrl] = useState("");
  const [url, setUrl] = useState("");
  const [urlShort, setUrlShort] = useState("");
  const [urls, setUrls] = useState([]);

  const handlerSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const response = await post(CONSTANTS.url.create, { url, userId: '1' });
      const shortened = `${CONSTANTS.url.host}/${response.shortened}`;
      setUrlShort(shortened);
      setModalTitle('Shortened url created');
      setShowModal(true);
      setModalImage(successImage);
      setModalContent('');
      setModalShortUrl(shortened);
      await fetchData(`${CONSTANTS.url.getAllUrls}`);
    } catch (e) {
      setModalTitle(CONSTANTS.messages.errorOnCreate);
      setShowModal(true);
      setModalImage(errorImage);
      setModalContent(CONSTANTS.messages.errorMessageOnCreate);
    }
  }

  useEffect(() => {
    fetchData(`${CONSTANTS.url.getAllUrls}`);
  }, []);

  const fetchData = async (url: string) => {
    try {
      const response = await get(url);
      setUrls(response);
    } catch (error) {
      setModalTitle(CONSTANTS.messages.errorOnGetAllUrls);
      setShowModal(true);
      setModalImage(errorImage);
      setModalContent('');
    }
  };

  return (
    <div className="Home container">
      <MyModal
        title={modalTitle}
        show={showModal}
        image={modalImage}
        shortUrl={modalShortUrl}
        onHide={() => setShowModal(false)}
      >
        {" "}
        {modalContent}{" "}
      </MyModal>

      <div className="row mt-5 justify-content-center form-container">
        <div className="col-12 col-sm-9">
          <div className='form-floating mb-3'>
            <input type="text" onChange={(e) => setUrl(e.target.value)} className='form-control' min={5} value={url} id='url' name='url' placeholder='Type the url' />
            <label htmlFor="label" className='form-label'>Create shortened url</label>
          </div>


          {/* <div className="row">
            <div className="col-6 col-sm-3">
              <input type="submit" className='btn btn-primary' value={'Create'} onClick={handlerSubmit} />
            </div>
            {urlShort && (
              <div className="col-12 col-sm-6 offset-sm-3 text-sm-end mt-2">
                <span onClick={handleCopy}>{urlShort} <FaRegCopy /></span>
              </div>
            )}
          </div> */}
        </div>
        <div className="col-12 col-sm-3 mt-3">
          <input type="submit" className='btn btn-primary' value={'Create'} onClick={handlerSubmit} />
        </div>

        <div className="col-12 mt-5">
          <UrlsDataTable
            urls={urls}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
