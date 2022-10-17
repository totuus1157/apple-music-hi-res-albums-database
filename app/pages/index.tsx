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
  const title = "Apple Music Hi-Res Albums Database";

  return (
    <div className={styles.container}>
      <style jsx>{`
        h2 {
          text-align: center;
          font-size: 23px;
          margin-top: 20px;
        }

        div.start {
          margin: 60px;
        }

        div.tabs {
          max-width: 1024px;
        }

        .strawberry {
          color: #e73562;
        }
        .limegreen {
          color: #32cd32;
        }
        .blueberry {
          color: #4f86f7;
        }
        .tangerine {
          color: #ffa812;
        }
        .grape {
          color: #56256e;
        }
      `}</style>

      <Header title={title} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className="strawberry">Apple</span>{" "}
          <span className="tangerine">Music</span>{" "}
          <span className="limegreen">Hi-Res</span>{" "}
          <span className="blueberry">Albums</span>{" "}
          <span className="grape">Database</span>
        </h1>

        <h2 className="text-secondary">
          List of Hi-Res lossless albums making by all &quot;Apple and Music
          Lovers&quot;
        </h2>

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
