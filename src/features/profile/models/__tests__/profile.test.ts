import { Profile } from "../profile";

describe("Profile.fromJson", () => {
  it("creates Profile from complete JSON", () => {
    const json = {
      id: "user-1",
      phone_number: "+15551234567",
      fullname: "Jane Doe",
      age: "30",
      gender: "female" as const,
      skin_type: "oily",
      skin_sensitivity: "normal",
      skin_concerns: ["acne"],
      health_conditions: "none",
    };
    const profile = Profile.fromJson(json);
    expect(profile.id).toBe("user-1");
    expect(profile.phone_number).toBe("+15551234567");
    expect(profile.fullname).toBe("Jane Doe");
    expect(profile.age).toBe("30");
    expect(profile.gender).toBe("female");
    expect(profile.skin_type).toBe("oily");
    expect(profile.skin_sensitivity).toBe("normal");
    expect(profile.skin_concerns).toEqual(["acne"]);
    expect(profile.health_conditions).toBe("none");
  });

  it("uses null for missing optional fields", () => {
    const json = { id: "user-2" };
    const profile = Profile.fromJson(json);
    expect(profile.id).toBe("user-2");
    expect(profile.phone_number).toBeNull();
    expect(profile.fullname).toBeNull();
    expect(profile.age).toBeNull();
    expect(profile.gender).toBeNull();
    expect(profile.skin_type).toBeNull();
    expect(profile.skin_sensitivity).toBeNull();
    expect(profile.skin_concerns).toBeNull();
    expect(profile.health_conditions).toBeNull();
  });

  it("coerces id to string", () => {
    const profile = Profile.fromJson({ id: 999 });
    expect(profile.id).toBe("999");
  });

  it("accepts null gender", () => {
    const profile = Profile.fromJson({ id: "u", gender: null });
    expect(profile.gender).toBeNull();
  });
});

describe("Profile.isProfileComplete", () => {
  it("returns true when skin_type and health_conditions are set", () => {
    const profile = Profile.fromJson({
      id: "u",
      skin_type: "dry",
      health_conditions: "none",
    });
    expect(profile.isProfileComplete()).toBe(true);
  });

  it("returns false when skin_type is null", () => {
    const profile = Profile.fromJson({
      id: "u",
      health_conditions: "none",
    });
    expect(profile.isProfileComplete()).toBe(false);
  });

  it("returns false when health_conditions is null", () => {
    const profile = Profile.fromJson({
      id: "u",
      skin_type: "oily",
    });
    expect(profile.isProfileComplete()).toBe(false);
  });

  it("returns false when both are null", () => {
    const profile = Profile.fromJson({ id: "u" });
    expect(profile.isProfileComplete()).toBe(false);
  });
});
