let base = require('./base')
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])

// letants
let NORTH = { x: 0, y:-1 }
let SOUTH = { x: 0, y: 1 }
let EAST  = { x: 1, y: 0 }
let WEST  = { x:-1, y: 0 }

// Point operations
let pointEq = p1 => p2 => p1.x == p2.x && p1.y == p2.y

// Booleans
let willEat   = state => pointEq(nextHead(state))(state.apple)
let willCrash = state => state.snake.find(pointEq(nextHead(state)))
let validMove = move => state =>
  state.moves[0].x + move.x != 0 || state.moves[0].y + move.y != 0

// Next values based on state
let nextMoves = state => state.moves.length > 1 ? dropFirst(state.moves) : state.moves
let nextApple = state => willEat(state) ? rndPos(state) : state.apple
let nextHead  = state => state.snake.length == 0
  ? { x: 2, y: 2 }
  : {
    x: mod(state.cols)(state.snake[0].x + state.moves[0].x),
    y: mod(state.rows)(state.snake[0].y + state.moves[0].y)
  }
let nextSnake = state => willCrash(state)
  ? []
  : (willEat(state)
    ? [nextHead(state)].concat(state.snake)
    : [nextHead(state)].concat(dropLast(state.snake)))

// Randomness
let rndPos = table => ({
  x: rnd(0)(table.cols - 1),
  y: rnd(0)(table.rows - 1)
})

// Initial state
let initialState = () => ({
  cols:  20,
  rows:  14,
  moves: [EAST],
  snake: [],
  apple: { x: 16, y: 2 },
})

let next = spec({
  rows:  prop('rows'),
  cols:  prop('cols'),
  moves: nextMoves,
  snake: nextSnake,
  apple: nextApple
})

let enqueue = (state, move) => validMove(move)(state)
  ? merge(state)({ moves: state.moves.concat([move]) })
  : state

module.exports = { EAST, NORTH, SOUTH, WEST, initialState, enqueue, next, }