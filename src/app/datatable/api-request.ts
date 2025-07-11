import type {
  AlbumsResponse,
  AppleMusicErrorsResponse,
} from "app/datatable/types";
import { getErrorMessage } from "app/datatable/get-error-message";

async function makeApiRequest(
  storefrontId: string,
  albumId: string,
): Promise<AlbumsResponse> {
  try {
    const response = await fetch(
      `/api/apple-music/${storefrontId}/${albumId}?extend=audioVariants`,
    );

    if (response.ok) {
      const albumsResponse: AlbumsResponse = await response.json();
      return albumsResponse;
    } else if (response.status === 404) {
      const errorBody: AppleMusicErrorsResponse = await response.json();

      const isStorefrontMissing = errorBody.errors.some(
        (e): boolean => e.code === "40400",
      );

      if (isStorefrontMissing) {
        throw new Error("AlbumNotFoundInStorefront");
      } else {
        throw new Error("404 Not Found");
      }
    } else if (response.status === 429) {
      throw new Error("Too Many Requests");
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (err) {
    const errorMessage: string = getErrorMessage(err);
    throw new Error(`Request failed: ${errorMessage}`);
  }
}

export async function makeApiRequestWithRetry(
  storefrontId: string,
  albumId: string,
): Promise<AlbumsResponse | null | undefined> {
  const maxRetries = 3;
  const retryDelay = 5000;

  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      return await makeApiRequest(storefrontId, albumId);
    } catch (err) {
      const errorMessage: string = getErrorMessage(err);
      if (errorMessage === "Too Many Requests") {
        console.log(
          `Too Many Requests. Retrying in ${retryDelay / 1000} seconds.`,
        );
        await sleep(retryDelay);
        retryCount++;
      } else {
        console.error(errorMessage);
        return null;
      }
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve): NodeJS.Timeout => setTimeout(resolve, ms));
}
