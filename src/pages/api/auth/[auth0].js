import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";

export default handleAuth({
  async login(req, res) {
    await handleLogin(req, res, { returnTo: "/datatable" });
  },
  async logout(req, res) {
    await handleLogout(req, res, { returnTo: "/datatable" });
  },
});
