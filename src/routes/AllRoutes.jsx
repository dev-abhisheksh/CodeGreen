
import MainLayout from "../layout/MainLayout";
import { HomePage, CampPage, AuthPage, AboutPage, ProgressPage, PageNotFound } from "../pages"
import { Routes, Route } from 'react-router-dom';

export const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<HomePage/>} />
      <Route path="/camps" element={<CampPage/>} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/problems" element={<ProgressPage/>} />
      </Route>

      <Route path="*" element={<PageNotFound/>} />      
      <Route path="/auth" element={<AuthPage/>} />

    </Routes>
  )
}
