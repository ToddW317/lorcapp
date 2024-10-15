import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Deck } from '../store/decksSlice';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DeckDetailsProps {
  deckId: string;
  onClose: () => void;
}

export function DeckDetails({ deckId, onClose }: DeckDetailsProps) {
  const deck = useSelector((state: RootState) =>
    state.decks.decks.find((d: Deck) => d.id === deckId)
  );

  if (!deck) return null;

  // Calculate cost curve data
  const costCurve = deck.cards.reduce((acc, card) => {
    acc[card.cost] = (acc[card.cost] || 0) + card.quantity;
    return acc;
  }, {} as Record<number, number>);

  const costCurveData = {
    labels: Object.keys(costCurve),
    datasets: [
      {
        label: 'Number of Cards',
        data: Object.values(costCurve),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Calculate color distribution
  const colorDistribution = deck.cards.reduce((acc, card) => {
    acc[card.color] = (acc[card.color] || 0) + card.quantity;
    return acc;
  }, {} as Record<string, number>);

  const colorDistributionData = {
    labels: Object.keys(colorDistribution),
    datasets: [
      {
        data: Object.values(colorDistribution),
        backgroundColor: ['#FFD700', '#9370DB', '#3CB371', '#DC143C', '#4169E1', '#A9A9A9'],
      },
    ],
  };

  // Calculate card type distribution
  const typeDistribution = deck.cards.reduce((acc, card) => {
    acc[card.type] = (acc[card.type] || 0) + card.quantity;
    return acc;
  }, {} as Record<string, number>);

  const typeDistributionData = {
    labels: Object.keys(typeDistribution),
    datasets: [
      {
        data: Object.values(typeDistribution),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  // Calculate rarity distribution
  const rarityDistribution = deck.cards.reduce((acc, card) => {
    acc[card.rarity] = (acc[card.rarity] || 0) + card.quantity;
    return acc;
  }, {} as Record<string, number>);

  const rarityDistributionData = {
    labels: Object.keys(rarityDistribution),
    datasets: [
      {
        data: Object.values(rarityDistribution),
        backgroundColor: ['#C0C0C0', '#FFD700', '#B87333', '#E5E4E2'],
      },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{deck.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Cost Curve</h3>
            <Bar data={costCurveData} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Color Distribution</h3>
            <Pie data={colorDistributionData} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Card Type Distribution</h3>
            <Pie data={typeDistributionData} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Rarity Distribution</h3>
            <Pie data={rarityDistributionData} />
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Cards in Deck</h3>
          <ul className="space-y-2">
            {deck.cards.map((card) => (
              <li key={card.id} className="flex justify-between items-center">
                <span>{card.name}</span>
                <span className="text-gray-500">x{card.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DeckDetails;

