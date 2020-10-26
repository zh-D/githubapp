import getConfig from "next/config";
import { useState, useCallback } from "react";
import Container from "./Container";
import axios from "axios";
import { withRouter } from "next/router";
import Link from "next/link";
// import Link from "next/link";
import {
  Button,
  Layout,
  Icon,
  input,
  Avatar,
  Tooltip,
  Dropdown,
  Menu,
} from "antd";

import { logout } from "../actions/index";

const { publicRuntimeConfig } = getConfig();

import { connect } from "react-redux";

const { Header, Content, Footer } = Layout;

const Comp = ({ color, children, style }) => (
  <div style={{ color, ...style }}>{children}</div>
);

const MyLayout = ({ children, user, logout, router }) => {
  const urlQuery = router.query && router.query.query;
  const [search, setSearch] = useState(urlQuery || "");
  const handleSearchChange = useCallback(
    (e) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );
  const handleOnSearch = useCallback(() => {
    router.push(`/search?query=${search}`);
  }, [search]);

  // const handleGotoOAuth = useCallback((e) => {
  //   e.preventDefault();
  //   axios
  //     .get(`/prepare-auth?url=${router.asPath}`)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         location.href = publicRuntimeConfig.OAUTH_URL;
  //       } else {
  //         console.log("prepare auth failed", res);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("prepare auth failed", err);
  //     });
  // }, []);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);
  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a href="javascript:void(0)" onClick={handleLogout}>
          登出
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <Icon type="github" style={"githubIconStyle"} />
              </Link>
            </div>
            <div>
              <input.Search
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropDown}>
                  <a href="/">
                    <Avatar size={40} src={user.avatar_url}></Avatar>
                  </a>
                </Dropdown>
              ) : (
                <Tooltip title="点击进行登录">
                  <a href={`/prepare-auth?url=${router.asPath}`}>
                    <Avatar size={40} icon="user"></Avatar>
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container renderer={<Comp  />}>{children}</Container>
      </Content>
      <Footer>
        <div style={{ textAlign: "center" }}>
          Develop by dzh@
          <a href="mailto:jokcy@hotmail.com">1641245614@qq.com</a>
        </div>
      </Footer>
      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justfy-content: flex-start;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          min-height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background: #fff;
        }
      `}</style>
    </Layout>
  );
};

// export default MyLayout

const mapStateToProps = (state) => {
  // console.log("mapStateToProps", state);
  console.log("mapStateToProps", state.user.avatar_url);
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyLayout));
