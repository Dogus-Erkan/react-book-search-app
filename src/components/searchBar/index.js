import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBook } from "../../context/BooksContext";
const SearchBar = () => {
  const { setSearchBookName } = useBook();
  const [searchedBook, setSearchedBook] = useState();
  const navigate = useNavigate();

  // Form submit olduğunda çalışacak fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchBookName(searchedBook);
    localStorage.setItem("bookName", searchedBook);
    // Ana sayfaya yönlendirme yapıyoruz
    navigate("/");
  };

  // Input değiştiğinde çalışacak fonksiyon
  const handleChange = (e) => {
    setSearchedBook(e.target.value);
  };

  //Sayfa yüklendiğinde localStoragedan bookNamei okuyup searchedBook değerine atılır
  useEffect(() => {
    const storedBookName = localStorage.getItem("bookName");
    if (storedBookName) {
      setSearchedBook(storedBookName);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto max-[1279px]:pt-[22%]">
      <h1 className="mb-2 text-4xl font-extrabold md:text-6xl py-6 text-slate-50 uppercase text-center">
        Kİtap Arama Uygulaması
      </h1>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Ara
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            value={searchedBook || ""}
            onChange={handleChange}
            type="search"
            id="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Kitap Ara"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
