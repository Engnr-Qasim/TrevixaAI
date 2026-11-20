import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ClerkAuthWrapper } from './components/auth/ClerkAuthWrapper';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PublicOnlyRoute } from './components/auth/PublicOnlyRoute';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { TripPlannerPage } from './pages/TripPlannerPage';
import { TripResultsPage } from './pages/TripResultsPage';
import { BudgetEstimatorPage } from './pages/BudgetEstimatorPage';
import { HotelsPage } from './pages/HotelsPage';
import { RestaurantsPage } from './pages/RestaurantsPage';
import { AttractionsPage } from './pages/AttractionsPage';
import { SavedTripsPage } from './pages/SavedTripsPage';
import { TravelHistoryPage } from './pages/TravelHistoryPage';
import { AboutPage } from './pages/AboutPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <ThemeProvider>
      <ClerkAuthWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              {/* Public Routes */}
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="destinations" element={<DestinationsPage />} />
              <Route path="hotels" element={<HotelsPage />} />
              <Route path="restaurants" element={<RestaurantsPage />} />
              <Route path="attractions" element={<AttractionsPage />} />

              {/* Public-Only Auth Routes (Redirects to /dashboard if logged in) */}
              <Route
                path="sign-in"
                element={
                  <PublicOnlyRoute>
                    <SignInPage />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path="sign-up"
                element={
                  <PublicOnlyRoute>
                    <SignUpPage />
                  </PublicOnlyRoute>
                }
              />

              {/* Protected Routes (Requires Sign In) */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="plan-trip"
                element={
                  <ProtectedRoute>
                    <TripPlannerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="trip-results"
                element={
                  <ProtectedRoute>
                    <TripResultsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="saved-trips"
                element={
                  <ProtectedRoute>
                    <SavedTripsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="history"
                element={
                  <ProtectedRoute>
                    <TravelHistoryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="budget-estimator"
                element={
                  <ProtectedRoute>
                    <BudgetEstimatorPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ClerkAuthWrapper>
    </ThemeProvider>
  );
}
