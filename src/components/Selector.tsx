import {
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

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

  const selectItems = (eventkey: string | number): void => {
    const propertyName = (
      name.slice(0, 1).toLowerCase() + name.slice(1)
    ).replace(/\s+/g, "");
    setSelectedItem({
      ...selectedItem,
      [propertyName]: eventkey,
    });
  };

  return (
    <Dropdown
      shouldBlockScroll={false}
      className={name !== "Sample Rate" ? "w-screen mx-auto xl:w-auto" : ""}
    >
      <DropdownTrigger>
        <Link size="sm" as="button" underline="hover">
          {name}&#x25bc;
        </Link>
      </DropdownTrigger>
      <DropdownMenu
        items={selectionElements}
        onAction={(key): void => selectItems(key)}
      >
        {(item) => (
          <DropdownItem key={item.element}>{item.element}</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
