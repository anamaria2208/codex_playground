const API_BASE_URL = 'https://catfact.ninja'
export const CAT_FACT_FETCH_ERROR = 'CAT_FACT_FETCH_ERROR'

type CatFactResponse = {
  fact: string
}

export async function fetchCatFact(): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/fact?_t=${Date.now()}`)

  if (!response.ok) {
    throw new Error(CAT_FACT_FETCH_ERROR)
  }

  const data = (await response.json()) as CatFactResponse
  return data.fact
}
