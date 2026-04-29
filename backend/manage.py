#!/usr/bin/env python
import os
import sys


def main() -> None:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        is_windows = os.name == "nt"
        venv_python = os.path.join(
            backend_dir,
            ".venv",
            "Scripts" if is_windows else "bin",
            "python.exe" if is_windows else "python",
        )
        activate_cmd = (
            r".venv\Scripts\activate" if is_windows else "source .venv/bin/activate"
        )
        raise ImportError(
            "\n".join(
                [
                    "Couldn't import Django.",
                    "",
                    "You're probably not running inside the project's virtualenv.",
                    "Try:",
                    "  cd backend",
                    f"  {activate_cmd}",
                    "  python -m pip install -r requirements.txt",
                    "",
                    f"Or run directly: {venv_python} manage.py runserver",
                ]
            )
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
