export function normalizeUrl(
  uri: string,
  host: string = location.origin
): string {
  if (uri === undefined) return '';

  if (/^ip[fn]s:\/\//.test(uri)) {
    const protocol = uri.substring(0, 4);
    const hash = uri.substring(7);
    return `${host}/assets/${protocol}/${hash}`;
  } else if (/^ar:\/\//.test(uri)) {
    const hash = uri.substring(5);
    return `https://arweave.net/${hash}`;
  } else if (uri.startsWith('https://gateway.pinata.cloud')) {
    const url = new URL(uri);
    return `${host}/assets${url.pathname}`;
  } else if (/^https?:\/\//.test(uri) || /^\/assets/.test(uri)) {
    return uri;
  }

  throw new Error('Metadata URI is not supported: ' + uri);
}
