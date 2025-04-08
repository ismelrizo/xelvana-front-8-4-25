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
  // Add more lots as needed
];

const MasterPlanMap: React.FC = () => {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleLotClick = (lot: Lot, event: React.MouseEvent) => {
    setSelectedLot(lot);
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return '#2A9D8F';
      case 'reserved':
        return '#E76F51';
      case 'sold':
        return '#6C757D';
      default:
        return '#gray';
    }
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
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80")',
          filter: 'brightness(0.9) contrast(1.1)'
        }}
      />
      
      {/* SVG Overlay */}
      <svg
        viewBox="0 0 800 600"
        className="absolute inset-0 w-full h-full"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        {/* Lots */}
        {lots.map((lot) => (
          <path
            key={lot.id}
            d={lot.coordinates}
            fill={getStatusColor(lot.status)}
            stroke="white"
            strokeWidth="2"
            opacity={selectedLot?.id === lot.id ? 0.8 : 0.6}
            onClick={(e) => handleLotClick(lot, e)}
            className="transition-all duration-300 hover:opacity-80 cursor-pointer"
          />
        ))}

        {/* Lot Numbers */}
        {lots.map((lot) => (
          <text
            key={`text-${lot.id}`}
            x={parseInt(lot.coordinates.split(' ')[1]) + 50}
            y={parseInt(lot.coordinates.split(' ')[2]) + 40}
            fill="white"
            fontSize="12"
            textAnchor="middle"
            className="pointer-events-none"
          >
            {lot.number}
          </text>
        ))}

        {/* Legend */}
        <g transform="translate(50, 520)">
          {['available', 'reserved', 'sold'].map((status, index) => (
            <g key={status} transform={`translate(${index * 150}, 0)`}>
              <rect
                width="20"
                height="20"
                fill={getStatusColor(status)}
                rx="4"
              />
              <text
                x="30"
                y="15"
                fill="white"
                className="text-sm capitalize"
              >
                {status}
              </text>
            </g>
          ))}
        </g>
      </svg>

      {/* Tooltip */}
      {selectedLot && (
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
              {selectedLot.status.charAt(0).toUpperCase() + selectedLot.status.slice(1)}
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

export default MasterPlanMap;