import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import app from '../../services/firebase';
import 'firebase/database';
import { News } from '../index';
import './style.css';

const CoronaNews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  // const [perPage, setPerPage] = useState(10);
  const perPage = 10;
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [postData, setPostData] = useState([]);
  const renderedData =
    postData &&
    postData.map((pd) => {
      return <News data={pd} />;
    });

  // useEffect(() => {
  //   setIsLoading(true);
  //   const db = app.database().ref('news');
  //   db.on('value', (snapshot) => {
  //     const firebaseNews = snapshot.val();
  //     setNews(firebaseNews.data);
  //     setIsLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    const receivedData = () => {
      setIsLoading(true);
      const db = app.database().ref('news');
      db.on('value', (snapshot) => {
        const { data } = snapshot.val();
        const slice = data.slice(offset, offset + perPage);
        setPostData(slice);
        setPageCount(Math.ceil(data.length / perPage));
        setIsLoading(false);
      });
    };
    receivedData();
  }, [offset]);
  async function handlePageClick(e) {
    const selectedPage = e.selected;
    const newOffset = selectedPage * perPage;

    setCurrentPage(selectedPage);
    setOffset(newOffset);
  }

  return (
    <div>
      <ReactPaginate
        previousLabel="Prev"
        nextLabel="Next"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />

      {isLoading ? (
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">
            Loading...
            {currentPage}
          </span>
        </div>
      ) : (
        renderedData
      )}

      {/* <h2>data corona</h2>
      {news.map((e) => (
        <News data={e} />
      ))}
      {isLoading ? <p>loading</p> : <p>data</p>} */}
    </div>
  );
};

export default CoronaNews;
