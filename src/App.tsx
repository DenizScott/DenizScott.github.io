import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DEFAULT_LANG } from './data/types.ts';
import { getStoredLang } from './lib/storage.ts';
import { LangLayout } from './pages/LangLayout.tsx';
import { Home } from './pages/Home.tsx';
import { ProjectDetail } from './pages/ProjectDetail.tsx';
import { NotFound } from './pages/NotFound.tsx';

/** Root redirect: first visit lands on /en by default, returning visitor honors saved choice */
function RootRedirect() {
  const target = getStoredLang() || DEFAULT_LANG;
  return <Navigate to={`/${target}`} replace />;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />

        {/* Localized routes: /en, /tr */}
        <Route path=":lang" element={<LangLayout />}>
          <Route index element={<Home />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Global fallback for unlocalized URLs */}
        <Route path="*" element={<Navigate to={`/${DEFAULT_LANG}/404`} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
