import React, { useState, useTransition } from 'react';
import Dashboard from './Dashboard';
import CardCollection from './CardCollection';
import DeckManager from './DeckManager';
import MatchHistory from './MatchHistory';

function TabSwitcher() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (tab: string) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex space-x-4 mb-8">
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
            activeTab === 'dashboard'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => handleTabChange('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
            activeTab === 'collection'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => handleTabChange('collection')}
        >
          Collection
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
            activeTab === 'decks'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => handleTabChange('decks')}
        >
          Decks
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
            activeTab === 'matches'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => handleTabChange('matches')}
        >
          Match History
        </button>
      </div>

      {isPending ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'collection' && <CardCollection />}
          {activeTab === 'decks' && <DeckManager />}
          {activeTab === 'matches' && <MatchHistory />}
        </>
      )}
    </div>
  );
}

export default TabSwitcher;
