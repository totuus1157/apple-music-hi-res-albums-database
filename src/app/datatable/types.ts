export type AlbumData = {
  id: number;
  product_id: string;
  title: string;
  artist: string;
  genre: string[];
  composer: string[];
  sample_rate: string;
  registrant_id: string;
  created_at: Date;
  updated_at: Date;
  storefront: string;
};

export type FormatAlbumForTable = {
  id: number;
  product_id: string;
  title: string;
  artist: string;
  genre: string;
  composer: string;
  sample_rate: string;
  registrant_id: string;
  created_at: Date;
  updated_at: Date;
  storefront: string;
};

export type SelectedItem = {
  artist: string | null;
  genre: string | null;
  composer: string | null;
  sampleRate: string | null;
};

export type AlbumElements = {
  artist?: string;
  genre?: string[];
  composer?: string[];
  sampleRate?: string;
};

export type StorefrontsResponse = {
  data: {
    id: string;
    type: string;
    href: string;
    attributes?: {
      defaultLanguageTag: string;
      explicitContentPolicy: "allowed" | "opt-in" | "prohibited";
      name: string;
      supportedLanguageTags: string[];
    };
  }[];
};

export type AlbumsResponse = {
  data: {
    id: string;
    type: "albums";
    href: string;
    attributes?: {
      artistName: string;
      artistUrl?: string;
      artwork: {
        bgColor?: string;
        height: number;
        width: number;
        textColor1?: string;
        textColor2?: string;
        textColor3?: string;
        textColor4?: string;
        url: string;
      };
      audioVariants?: (
        | "dolby-atmos"
        | "dolby-audio"
        | "hi-res-lossless"
        | "lossless"
        | "lossy-stereo"
      )[];
      contentRating?: "clean" | "explicit";
      copyright?: string;
      editorialNotes?: {
        short?: string;
        standard?: string;
        name?: string;
        tagline?: string;
      };
      genreNames: string[];
      isCompilation: boolean;
      isComplete: boolean;
      isMasteredForItunes: boolean;
      isSingle: boolean;
      name: string;
      playParams?: { id: string; kind: string };
      recordLabel?: string;
      releaseDate?: string;
      trackCount: number;
      upc?: string;
      url: string;
    };
    relationships?: {
      tracks?: { data: { attributes?: { composerName?: string } }[] };
    };
  }[];
};
