import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * `false` during server render and hydration, `true` once running in the browser.
 * Use it to gate browser-only UI without a hydration mismatch. It replaces the
 * `useState(false)` + `useEffect(() => setMounted(true))` pattern, which costs an
 * extra render and trips react-hooks/set-state-in-effect.
 */
export function useIsClient() {
    return useSyncExternalStore(subscribe, () => true, () => false);
}
