import axios from "axios";
import { useState } from "react";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/connect/",
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
