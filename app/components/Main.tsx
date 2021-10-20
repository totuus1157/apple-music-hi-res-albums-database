import Title from "./Title";
import Buttons from "./Buttons";
import Album from "./Album";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Main(props: { title: any }): JSX.Element {
  return (
    <main>
      <Title title={props.title} />
      <Buttons />
      <Album />
    </main>
  );
}
