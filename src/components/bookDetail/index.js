import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBook } from "../../context/BooksContext";
import { FaSpinner } from "react-icons/fa";

const BookDetail = () => {
  const [bookDetail, setBookDetail] = useState({});
  const { loading, setLoading } = useBook();
  const { id } = useParams();

  // useEffect kullanarak kitap detaylarını alır
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        await axios(`https://www.googleapis.com/books/v1/volumes/${id}`).then(
          (res) => {
            setBookDetail(res.data); // Kitap detaylarını alınan verilerle set eder
          }
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, setLoading]); // id ve setLoading değiştiğinde useEffecti tekrar çağır

  return (
    // Kitap detaylarını ekrana yazdır
    <div className="text-gray-100 min-h-screen w-screen flex flex-col mt-10 items-center">
      {console.log(bookDetail)}

      {!loading ? (
        bookDetail && bookDetail.volumeInfo ? (
          <div className="bg-gray-900 p-6 rounded-md shadow-lg w-9/12">
            <a
              className="bg-slate-100 p-4 rounded text-gray-900 hover:text-gray-600 hover:bg-slate-200"
              href="/"
            >
              Geri
            </a>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-6">
              <div className="flex-shrink-0">
                <img
                  src={
                    bookDetail.volumeInfo.imageLinks
                      ? bookDetail.volumeInfo.imageLinks.thumbnail
                      : "https://via.placeholder.com/150"
                  }
                  alt={bookDetail.volumeInfo.title}
                  className="w-72 h-96 rounded-md shadow-lg object-contain"
                />
              </div>
              <div className="flex-1 flex flex-col gap-y-4 text-center md:text-left">
                <h2 className="text-4xl font-bold">
                  {bookDetail.volumeInfo.title}
                </h2>
                <p className="text-gray-400 text-xl font-medium">
                  {bookDetail.volumeInfo.authors
                    ? bookDetail.volumeInfo.authors.join(", ")
                    : "Yazar Bilgisi Yok"}
                </p>
                <p className="text-lg leading-relaxed">
                  {bookDetail.volumeInfo.description}
                </p>
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div className="text-gray-400">
                    <p className="font-bold">Çıkış Tarihi</p>
                    <p>
                      {bookDetail.volumeInfo.publishedDate
                        ? bookDetail.volumeInfo.publishedDate
                        : "Çıkış Tarihi Yok"}
                    </p>
                  </div>
                  <div className="text-gray-400">
                    <p className="font-bold">Yayıncı</p>
                    <p>
                      {bookDetail.volumeInfo.publisher
                        ? bookDetail.volumeInfo.publisher
                        : "Yayıncı Yok"}
                    </p>
                  </div>
                  <div className="text-gray-400">
                    <p className="font-bold">Puan</p>
                    <p>
                      {bookDetail.volumeInfo.averageRating
                        ? bookDetail.volumeInfo.averageRating
                        : "Puanı Yok"}
                    </p>
                  </div>
                  <div className="text-gray-400">
                    <p className="font-bold">Sayfa Sayısı</p>
                    <p>
                      {bookDetail.volumeInfo.pageCount
                        ? bookDetail.volumeInfo.pageCount
                        : "Sayfa Sayısı Yok"}
                    </p>
                  </div>
                  <div className="text-gray-400">
                    <p className="font-bold">Barkot</p>
                    <p>
                      {bookDetail.volumeInfo.industryIdentifiers
                        ? bookDetail.volumeInfo.industryIdentifiers[1]
                          ? "ISBN 13: " +
                            bookDetail.volumeInfo.industryIdentifiers[1]
                              .identifier
                          : "ISBN 10: " +
                            bookDetail.volumeInfo.industryIdentifiers[0]
                              .identifier
                        : "Barkot Bilgisi Yok"}
                    </p>
                  </div>
                  <div className="text-gray-400">
                    <p className="font-bold">Ebat</p>
                    <p>
                      {bookDetail.volumeInfo.dimensions &&
                      bookDetail.volumeInfo.dimensions.height &&
                      bookDetail.volumeInfo.dimensions.width
                        ? bookDetail.volumeInfo.dimensions.height +
                          " x " +
                          bookDetail.volumeInfo.dimensions.width
                        : "Ebat Bilgisi Yok"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <a
              href={bookDetail.volumeInfo.previewLink}
              className="text-gray-900 bg-slate-100 p-3 mt-5 uppercase flex justify-center hover:text-gray-400 hover:bg-slate-200"
            >
              İncele
            </a>
          </div>
        ) : (
          <div className="text-gray-900 min-h-screen w-screen text-5xl flex flex-col mt-10 items-center">
            <p>Böyle bir kitap detayı yok.</p>
            <a
              href="/"
              className="flex items-center space-x-2 mt-5 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded transition duration-150"
              title="Return Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Anasayfaya Dön</span>
            </a>
          </div>
        )
      ) : (
        <div className="flex text-gray-900 text-5xl content-normal">
          <FaSpinner className=" animate-spin mr-2 text-5xl" /> Loading...
        </div>
      )}
    </div>
  );
};

export default BookDetail;
