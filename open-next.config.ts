import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Minimal config: avoid cache interception / static-assets ISR quirks
// that can 500 the Worker on request.
export default defineCloudflareConfig({});
