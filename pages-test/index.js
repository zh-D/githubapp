import { Button } from "antd";
import Link from "next/link";
import Router from "next/router";
import "../test.css";
import { connect } from "react-redux";
import { add, updateName, addAsync } from "../actions";
import getConfig from "next/config";
import { useEffect } from "react";
import axios from "axios";

const { publicRuntimeConfig } = getConfig();

const Index = ({ count, username, add, updateName, addAsync }) => {
  function gotoTestB() {
    Router.push(
      {
        pathname: "/b",
        query: {
          id: 2,
        },
      },
      "/b"
    );
  }
  useEffect(() => {
    axios.get("/api/user/info").then((resp) => console.log(resp));
  }, []);
  return (
    <>
      <Link href="./a?id=1" as="/a/1">
        <Button>test a{count}</Button>
      </Link>
      <Button onClick={gotoTestB}>test b</Button>
      <br />
      <span>Count: {count}</span>
      <br />
      <span>UserName:{username}</span>
      <br />
      <input value={username} onChange={(e) => updateName(e.target.value)} />
      <br />
      <button onClick={() => add(3)}>add 3</button>
      <button onClick={() => addAsync(5)}>add 5</button>
      <br />
      <a href={publicRuntimeConfig.OAUTH_URL}>去登陆</a>
    </>
  );
};
Index.getInitialProps = async ({ reduxStore }) => {
  reduxStore.dispatch(add(3));
  return {};
};

function mapStateToProps(state) {
  console.log(state.reducer);
  return {
    count: state.reducer.count,
    username: state.userReducer.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    add: (num) => dispatch(add(num)),
    updateName: (name) => dispatch(updateName(name)),
    addAsync: (num) => dispatch(addAsync(num)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
