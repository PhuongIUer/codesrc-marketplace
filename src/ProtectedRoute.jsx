// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import Layout from './layout/Layout'

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = false // Replace with your auth logic
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Usage in App.jsx:
<Route path="/profile" element={
  <ProtectedRoute>
    <Layout>
      <Profile />
    </Layout>
  </ProtectedRoute>
} />