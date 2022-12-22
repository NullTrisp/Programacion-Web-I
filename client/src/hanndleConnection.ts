export default async function isOnline() {
    if (navigator.onLine) {
        return await isReachable(getServerUrl());
    } else {
        return false;
    }
}

async function isReachable(url: string) {
    /**
     * Note: fetch() still "succeeds" for 404s on subdirectories,
     * which is ok when only testing for domain reachability.
     *
     * Example:
     *   https://google.com/noexist does not throw
     *   https://noexist.com/noexist does throw
     */
    try {
        const resp = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
        return resp && (resp.ok || resp.type === 'opaque');
    } catch (err) {
        console.warn('[conn test failure]:', err);
    }
}

function getServerUrl() {
    return window.location.origin;
}