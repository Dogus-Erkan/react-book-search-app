import React from "react";
import { useBook } from "../../context/BooksContext";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const { bookList, loading } = useBook();

  return (
    <div className="">
      <div className="flex flex-wrap justify-center mt-24 gap-6">
        {!loading ? (
          bookList ? (
            bookList.map((book) => (
              <div
                key={book.id}
                className="w-full p-2 md:w-1/2 lg:w-1/3 xl:w-1/4 cursor-pointer"
              >
                <Link
                  to={`/detail/${book.id}`}
                  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  {
                    <img
                      className="object-cover w-full rounded-t-lg h-80 md:h-80 md:w-48 md:rounded-none md:rounded-l-lg"
                      src={
                        book.volumeInfo.imageLinks
                          ? book.volumeInfo.imageLinks.thumbnail
                          : "https://via.placeholder.com/150"
                      }
                      alt={book.volumeInfo.title}
                    />
                  }
                  <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {book.volumeInfo.title}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {book.volumeInfo.authors?.join(", ")}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {book.volumeInfo.publishedDate}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <h1 className="flex text-5xl !content-normal">
              Böyle Bir Kitap Yok
            </h1>
          )
        ) : (
          <div className="flex text-5xl content-normal">
            <FaSpinner className="animate-spin mr-2 text-5xl" /> Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
