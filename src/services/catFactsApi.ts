const API_BASE_URL = 'https://catfact.ninja'

type CatFactResponse = {
  fact: string
}

export async function fetchCatFact(): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/fact?_t=${Date.now()}`)

  if (!response.ok) {
    throw new Error('Nije moguce preuzeti cat facts podatke.')
  }

  const data = (await response.json()) as CatFactResponse
  return data.fact
}
