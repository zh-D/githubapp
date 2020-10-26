import { withRouter } from "next/router";
// import Comp from "../component/comp";
import Head from "next/head";
import styled from "styled-components";
import dynamic from "next/dynamic";
// import moment from "moment";

const Comp = dynamic(import("../component/comp"));

const Title = styled.h1`
  color: yellow;
  font: 40px;
`;
const A = ({ router, name, time }) => (
  <>
    <Title>This is Title{time}</Title>
    <Comp>
      {router.query.id}
      {name}
    </Comp>
    <style jsx>{`
      a {
        color: blue;
      }
      .link {
        color: red;
      }
    `}</style>
    <style jsx global>{`
      a {
        color: blue;
      }
      .link {
        color: red;
      }
    `}</style>
  </>
);

A.getInitialProps = async (ctx) => {
  const moment = await import("moment");

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "jokcy",
        time: moment.default(Date.now() - 60 * 1000).fromNow(),
      });
    }, 1000);
  });
  return await promise;
};

export default withRouter(A);
