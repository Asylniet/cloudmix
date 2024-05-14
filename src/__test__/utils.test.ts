import {
  cn,
  chatHRefConstructor,
  convertToPusherKey,
  formatTimestamp,
} from "@/lib/utils";

describe("cn", () => {
  test("should combine multiple class names into a single string", () => {
    const result = cn("class1", "class2", "class3");
    expect(result).toBe("class1 class2 class3");
  });
});

describe("chatHRefConstructor", () => {
  test("should construct a chat href based on the user ID and chat partner ID", () => {
    const result = chatHRefConstructor("user1", "user2");
    expect(result).toBe("user1--user2");
  });
});

describe("convertToPusherKey", () => {
  test("should convert a string to a Pusher key by replacing all occurrences of ':' with '__'", () => {
    const result = convertToPusherKey("key:value");
    expect(result).toBe("key__value");
  });
});

describe("formatTimestamp", () => {
  test("should format a timestamp into a string representation of the time", () => {
    const result = formatTimestamp(1629878400000);
    expect(result).toBe("14:00");
  });
});
