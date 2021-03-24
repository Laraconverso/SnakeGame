let adjust    = n => f => xs => mapi(x => i => i == n ? f(x) : x)(xs)
let dropFirst = xs => xs.slice(1)
let dropLast  = xs => xs.slice(0, xs.length - 1)
let id        = x => x
let k         = x => y => x
let map       = f => xs => xs.map(f)
let mapi      = f => xs => xs.map((x, i) => f(x)(i))
let merge     = o1 => o2 => Object.assign({}, o1, o2)
let mod       = x => y => ((y % x) + x) % x // http://bit.ly/2oF4mQ7
let objOf     = k => v => ({ [k]: v })
let pipe      = (...fns) => x => [...fns].reduce((acc, f) => f(acc), x)
let prop      = k => o => o[k]
let range     = n => m => Array.apply(null, Array(m - n)).map((_, i) => n + i)
let rep       = c => n => map(k(c))(range(0)(n))
let rnd       = min => max => Math.floor(Math.random() * max) + min
let spec      = o => x => Object.keys(o)
  .map(k => objOf(k)(o[k](x)))
  .reduce((acc, o) => Object.assign(acc, o))

module.exports = { adjust, dropFirst, dropLast, id, k, map, merge, mod, objOf, pipe, prop, range, rep, rnd, spec }
