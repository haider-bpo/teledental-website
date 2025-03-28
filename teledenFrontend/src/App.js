import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import WOW from "wowjs";
import AOS from "aos";
import "aos/dist/aos.css";
import AppRouter from "./routes";

function App() {
  useEffect(() => {
    new WOW.WOW({
      live: false,
    }).init();

    AOS.init({
      duration: 200,
      easing: "ease-in-out",
      delay: 50,

      // offset: 400,
    });
  }, []);

  return <AppRouter />;
}

export default App;
