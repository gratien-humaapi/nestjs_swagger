export interface IResponse<T> {
  data: T | Record<string, never>;
  error:
    | {
        type: string;
        message: string;
      }
    | Record<string, never>;
}

interface IError {
  type: string;
  message: string;
}

type Test<T, P> = {
  data: T | undefined;
  error: P | undefined;
};

export const isResolved = <T, P>(
  payload: Test<T, P>
): payload is { data: T; error: undefined } =>
  (payload as Test<T, P>).data !== undefined;

export const errorResponse = <T>(error: T) => ({
  data: undefined,
  error
});
export const response = <T>(data: T) => ({
  data,
  error: undefined
});

export const errorParser = (error: unknown): IError => {
  const { code, message } = error as { code: string; message: string };

  switch (code) {
    default:
      return {
        type: code,
        message
      };
  }
};

export async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
