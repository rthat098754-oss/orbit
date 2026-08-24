import { appleIdSignOutAsync } from './appleIdAuthAsync';
import { storage } from '../modules/Storage';

const LAST_APPLE_ID_KEY = 'apple-resign:last-apple-id';

// Why the AppleIdAuth window shows a contextual banner. Written by whoever
// opens the window, read (and cleared) by the window on mount — the window
// navigator cannot pass props, so this rides through storage.
export const AUTH_REASON_KEY = 'apple-resign:auth-reason';

export function rememberAppleId(appleId: string) {
  storage.set(LAST_APPLE_ID_KEY, appleId);
}

export function loadAppleId(): string | null {
  return storage.getString(LAST_APPLE_ID_KEY) ?? null;
}

/**
 * Clear the saved Apple ID login: revoke the persisted GSA session (keychain)
 * and forget the remembered Apple ID, so the next resign starts a fresh sign-in.
 * Returns the Apple ID that was signed out, or null if none was stored.
 */
export async function clearAppleIdLoginAsync(): Promise<string | null> {
  const appleId = loadAppleId();
  if (appleId) {
    await appleIdSignOutAsync(appleId);
  }
  storage.delete(LAST_APPLE_ID_KEY);
  return appleId;
}
