import { Colors } from "./consts.mjs";
class Debug {
  enabled = true;

  error(...messages) {
    if (!this.enabled) return;
    console.error(Colors.FgRed, ...messages, Colors.Reset);
  }
  log(...messages) {
    if (!this.enabled) return;
    console.error(...messages);
  }
  info(...messages) {
    if (!this.enabled) return;
    console.error(Colors.FgBlue, ...messages, Colors.Reset);
  }

  success(...messages) {
    if (!this.enabled) return;
    console.error(Colors.FgGreen, ...messages, Colors.Reset);
  }
}

export default new Debug();
