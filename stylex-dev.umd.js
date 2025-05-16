(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    module.exports = factory();
  } else {
    global.stylex = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  if (typeof document === "undefined") {
    throw new Error("Stylex requires a browser environment");
  }

  // Shared stylesheet instance
  const styleSheet = (function () {
    const styleTag = document.createElement("style");
    document.head.appendChild(styleTag);
    const sheet = styleTag.sheet;
    return {
      addRule: (className, pseudo, styles) => {
        const css = Object.entries(styles)
          .map(([key, value]) => `${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}: ${value}`)
          .join("; ");
        sheet.insertRule(`.${className}${pseudo} { ${css} }`, sheet.cssRules.length);
      },
      addKeyframes: (name, animationDef) => {
        const keyframesCss = Object.entries(animationDef)
          .map(([key, styles]) => {
            const css = Object.entries(styles)
              .map(([prop, value]) => `${prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}: ${value}`)
              .join("; ");
            return `${key} { ${css} }`;
          })
          .join("\n");
        const rule = `@keyframes ${name} {\n${keyframesCss}\n}`;
        sheet.insertRule(rule, sheet.cssRules.length);
      },
    };
  })();

  // Generate unique class or keyframes name
  const generateName = (function () {
    let counter = 0;
    return (prefix) => `${prefix}-${counter++}`;
  })();

  const stylex = {
    create: (styles) => styles,
    props: (...styleObjects) => {
      const result = {};
      const staticStyles = {};
      const classNames = [];

      styleObjects.filter(Boolean).forEach((obj) => {
        if (!obj) return;

        Object.assign(staticStyles, obj);

        Object.entries(obj).forEach(([key, value]) => {
          if (key.startsWith(":")) {
            const className = generateName("stylex");
            classNames.push(className);
            styleSheet.addRule(className, key, value);
            delete staticStyles[key];
          }
        });
      });

      if (Object.keys(staticStyles).length) {
        result.style = staticStyles;
      }
      if (classNames.length) {
        result.className = classNames.join(" ");
      }

      return result;
    },
    keyframes: (animationDef) => {
      const name = generateName("stylex-keyframes");
      styleSheet.addKeyframes(name, animationDef);
      return name;
    },
  };

  return stylex;
});
