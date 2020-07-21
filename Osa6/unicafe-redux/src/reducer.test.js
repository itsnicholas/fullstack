import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  const initialState2 = {
    good: 2,
    ok: 2,
    bad: 2
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('reset state', () => {
    const action = {
      type: 'ZERO'
    }
    const state = initialState2

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })

  test('reset state', () => {
    const action = {
      type: 'GOOD'
    }

    const equalTo = [
      {
        good: 3,
        ok: 2,
        bad: 2
      },
      {
        good: 4,
        ok: 2,
        bad: 2
      }
    ]

    const state = initialState2

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(equalTo[0])
    expect(newState).toEqual({
      good: 3,
      ok: 2,
      bad: 2
    })
  })

})