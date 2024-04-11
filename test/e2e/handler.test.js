import {describe, expect, it} from '@jest/globals'

describe('Should run okay', () => {
    it('Should pass', () => {
        const variable = true
        expect(variable).toBe(true)
    })
})