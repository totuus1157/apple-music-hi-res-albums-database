import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

// The following code is based on a sample from the following website, with some minor modifications.
// https://react-bootstrap-v4.netlify.app/components/dropdowns/#custom-dropdown-components

const CustomToggle = React.forwardRef(
  ({ children, onClick }, ref): JSX.Element => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  )
);

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

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
  selectionElements: { id?: number; element?: string }[];
}): JSX.Element {
  console.log("props.selectionElements: ", props.selectionElements);

  const selectItems = (eventkey: string | undefined) => {
    if (eventkey !== undefined) {
      props.setSelectedItem({ ...props.selectedItem, [props.name]: eventkey });
    }
  };

  return (
    <Dropdown onSelect={selectItems}>
      <Dropdown.Toggle
        as={CustomToggle}
        variant="success"
        id="dropdown-custom-components"
      >
        {props.name}
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>
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
