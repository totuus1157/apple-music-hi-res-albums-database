import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

// The following code is based on a sample from the following website, with some minor modifications.
// https://react-bootstrap-v4.netlify.app/components/dropdowns/#custom-dropdown-components

interface customToggleProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}

type anchorRefType = React.LegacyRef<HTMLAnchorElement>;

const CustomToggle = React.forwardRef(function CustomToggle(
  { children, onClick }: customToggleProps,
  ref: anchorRefType,
): JSX.Element {
  return (
    <a
      href=""
      ref={ref}
      onClick={(e): void => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  );
});

// Suspend use until the following errors can be resolved.
// "TypeError: child.props.children is undefined"
/*
 * interface customMenuProps {
 *   children: React.ReactNode;
 *   style?: React.CSSProperties;
 *   className: string;
 *   "aria-labelledby"?: string;
 *   labeledBy?: string;
 * }
 *
 * type divRefType = React.LegacyRef<HTMLDivElement>;
 *
 * const CustomMenu = React.forwardRef(
 *   (
 *     {
 *       children,
 *       style,
 *       className,
 *       "aria-labelledby": labeledBy,
 *     }: customMenuProps,
 *     ref: divRefType
 *   ) => {
 *     const [value, setValue] = useState("");
 *
 *     return (
 *       <div
 *         ref={ref}
 *         style={style}
 *         className={className}
 *         aria-labelledby={labeledBy}
 *       >
 *         <FormControl
 *           autoFocus
 *           className="mx-3 my-2 w-auto"
 *           placeholder="Type to filter..."
 *           onChange={(e) => setValue(e.target.value)}
 *           value={value}
 *         />
 *         <ul className="list-unstyled">
 *           {React.Children.toArray(children).filter((child) => {
 *             if (React.isValidElement(child)) {
 *               return (
 *                 !value || child.props.children.toLowerCase().startsWith(value)
 *               );
 *             }
 *           })}
 *         </ul>
 *       </div>
 *     );
 *   }
 * );
 *  */

type SelectedItem = {
  artist: string;
  genre: string;
  composer: string;
  sampleRate: string;
};

type Props = {
  name: string;
  selectedItem: SelectedItem;
  setSelectedItem: (arg0: SelectedItem) => void;
  selectionElements: { id?: number; element?: string }[];
};

export default function Selector(props: Props): JSX.Element {
  const { name, selectedItem, setSelectedItem, selectionElements } = props;

  const selectItems = (eventkey: string | null): void => {
    const propertyName = (
      name.slice(0, 1).toLowerCase() + name.slice(1)
    ).replace(/\s+/g, "");
    setSelectedItem({
      ...selectedItem,
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
        {name}
      </Dropdown.Toggle>
      {/* <Dropdown.Menu as={CustomMenu}> */}
      <Dropdown.Menu>
        <Dropdown.Item eventkey="">All Items</Dropdown.Item>
        <Dropdown.Divider />
        {selectionElements.map((obj): JSX.Element => {
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
