import { renderHook, act } from "@testing-library/react";
import { useFriendRequestsStore } from "@/store/useFriendRequestsStore";

describe("useFriendRequestsStore", () => {
  test("should initialize with an empty friendRequests array", () => {
    const { result } = renderHook(() => useFriendRequestsStore());
    expect(result.current.friendRequests).toEqual([]);
  });

  test("should add a friend request to the friendRequests array", () => {
    const { result } = renderHook(() => useFriendRequestsStore());
    const request = {
      id: "1",
      name: "John Doe",
      email: "johndoe@test.com",
      image: "/test-image.png",
    };
    act(() => {
      result.current.addFriendRequest(request);
    });
    expect(result.current.friendRequests).toEqual([request]);
  });

  test("should remove a friend request from the friendRequests array", () => {
    const { result } = renderHook(() => useFriendRequestsStore());
    const request1 = {
      id: "1",
      name: "John Doe",
      email: "johndoe@test.com",
      image: "/test-image.png",
    };
    const request2 = {
      id: "2",
      name: "Jane Smith",
      email: "janesmith@test.com",
      image: "/test-image.png",
    };
    act(() => {
      result.current.addFriendRequest(request1);
      result.current.addFriendRequest(request2);
    });
    act(() => {
      result.current.removeFriendRequest("1");
    });
    expect(result.current.friendRequests).toEqual([request2]);
  });

  test("should set the friendRequests array to the provided array of requests", () => {
    const { result } = renderHook(() => useFriendRequestsStore());
    const requests = [
      {
        id: "1",
        name: "John Doe",
        email: "johndoe@test.com",
        image: "/test-image.png",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "janesmith@test.com",
        image: "/test-image.png",
      },
    ];
    act(() => {
      result.current.setFriendRequests(requests);
    });
    expect(result.current.friendRequests).toEqual(requests);
  });
});
