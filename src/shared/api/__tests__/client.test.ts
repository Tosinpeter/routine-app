import { AxiosError } from "axios";
import { getErrorMessage } from "../client";

function makeAxiosError(
  overrides: Partial<{
    message: string;
    code: string;
    response: { status: number; data?: unknown };
  }> = {}
): AxiosError {
  const err = new AxiosError(
    overrides.message ?? "Request failed",
    overrides.code,
    undefined,
    undefined,
    overrides.response
      ? {
          status: overrides.response.status,
          data: overrides.response.data,
          statusText: "",
          headers: {},
          config: {} as any,
        }
      : undefined
  );
  return err;
}

describe("getErrorMessage", () => {
  it("returns response.data.error when present and is string", () => {
    const err = makeAxiosError({
      response: { status: 400, data: { error: "Invalid phone number" } },
    });
    expect(getErrorMessage(err)).toBe("Invalid phone number");
  });

  it("returns 'network' for ERR_NETWORK", () => {
    const err = makeAxiosError({ code: "ERR_NETWORK" });
    expect(getErrorMessage(err)).toBe("network");
  });

  it("returns 'network' when message is Network Error", () => {
    const err = makeAxiosError({ message: "Network Error" });
    expect(getErrorMessage(err)).toBe("network");
  });

  it("returns 'timeout' for ECONNABORTED", () => {
    const err = makeAxiosError({ code: "ECONNABORTED" });
    expect(getErrorMessage(err)).toBe("timeout");
  });

  it("returns 'timeout' when message includes timeout", () => {
    const err = makeAxiosError({
      message: "timeout of 5000ms exceeded",
    });
    expect(getErrorMessage(err)).toBe("timeout");
  });

  it("returns 'server' for 5xx status", () => {
    const err = makeAxiosError({ response: { status: 500 } });
    expect(getErrorMessage(err)).toBe("server");
  });

  it("returns 'server' for 503", () => {
    const err = makeAxiosError({ response: { status: 503 } });
    expect(getErrorMessage(err)).toBe("server");
  });

  it("returns 'badRequest' for 4xx status", () => {
    const err = makeAxiosError({ response: { status: 400 } });
    expect(getErrorMessage(err)).toBe("badRequest");
  });

  it("returns 'badRequest' for 404", () => {
    const err = makeAxiosError({ response: { status: 404 } });
    expect(getErrorMessage(err)).toBe("badRequest");
  });

  it("returns 'generic' for non-AxiosError", () => {
    expect(getErrorMessage(new Error("plain error"))).toBe("generic");
    expect(getErrorMessage("string")).toBe("generic");
  });

  it("returns type not response.error when response.data.error is not a string", () => {
    const err = makeAxiosError({
      response: { status: 400, data: { error: { code: "VALIDATION" } } },
    });
    expect(getErrorMessage(err)).toBe("badRequest");
  });
});
