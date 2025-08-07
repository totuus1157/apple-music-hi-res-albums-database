"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Progress,
} from "@heroui/react";
import useSWR from "swr";

type StatsData = {
  sampleRateStats: { label: string; value: number }[];
  genreStats: { label: string; value: number }[];
};

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const sampleRates = ["88.2", "96", "176.4", "192"] as const;

const calculateMaxValue = (counts: { value: number }[]): number => {
  if (counts.length === 0) return 1000;
  const max = Math.max(...counts.map((c): number => c.value));
  return Math.ceil(max / 1000) * 1000 || 1000;
};

const renderProgressBars = (
  counts: { label: string; value: number }[],
  maxValue: number,
  labelSuffix: string = "",
  orderedKeys?: string[],
) => {
  const entries = orderedKeys
    ? orderedKeys.map((key) => ({
        label: key,
        value: counts.find((c): boolean => c.label === key)?.value || 0,
      }))
    : counts;

  return entries.map((item) => (
    <Progress
      key={item.label}
      className="max-w-md"
      color="primary"
      formatOptions={{ maximumSignificantDigits: 3 }}
      label={`${item.label}${labelSuffix}`}
      maxValue={maxValue}
      showValueLabel={true}
      size="sm"
      value={item.value}
    />
  ));
};

export default function AlbumStats(props: Props) {
  const { isOpen, onOpenChange } = props;
  const { data: statsData } = useSWR<StatsData>(
    isOpen ? "/api/database/get-album-stats" : null,
    fetcher,
  );

  if (!statsData) {
    return null;
  }

  const sampleRateMax = calculateMaxValue(statsData.sampleRateStats);
  const genreMax = calculateMaxValue(statsData.genreStats);

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
                statsData.sampleRateStats,
                sampleRateMax,
                " kHz",
                sampleRates as unknown as string[],
              )}

              <h3 className="text-md font-semibold mt-6 mb-2">Genre Counts</h3>
              {renderProgressBars(statsData.genreStats, genreMax)}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
