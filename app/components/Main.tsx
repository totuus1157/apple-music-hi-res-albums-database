import Title from "./Title";
import firebase from "firebase/app";
import "firebase/auth";
import "./fire";
import Buttons from "./Buttons";
import Album from "./Album";

const auth = firebase.auth();

export default function Main(props: { title: any }): JSX.Element {
  return (
    <main>
      <Title title={props.title} />
      {auth.currentUser ? <Buttons /> : " "}
      <Album />
    </main>
  );
}
