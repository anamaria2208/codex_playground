import { afterEach, describe, expect, it, vi } from 'vitest'
import { CAT_FACT_FETCH_ERROR, fetchCatFact } from './catFactsApi'

describe('fetchCatFact', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('returns the fact when the API response is valid', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ fact: 'Cats sleep for most of the day.' })
    } as Response)

    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchCatFact()).resolves.toBe('Cats sleep for most of the day.')
    expect(fetchMock).toHaveBeenCalledWith('/api/cat-facts/random')
  })

  it('throws a fetch error when the response is not successful', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false
      } as Response)
    )

    await expect(fetchCatFact()).rejects.toThrow(CAT_FACT_FETCH_ERROR)
  })

  it('throws a fetch error when the payload does not contain a usable fact', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ fact: '   ' })
      } as Response)
    )

    await expect(fetchCatFact()).rejects.toThrow(CAT_FACT_FETCH_ERROR)
  })
})
