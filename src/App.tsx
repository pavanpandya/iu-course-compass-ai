
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Recommendations from './pages/Recommendations';
import Search from './pages/Search';
import ChatbotPage from './pages/Chatbot';
import Enrolled from './pages/Enrolled';
import NotFound from './pages/NotFound';

import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/search" element={<Search />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/enrolled" element={<Enrolled />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App;
