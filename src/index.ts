import { Plugin } from "@opencode/plugin"

/**
 * Server part of the UI enhancer.
 * Keeps the plugin id stable and can later host RPC / tools if needed.
 * Design changes live in the GUI part (`./gui-experimental`).
 */
export default Plugin.define({
  id: "web-ui-enhancer",
  async setup(ctx) {
    // Optional: persist that the enhancer loaded
    await ctx.storage.set("loadedAt", new Date().toISOString())
  },
})
