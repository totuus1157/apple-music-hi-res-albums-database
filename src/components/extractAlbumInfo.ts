type AlbumInfo = {
  artistName: string;
  name: string;
  genreNames: string[];
  composerName: string[];
};

const extractAlbumInfo = (albumData: any): AlbumInfo[] =>
  albumData.data.map((album: any) => {
    const attributes = album.attributes;
    const relationships = album.relationships;
    const tracks = relationships.tracks.data;

    // Filter out undefined composer names and get unique names
    const uniqueComposerNames = Array.from(
      new Set(
        tracks
          .map((track: any) => track.attributes.composerName)
          .filter(
            (name: string | undefined): name is string => name !== undefined,
          ),
      ),
    );

    // If uniqueComposerNames is empty, add an empty string
    if (uniqueComposerNames.length === 0) {
      uniqueComposerNames.push("");
    }

    return {
      artistName: attributes.artistName,
      name: attributes.name,
      genreNames: attributes.genreNames,
      composerName: uniqueComposerNames,
    };
  });

export default extractAlbumInfo;
