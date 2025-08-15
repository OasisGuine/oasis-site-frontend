import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { handleAnchorNavigation } from '@/utilities/scrollToAnchor'

// Pages
import HomePage from '@/pages/HomePage'
import ContributePage from '@/pages/ContributePage'
import CancelPage from '@/pages/CancelPage'
import SuccessPage from '@/pages/SuccessPage'
import HelpPage from '@/pages/HelpPage'
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage'
import ProjectsPage from '@/pages/ProjectsPage'
import WhoWeArePage from '@/pages/WhoWeArePage'

function App() {
  const location = useLocation()

  useEffect(() => {
    const cleanup = handleAnchorNavigation()
    return cleanup
  }, [])

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.replace('#', ''))
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    } else {
      // Scroll to top when navigating to a page without anchor
      window.scrollTo(0, 0)
    }
  }, [location])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contribute" element={<ContributePage />} />
      <Route path="/contribute/cancel" element={<CancelPage />} />
      <Route path="/contribute/success" element={<SuccessPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/who-we-are" element={<WhoWeArePage />} />
    </Routes>
  )
}

export default App