import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import TabSwitcher from './components/TabSwitcher';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-primary text-white py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold">Lorcana Tracker</h1>
            </div>
          </header>
          <main>
            <TabSwitcher />
          </main>
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
