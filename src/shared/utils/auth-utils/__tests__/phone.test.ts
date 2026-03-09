import { formatPhoneNumber, cleanAndLimitPhoneInput } from "../phone";

describe("formatPhoneNumber", () => {
  it("returns empty string for empty input", () => {
    expect(formatPhoneNumber("")).toBe("");
  });

  it("returns digits as-is when length <= 3", () => {
    expect(formatPhoneNumber("1")).toBe("1");
    expect(formatPhoneNumber("12")).toBe("12");
    expect(formatPhoneNumber("123")).toBe("123");
  });

  it("formats 4-6 digits with area code in parens", () => {
    expect(formatPhoneNumber("1234")).toBe("(123) 4");
    expect(formatPhoneNumber("12345")).toBe("(123) 45");
    expect(formatPhoneNumber("123456")).toBe("(123) 456");
  });

  it("formats full 10 digits as (XXX) XXX-XXXX", () => {
    expect(formatPhoneNumber("1234567890")).toBe("(123) 456-7890");
  });

  it("strips non-digit characters before formatting", () => {
    expect(formatPhoneNumber("(123) 456-7890")).toBe("(123) 456-7890");
    expect(formatPhoneNumber("123-456-7890")).toBe("(123) 456-7890");
    expect(formatPhoneNumber("1 2 3 4 5 6 7 8 9 0")).toBe("(123) 456-7890");
  });

  it("handles more than 10 digits by formatting first 10", () => {
    expect(formatPhoneNumber("12345678901")).toBe("(123) 456-7890");
  });
});

describe("cleanAndLimitPhoneInput", () => {
  it("returns empty string for empty input", () => {
    expect(cleanAndLimitPhoneInput("")).toBe("");
  });

  it("strips non-digit characters", () => {
    expect(cleanAndLimitPhoneInput("(123) 456-7890")).toBe("1234567890");
    expect(cleanAndLimitPhoneInput("abc123def456")).toBe("123456");
  });

  it("limits to 10 characters", () => {
    expect(cleanAndLimitPhoneInput("12345678901234")).toBe("1234567890");
  });

  it("returns digits only for mixed input", () => {
    expect(cleanAndLimitPhoneInput("1a2b3c")).toBe("123");
  });
});
