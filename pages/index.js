import { Button, Icon, Tabs } from "antd";
import getConfig from "next/config";
import { connect } from "react-redux";
import Repo from "../component/Repo";
import Router, { withRouter } from "next/router";
import { useEffect } from "react";
import LRU from "lru-cache";
import { cacheArr } from "../lib/repo-basic-cache";

const cache = new LRU({
  maxAge: 1000 * 60 * 10,
});

const api = require("../lib/api");

const { publicRuntimeConfig } = getConfig();

let cachedUserRepos, cachedUserStaredRepos;

const isServer = typeof window === "undefined";

function Index({ userRepos, userStaredRepos, user, router }) {
  // console.log(userRepos, userStaredRepos);
  // console.log(userRepos);
  const tabKey = router.query.key || "1";

  const handleTabChange = (activeKey) => {
    Router.push(`/?key=${activeKey}`);
  };

  useEffect(() => {
    if (!isServer) {
      // cachedUserRepos = userRepos;
      // cachedUserStaredRepos = userStaredRepos;
      if (userRepos) {
        cache.set("userRepos", userRepos);
      }
      if (userStaredRepos) {
        cache.set("userStaredRepos", userStaredRepos);
      }
    }
  }, [userRepos, userStaredRepos]);

  useEffect(() => {
    if (!isServer) {
      if (userRepos && userStaredRepos) {
        cacheArr(userRepos);
        cacheArr(userStaredRepos);
      }
    }
  });
  if (!user || !user.id) {
    return (
      <div className="root">
        <p>亲您还没有登录哦~</p>
        <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>
          点击登录
        </Button>
        <style jsx>
          {`
            .root {
              height: 400px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
          `}
        </style>
      </div>
    );
  }
  return (
    <span className="root">
      <div className="user-info">
        <img src={user.avatar_url} alt="user avatar" className="avatar" />
        <span className="login">{user.login}</span>
        <span className="name">{user.name}</span>
        <span className="bio">{user.bio}</span>
        <p className="email">
          <Icon type="mail" style={{ marginRight: 10 }}></Icon>
          <a href={`mailto:${user.email}`}>1641245614@qq.com</a>
        </p>
      </div>
      <div className="user-repos">
        <Tabs
          defaultActiveKey={tabKey}
          animated={false}
          onChange={handleTabChange}
        >
          <Tabs.TabPane tab="你的仓库" key="1">
            {userRepos.map((repo) => (
              <Repo repo={repo} key={repo.id}></Repo>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="你关注的仓库" key="2">
            {userStaredRepos.map((repo) => (
              <Repo repo={repo} key={repo.id}></Repo>
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
      <style jsx>{`
    .root {
      display: flex;
      align-items; flex-start;
      padding: 20px 0;
    }

    .user-info {
      width:200;
      marginRight: 40px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
    }

    .login {
      font-weight:800;
      font-size: 20px;
      font-top:20px;
    }

    .name {
      font-size: 16px;
      color: #777;
    }

    .bio {
      marigin-top: 20px;
      color: #333;
    }

    .avatar {
      width: 100%;
      border-radius: 5px;
    }

    .user-repos {
      flex-grow: 1;
    }
  `}</style>
    </span>
  );
}

Index.getInitialProps = async ({ ctx, reduxStore }) => {
  // const result = await axios
  //   .get("/github/search/repositories?q=react")
  //   .then((res) => console.log("axios", res));
  //   const user = reduxStore.getState().user;
  //   if (!user || !user.id) {
  //     return {
  //       isLogin: false,
  //     };
  //   }
  const user = reduxStore.getState().user;
  if (!user || !user.id) {
    return;
  }
  if (!isServer) {
    if (cache.get("userRepos") && cache.get("userStaredRepos")) {
      return {
        userRepos: cache.get("userRepos"),
        userStaredRepos: cache.get("userStaredRepos"),
      };
    }
  }

  const userRepos = await api.request({ url: "/user/repos" }, ctx.req, ctx.res);
  const userStaredRepos = await api.request(
    { url: "/user/starred" },
    ctx.req,
    ctx.res
  );

  return {
    userRepos: userRepos.data,
    userStaredRepos: userStaredRepos.data,
  };
};

// export default Index;
function mapStateToprops(state) {
  return {
    user: state.user,
  };
}

function mapDispatchProps() {
  return {};
}

export default withRouter(connect(mapStateToprops, mapDispatchProps)(Index));
