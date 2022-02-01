import { nanoid_3 } from "./nanoid";

export function generateUsername(name: String): string {
  name = name.replace(/\s/g, "");
  let random_3_num = nanoid_3();
  let firstName = name.substring(0, 5).toLowerCase();
  return firstName + "_" + random_3_num;
}
