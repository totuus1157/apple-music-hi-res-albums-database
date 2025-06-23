"use client";

import type { AlbumData } from "app/datatable/types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Progress,
} from "@heroui/react";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  originalAlbumDataArray: AlbumData[];
};

const sampleRates = ["88.2", "96", "176.4", "192"] as const;

const countItems = <T extends string>(
  data: AlbumData[],
  key: keyof AlbumData,
  filterValues?: readonly T[],
): Record<string, number> => {
  const counts: Record<string, number> = {};

  data.forEach((album): void => {
    const value = album[key];

    if (Array.isArray(value)) {
      value.forEach((item): void => {
        if (!filterValues || filterValues.includes(item as T)) {
          counts[item] = (counts[item] || 0) + 1;
        }
      });
    } else if (typeof value === "string") {
      if (!filterValues || filterValues.includes(value as T)) {
        counts[value] = (counts[value] || 0) + 1;
      }
    }
  });

  return counts;
};

const calculateMaxValue = (counts: Record<string, number>): number => {
  const max = Math.max(...Object.values(counts));
  return Math.ceil(max / 1000) * 1000 || 1000;
};

const renderProgressBars = (
  counts: Record<string, number>,
  maxValue: number,
  labelSuffix: string = "",
  orderedKeys?: string[],
) => {
  const entries: [string, number][] = orderedKeys
    ? orderedKeys.map((key): [string, number] => [key, counts[key] || 0])
    : (Object.entries(counts)
        .map(([label, value]): [string, number] => [label, Number(value)])
        .sort((a, b): number => b[1] - a[1]) as [string, number][]);

  return entries.map(([label, value]) => (
    <Progress
      key={label}
      className="max-w-md"
      color="primary"
      formatOptions={{ maximumSignificantDigits: 3 }}
      label={`${label}${labelSuffix}`}
      maxValue={maxValue}
      showValueLabel={true}
      size="sm"
      value={value}
    />
  ));
};

export default function AlbumStats(props: Props) {
  const { isOpen, onOpenChange, originalAlbumDataArray } = props;

  const sampleRateCounts = countItems(
    originalAlbumDataArray,
    "sample_rate",
    sampleRates,
  );
  const sampleRateMax = calculateMaxValue(sampleRateCounts);

  const genreCounts = countItems(originalAlbumDataArray, "genre");
  const genreMax = calculateMaxValue(genreCounts);

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      placement="center"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Album Stats</ModalHeader>
            <ModalBody>
              <h3 className="text-md font-semibold mb-2">Sample Rate Counts</h3>
              {renderProgressBars(
                sampleRateCounts,
                sampleRateMax,
                " kHz",
                sampleRates as unknown as string[],
              )}

              <h3 className="text-md font-semibold mt-6 mb-2">Genre Counts</h3>
              {renderProgressBars(genreCounts, genreMax)}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
