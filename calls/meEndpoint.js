export async function meResponse() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = localStorage.getItem("authToken");
  if (token !== null) {
    options.headers["Authorization"] = token;
  }

  return await fetch("/api/me", options);
}

export async function meJson() {
  const response = await meResponse();
  return await response.json();
}
