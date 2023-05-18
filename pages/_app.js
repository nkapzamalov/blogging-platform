import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import AuthContext from '../context/AuthContext';
import { useEffect, useState } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState({
    user: null,
    accessToken: null,
    isLoggedOut: true,
  });

  const logIn = (user, accessToken) => {
    setAuth({
      user,
      accessToken,
      isLoggedOut: false,
    });
  };

  const logOut = () => {
    setAuth({
      user: null,
      accessToken: null,
      isLoggedOut: true,
    });
  };

  useEffect(() => {
    const getResponse = async () => {
      const accessToken = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('authUser'));
      if (accessToken !== null && user !== null) {
        logIn(user, accessToken);
      } else {
        logOut();
      }
    };
    getResponse();

  }, []);

  return (
    <main className={`${inter.variable} font-sans`}>
      <AuthContext.Provider value={{ auth, logIn, logOut }}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </main>
  );
}