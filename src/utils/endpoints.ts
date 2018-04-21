let apiEndpoint = ''

switch (process.env.NODE_ENV) {
  case 'production':
    apiEndpoint = 'https://api.bastionlms.com/graphql'
    break
  case 'development':
    apiEndpoint = 'https://api.bastionlms.com/dev/graphql'
    break
  default:
    apiEndpoint = 'http://localhost:3000/graphql'
    break
}

export const ENV_ENDPOINT = apiEndpoint
