import defaultSettings from '@/settings'

const title = defaultSettings.title || '质量开放管理平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
