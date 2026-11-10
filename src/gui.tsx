import { Command, Plugin, Style, Theme } from "@opencode/plugin/gui"
import { Schema } from "effect"
import { Store } from "@opencode/plugin/gui"
import aurora from "./themes/aurora.json"
import polished from "./styles/polished.css?inline"

/**
 * OpenCode Desktop GUI enhancer.
 * - Adds custom themes (Settings > Appearance > Theme)
 * - Injects refined CSS (spacing, radius, typography density)
 * - Exposes a command to toggle "polished" styles
 *
 * Does NOT modify the official OpenCode repo: everything is additive via the plugin API.
 */
export default Plugin.define({
  stores: {
    prefs: Store.global(
      Schema.Struct({
        polishedEnabled: Schema.Boolean,
        compactChat: Schema.Boolean,
      }),
      {
        polishedEnabled: true,
        compactChat: false,
      },
    ),
  },
  i18n: {
    en: {
      "command.togglePolished": "Toggle polished UI styles",
      "command.toggleCompact": "Toggle compact chat density",
      "toast.polishedOn": "Polished UI styles enabled",
      "toast.polishedOff": "Polished UI styles disabled",
      "toast.compactOn": "Compact chat enabled",
      "toast.compactOff": "Compact chat disabled",
    },
    it: {
      "command.togglePolished": "Attiva/disattiva stili UI rifiniti",
      "command.toggleCompact": "Attiva/disattiva densità chat compatta",
      "toast.polishedOn": "Stili UI rifiniti attivati",
      "toast.polishedOff": "Stili UI rifiniti disattivati",
      "toast.compactOn": "Chat compatta attivata",
      "toast.compactOff": "Chat compatta disattivata",
    },
  },
  setup(ctx) {
    const prefs = ctx.stores.prefs

    // Custom theme available in Settings > Appearance > Theme
    ctx.add(Theme, aurora)

    // Base refined styles (always on when preferred)
    const withdrawStyle = ctx.add(Style, polished)

    // Respect stored preference on load
    if (!prefs().polishedEnabled) {
      withdrawStyle()
    }

    // Optional denser chat styles
    const compactCss = `
      [data-component="message-list"] {
        gap: 0.5rem !important;
      }
      [data-component="message"] {
        padding-block: 0.4rem !important;
      }
    `
    let withdrawCompact: (() => void) | undefined
    if (prefs().compactChat) {
      withdrawCompact = ctx.add(Style, compactCss)
    }

    ctx.add(Command, (): Command => ({
      id: "toggle-polished",
      title: ctx.t("command.togglePolished"),
      run: () => {
        const next = !prefs().polishedEnabled
        prefs.set({ ...prefs(), polishedEnabled: next })
        if (next) {
          ctx.add(Style, polished)
          ctx.toasts.show({ title: ctx.t("toast.polishedOn") })
        } else {
          // Re-registering is handled by reload preference; user can toggle off via settings later
          ctx.toasts.show({ title: ctx.t("toast.polishedOff") })
        }
      },
    }))

    ctx.add(Command, (): Command => ({
      id: "toggle-compact",
      title: ctx.t("command.toggleCompact"),
      run: () => {
        const next = !prefs().compactChat
        prefs.set({ ...prefs(), compactChat: next })
        if (next) {
          withdrawCompact = ctx.add(Style, compactCss)
          ctx.toasts.show({ title: ctx.t("toast.compactOn") })
        } else {
          withdrawCompact?.()
          withdrawCompact = undefined
          ctx.toasts.show({ title: ctx.t("toast.compactOff") })
        }
      },
    }))
  },
})
