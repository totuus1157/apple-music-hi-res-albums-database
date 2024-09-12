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
  displayName: string;
  propertyName: keyof SelectedItem;
  selectedItem: SelectedItem;
  setSelectedItem: (arg0: SelectedItem) => void;
  selectionElements: { id?: number; element?: string }[];
};

export default function Selector(props: Props): JSX.Element {
  const {
    displayName,
    propertyName,
    selectedItem,
    setSelectedItem,
    selectionElements,
  } = props;

  const selectItems = (eventkey: string): void => {
    setSelectedItem({
      ...selectedItem,
      [propertyName]: eventkey,
    });
  };

  return (
    <Dropdown
      shouldBlockScroll={false}
      className={
        propertyName !== "sampleRate" ? "w-screen mx-auto xl:w-auto" : ""
      }
    >
      <DropdownTrigger>
        <Link
          size="sm"
          as="button"
          underline="hover"
          color={selectedItem[propertyName] ? "secondary" : "primary"}
        >
          {displayName}&#x25bc;
        </Link>
      </DropdownTrigger>
      <DropdownMenu
        items={selectionElements}
        onAction={(key): void => selectItems(String(key))}
      >
        {(item) => (
          <DropdownItem key={item.element}>{item.element}</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
