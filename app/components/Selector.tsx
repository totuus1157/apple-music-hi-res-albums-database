import Dropdown from "react-bootstrap/Dropdown";

type SelectedItem = {
  artist: string;
  genre: string;
  composer: string;
  sampleRate: string;
};

export default function Selector(props: {
  name: string;
  selectedItem: SelectedItem;
  setSelectedItem: (arg0: SelectedItem) => void;
  selectionElements: { id?: string; element?: string }[];
}) {
  console.log("props.selectionElements: ", props.selectionElements);

  const selectItems = (eventkey: string | undefined) => {
    if (eventkey !== undefined) {
      props.setSelectedItem({ ...props.selectedItem, [props.name]: eventkey });
    }
  };

  return (
    <Dropdown onSelect={selectItems}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {props.name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {props.selectionElements.map((obj): JSX.Element => {
          return (
            <Dropdown.Item key={obj.id} eventKey={obj.element}>
              {obj.element}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
