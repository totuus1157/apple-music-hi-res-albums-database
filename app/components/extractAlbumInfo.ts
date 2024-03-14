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

    const uniqueComposerNames = Array.from(
      new Set(tracks.map((track: any) => track.attributes.composerName)),
    );

    return {
      artistName: attributes.artistName,
      name: attributes.name,
      genreNames: attributes.genreNames,
      composerName: uniqueComposerNames,
    };
  });

export default extractAlbumInfo;
