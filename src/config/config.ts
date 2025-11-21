// Use the proxy path during development, direct API access for production
// NOTE: The production API uses HTTP which will cause mixed content issues when deployed with HTTPS
// Consider implementing a backend proxy to resolve this issue
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? '/api'
    : 'https://v6rcktcxu.localto.net/api/1.0/json/'

export const STATIC_TOKEN = 'ASKTHLPUWXNXSELGEABMBSOIX2X6GPOVWOOY92VSJ85GLXUY' // Jika token static
