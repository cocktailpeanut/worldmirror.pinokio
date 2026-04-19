module.exports = {
  version: "7.0",
  title: "WorldMirror 2.0",
  description: "[NVIDIA / CUDA 12.4] Pinokio launcher for the released WorldMirror 2.0 reconstruction app from HY-World 2.0. Upstream full world-generation code is still marked coming soon. https://github.com/Tencent-Hunyuan/HY-World-2.0",
  icon: "icon.svg",
  menu: async (kernel, info) => {
    const installed = info.exists("app/env")
    const running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js")
    }

    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running.start) {
        const local = info.local("start.js")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js",
          }]
        }

        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Terminal",
          href: "start.js",
        }]
      } else if (running.update) {
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Updating",
          href: "update.js",
        }]
      } else if (running.reset) {
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Resetting",
          href: "reset.js",
        }]
      }

      const menu = [{
        icon: "fa-solid fa-cube",
        text: "Start WorldMirror 2.0",
        href: "start.js",
      }, {
        icon: "fa-solid fa-gauge-high",
        text: "Start WorldMirror 2.0 Low VRAM (bf16)",
        href: "start.js",
        params: {
          enable_bf16: true
        }
      }]

      if (info.exists("app/examples/worldrecon")) {
        menu.push({
          icon: "fa-regular fa-images",
          text: "Example Scenes",
          href: "app/examples/worldrecon",
          fs: true
        })
      }

      if (info.exists("app/gradio_demo_output")) {
        menu.push({
          icon: "fa-regular fa-folder-open",
          text: "Open Outputs",
          href: "app/gradio_demo_output",
          fs: true
        })
      }

      menu.push({
        icon: "fa-regular fa-folder-open",
        text: "Open App Folder",
        href: "app",
        fs: true
      }, {
        icon: "fa-solid fa-plug",
        text: "Update",
        href: "update.js",
      }, {
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }, {
        icon: "fa-regular fa-circle-xmark",
        text: "Reset",
        href: "reset.js",
      })

      return menu
    }

    return [{
      default: true,
      icon: "fa-solid fa-plug",
      text: "Install",
      href: "install.js",
    }]
  }
}
