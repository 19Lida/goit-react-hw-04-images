import { useState, useEffect } from 'react';
import { searchPosts } from 'services/API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import styles from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImgURL, setLargeImgURL] = useState('');
  useEffect(() => {
    if (!query) {
      return;
    }
    async function fetch() {
      try {
        setLoading(true);
        const data = await searchPosts(query, page);
        if (!query.trim() || !data.hits.length) {
          return alert(`No image with name ${query}`);
        }

        setImages(prev => [...prev, ...data.hits]);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, [query, page]);
  const onSubmitForm = data => {
    setQuery(data);
    setImages([]);
    setPage(1);
  };
  const onImageClick = data => {
    setLargeImgURL(data);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setLargeImgURL('');
  };
  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };
  return (
    <div className={styles.App}>
      <Searchbar onSubmit={onSubmitForm} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={onImageClick} />
      )}
      {images.length > 0 && !loading && <Button loadMore={loadMore} />}
      {loading && <Loader />}
      {showModal && (
        <Modal close={closeModal}>
          <img src={largeImgURL} alt="" />
        </Modal>
      )}
    </div>
  );
};
