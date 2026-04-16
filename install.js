module.exports = {
  run: [
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/Tencent-Hunyuan/HY-World-2.0 app"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install setuptools wheel packaging ninja",
          "uv pip install torch==2.4.0 torchvision==0.19.0 --index-url https://download.pytorch.org/whl/cu124",
          "uv pip install -r ../requirements.pinokio.txt"
        ]
      }
    },
    {
      when: "{{platform === 'win32'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install --no-deps https://huggingface.co/lldacing/flash-attention-windows-wheel/resolve/main/flash_attn-2.7.0.post2%2Bcu124torch2.4.0cxx11abiFALSE-cp310-cp310-win_amd64.whl"
        ]
      }
    },
    {
      when: "{{platform !== 'win32'}}",
      method: "shell.run",
      params: {
        build: true,
        env: {
          USE_NINJA: 0,
          DISTUTILS_USE_SDK: 1
        },
        venv: "env",
        path: "app",
        message: [
          "uv pip install flash-attn --no-build-isolation"
        ]
      }
    },
    {
      method: "fs.link",
      params: {
        venv: "app/env"
      }
    }
  ]
}
