"""Add a content-based version tag to the site's own CSS/JS links.

GitHub Pages lets browsers cache stylesheets for ~10 minutes. Without a version
tag, a visitor can get a new page with an old stylesheet right after a deploy.
This appends ?v=<hash of the file> so a changed file always gets a new URL.
"""
import hashlib, os


def on_config(config):
    docs = config["docs_dir"]

    def tag(items):
        out = []
        for item in items:
            path = str(getattr(item, "path", item))
            local = os.path.join(docs, path.split("?")[0])
            if "://" not in path and os.path.isfile(local):
                digest = hashlib.md5(open(local, "rb").read()).hexdigest()[:8]
                path = f"{path.split('?')[0]}?v={digest}"
                if hasattr(item, "path"):
                    item.path = path
                    out.append(item)
                    continue
            out.append(path if not hasattr(item, "path") else item)
        return out

    config["extra_css"] = tag(config["extra_css"])
    config["extra_javascript"] = tag(config["extra_javascript"])
    return config
