import {
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { SelectedItem } from "types/types";

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
        <DropdownSection aria-label="Reset" showDivider>
          <DropdownItem
            key=""
            className="text-primary"
            color="primary"
            variant="flat"
            isDisabled={selectedItem[propertyName] ? false : true}
          >
            Reset
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Items">
          {selectionElements.map((item) => (
            <DropdownItem key={item.element}>{item.element}</DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
