import RouteComponents from "../components/RouteComponents";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <RouteComponents>
      {" "}
      <Component {...pageProps} />
    </RouteComponents>
  );
}

export default MyApp;
