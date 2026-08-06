export type CookiePreferences = {
	necessary: true; // always on
	preferences: boolean;
	functionality: boolean;
	analytics: boolean;
};

export const COOKIE_CONSENT_KEY = "ki_cookie_consent";
export const COOKIE_PREFS_KEY = "ki_cookie_prefs";

export const defaultPreferences: CookiePreferences = {
	necessary: true,
	preferences: false,
	functionality: false,
	analytics: false,
};

export function readConsent(): boolean {
	if (typeof window === "undefined") return false;
	return window.localStorage.getItem(COOKIE_CONSENT_KEY) === "1";
}

export function readPreferences(): CookiePreferences {
	if (typeof window === "undefined") return defaultPreferences;
	try {
		const raw = window.localStorage.getItem(COOKIE_PREFS_KEY);
		if (!raw) return defaultPreferences;
		const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
		return {
			necessary: true,
			preferences: Boolean(parsed.preferences),
			functionality: Boolean(parsed.functionality),
			analytics: Boolean(parsed.analytics),
		};
	} catch {
		return defaultPreferences;
	}
}

export function saveConsent(prefs: CookiePreferences) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(COOKIE_CONSENT_KEY, "1");
	window.localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(prefs));
	window.dispatchEvent(new CustomEvent("ki-cookie-update", { detail: prefs }));
}

export function acceptAll(): CookiePreferences {
	const prefs: CookiePreferences = {
		necessary: true,
		preferences: true,
		functionality: true,
		analytics: true,
	};
	saveConsent(prefs);
	return prefs;
}

export function rejectNonEssential(): CookiePreferences {
	const prefs = { ...defaultPreferences };
	saveConsent(prefs);
	return prefs;
}
