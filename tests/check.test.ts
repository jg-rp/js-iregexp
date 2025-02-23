/** I-Regexp checking tests.
 *
 * Some of these test cases are derived from https:github.com/f3ath/iregexp.
 * Thanks go to f3ath and the project's license is included here.
 *
 * MIT License
 *
 * Copyright (c) 2023 Alexey
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { check } from "../src/index";

type TestCase = {
  description: string;
  pattern: string;
};

const VALID_TEST_CASES: TestCase[] = [
  { description: "dot", pattern: String.raw`a.b` },
  { description: "char_class_expr", pattern: String.raw`[0-9]` },
  { description: "branch", pattern: String.raw`foo|bar` },
  { description: "range_quantifier_exact", pattern: String.raw`[ab]{3}` },
  { description: "range_quantifier", pattern: String.raw`[ab]{3,5}` },
  { description: "range_quantifier_open_ended", pattern: String.raw`[ab]{3,}` },
  {
    description: "range_quantifier_double_digit",
    pattern: String.raw`[ab]{13,25}`,
  },
  {
    description: "range_quantifier_double_digit_open_ended",
    pattern: String.raw`[ab]{333,}`,
  },
  { description: "char_class_expr_negation", pattern: String.raw`[^ab]` },
  { description: "char_class_expr_escape", pattern: String.raw`[\]ab]` },
  {
    description: "unicode_character_category_letter",
    pattern: String.raw`\p{L}`,
  },
  {
    description: "unicode_character_category_letter_uppercase",
    pattern: String.raw`\p{Lu}`,
  },
  {
    description: "unicode_character_category_letter_lowercase",
    pattern: String.raw`\p{Ll}`,
  },
  {
    description: "unicode_character_category_letter_titlecase",
    pattern: String.raw`\p{Lt}`,
  },
  {
    description: "unicode_character_category_letter_modifier",
    pattern: String.raw`\p{Lm}`,
  },
  {
    description: "unicode_character_category_letter_other",
    pattern: String.raw`\p{Lo}`,
  },
  {
    description: "unicode_character_category_mark_nonspcaing",
    pattern: String.raw`\p{Mn}`,
  },
  {
    description: "unicode_character_category_mark_spacing_combining",
    pattern: String.raw`\p{Mc}`,
  },
  {
    description: "unicode_character_category_mark_enclosing",
    pattern: String.raw`\p{Me}`,
  },
  {
    description: "unicode_character_category_number_decimal_digit",
    pattern: String.raw`\p{Nd}`,
  },
  {
    description: "unicode_character_category_number_letter",
    pattern: String.raw`\p{Nl}`,
  },
  {
    description: "unicode_character_category_number_other",
    pattern: String.raw`\p{No}`,
  },
  {
    description: "unicode_character_category_punctuation_connector",
    pattern: String.raw`\p{Pc}`,
  },
  {
    description: "unicode_character_category_punctuation_dash",
    pattern: String.raw`\p{Pd}`,
  },
  {
    description: "unicode_character_category_punctuation_open",
    pattern: String.raw`\p{Ps}`,
  },
  {
    description: "unicode_character_category_punctuation_close",
    pattern: String.raw`\p{Pe}`,
  },
  {
    description: "unicode_character_category_punctuation_initial_quote",
    pattern: String.raw`\p{Pi}`,
  },
  {
    description: "unicode_character_category_punctuation_final_quote",
    pattern: String.raw`\p{Pf}`,
  },
  {
    description: "unicode_character_category_punctuation_other",
    pattern: String.raw`\p{Po}`,
  },
  {
    description: "unicode_character_category_symbol_math",
    pattern: String.raw`\p{Sm}`,
  },
  {
    description: "unicode_character_category_symbol_currency",
    pattern: String.raw`\p{Sc}`,
  },
  {
    description: "unicode_character_category_symbol_modifier",
    pattern: String.raw`\p{Sk}`,
  },
  {
    description: "unicode_character_category_symbol_other",
    pattern: String.raw`\p{So}`,
  },
  {
    description: "unicode_character_category_separator_space",
    pattern: String.raw`\p{Zs}`,
  },
  {
    description: "unicode_character_category_separator_line",
    pattern: String.raw`\p{Zl}`,
  },
  {
    description: "unicode_character_category_separator_paragraph",
    pattern: String.raw`\p{Zp}`,
  },
  {
    description: "unicode_character_category_other_control",
    pattern: String.raw`\p{Cc}`,
  },
  {
    description: "unicode_character_category_other_format",
    pattern: String.raw`\p{Cf}`,
  },
  {
    description: "unicode_character_category_other_private_use",
    pattern: String.raw`\p{Co}`,
  },
  {
    description: "unicode_character_category_other_not_assigned",
    pattern: String.raw`\p{Cn}`,
  },
  {
    description: "unicode_character_category_inverted_letter",
    pattern: String.raw`\P{L}`,
  },
  {
    description: "unicode_character_category_inverted_letter_uppercase",
    pattern: String.raw`\P{Lu}`,
  },
  {
    description: "unicode_character_category_inverted_letter_lowercase",
    pattern: String.raw`\P{Ll}`,
  },
  {
    description: "unicode_character_category_inverted_letter_titlecase",
    pattern: String.raw`\P{Lt}`,
  },
  {
    description: "unicode_character_category_inverted_letter_modifier",
    pattern: String.raw`\P{Lm}`,
  },
  {
    description: "unicode_character_category_inverted_letter_other",
    pattern: String.raw`\P{Lo}`,
  },
  {
    description: "unicode_character_category_inverted_mark_nonspacing",
    pattern: String.raw`\P{Mn}`,
  },
  {
    description: "unicode_character_category_inverted_mark_spacing_combining",
    pattern: String.raw`\P{Mc}`,
  },
  {
    description: "unicode_character_category_inverted_mark_enclosing",
    pattern: String.raw`\P{Me}`,
  },
  {
    description: "unicode_character_category_inverted_number_decimal_digit",
    pattern: String.raw`\P{Nd}`,
  },
  {
    description: "unicode_character_category_inverted_number_letter",
    pattern: String.raw`\P{Nl}`,
  },
  {
    description: "unicode_character_category_inverted_number_other",
    pattern: String.raw`\P{No}`,
  },
  {
    description: "unicode_character_category_inverted_punctuation_connector",
    pattern: String.raw`\P{Pc}`,
  },
  {
    description: "unicode_character_category_inverted_punctuation_dash",
    pattern: String.raw`\P{Pd}`,
  },
  {
    description: "unicode_character_category_inverted_punctuation_open",
    pattern: String.raw`\P{Ps}`,
  },
  {
    description: "unicode_character_category_inverted_punctuation_close",
    pattern: String.raw`\P{Pe}`,
  },
  {
    description:
      "unicode_character_category_inverted_punctuation_initial_quote",
    pattern: String.raw`\P{Pi}`,
  },
  {
    description: "unicode_character_category_inverted_punctuation_final_quote",
    pattern: String.raw`\P{Pf}`,
  },
  {
    description: "unicode_character_category_inverted_punctuation_other",
    pattern: String.raw`\P{Po}`,
  },
  {
    description: "unicode_character_category_inverted_symbol_math",
    pattern: String.raw`\P{Sm}`,
  },
  {
    description: "unicode_character_category_inverted_symbol_currency",
    pattern: String.raw`\P{Sc}`,
  },
  {
    description: "unicode_character_category_inverted_symbol_modifier",
    pattern: String.raw`\P{Sk}`,
  },
  {
    description: "unicode_character_category_inverted_symbol_other",
    pattern: String.raw`\P{So}`,
  },
  {
    description: "unicode_character_category_inverted_separator_space",
    pattern: String.raw`\P{Zs}`,
  },
  {
    description: "unicode_character_category_inverted_separator_line",
    pattern: String.raw`\P{Zl}`,
  },
  {
    description: "unicode_character_category_inverted_separator_paragraph",
    pattern: String.raw`\P{Zp}`,
  },
  {
    description: "unicode_character_category_inverted_other_control",
    pattern: String.raw`\P{Cc}`,
  },
  {
    description: "unicode_character_category_inverted_other_format",
    pattern: String.raw`\P{Cf}`,
  },
  {
    description: "unicode_character_category_inverted_other_private_use",
    pattern: String.raw`\P{Co}`,
  },
  {
    description: "unicode_character_category_inverted_other_not_assigned",
    pattern: String.raw`\P{Cn}`,
  },
];

const INVALID_TEST_CASES: TestCase[] = [
  { description: "named_group", pattern: String.raw`(?<group>[a-z]*)` },
  { description: "multi_char_escape", pattern: String.raw`\d` },
  { description: "multi_char_escape_class_expr", pattern: String.raw`[\S ]` },
  { description: "non_greedy_repetition", pattern: String.raw`[0-9]*?` },
  { description: "back_reference", pattern: String.raw`(\w)\1` },
  {
    description: "lookahead",
    pattern: String.raw`(?=.*[a-z])(?=.*[A-Z])(?=.*)[a-zA-Z]{8,}`,
  },
  { description: "lookbehind", pattern: String.raw`(?<=[a-z]{4})\[a-z]{2}` },
  { description: "non_capturing_group", pattern: String.raw`(?:[a-z]+)` },
  { description: "atomic_group", pattern: String.raw`(?>[a-z]+)` },
  { description: "conditional_group", pattern: String.raw`(?(1)a|b)` },
  { description: "comment", pattern: String.raw`(?#comment)` },
  { description: "flag", pattern: String.raw`(?i)[a-z]+` },
];

describe("valid iregexp patterns", () => {
  test.each<TestCase>(VALID_TEST_CASES)(
    "$description",
    ({ pattern }: TestCase) => {
      expect(check(pattern)).toBe(true);
    },
  );
});

describe("invalid iregexp patterns", () => {
  test.each<TestCase>(INVALID_TEST_CASES)(
    "$description",
    ({ pattern }: TestCase) => {
      expect(check(pattern)).toBe(false);
    },
  );
});
