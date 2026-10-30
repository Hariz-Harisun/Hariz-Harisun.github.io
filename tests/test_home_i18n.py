from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class StaticHomePagesTests(unittest.TestCase):
    def test_english_and_malay_home_sources_are_static(self):
        english = (ROOT / "index.qmd").read_text(encoding="utf-8")
        malay = (ROOT / "index-bm.qmd").read_text(encoding="utf-8")

        for source in (english, malay):
            self.assertNotIn("data-i18n", source)
            self.assertEqual(source.count("::: {.text-left-justify}"), 4)
            self.assertIn("- **", source)

        self.assertIn("lang: en", english)
        self.assertIn("lang: ms", malay)

    def test_site_config_uses_static_language_links_without_i18n_assets(self):
        config = (ROOT / "_quarto.yml").read_text(encoding="utf-8")

        self.assertIn('text: "EN |"', config)
        self.assertIn("href: index.qmd", config)
        self.assertIn("text: BM", config)
        self.assertIn("href: index-bm.qmd", config)
        self.assertNotIn("i18n.js", config)
        self.assertNotIn("marked.min.js", config)
        self.assertNotIn("i18n/", config)

    def test_rendered_home_pages_are_static_html(self):
        for name, lang in (("index.html", "en"), ("index-bm.html", "ms")):
            html = (ROOT / "_site" / name).read_text(encoding="utf-8")

            self.assertIn(f'lang="{lang}"', html)
            self.assertIn("<strong>", html)
            self.assertIn("<ul>", html)
            self.assertIn('href="./index.html"', html)
            self.assertIn('href="./index-bm.html"', html)
            self.assertNotIn("data-i18n", html)
            self.assertNotIn("marked.min.js", html)
            self.assertNotIn("i18n.js", html)


if __name__ == "__main__":
    unittest.main()
