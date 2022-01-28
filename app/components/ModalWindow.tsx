import Register from "./Register";
import Delete from "./Delete";
import About from "./About";
import HowTo from "./HowTo";
import PrivacyPolicy from "./PrivacyPolicy";

export default function ModalWindow(props: {
  modalContent: string | null;
  albumInfo: string;
  show: boolean;
  setShow: (arg0: boolean) => void;
  registeredURL: string[];
  uid: string;
}): JSX.Element {
  let content = <></>;
  if (props.modalContent === "register") {
    content = (
      <Register
        show={props.show}
        setShow={props.setShow}
        uid={props.uid}
        registeredURL={props.registeredURL}
      />
    );
  } else if (props.modalContent === "delete") {
    content = (
      <Delete
        show={props.show}
        setShow={props.setShow}
        albumInfo={props.albumInfo}
        uid={props.uid}
      />
    );
  } else if (props.modalContent === "about") {
    content = <About show={props.show} setShow={props.setShow} />;
  } else if (props.modalContent === "howto") {
    content = <HowTo show={props.show} setShow={props.setShow} />;
  } else if (props.modalContent === "privacy") {
    content = <PrivacyPolicy show={props.show} setShow={props.setShow} />;
  }

  return content;
}
