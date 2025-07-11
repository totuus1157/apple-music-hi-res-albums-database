"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import type { AlbumsResponse, FocusedAlbum } from "app/datatable/types";
import { makeApiRequestWithRetry } from "app/datatable/api-request";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ScrollShadow,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

type Track = {
  id: string;
  attributes?: {
    name: string;
    discNumber?: number;
    trackNumber?: number;
    durationInMillis: number;
  };
};

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  focusedAlbum: FocusedAlbum;
};

const decodeHTMLEntities = (text: string): string => {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
};

const formatMillisToDuration = (ms?: number): string => {
  if (!ms || ms < 0) return "--:--";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function AlbumDetail(props: Props) {
  const { isOpen, onOpenChange, onClose, focusedAlbum } = props;
  const [albumData, setAlbumData] = useState<AlbumsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect((): void => {
    const { id, storefront } = focusedAlbum;
    if (isOpen && id && storefront) {
      makeApiRequestWithRetry(storefront, id)
        .then((data): void => setAlbumData(data ?? null))
        .catch((err): void => setError(err.message));
    }
  }, [isOpen, focusedAlbum]);

  const album = useMemo(() => albumData?.data?.[0], [albumData]);
  const attrs = album?.attributes;

  const artworkUrl = useMemo((): string => {
    return attrs?.artwork.url.replace("{w}", "600").replace("{h}", "600") ?? "";
  }, [attrs?.artwork]);

  const hasDolbyAtmos = useMemo((): boolean => {
    return attrs?.audioVariants?.includes("dolby-atmos") ?? false;
  }, [attrs?.audioVariants]);

  const editorialNote = useMemo((): string | null => {
    const note = attrs?.editorialNotes;
    return note?.standard ?? note?.short ?? null;
  }, [attrs?.editorialNotes]);

  const groupedTracks = useMemo<Record<number, Track[]>>((): Record<
    number,
    Track[]
  > => {
    const tracks = album?.relationships?.tracks?.data ?? [];
    return tracks.reduce(
      (acc, track) => {
        const discNum = track.attributes?.discNumber ?? 1;
        if (!acc[discNum]) acc[discNum] = [];
        acc[discNum].push(track);
        return acc;
      },
      {} as Record<number, Track[]>,
    );
  }, [album]);

  const discNumbers = useMemo((): string[] => {
    return Object.keys(groupedTracks);
  }, [groupedTracks]);
  const isMultiDisc = discNumbers.length > 1;

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      onClose={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Album Detail</ModalHeader>
            <ModalBody>
              {error === "AlbumNotFoundInStorefront" ? (
                <p className="text-red-500">
                  This album is not available in your current region
                  (Storefront). It may be available in other countries or
                  regions on Apple Music.
                </p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : null}

              {!error && album && attrs ? (
                <div className="flex flex-col gap-4">
                  {/* Album Artwork with link */}
                  <div
                    className="w-full relative aspect-square cursor-pointer group"
                    onClick={(): void => {
                      if (attrs?.url) {
                        window.open(attrs?.url, "_blank");
                        onClose();
                      }
                    }}
                  >
                    <Image
                      src={artworkUrl}
                      alt={`${attrs.name} artwork`}
                      fill
                      className="object-contain rounded"
                      sizes="100vw"
                      priority
                    />
                    <div className="absolute top-2 right-2 group">
                      <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center group-hover:bg-white transition">
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          className="text-gray-800 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Title, Artist, Genre */}
                  <div>
                    <h2 className="text-xl font-bold">{attrs.name}</h2>
                    <p className="text-base text-gray-700">
                      {attrs.artistName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {attrs.genreNames?.join(" ")}
                    </p>
                  </div>

                  {/* Dolby Atmos logo */}
                  {hasDolbyAtmos && (
                    <div className="mt-2">
                      <Image
                        src="/icons/dolby-atmos-horizontal.png"
                        alt="Dolby Atmos"
                        width={100}
                        height={25}
                      />
                    </div>
                  )}

                  {/* Editorial Notes */}
                  {editorialNote && (
                    <ScrollShadow
                      className={attrs?.editorialNotes?.standard && "h-[400px]"}
                    >
                      <div
                        className="text-sm text-gray-700 leading-relaxed whitespace-pre-line"
                        dangerouslySetInnerHTML={{
                          __html: decodeHTMLEntities(editorialNote),
                        }}
                      />
                    </ScrollShadow>
                  )}

                  {/* Track List */}
                  <div className="mt-4 space-y-6">
                    {discNumbers.map((discNumber) => {
                      const tracks = groupedTracks[Number(discNumber)];
                      return (
                        <div key={`disc-${discNumber}`}>
                          {isMultiDisc && (
                            <h3 className="font-semibold mb-2">
                              Disc {discNumber}
                            </h3>
                          )}
                          <Table
                            hideHeader
                            removeWrapper
                            aria-label={`Track list for disc ${discNumber}`}
                          >
                            <TableHeader>
                              <TableColumn>Track Number</TableColumn>
                              <TableColumn>Title</TableColumn>
                              <TableColumn>Duration</TableColumn>
                            </TableHeader>
                            <TableBody>
                              {tracks
                                .sort(
                                  (a, b): number =>
                                    (a.attributes?.trackNumber ?? 0) -
                                    (b.attributes?.trackNumber ?? 0),
                                )
                                .map((track) => (
                                  <TableRow key={track.id}>
                                    <TableCell>
                                      {track.attributes?.trackNumber}
                                    </TableCell>
                                    <TableCell>
                                      {track.attributes?.name}
                                    </TableCell>
                                    <TableCell>
                                      {formatMillisToDuration(
                                        track.attributes?.durationInMillis,
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </div>
                      );
                    })}
                  </div>

                  {/* Track Count, Release Date, Label */}
                  <div className="flex flex-col gap-1 text-sm text-gray-600 mt-2">
                    {attrs.trackCount ? (
                      <span>
                        {attrs.trackCount}{" "}
                        {attrs.trackCount === 1 ? "Song" : "Songs"}
                      </span>
                    ) : null}

                    <div className="flex flex-wrap gap-4">
                      <span>{attrs.releaseDate}</span>
                      <span>{attrs.recordLabel}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <Spinner label="Loading ..." />
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
