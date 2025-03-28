import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import WOW from "wowjs";
import AOS from "aos";
import "aos/dist/aos.css";
import AppRouter from "./routes";
import { MetadataProvider } from "./Context/useMetadataContext";
import { Helmet } from "react-helmet";

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

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Teledental",
            url: "https://teledental.com/",
            description:
              "Experience seamless virtual dental care with TeleDental. Book online consultations for all your dental needs today!",
            image:
              "https://teledental.com/static/media/NewLogo.f770c6ff957c8e9bff1d.png",
            email: "service@teledental.com",
            address: {
              "@type": "Country",
              name: "United States",
            },
          })}
        </script>
      </Helmet>
      <MetadataProvider>
        <AppRouter />
      </MetadataProvider>
    </>
  );
}

export default App;
