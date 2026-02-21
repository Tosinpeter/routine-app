export type Gender = "male" | "female" | "non_binary" | "other" | null;

export class Profile {
  id: string;
  phone_number: string | null;
  fullname: string | null;
  age: string | null;
  gender: Gender;
  skin_type: string | null;
  skin_sensitivity: string | null;
  skin_concerns: string[] | null;
  health_conditions: string | null;

  constructor(
    id: string,
    phone_number: string | null,
    fullname: string | null,
    age: string | null,
    gender: Gender,
    skin_type: string | null,
    skin_sensitivity: string | null,
    skin_concerns: string[] | null,
    health_conditions: string | null
  ) {
    this.id = id;
    this.phone_number = phone_number;
    this.fullname = fullname;
    this.age = age;
    this.gender = gender;
    this.skin_type = skin_type;
    this.skin_sensitivity = skin_sensitivity;
    this.skin_concerns = skin_concerns;
    this.health_conditions = health_conditions;
  }

  isProfileComplete(): boolean {
    return (
      this.age !== null &&
      this.skin_type !== null &&
      this.health_conditions !== null
    );
  }

  static fromJson(json: any): Profile {
    return new Profile(
      String(json.id),
      json.phone_number ?? null,
      json.fullname ?? null,
      json.age ?? null,
      (json.gender as Gender) ?? null,
      json.skin_type ?? null,
      json.skin_sensitivity ?? null,
      json.skin_concerns ?? null,
      json.health_conditions ?? null
    );
  }
}