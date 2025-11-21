# NGINX Reverse Proxy Setup for CORS Resolution

This document explains how to set up and use the NGINX reverse proxy to resolve CORS issues when connecting to external APIs.

## Problem
When making requests from your frontend application to external APIs (like your localto.net endpoint), browsers block these requests due to CORS (Cross-Origin Resource Sharing) policies.

## Solution
We're using an NGINX reverse proxy to:
1. Sit between your frontend and the external API
2. Handle CORS headers properly
3. Forward requests to the actual API
4. Return responses back to your frontend without CORS issues

## Configuration

### 1. NGINX Configuration
The NGINX configuration is located in `config/nginx-dev.conf` and:
- Listens on port 8080
- Handles CORS preflight requests (OPTIONS)
- Proxies requests from `/api/` to your actual API endpoint
- Sets appropriate CORS headers

### 2. Vite Configuration
Updated `vite.config.ts` to proxy `/api` requests to `http://localhost:8080` where NGINX is running

### 3. API Configuration
Your frontend code in `src/config/config.ts` is already configured to use `/api` during development, which will be handled by the proxy

## Running the Proxy

### Option 1: Using Docker (Recommended)

1. Make sure Docker is installed and running
2. Run the NGINX proxy:
   ```bash
   docker-compose -f docker-compose.nginx.yml up -d
   ```
3. Start your Vue development server:
   ```bash
   npm run dev
   ```
4. Your application will now be able to make API requests without CORS issues

### Option 2: Running NGINX Directly

1. Install NGINX on your system
2. Copy the configuration file to your NGINX installation:
   - Linux/Mac: `sudo cp config/nginx-dev.conf /etc/nginx/nginx.conf`
   - Windows: Copy to your NGINX installation directory
3. Start/restart NGINX service
4. Start your Vue development server:
   ```bash
   npm run dev
   ```

## How It Works

1. Your Vue app makes requests to `/api/ra-status` or `/api/room-detail`
2. Vite development server proxies these requests to `http://localhost:8080`
3. NGINX receives the request and forwards it to `https://v6rcktcxu.localto.net/api/1.0/json/`
4. The external API responds (without CORS headers)
5. NGINX adds proper CORS headers to the response
6. The response is returned to your Vue app via Vite proxy

## Troubleshooting

### Common Issues

1. **Connection Refused**: Make sure NGINX proxy is running on port 8080
2. **SSL/Certificate Issues**: The proxy handles HTTPS to HTTPS correctly
3. **CORS Headers Still Blocked**: Check NGINX configuration has correct CORS headers

### Debugging Steps

1. Verify NGINX is running: `curl http://localhost:8080`
2. Check Vite proxy logs for errors
3. View browser network tab to see if requests are going through the proxy

## Stopping the Proxy

To stop the Docker-based proxy:
```bash
docker-compose -f docker-compose.nginx.yml down
```

## Production Considerations

For production deployments, you may want to:
1. Add authentication/authorization to the proxy
2. Add request/response logging
3. Configure proper SSL certificates
4. Add rate limiting
5. Configure more restrictive CORS headers (instead of using `*`)

## Files Created

- `config/nginx-dev.conf` - NGINX configuration file
- `Dockerfile.nginx` - Docker image definition for NGINX proxy
- `docker-compose.nginx.yml` - Docker Compose file to run the proxy
- `vite.config.ts` - Updated to proxy API requests to the NGINX server