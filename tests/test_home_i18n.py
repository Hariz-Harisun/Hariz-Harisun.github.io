from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class HomeI18nTests(unittest.TestCase):
    def test_translation_blocks_support_html_markup(self):
        script = (ROOT / "assets" / "i18n.js").read_text(encoding="utf-8")
        self.assertIn("marked.parse", script)
        self.assertIn("innerHTML = renderMarkdown", script)
        self.assertNotIn("p.textContent = str;", script)

    def test_what_i_do_is_a_valid_fenced_div_with_list(self):
        source = (ROOT / "index.qmd").read_text(encoding="utf-8")
        self.assertIn('::: {.text-left-justify data-i18n="home.what-list"}', source)
        self.assertIn(
            'data-i18n="home.what-list"}\n\n- **Industrial IoT & AI Integration:**',
            source,
        )


if __name__ == "__main__":
    unittest.main()
