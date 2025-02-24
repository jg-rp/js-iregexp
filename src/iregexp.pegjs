{{
    function isNormalChar(c) {
        return (
            c < "\u0027" ||
            c === "," ||
            c === "-" ||
            (c >= "\u002F" && c <= "\u003E") || // / .. >
            (c >= "\u0040" && c <= "\u005A") || // @ .. Z
            (c >= "\u005E" && c <= "\u007A") || // ^ .. z
            (c >= "\u007E" && c <= "\uD7FF") || // skip surrogate code points
            c >= "\uE000"
        );
    }

    function isCCChar(c) {
        return (
            c < "\u002C" ||
            (c >= "\u002E" && c <= "\u005A") || // '.' .. Z
            (c >= "\u005E" && c <= "\uD7FF") || // skip surrogate code points
            c >= "\uE000"
        );
    }
}}

start = ir:iregexp { return new RegExp('^(?:' + ir.flat(Infinity).filter(c => c).join('') + ')$', 'u') }

iregexp = branch ("|" branch)*
branch = piece*
piece = atom quantifier?
quantifier = ("*" / "+" / "?") / range_quantifier
range_quantifier = "{" [0-9]+ ("," [0-9]*)? "}"
atom = normal_char / char_class / ("(" iregexp ")")
normal_char = @c:. &{ return isNormalChar(c) }
char_class = "." { return '[^\n\r]' } / single_char_esc / char_class_esc / char_class_expr

single_char_esc = "\\" (
        [\u0028-\u002B]
        / "-"
        / "."
        / "?"
        / [\u005B-\u005E]
        / "n"
        / "r"
        / "t"
        / [\u007B-\u007D]
    )

char_class_esc = cat_esc / compl_esc
char_class_expr = "[" "^"? ("-" / cce1) cce1* "-"? "]"
cce1 = (cc_char ("-" cc_char)?) / char_class_esc
cc_char = @c:. &{ return isCCChar(c) } / single_char_esc
cat_esc = "\\p{" char_prop "}"
compl_esc = "\\P{" char_prop "}"
char_prop = is_category

is_category =
      letters
    / marks
    / numbers
    / punctuation
    / separators
    / symbols
    / others

letters = "L" ("l" / "m" / "o" / "t" / "u")?
marks   = "M" ("c" / "e" / "n")?
numbers = "N" ("d" / "l" / "o")?
punctuation = "P" ([\u0063-\u0066] / "i" / "o" / "s")?
separators = "Z" ("l" / "p" / "s")?
symbols    = "S" ("c" / "k" / "m" / "o")?
others     = "C" ("c" / "f" / "n" / "o")?