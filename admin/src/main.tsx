import { ThemeProvider } from '@/components/app/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import '@/index.css'
import '@/theme.css'
import { AppProvider } from '@/lib/app-provider'
import router from '@/router'
import i18n from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { initReactI18next } from 'react-i18next'
import { RouterProvider } from 'react-router-dom'
import { SidebarProvider } from './context/sidebar-context'
import { PageTitle } from './components/custom/page-title'
import FaviconSetting from './components/custom/favicon-setting'

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng)
})

i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      async (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: 'en',
    lng: localStorage.getItem('i18nextLng') || 'en',
    react: {
      useSuspense: false,
    },
  })

const App = () => {
  return (
    <React.StrictMode>
      <AppProvider>
        <SidebarProvider>
          <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <PageTitle />
            <FaviconSetting />
            <RouterProvider router={router} />
            <Toaster />
          </ThemeProvider>
        </SidebarProvider>
      </AppProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
