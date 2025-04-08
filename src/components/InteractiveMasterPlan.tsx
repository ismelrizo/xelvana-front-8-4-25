import React, { useState } from 'react';

interface Lot {
  id: string;
  coordinates: string; // SVG path
  status: 'available' | 'reserved' | 'sold';
  price: number;
  size: number;
  phase: number;
  number: number;
}

const lots: Lot[] = [
  // Phase 1 - Premium Front Lots
  {
    id: 'lot-1',
    coordinates: 'M 100 100 L 200 100 L 200 180 L 100 180 Z',
    status: 'available',
    price: 450000,
    size: 350,
    phase: 1,
    number: 101
  },
  {
    id: 'lot-2',
    coordinates: 'M 210 100 L 310 100 L 310 180 L 210 180 Z',
    status: 'reserved',
    price: 460000,
    size: 360,
    phase: 1,
    number: 102
  },
  {
    id: 'lot-3',
    coordinates: 'M 320 100 L 420 100 L 420 180 L 320 180 Z',
    status: 'sold',
    price: 455000,
    size: 355,
    phase: 1,
    number: 103
  },
  // Phase 1 - Standard Lots
  {
    id: 'lot-4',
    coordinates: 'M 100 190 L 180 190 L 180 270 L 100 270 Z',
    status: 'available',
    price: 380000,
    size: 280,
    phase: 1,
    number: 104
  },
  {
    id: 'lot-5',
    coordinates: 'M 190 190 L 270 190 L 270 270 L 190 270 Z',
    status: 'sold',
    price: 385000,
    size: 285,
    phase: 1,
    number: 105
  },
  {
    id: 'lot-6',
    coordinates: 'M 280 190 L 360 190 L 360 270 L 280 270 Z',
    status: 'available',
    price: 375000,
    size: 275,
    phase: 1,
    number: 106
  },
  // Phase 2 - Lake View Lots
  {
    id: 'lot-7',
    coordinates: 'M 500 100 L 620 100 L 620 200 L 500 200 Z',
    status: 'reserved',
    price: 580000,
    size: 420,
    phase: 2,
    number: 201
  },
  {
    id: 'lot-8',
    coordinates: 'M 630 100 L 750 100 L 750 200 L 630 200 Z',
    status: 'available',
    price: 590000,
    size: 430,
    phase: 2,
    number: 202
  },
  // Phase 2 - Garden Lots
  {
    id: 'lot-9',
    coordinates: 'M 500 210 L 600 210 L 600 290 L 500 290 Z',
    status: 'sold',
    price: 420000,
    size: 320,
    phase: 2,
    number: 203
  },
  {
    id: 'lot-10',
    coordinates: 'M 610 210 L 710 210 L 710 290 L 610 290 Z',
    status: 'available',
    price: 425000,
    size: 325,
    phase: 2,
    number: 204
  },
  // Phase 3 - Park View Lots
  {
    id: 'lot-11',
    coordinates: 'M 100 350 L 200 350 L 200 450 L 100 450 Z',
    status: 'available',
    price: 520000,
    size: 380,
    phase: 3,
    number: 301
  },
  {
    id: 'lot-12',
    coordinates: 'M 210 350 L 310 350 L 310 450 L 210 450 Z',
    status: 'reserved',
    price: 530000,
    size: 390,
    phase: 3,
    number: 302
  },
  // Phase 3 - Corner Lots
  {
    id: 'lot-13',
    coordinates: 'M 500 350 L 620 350 L 620 450 L 500 450 Z',
    status: 'available',
    price: 550000,
    size: 400,
    phase: 3,
    number: 303
  },
  {
    id: 'lot-14',
    coordinates: 'M 630 350 L 750 350 L 750 450 L 630 450 Z',
    status: 'sold',
    price: 560000,
    size: 410,
    phase: 3,
    number: 304
  }
];

const statusColors = {
  available: '#2A9D8F',
  reserved: '#E76F51',
  sold: '#6C757D'
};

const statusLabels = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold'
};

