export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

export interface ImageResponse {
  id: number;
  name: string;
  alternativeText: string;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: { [dynamic: string]: ImageFormat };
  hash: string | null;
  ext: string | null;
  mime: string | null;
  size: number | null;
  url: string | null;
  previewUrl: string | null;
  provider: string | null;
  provider_metadata: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}
