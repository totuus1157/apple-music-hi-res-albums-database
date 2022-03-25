import type { NextPage } from "next";
import Link from "next/link";
import Header from "../components/Header";
import About from "../components/About";
import HowTo from "../components/HowTo";
import PrivacyPolicy from "../components/PrivacyPolicy";
import Footer from "../components/Footer";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const title = "Apple Music Hi-Res Album Database";

  return (
    <div className={styles.container}>
      <Header title={title} />

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>

        <style jsx>{`
          div.start {
            margin: 60px;
          }

          div.tabs {
            max-width: 1024px;
          }
        `}</style>

        <div className="start">
          <Link href="/main" replace>
            <a className="h2">Go to Main page &gt;&gt;</a>
          </Link>
        </div>

        <div className="tabs">
          <Tabs defaultActiveKey="about" id="uncontrolled-tab">
            <Tab eventKey="about" title="About This App">
              <About />
            </Tab>
            <Tab eventKey="howto" title="How to Use">
              <HowTo />
            </Tab>
            <Tab eventKey="privacyPolicy" title="Privacy Policy">
              <PrivacyPolicy />
            </Tab>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
