import App, { Container } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import "antd/dist/antd.css";


import WithReduxApp from "../lib/with-redux";

class MyApp extends App {
  state = {
    context: "value",
  };
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
    };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default WithReduxApp(MyApp);
