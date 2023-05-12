import LoginForm from "@/components/LoginForm";
import { meResponse } from "../calls/meEndpoint";
import { useEffect, useState } from "react";
import Router from "next/router";

export default function LoginPage() {
  const [isCheckingForLoggedInUser, setIsCheckingForLoggedInUser] =
    useState(true);

  useEffect(() => {
    async function getResponse() {
      const res = await meResponse();
      if (res.status == 200) {
        return Router.push("/");
      }
      setIsCheckingForLoggedInUser(false);
    }
    getResponse();
  }, []);

  return (
    <section>
      {isCheckingForLoggedInUser ? <div>Loading...</div> : <LoginForm />}
    </section>
  );
}