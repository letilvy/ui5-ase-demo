# TDD Kata
Greeter

All tests should always pass, regardless of environment conditions.

Write a `Greeter` class with `greet` function that receives a `name` as input and outputs `Hello <name>`. The signature of `greet` should not change throughout the kata. You are allowed to construct `Greeter` object as you please.

1. `greet` trims the input
2. `greet` returns `Good morning <name>` when 06:00 <= time < 12:00
3. `greet` returns `Good evening <name>` when 18:00 <= time < 22:00
4. `greet` returns `Good night <name>`   when 22:00 <= time < 6:00
