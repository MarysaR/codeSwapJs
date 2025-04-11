import { userBuilder } from "../../builders/user.builder";
import { createUserFixture, UserFixture } from "../../fixtures/user.fixture";

describe("Feature: Get user", () => {
  let fixture: UserFixture;

  beforeEach(() => {
    fixture = createUserFixture();
    fixture.reset();
  });

  describe("Scenario: Get paginated user list", () => {
    it("should return all users", async () => {
      const user1 = userBuilder().withEmail("user1@example.com").build();
      const user2 = userBuilder().withEmail("user2@example.com").build();
      const user3 = userBuilder().withEmail("user3@example.com").build();

      await fixture.whenUserIsCreated(user1);
      await fixture.whenUserIsCreated(user2);
      await fixture.whenUserIsCreated(user3);

      const filters = { pageSize: 10, pageStart: 0, sortOrder: 1 };
      const result = await fixture.whenUserGetsPaginatedList(filters);

      expect(result.isOk()).toBe(true);

      const comparison = fixture.prepareExpectedMatch(result, [
        user1,
        user2,
        user3,
      ]);

      expect(comparison.match).toBe(true);
      expect(comparison.count).toBe(3);
    });
  });
});
