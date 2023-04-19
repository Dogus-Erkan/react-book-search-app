import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const BookContext = new createContext();

export const BookProvider = ({ children }) => {
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(false);
  const storedBookName = localStorage.getItem("bookName"); // Depolanan kitap adını al
  const [searchBookName, setSearchBookName] = useState();

  const values = {
    bookList,
    loading,
    setLoading,
    setBookList,
    searchBookName,
    setSearchBookName,
  };

  useEffect(() => {
    // Kitapları almak için asenkron bir fonksiyon oluştur
    const fetchBooks = async () => {
      setSearchBookName(storedBookName); // Aranan kitap adını depolanmış kitap adıyla ayarla
      try {
        setLoading(true); // Yükleniyor değerini true yap
        if (searchBookName) {
          // Aranan kitap adı varsa Google Books API den kitapları getir
          const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${searchBookName}`
          );
          setBookList(res.data.items); // Kitap listesini alınan kitaplarla ayarla
        }
      } catch (error) {
        console.error(error); // Hata varsa konsola yazdır
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [storedBookName, searchBookName]); // storedBookName ve searchBookName değiştiğinde useEffecti tekrar çağır

  return <BookContext.Provider value={values}>{children}</BookContext.Provider>;
};

export const useBook = () => useContext(BookContext);
