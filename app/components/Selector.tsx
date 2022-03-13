import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

// The following code is based on a sample from the following website, with some minor modifications.
// https://react-bootstrap-v4.netlify.app/components/dropdowns/#custom-dropdown-components

interface customToggleProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}

type anchorRefType = React.LegacyRef<HTMLAnchorElement>;

const CustomToggle = React.forwardRef(
  ({ children, onClick }: customToggleProps, ref: anchorRefType) => (
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

interface customMenuProps {
  children: React.ReactNode;
  style: React.CSSProperties;
  className: string;
  "aria-labelledby": string;
  labeledBy: string;
}

type divRefType = React.LegacyRef<HTMLDivElement>;

const CustomMenu = React.forwardRef(
  (
    {
      children,
      style,
      className,
      "aria-labelledby": labeledBy,
    }: customMenuProps,
    ref: divRefType
  ) => {
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
          {React.Children.toArray(children).filter((child) => {
            if (React.isValidElement(child)) {
              return (
                !value || child.props.children.toLowerCase().startsWith(value)
              );
            }
          })}
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
  const selectItems = (eventkey: string | null): void => {
    const propertyName = (
      props.name.slice(0, 1).toLowerCase() + props.name.slice(1)
    ).replace(/\s+/g, "");
    props.setSelectedItem({
      ...props.selectedItem,
      [propertyName]: eventkey,
    });
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
        <Dropdown.Item eventkey="">All Items</Dropdown.Item>
        <Dropdown.Divider />
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
