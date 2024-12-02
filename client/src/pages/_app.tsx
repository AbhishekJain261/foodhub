import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/globals.css";
import Navbar from "@/components/dashboard/";
import Content from "@/components/content";

export default function App({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <div className="flex container">
        <div>
          <Navbar />
        </div>
        <div className="w-full">
          <Content />
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}
