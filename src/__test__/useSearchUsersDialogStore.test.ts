import { renderHook, act } from "@testing-library/react";
import { useSearchUsersDialog } from "@/hooks/useSearchUsersDialog";

describe("useSearchUsersDialog", () => {
  test("should initialize with isOpen set to false", () => {
    const { result } = renderHook(() => useSearchUsersDialog());
    expect(result.current.isOpen).toBe(false);
  });

  test("should set isOpen to true when setIsOpen is called with true", () => {
    const { result } = renderHook(() => useSearchUsersDialog());
    act(() => {
      result.current.setIsOpen(true);
    });
    expect(result.current.isOpen).toBe(true);
  });

  test("should set isOpen to false when setIsOpen is called with false", () => {
    const { result } = renderHook(() => useSearchUsersDialog());
    act(() => {
      result.current.setIsOpen(false);
    });
    expect(result.current.isOpen).toBe(false);
  });
});
