import { HttpMethod } from "./http";
import { assert } from "chai";

describe("shlabadawoop", () => {
  describe("core", () => {
    describe("http", () => {
      it("should have GET | POST | PUT | PATCH | DELETE methods as *name*", () => {
        const httpMethodsList: string[] = Object.values(HttpMethod);
        assert.lengthOf(httpMethodsList, 5);
      });
    });
  });
});
