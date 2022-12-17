import axios from "axios";
import { useState } from "react";

export const axiosInstance = axios.create({
  baseURL: "https://socialbook-api.onrender.com",
});

function getIntitalWindowWidth() {
  return window.innerWidth;
}

export default function useWidth() {
  const [windowWidth, setWindowWidth] = useState(getIntitalWindowWidth);

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  return windowWidth;
}
