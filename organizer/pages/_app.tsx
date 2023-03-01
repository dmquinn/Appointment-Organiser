import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    //{" "}
  );
}

export default wrapper.withRedux(MyApp);
