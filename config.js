// Client ID
// 9265ec2261be6bae9f20
// Client Secret
// 3ad5ed9735ba43b164b50dbd378ccfcd47097dcd
// code
// 112e3ee3eaff048d9c65
// access_token
// 5baae9fc4369aeb92217cd7680f3e83b3c9fbcd6&scope=repo%2Cuser&token_type=bearer
// access_token=96eb648c5d8b9734065e5f20ae1c6aebf37f7a4b&scope=repo%2Cuser&token_type=bearer
const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";
const SCOPE = "user";
const client_id = "9265ec2261be6bae9f20";

module.exports = {
  github: {
    request_token_url: "https://github.com/login/oauth/access_token",
    client_id,
    client_secret: "3ad5ed9735ba43b164b50dbd378ccfcd47097dcd",
  },
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
};
