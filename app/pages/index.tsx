import type { NextPage } from "next";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
// import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const title = "Apple Music Hi-Res Album Database";

  return (
    <div>
      <Header title={title} />
      <Main title={title} />
      <Footer />
    </div>
  );
};

export default Home;