const InteractiveMasterPlan: React.FC = () => {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleLotHover = (lot: Lot, event: React.MouseEvent) => {
    setSelectedLot(lot);
    setShowTooltip(true);
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleLotLeave = () => {
    setShowTooltip(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        style={{ background: '#f8fafc' }}
      >
        {/* Background and Roads */}
        <rect x="0" y="0" width="800" height="600" fill="#E5E7EB" />
        
        {/* Main Roads */}
        <path
          d="M 50 300 L 750 300"
          stroke="#94A3B8"
          strokeWidth="40"
          fill="none"
        />
        <path
          d="M 50 300 L 750 300"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="10,10"
          fill="none"
        />
        <path
          d="M 400 50 L 400 550"
          stroke="#94A3B8"
          strokeWidth="40"
          fill="none"
        />
        <path
          d="M 400 50 L 400 550"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="10,10"
          fill="none"
        />

        {/* Green Areas and Amenities */}
        {/* Central Park */}
        <circle cx="400" cy="300" r="60" fill="#86EFAC" opacity="0.6" />
        <text x="400" y="300" textAnchor="middle" fill="#1F2937" fontSize="12">Central Park</text>
        
        {/* Lake */}
        <ellipse cx="650" cy="150" rx="50" ry="30" fill="#60A5FA" opacity="0.6" />
        <text x="650" y="150" textAnchor="middle" fill="#1F2937" fontSize="12">Lake</text>
        
        {/* Pool Club */}
        <rect x="150" cy="150" width="80" height="60" rx="10" fill="#F472B6" opacity="0.6" />
        <text x="190" y="185" textAnchor="middle" fill="#1F2937" fontSize="12">Pool Club</text>
        
        {/* Sports Area */}
        <rect x="550" y="400" width="100" height="80" rx="10" fill="#FCD34D" opacity="0.6" />
        <text x="600" y="445" textAnchor="middle" fill="#1F2937" fontSize="12">Sports Area</text>

        {/* Lots */}
        {lots.map((lot) => (
          <g key={lot.id}>
            <path
              d={lot.coordinates}
              fill={statusColors[lot.status]}
              stroke="white"
              strokeWidth="2"
              opacity={selectedLot?.id === lot.id ? 0.8 : 0.6}
              onMouseEnter={(e) => handleLotHover(lot, e)}
              onMouseLeave={handleLotLeave}
              className="transition-all duration-300 hover:opacity-80 cursor-pointer"
            />
            <text
              x={parseInt(lot.coordinates.split(' ')[1]) + 50}
              y={parseInt(lot.coordinates.split(' ')[2]) + 40}
              fill="#1F2937"
              fontSize="12"
              textAnchor="middle"
            >
              {lot.number}
            </text>
          </g>
        ))}

        {/* Legend */}
        <g transform="translate(50, 520)">
          {Object.entries(statusColors).map(([status, color], index) => (
            <g key={status} transform={`translate(${index * 150}, 0)`}>
              <rect
                width="20"
                height="20"
                fill={color}
                rx="4"
              />
              <text
                x="30"
                y="15"
                className="text-sm"
                fill="#1F2937"
              >
                {statusLabels[status as keyof typeof statusLabels]}
              </text>
            </g>
          ))}
        </g>

        {/* Compass Rose */}
        <g transform="translate(700, 100)">
          <circle cx="0" cy="0" r="20" fill="white" stroke="#CBD5E1" />
          <path d="M 0 -15 L 0 15" stroke="#CBD5E1" strokeWidth="2" />
          <path d="M -15 0 L 15 0" stroke="#CBD5E1" strokeWidth="2" />
          <text x="0" y="-20" textAnchor="middle" fill="#1F2937" fontSize="12">N</text>
        </g>

        {/* Phase Labels */}
        <text x="250" y="80" textAnchor="middle" fill="#1F2937" fontSize="14" fontWeight="bold">Phase 1</text>
        <text x="650" y="80" textAnchor="middle" fill="#1F2937" fontSize="14" fontWeight="bold">Phase 2</text>
        <text x="250" y="330" textAnchor="middle" fill="#1F2937" fontSize="14" fontWeight="bold">Phase 3</text>
      </svg>

      {/* Tooltip */}
      {showTooltip && selectedLot && (
        <div
          className="absolute bg-white p-4 rounded-xl shadow-xl border border-gray-200 z-50 min-w-[250px]"
          style={{
            left: tooltipPosition.x + 20,
            top: tooltipPosition.y - 100,
          }}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">Lot {selectedLot.number}</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${
              selectedLot.status === 'available' ? 'bg-green-100 text-green-800' :
              selectedLot.status === 'reserved' ? 'bg-orange-100 text-orange-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {statusLabels[selectedLot.status]}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Size:</span>
              <span className="font-semibold">{selectedLot.size} m²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="font-semibold">{formatPrice(selectedLot.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phase:</span>
              <span className="font-semibold">{selectedLot.phase}</span>
            </div>
          </div>
          {selectedLot.status === 'available' && (
            <button className="w-full mt-4 bg-xelvana-green text-white py-2 rounded-lg hover:bg-xelvana-green/90 transition-colors">
              Request Information
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveMasterPlan;