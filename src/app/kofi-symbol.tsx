import Image from "next/image";

type Props = { width: number; height: number };

export default function KofiSymbol(props: Props) {
  const { width, height } = props;

  return (
    <Image
      src="/icons/kofi_symbol.png"
      alt="Ko-fi symbol"
      width={width}
      height={height}
    />
  );
}
