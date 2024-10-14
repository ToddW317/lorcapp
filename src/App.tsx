import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';

const Dashboard = React.lazy(() => import('./components/Dashboard'));
const DeckManager = React.lazy(() => import('./components/DeckManager'));
const TournamentTracker = React.lazy(() => import('./components/TournamentTracker'));
const CardCollection = React.lazy(() => import('./components/CardCollection'));
const MatchHistory = React.lazy(() => import('./components/MatchHistory'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <div className="min-h-screen bg-background font-sans text-secondary">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Suspense fallback={<div className="text-center text-xl">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/decks" element={<DeckManager />} />
                  <Route path="/tournaments" element={<TournamentTracker />} />
                  <Route path="/collection" element={<CardCollection />} />
                  <Route path="/matches" element={<MatchHistory />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
