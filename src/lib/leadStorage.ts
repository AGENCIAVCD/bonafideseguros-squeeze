import type { LeadRecord } from '../types/lead'

const LEADS_STORAGE_KEY = 'bonafide_leads'
const LAST_CODE_KEY = 'bonafide_last_code'

function getStoredLeads() {
  const raw = localStorage.getItem(LEADS_STORAGE_KEY)
  if (!raw) {
    return [] as LeadRecord[]
  }

  try {
    return JSON.parse(raw) as LeadRecord[]
  } catch {
    return [] as LeadRecord[]
  }
}

export async function saveLead(record: LeadRecord) {
  await new Promise((resolve) => setTimeout(resolve, 900))

  const leads = getStoredLeads()
  leads.push(record)

  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads))
  localStorage.setItem(LAST_CODE_KEY, record.id)
}

export function getLastCode() {
  return localStorage.getItem(LAST_CODE_KEY)
}
