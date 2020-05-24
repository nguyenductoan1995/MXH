export const AuthorisationURL = 'https://auth-sandbox.primoumbrella.co.uk'
export const APIURL = 'https://api-sandbox.primoumbrella.co.uk'

export const API_ENDPOINTS = {
  auth: {
    Employer: '/Authorisation/ValidateUmbrellaEmployer',
    login: '/Login/ValidateLogin',
  },
  dashBoard: {
    Summary: '/Dashboard/Summary',
  },
  Activity: {
    Assignments: '/Activity/Assignments',
    TimeSheets: '/Activity/Timesheets',
    addTimeSheet: '/Activity/Timesheet',
    Rates: '/Activity/AssignmentRates',
    expenses: '/Activity/Expenses',
    addExpense: '/Activity/Expense',
    payslips: '/Activity/Payslips',
  },
  Options: {
    option: '/OptionList/DataList',
    assignment: '/OptionList/Assignment',
    agency: '/OptionList/Agency',
  },
  Document: {
    companypersonal: '/Document/Documents',
    Document: '/Document/Personal',
    Company: '/Document/Company',
  },
  Profile: {
    Personal: '/Profile/Personal',
    Bank: '/Profile/Bank',
    HMRC: '/Profile/HMRC',
    Payroll: '/Profile/Payroll',
    AttachmentOrders: '/Profile/AttachmentOrders',
    SMP: '/Profile/Statutory/SMP',
  },
  Message: {
    Message: '/Message/Inbox',
    Compose: '/Message/Compose',
    Document: '/Message/Document',
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
