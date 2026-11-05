import { useSyncExternalStore } from "react";

/**
 * "Already subscribed" flag shared by every newsletter component on the page
 * and persisted in localStorage, so the popup stays away and the inline
 * section keeps its onboarded state across visits. Falls back to memory when
 * storage is unavailable (private mode, blocked site data).
 */
const KEY = "newsletter-subscribed";
const listeners = new Set<() => void>();
let inMemory = false;

export function isSubscribed(): boolean {
  try {
    return inMemory || window.localStorage.getItem(KEY) === "1";
  } catch {
    return inMemory;
  }
}

export function markSubscribed() {
  inMemory = true;
  try {
    window.localStorage.setItem(KEY, "1");
  } catch {
    // storage blocked — in-memory flag still covers this visit
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep other open tabs in sync.
  const onStorage = (e: StorageEvent) => e.key === KEY && listener();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Reactive flag; `false` during SSR/hydration, then the stored value. */
export function useSubscribed(): boolean {
  return useSyncExternalStore(subscribe, isSubscribed, () => false);
}
