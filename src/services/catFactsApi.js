const API_BASE_URL = 'https://cat-fact.herokuapp.com'

export async function fetchCatFacts() {
  const response = await fetch(`${API_BASE_URL}/facts/random?animal_type=cat&amount=5`)

  if (!response.ok) {
    throw new Error('Nije moguće preuzeti cat facts podatke.')
  }

  const data = await response.json()
  return Array.isArray(data) ? data : [data]
}
