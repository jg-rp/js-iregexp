# I-Regexp for JavaScript

Check regular expressions for compliance with [RFC 9485](https://datatracker.ietf.org/doc/html/rfc9485).

```js
import { check } from "iregexp";

check(String.raw`[ab]{3}`); // true
check(String.raw`[0-9]*?`); // false
```
