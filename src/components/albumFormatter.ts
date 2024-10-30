import type { AlbumData, FormatAlbumForTable } from "types/types";

export const summarizeAlbumData = (
  albumsData: AlbumData[],
): FormatAlbumForTable[] => {
  return albumsData.map((album): FormatAlbumForTable => {
    const genreString = album.genre.join("\n");

    let composerString = album.composer;
    if (album.composer.length > album.genre.length) {
      composerString = [
        ...album.composer.slice(0, album.genre.length - 1),
        `${album.composer[album.genre.length - 1]}...`,
      ];
    }
    const composerFormatted = composerString.join("\n");

    return { ...album, genre: genreString, composer: composerFormatted };
  });
};
