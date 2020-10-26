import App, { Container } from "next/app";
import { Provider } from "react-redux";
import Link from "next/link";
import Router from "next/router";

import axios from "axios";
import "antd/dist/antd.css";

import Layout from "../component/Layout";
import WithReduxApp from "../lib/with-redux";
import PageLoading from "../component/PageLoading";

class MyApp extends App {
  state = {
    context: "value",
    loading: false,
  };

  startLoading = () => {
    this.setState({
      loading: true,
    });
  };

  stopLoding = () => {
    this.setState({
      loading: false,
    });
  };

  componentDidMount() {
    Router.events.on("routeChangeStart", this.startLoading);
    Router.events.on("routeChangeComplete", this.stopLoding);
    Router.events.on("routeChangeError", this.stopLoding);
  }

  componentWillUnmount() {
    Router.events.off("routeChangeStart", this.startLoading);
    Router.events.off("routeChangeComplete", this.stopLoding);
    Router.events.off("routeChangeError", this.stopLoding);
  }

  static async getInitialProps(ctx) {
    // console.log("_app.getInitialProps");
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
    // console.log("in _app render", reduxStore.getState());

    return (
      <Container>
        <Provider store={reduxStore}>
          {this.state.loading ? <PageLoading /> : null}
          <Layout>
            <Link href="/">
              <a>Index</a>
            </Link>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default WithReduxApp(MyApp);
