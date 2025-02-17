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

export type Storefront = {
  id: string;
  type: string;
  href: string;
  attributes: {
    defaultLanguageTag: string;
    explicitContentPolicy: "allowed" | "opt-in" | "prohibited";
    name: string;
    supportedLanguageTags: string[];
  };
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
