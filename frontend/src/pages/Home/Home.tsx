import { useState, useEffect } from "react";
import "./Home.sass";
import { useHttp } from "../../hooks/useHttp";
import { CONSTANTS } from "../../config/constants";
import MyModal from "../../components/MyModal/MyModal";
import { errorImage, successImage } from "../../components/MyModal/Images";
import UrlsDataTable from "../../components/Datatables/UrlsDataTable";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useHttpErrors } from "../../hooks/useHttpErrors";

function Home() {
  const { post, get } = useHttp();
  const [modalTitle, setModalTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalImage, setModalImage] = useState("");
  const [modalShortUrl, setModalShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const { getErrorMessage } = useHttpErrors();

  const handlerSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const response = await post(CONSTANTS.url.create, { url });
      const shortened = `${CONSTANTS.url.host}/${response.shortened}`;
      setModalTitle('Shortened url created');
      setShowModal(true);
      setModalImage(successImage);
      setModalContent('');
      setModalShortUrl(shortened);
      await fetchData(`${CONSTANTS.url.getAllUrls}`);
    } catch (e) {
      setLoading(false);
      setModalTitle(CONSTANTS.messages.errorOnCreate);
      setShowModal(true);
      setModalImage(errorImage);
      setModalContent(CONSTANTS.messages.errorMessageOnCreate);
      setModalShortUrl('');
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchData(`${CONSTANTS.url.getAllUrls}`);
  }, []);

  const fetchData = async (url: string) => {
    try {
      const response = await get(url);
      setUrls(response);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setModalTitle(CONSTANTS.messages.errorOnGetAllUrls);
      setShowModal(true);
      setModalImage(errorImage);
      setModalContent(getErrorMessage(error.status));
    }
  };

  return (
    <>
      <Header />
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
              <input type="text" minLength={5} role='input-url' required onChange={(e) => setUrl(e.target.value)} className='form-control' min={5} value={url} id='url' name='url' placeholder='Type the url' />
              <label htmlFor="label" className='form-label'>Enter the URL to shorten</label>
            </div>

          </div>
          <div className="col-12 col-sm-3">
            <input type="submit" className='btn btn-primary' role='btn-submit' disabled={url.length < 5} value={'Create'} onClick={handlerSubmit} />
          </div>

          {loading &&
            <div className="col-12 mt-5 text-center">
              <div className="spinner-border" role="status"></div>
            </div>
          }

          {!loading && urls.length > 0 &&
            <div className="col-12 mt-5">
              <UrlsDataTable
                urls={urls}
              />
            </div>
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
