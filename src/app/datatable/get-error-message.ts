/**
 * Function to safely retrieve a message from an error of type unknown
 * @param err - unknown type error
 * @returns - Error message
 */
export function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  return String(err);
}
