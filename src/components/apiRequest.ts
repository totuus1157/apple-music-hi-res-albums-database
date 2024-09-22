async function makeApiRequest(
  storefrontId: string,
  albumId: string,
): Promise<any> {
  try {
    const response = await fetch(`/api/${storefrontId}/${albumId}`);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 429) {
      throw new Error("Too Many Requests");
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (err: any) {
    throw new Error(`Request failed: ${err.message}`);
  }
}

export async function makeApiRequestWithRetry(
  storefrontId: string,
  albumId: string,
): Promise<any> {
  const maxRetries = 3;
  const retryDelay = 5000;

  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      return await makeApiRequest(storefrontId, albumId);
    } catch (err: any) {
      if (err.message === "Too Many Requests") {
        console.log(
          `Too Many Requests. Retrying in ${retryDelay / 1000} seconds.`,
        );
        await sleep(retryDelay);
        retryCount++;
      } else {
        console.error(err.message);
        return null;
      }
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve): NodeJS.Timeout => setTimeout(resolve, ms));
}
