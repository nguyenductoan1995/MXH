export const AuthorisationURL = ''
export const APIURL = ''

export const API_ENDPOINTS = {
  auth: {
    Employer: '/Authorisation/ValidateUmbrellaEmployer',
    login: '/Login/ValidateLogin',
  },
}

export const constructUrlEndPointAuth = (api) => `${AuthorisationURL}${api}`
export const constructUrlEndPoint = (api) => `${APIURL}${api}`

export const formatStringUrl = (...args) => {
  let i = 1
  const str = args[0]

  return str.replace(/\{\}/g, () => args[i++])
}

export const prettifyEndpointAuth = (api, ...args) => formatStringUrl(constructUrlEndPointAuth(api), args)
export const prettifyEndpoint = (api, ...args) => formatStringUrl(constructUrlEndPoint(api), args)
