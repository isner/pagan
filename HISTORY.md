
# HISTORY

## 1.0.1

### Removes `Pagan#showErrors`

Failing silently is no longer an option. Errors that
would prevent intended behavior now throw.

### IDs are safe

Pagan no longer clobbers an existing `id` attribute
on its container. You may now use an element with a
pre-existing `id` as the constructor's first argument.

### Other minor improvements