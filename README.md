# Vue 3 Frontend Starter

Novi Vue 3 projekat postavljen po modernim frontend standardima.

## Tehnologije

- Vue 3 (Composition API + `<script setup>`)
- Vite
- TypeScript
- Vue Router
- Pinia
- ESLint (flat config) + Prettier

## Preporučeni setup

```sh
npm install
```

### Development

```sh
npm run dev
```

### Type check + build

```sh
npm run build
```

### Lint

```sh
npm run lint
```

### Format

```sh
npm run format
```

## Troubleshooting: `npm install` vraća `403 Forbidden`

Ako `npm install` ne prolazi zbog `403` greške prema npm registry-ju, problem je obično u mrežnoj/policy konfiguraciji okruženja, a ne u samom kodu projekta.

Preporučeni redosled provere:

1. Proveri aktivni registry:

```sh
npm config get registry
```

2. Ako treba, vrati na javni npm registry:

```sh
npm config set registry https://registry.npmjs.org/
```

3. Proveri da li postoje proxy varijable koje kvare konekciju (`HTTP_PROXY`, `HTTPS_PROXY`, `NPM_CONFIG_PROXY`, `NPM_CONFIG_HTTPS_PROXY`).
4. Ako radiš u kompanijskom okruženju, proveri da li treba interni registry (Artifactory/Nexus) i odgovarajući npm token.
5. Ako postoji zaključana CI mreža, dependency komande pokreni lokalno ili u okruženju sa dozvoljenim pristupom registry-ju.

### Preporučena napomena u PR-u/izveštaju

Ako se problem desi u sandbox/CI okruženju, koristi jasnu formulaciju:

> `npm install` nije uspeo zbog ograničenja mreže/policy-ja okruženja (`403 Forbidden` ka npm registry-ju). Zbog toga build/lint/test komande koje zavise od instaliranih dependency-ja nisu mogle biti izvršene u ovom okruženju.

Ova napomena jasno odvaja infrastrukturni problem od kvaliteta implementacije.
