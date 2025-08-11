import { Routes, Route } from 'react-router-dom'

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