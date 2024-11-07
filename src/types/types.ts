export type AlbumData = {
  id: string;
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
  id: string;
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
