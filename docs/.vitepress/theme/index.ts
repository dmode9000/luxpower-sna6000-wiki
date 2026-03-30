import DefaultTheme from "vitepress/theme";
import { inBrowser } from "vitepress";

export default {
  ...DefaultTheme,
  enhanceApp() {
    if (!inBrowser) {
      return;
    }

    const browserLang = navigator.language.toLowerCase();
    const path = window.location.pathname;
    const isRootHome = path === "/" || path === "/index.html";

    // if (isRootHome && browserLang.startsWith("en")) {
    //   window.location.replace("/en/");
    // }
  },
};
