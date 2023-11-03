var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
__export(exports, {
  default: () => ScrollSpeed
});
var import_obsidian = __toModule(require("obsidian"));
var DEFAULT_SETTINGS = {
  speed: 5,
  altMultiplier: 5,
  enableAnimations: true
};
var ScrollSpeed = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.animationSmoothness = 3;
    this.positionY = 0;
    this.isMoving = false;
    this.scrollDistance = 0;
    this.windowOpenListener = (_win, window2) => {
      this.registerDomEvent(window2, "wheel", this.scrollListener, { passive: false });
    };
    this.scrollListener = (event) => {
      event.preventDefault();
      const path = event.path || event.composedPath && event.composedPath();
      for (const element of path) {
        if (this.isScrollable(element, event)) {
          this.target = element;
          if (this.isTrackPadUsed(event) || !this.settings.enableAnimations) {
            this.scrollWithoutAnimation(event);
          } else {
            this.scrollWithAnimation(event);
          }
          break;
        }
      }
    };
  }
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.addSettingTab(new SettingsTab(this.app, this));
      this.registerDomEvent(window, "wheel", this.scrollListener, { passive: false });
      this.registerEvent(this.app.on("window-open", this.windowOpenListener));
    });
  }
  scrollWithoutAnimation(event) {
    const acceleration = event.altKey ? this.settings.speed * this.settings.altMultiplier : this.settings.speed;
    this.target.scrollBy(event.deltaX * acceleration, event.deltaY * acceleration);
  }
  scrollWithAnimation(event) {
    if (!this.isMoving) {
      this.positionY = this.target.scrollTop;
    }
    const acceleration = event.altKey ? Math.pow(this.settings.speed * this.settings.altMultiplier, 1.1) : Math.pow(this.settings.speed, 1.1);
    this.positionY += event.deltaY * acceleration;
    this.scrollDistance = event.deltaY * acceleration;
    this.positionY = Math.max(0, Math.min(this.positionY, this.target.scrollHeight - this.target.clientHeight));
    if (!this.isMoving) {
      this.isMoving = true;
      this.updateScrollAnimation();
    }
  }
  updateScrollAnimation() {
    if (!this.isMoving || !this.target) {
      return this.stopScrollAnimation();
    }
    const divider = Math.pow(this.animationSmoothness, 1.3);
    const delta = this.positionY - this.target.scrollTop;
    this.target.scrollTop += delta / divider;
    if (delta < 0 && this.positionY < 0 && this.target.scrollTop === 0) {
      return this.stopScrollAnimation();
    }
    if (delta > 0 && this.positionY > this.target.scrollHeight - this.target.clientHeight / 2 - this.scrollDistance) {
      return this.stopScrollAnimation();
    }
    if (Math.abs(delta) < this.scrollDistance * 0.015 || Math.abs(delta / divider) < 1) {
      return this.stopScrollAnimation();
    }
    window.requestAnimationFrame(this.updateScrollAnimation.bind(this));
  }
  stopScrollAnimation() {
    this.isMoving = false;
    this.scrollDistance = 0;
    this.positionY = this.target.scrollTop;
    if (this.target)
      this.target = void 0;
  }
  isScrollable(element, event) {
    const isHorizontal = event.deltaX && !event.deltaY;
    return this.isContentOverflowing(element, isHorizontal) && this.hasOverflowStyle(element, isHorizontal);
  }
  isContentOverflowing(element, horizontal) {
    const client = horizontal ? element.clientWidth : element.clientHeight;
    const scroll = horizontal ? element.scrollWidth : element.scrollHeight;
    return client < scroll;
  }
  hasOverflowStyle(element, horizontal) {
    const style = getComputedStyle(element);
    const overflow = style.getPropertyValue(horizontal ? "overflow-x" : "overflow-y");
    return /^(scroll|auto)$/.test(overflow);
  }
  isTrackPadUsed(event) {
    let isTrackPad = false;
    if (event.wheelDeltaY) {
      if (event.wheelDeltaY === event.deltaY * -3) {
        isTrackPad = true;
      }
    } else if (event.deltaMode === 0) {
      isTrackPad = true;
    }
    return isTrackPad;
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
};
var SettingsTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    let speedSlider;
    new import_obsidian.Setting(containerEl).setName("Mouse Scroll Speed").setDesc("1 is the default scroll speed, higher is faster").addExtraButton((button) => {
      button.setIcon("reset").setTooltip("Restore default").onClick(() => __async(this, null, function* () {
        this.plugin.settings.speed = DEFAULT_SETTINGS.speed;
        speedSlider.setValue(DEFAULT_SETTINGS.speed);
        yield this.plugin.saveSettings();
      }));
    }).addSlider((slider) => {
      speedSlider = slider;
      slider.setValue(this.plugin.settings.speed).setLimits(0.1, 10, 0.1).setDynamicTooltip().onChange((value) => __async(this, null, function* () {
        this.plugin.settings.speed = value;
        yield this.plugin.saveSettings();
      }));
    });
    let altMultiplierSlider;
    new import_obsidian.Setting(containerEl).setName("Alt Multiplier").setDesc("Multiply scroll speed when the ALT key is pressed").addExtraButton((button) => {
      button.setIcon("reset").setTooltip("Restore default").onClick(() => __async(this, null, function* () {
        this.plugin.settings.altMultiplier = DEFAULT_SETTINGS.altMultiplier;
        altMultiplierSlider.setValue(DEFAULT_SETTINGS.altMultiplier);
        yield this.plugin.saveSettings();
      }));
    }).addSlider((slider) => {
      altMultiplierSlider = slider;
      slider.setValue(this.plugin.settings.altMultiplier).setLimits(0.1, 10, 0.1).setDynamicTooltip().onChange((value) => __async(this, null, function* () {
        this.plugin.settings.altMultiplier = value;
        yield this.plugin.saveSettings();
      }));
    });
    let animationToggle;
    new import_obsidian.Setting(containerEl).setName("Enable Animation").setDesc("Toggle smooth scrolling animations").addExtraButton((button) => {
      button.setIcon("reset").setTooltip("Restore default").onClick(() => __async(this, null, function* () {
        this.plugin.settings.enableAnimations = DEFAULT_SETTINGS.enableAnimations;
        animationToggle.setValue(DEFAULT_SETTINGS.enableAnimations);
        yield this.plugin.saveSettings();
      }));
    }).addToggle((toggle) => {
      animationToggle = toggle;
      toggle.setValue(this.plugin.settings.enableAnimations).onChange((value) => __async(this, null, function* () {
        this.plugin.settings.enableAnimations = value;
        yield this.plugin.saveSettings();
      }));
    });
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHtcclxuICBBcHAsXHJcbiAgUGx1Z2luLFxyXG4gIFBsdWdpblNldHRpbmdUYWIsXHJcbiAgU2V0dGluZyxcclxuICBTbGlkZXJDb21wb25lbnQsXHJcbiAgVG9nZ2xlQ29tcG9uZW50LFxyXG4gIFdvcmtzcGFjZVdpbmRvdyxcclxufSBmcm9tICdvYnNpZGlhbidcclxuXHJcbmludGVyZmFjZSBBdWdtZW50ZWRXaGVlbEV2ZW50IGV4dGVuZHMgV2hlZWxFdmVudCB7XHJcbiAgcGF0aDogRWxlbWVudFtdXHJcbiAgd2hlZWxEZWx0YVk6IG51bWJlclxyXG4gIHdoZWVsRGVsdGFYOiBudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIFNldHRpbmdzIHtcclxuICBzcGVlZDogbnVtYmVyXHJcbiAgYWx0TXVsdGlwbGllcjogbnVtYmVyXHJcbiAgZW5hYmxlQW5pbWF0aW9uczogYm9vbGVhblxyXG59XHJcblxyXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBTZXR0aW5ncyA9IHtcclxuICBzcGVlZDogNSxcclxuICBhbHRNdWx0aXBsaWVyOiA1LFxyXG4gIGVuYWJsZUFuaW1hdGlvbnM6IHRydWUsXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbFNwZWVkIGV4dGVuZHMgUGx1Z2luIHtcclxuICBzZXR0aW5nczogU2V0dGluZ3NcclxuXHJcbiAgYW5pbWF0aW9uU21vb3RobmVzcyA9IDNcclxuICBwb3NpdGlvblkgPSAwXHJcbiAgaXNNb3ZpbmcgPSBmYWxzZVxyXG4gIHRhcmdldDogRWxlbWVudCB8IHVuZGVmaW5lZFxyXG4gIHNjcm9sbERpc3RhbmNlID0gMFxyXG5cclxuICBhc3luYyBvbmxvYWQoKSB7XHJcbiAgICBhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpXHJcbiAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IFNldHRpbmdzVGFiKHRoaXMuYXBwLCB0aGlzKSlcclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVyRG9tRXZlbnQod2luZG93LCAnd2hlZWwnLCB0aGlzLnNjcm9sbExpc3RlbmVyLCB7cGFzc2l2ZTogZmFsc2V9KVxyXG5cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC5vbignd2luZG93LW9wZW4nLCB0aGlzLndpbmRvd09wZW5MaXN0ZW5lcikpXHJcbiAgfVxyXG5cclxuICB3aW5kb3dPcGVuTGlzdGVuZXIgPSAoX3dpbjogV29ya3NwYWNlV2luZG93LCB3aW5kb3c6IFdpbmRvdykgPT4ge1xyXG4gICAgdGhpcy5yZWdpc3RlckRvbUV2ZW50KHdpbmRvdywgJ3doZWVsJywgdGhpcy5zY3JvbGxMaXN0ZW5lciwge3Bhc3NpdmU6IGZhbHNlfSlcclxuICB9XHJcblxyXG4gIHNjcm9sbExpc3RlbmVyID0gKGV2ZW50OiBBdWdtZW50ZWRXaGVlbEV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5MjQ1NjM4Lzg1ODY4MDNcclxuICAgIGNvbnN0IHBhdGggPSBldmVudC5wYXRoIHx8IChldmVudC5jb21wb3NlZFBhdGggJiYgKGV2ZW50LmNvbXBvc2VkUGF0aCgpIGFzIEVsZW1lbnRbXSkpXHJcblxyXG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHBhdGgpIHtcclxuICAgICAgaWYgKHRoaXMuaXNTY3JvbGxhYmxlKGVsZW1lbnQsIGV2ZW50KSkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gZWxlbWVudFxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1RyYWNrUGFkVXNlZChldmVudCkgfHwgIXRoaXMuc2V0dGluZ3MuZW5hYmxlQW5pbWF0aW9ucykge1xyXG4gICAgICAgICAgdGhpcy5zY3JvbGxXaXRob3V0QW5pbWF0aW9uKGV2ZW50KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnNjcm9sbFdpdGhBbmltYXRpb24oZXZlbnQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBicmVha1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzY3JvbGxXaXRob3V0QW5pbWF0aW9uKGV2ZW50OiBBdWdtZW50ZWRXaGVlbEV2ZW50KSB7XHJcbiAgICBjb25zdCBhY2NlbGVyYXRpb24gPSBldmVudC5hbHRLZXlcclxuICAgICAgPyB0aGlzLnNldHRpbmdzLnNwZWVkICogdGhpcy5zZXR0aW5ncy5hbHRNdWx0aXBsaWVyXHJcbiAgICAgIDogdGhpcy5zZXR0aW5ncy5zcGVlZFxyXG5cclxuICAgIHRoaXMudGFyZ2V0LnNjcm9sbEJ5KGV2ZW50LmRlbHRhWCAqIGFjY2VsZXJhdGlvbiwgZXZlbnQuZGVsdGFZICogYWNjZWxlcmF0aW9uKVxyXG4gIH1cclxuXHJcbiAgc2Nyb2xsV2l0aEFuaW1hdGlvbihldmVudDogQXVnbWVudGVkV2hlZWxFdmVudCkge1xyXG4gICAgLy8gVE9ETyBob3Jpem9udGFsIHNjcm9sbGluZywgdG9vXHJcbiAgICBpZiAoIXRoaXMuaXNNb3ZpbmcpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvblkgPSB0aGlzLnRhcmdldC5zY3JvbGxUb3BcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY2NlbGVyYXRpb24gPSBldmVudC5hbHRLZXlcclxuICAgICAgPyBNYXRoLnBvdyh0aGlzLnNldHRpbmdzLnNwZWVkICogdGhpcy5zZXR0aW5ncy5hbHRNdWx0aXBsaWVyLCAxLjEpXHJcbiAgICAgIDogTWF0aC5wb3codGhpcy5zZXR0aW5ncy5zcGVlZCwgMS4xKVxyXG5cclxuICAgIHRoaXMucG9zaXRpb25ZICs9IGV2ZW50LmRlbHRhWSAqIGFjY2VsZXJhdGlvblxyXG4gICAgdGhpcy5zY3JvbGxEaXN0YW5jZSA9IGV2ZW50LmRlbHRhWSAqIGFjY2VsZXJhdGlvblxyXG4gICAgdGhpcy5wb3NpdGlvblkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLnBvc2l0aW9uWSwgdGhpcy50YXJnZXQuc2Nyb2xsSGVpZ2h0IC0gdGhpcy50YXJnZXQuY2xpZW50SGVpZ2h0KSlcclxuXHJcbiAgICBpZiAoIXRoaXMuaXNNb3ZpbmcpIHtcclxuICAgICAgdGhpcy5pc01vdmluZyA9IHRydWVcclxuXHJcbiAgICAgIHRoaXMudXBkYXRlU2Nyb2xsQW5pbWF0aW9uKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVNjcm9sbEFuaW1hdGlvbigpIHtcclxuICAgIGlmICghdGhpcy5pc01vdmluZyB8fCAhdGhpcy50YXJnZXQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc3RvcFNjcm9sbEFuaW1hdGlvbigpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGl2aWRlciA9IE1hdGgucG93KHRoaXMuYW5pbWF0aW9uU21vb3RobmVzcywgMS4zKVxyXG4gICAgY29uc3QgZGVsdGEgPSB0aGlzLnBvc2l0aW9uWSAtIHRoaXMudGFyZ2V0LnNjcm9sbFRvcFxyXG4gICAgdGhpcy50YXJnZXQuc2Nyb2xsVG9wICs9IGRlbHRhIC8gZGl2aWRlclxyXG5cclxuICAgIC8vIEJvdW5kYXJ5IGF0IHRoZSB0b3BcclxuICAgIGlmIChkZWx0YSA8IDAgJiYgdGhpcy5wb3NpdGlvblkgPCAwICYmIHRoaXMudGFyZ2V0LnNjcm9sbFRvcCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zdG9wU2Nyb2xsQW5pbWF0aW9uKClcclxuICAgIH1cclxuXHJcbiAgICAvLyBCb3VuZGFyeSBhdCB0aGUgYm90dG9tXHJcbiAgICBpZiAoXHJcbiAgICAgIGRlbHRhID4gMCAmJlxyXG4gICAgICB0aGlzLnBvc2l0aW9uWSA+IHRoaXMudGFyZ2V0LnNjcm9sbEhlaWdodCAtIHRoaXMudGFyZ2V0LmNsaWVudEhlaWdodCAvIDIgLSB0aGlzLnNjcm9sbERpc3RhbmNlXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc3RvcFNjcm9sbEFuaW1hdGlvbigpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RvcCB3aGVuIG1vdmVtZW50IGRlbHRhIGlzIGFwcHJvYWNoaW5nIHplcm9cclxuICAgIGlmIChNYXRoLmFicyhkZWx0YSkgPCB0aGlzLnNjcm9sbERpc3RhbmNlICogMC4wMTUgfHwgTWF0aC5hYnMoZGVsdGEgLyBkaXZpZGVyKSA8IDEpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc3RvcFNjcm9sbEFuaW1hdGlvbigpXHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZVNjcm9sbEFuaW1hdGlvbi5iaW5kKHRoaXMpKVxyXG4gIH1cclxuXHJcbiAgc3RvcFNjcm9sbEFuaW1hdGlvbigpIHtcclxuICAgIHRoaXMuaXNNb3ZpbmcgPSBmYWxzZVxyXG4gICAgdGhpcy5zY3JvbGxEaXN0YW5jZSA9IDBcclxuICAgIHRoaXMucG9zaXRpb25ZID0gdGhpcy50YXJnZXQuc2Nyb2xsVG9wXHJcbiAgICBpZiAodGhpcy50YXJnZXQpIHRoaXMudGFyZ2V0ID0gdW5kZWZpbmVkXHJcbiAgfVxyXG5cclxuICBpc1Njcm9sbGFibGUoZWxlbWVudDogRWxlbWVudCwgZXZlbnQ6IEF1Z21lbnRlZFdoZWVsRXZlbnQpIHtcclxuICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IGV2ZW50LmRlbHRhWCAmJiAhZXZlbnQuZGVsdGFZXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5pc0NvbnRlbnRPdmVyZmxvd2luZyhlbGVtZW50LCBpc0hvcml6b250YWwpICYmXHJcbiAgICAgIHRoaXMuaGFzT3ZlcmZsb3dTdHlsZShlbGVtZW50LCBpc0hvcml6b250YWwpXHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBpc0NvbnRlbnRPdmVyZmxvd2luZyhlbGVtZW50OiBFbGVtZW50LCBob3Jpem9udGFsOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBjbGllbnQgPSBob3Jpem9udGFsID8gZWxlbWVudC5jbGllbnRXaWR0aCA6IGVsZW1lbnQuY2xpZW50SGVpZ2h0XHJcbiAgICBjb25zdCBzY3JvbGwgPSBob3Jpem9udGFsID8gZWxlbWVudC5zY3JvbGxXaWR0aCA6IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0XHJcbiAgICByZXR1cm4gY2xpZW50IDwgc2Nyb2xsXHJcbiAgfVxyXG5cclxuICBoYXNPdmVyZmxvd1N0eWxlKGVsZW1lbnQ6IEVsZW1lbnQsIGhvcml6b250YWw6IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVxyXG4gICAgY29uc3Qgb3ZlcmZsb3cgPSBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKGhvcml6b250YWwgPyAnb3ZlcmZsb3cteCcgOiAnb3ZlcmZsb3cteScpXHJcbiAgICByZXR1cm4gL14oc2Nyb2xsfGF1dG8pJC8udGVzdChvdmVyZmxvdylcclxuICB9XHJcblxyXG4gIGlzVHJhY2tQYWRVc2VkKGV2ZW50OiBBdWdtZW50ZWRXaGVlbEV2ZW50KSB7XHJcbiAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjI0MTU3NTQvODU4NjgwM1xyXG5cclxuICAgIGxldCBpc1RyYWNrUGFkID0gZmFsc2VcclxuICAgIGlmIChldmVudC53aGVlbERlbHRhWSkge1xyXG4gICAgICBpZiAoZXZlbnQud2hlZWxEZWx0YVkgPT09IGV2ZW50LmRlbHRhWSAqIC0zKSB7XHJcbiAgICAgICAgaXNUcmFja1BhZCA9IHRydWVcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChldmVudC5kZWx0YU1vZGUgPT09IDApIHtcclxuICAgICAgaXNUcmFja1BhZCA9IHRydWVcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaXNUcmFja1BhZFxyXG4gIH1cclxuXHJcbiAgYXN5bmMgbG9hZFNldHRpbmdzKCkge1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSlcclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcclxuICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncylcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFNldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XHJcbiAgcGx1Z2luOiBTY3JvbGxTcGVlZFxyXG5cclxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBTY3JvbGxTcGVlZCkge1xyXG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pXHJcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpblxyXG4gIH1cclxuXHJcbiAgZGlzcGxheSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHtjb250YWluZXJFbH0gPSB0aGlzXHJcbiAgICBjb250YWluZXJFbC5lbXB0eSgpXHJcblxyXG4gICAgbGV0IHNwZWVkU2xpZGVyOiBTbGlkZXJDb21wb25lbnRcclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnTW91c2UgU2Nyb2xsIFNwZWVkJylcclxuICAgICAgLnNldERlc2MoJzEgaXMgdGhlIGRlZmF1bHQgc2Nyb2xsIHNwZWVkLCBoaWdoZXIgaXMgZmFzdGVyJylcclxuICAgICAgLmFkZEV4dHJhQnV0dG9uKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uXHJcbiAgICAgICAgICAuc2V0SWNvbigncmVzZXQnKVxyXG4gICAgICAgICAgLnNldFRvb2x0aXAoJ1Jlc3RvcmUgZGVmYXVsdCcpXHJcbiAgICAgICAgICAub25DbGljayhhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNwZWVkID0gREVGQVVMVF9TRVRUSU5HUy5zcGVlZFxyXG4gICAgICAgICAgICBzcGVlZFNsaWRlci5zZXRWYWx1ZShERUZBVUxUX1NFVFRJTkdTLnNwZWVkKVxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgICAgLmFkZFNsaWRlcihzbGlkZXIgPT4ge1xyXG4gICAgICAgIHNwZWVkU2xpZGVyID0gc2xpZGVyXHJcbiAgICAgICAgc2xpZGVyXHJcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3BlZWQpXHJcbiAgICAgICAgICAuc2V0TGltaXRzKDAuMSwgMTAsIDAuMSlcclxuICAgICAgICAgIC5zZXREeW5hbWljVG9vbHRpcCgpXHJcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgdmFsdWUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zcGVlZCA9IHZhbHVlXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9KVxyXG5cclxuICAgIGxldCBhbHRNdWx0aXBsaWVyU2xpZGVyOiBTbGlkZXJDb21wb25lbnRcclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnQWx0IE11bHRpcGxpZXInKVxyXG4gICAgICAuc2V0RGVzYygnTXVsdGlwbHkgc2Nyb2xsIHNwZWVkIHdoZW4gdGhlIEFMVCBrZXkgaXMgcHJlc3NlZCcpXHJcbiAgICAgIC5hZGRFeHRyYUJ1dHRvbihidXR0b24gPT4ge1xyXG4gICAgICAgIGJ1dHRvblxyXG4gICAgICAgICAgLnNldEljb24oJ3Jlc2V0JylcclxuICAgICAgICAgIC5zZXRUb29sdGlwKCdSZXN0b3JlIGRlZmF1bHQnKVxyXG4gICAgICAgICAgLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hbHRNdWx0aXBsaWVyID0gREVGQVVMVF9TRVRUSU5HUy5hbHRNdWx0aXBsaWVyXHJcbiAgICAgICAgICAgIGFsdE11bHRpcGxpZXJTbGlkZXIuc2V0VmFsdWUoREVGQVVMVF9TRVRUSU5HUy5hbHRNdWx0aXBsaWVyKVxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgICAgLmFkZFNsaWRlcihzbGlkZXIgPT4ge1xyXG4gICAgICAgIGFsdE11bHRpcGxpZXJTbGlkZXIgPSBzbGlkZXJcclxuICAgICAgICBzbGlkZXJcclxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hbHRNdWx0aXBsaWVyKVxyXG4gICAgICAgICAgLnNldExpbWl0cygwLjEsIDEwLCAwLjEpXHJcbiAgICAgICAgICAuc2V0RHluYW1pY1Rvb2x0aXAoKVxyXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jIHZhbHVlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYWx0TXVsdGlwbGllciA9IHZhbHVlXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9KVxyXG5cclxuICAgIGxldCBhbmltYXRpb25Ub2dnbGU6IFRvZ2dsZUNvbXBvbmVudFxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKCdFbmFibGUgQW5pbWF0aW9uJylcclxuICAgICAgLnNldERlc2MoJ1RvZ2dsZSBzbW9vdGggc2Nyb2xsaW5nIGFuaW1hdGlvbnMnKVxyXG4gICAgICAuYWRkRXh0cmFCdXR0b24oYnV0dG9uID0+IHtcclxuICAgICAgICBidXR0b25cclxuICAgICAgICAgIC5zZXRJY29uKCdyZXNldCcpXHJcbiAgICAgICAgICAuc2V0VG9vbHRpcCgnUmVzdG9yZSBkZWZhdWx0JylcclxuICAgICAgICAgIC5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQW5pbWF0aW9ucyA9IERFRkFVTFRfU0VUVElOR1MuZW5hYmxlQW5pbWF0aW9uc1xyXG4gICAgICAgICAgICBhbmltYXRpb25Ub2dnbGUuc2V0VmFsdWUoREVGQVVMVF9TRVRUSU5HUy5lbmFibGVBbmltYXRpb25zKVxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4ge1xyXG4gICAgICAgIGFuaW1hdGlvblRvZ2dsZSA9IHRvZ2dsZVxyXG4gICAgICAgIHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVBbmltYXRpb25zKS5vbkNoYW5nZShhc3luYyB2YWx1ZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVBbmltYXRpb25zID0gdmFsdWVcclxuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBUU87QUFjUCxJQUFNLG1CQUE2QjtBQUFBLEVBQ2pDLE9BQU87QUFBQSxFQUNQLGVBQWU7QUFBQSxFQUNmLGtCQUFrQjtBQUFBO0FBR3BCLGdDQUF5Qyx1QkFBTztBQUFBLEVBQWhELGNBNUJBO0FBNEJBO0FBR0UsK0JBQXNCO0FBQ3RCLHFCQUFZO0FBQ1osb0JBQVc7QUFFWCwwQkFBaUI7QUFZakIsOEJBQXFCLENBQUMsTUFBdUIsWUFBbUI7QUFDOUQsV0FBSyxpQkFBaUIsU0FBUSxTQUFTLEtBQUssZ0JBQWdCLEVBQUMsU0FBUztBQUFBO0FBR3hFLDBCQUFpQixDQUFDLFVBQStCO0FBQy9DLFlBQU07QUFHTixZQUFNLE9BQU8sTUFBTSxRQUFTLE1BQU0sZ0JBQWlCLE1BQU07QUFFekQsaUJBQVcsV0FBVyxNQUFNO0FBQzFC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
