import LoginForm from "@/components/LoginForm";
import { useEffect, useState, useContext } from "react";
import Router from "next/router";
import AuthContext from '../context/AuthContext';
import Header from "../components/Header";

export default function LoginPage() {
  const { auth } = useContext(AuthContext);
  const [isCheckingForLoggedInUser, setIsCheckingForLoggedInUser] =
    useState(true);

  useEffect(() => {
    if (!auth.isLoggedOut) {
      Router.push('/');
    } else {
      setIsCheckingForLoggedInUser(false);
    }
  }, []);

  return (
    <>
      <Header />
      {isCheckingForLoggedInUser ? <div>Loading...</div> : <LoginForm />}
    </>
  );
}