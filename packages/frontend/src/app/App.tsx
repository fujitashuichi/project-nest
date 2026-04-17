"use client";

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage, ProjectsPage, UserPage } from './pages'
import { ProjectPage } from '../features/projects/components/ProjectPage'
import { TestRouter } from './routes/TestRouter'
import { ProjectProvider } from '../Context'
import { LoginAndSignUp } from './pages/LoginAndSignUp'
import { VercelNotice } from '../components/VercelNotice'
import { SessionProvider } from "next-auth/react";
import { LoginErrorPage } from '../features/auth/components/errors/LoginErrorPage';
import { AppLoadingBar } from '../components/AppLoadingBar';


function AppRouter() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginAndSignUp />} />
        <Route path='/auth/error' element={<LoginErrorPage />} />

        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/projects/:id' element={<ProjectPage />} />
        <Route path='/user' element={<UserPage />} />

        <Route path='/test/*' element={<TestRouter />} />
      </Routes>
    </BrowserRouter>
  </>)
}


function App() {
  const AUTH_URL = import.meta.env.VITE_AUTH_URL;

  if (!AUTH_URL) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <section className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <AppLoadingBar />

          <div className="mt-6 animate-pulse space-y-4">
            <div className="h-9 w-2/3 rounded-md bg-slate-200" />
            <div className="h-4 w-11/12 rounded bg-slate-200" />
            <div className="h-4 w-3/4 rounded bg-slate-200" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="h-40 rounded-xl bg-slate-100 animate-pulse" />
            <div className="h-40 rounded-xl bg-slate-100 animate-pulse" />
          </div>

          <p className="mt-6 text-sm text-slate-500">画面を準備しています...</p>
        </section>
      </main>
    )
  }

  return (
    <SessionProvider basePath={`${AUTH_URL}/api/auth`}>
      <ProjectProvider>
        <VercelNotice />
        <AppRouter />
      </ProjectProvider>
    </SessionProvider>
  )
}

export default App
