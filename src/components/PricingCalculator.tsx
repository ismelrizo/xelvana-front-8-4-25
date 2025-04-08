import React, { useState } from 'react';

interface LotPrice {
  size: number;
  pricePerSqM: number;
}

const PricingCalculator: React.FC = () => {
  const [selectedLot, setSelectedLot] = useState<LotPrice>({
    size: 200,
    pricePerSqM: 1000,
  });
  const [downPayment, setDownPayment] = useState<number>(30);
  const [months, setMonths] = useState<number>(12);

  const totalPrice = selectedLot.size * selectedLot.pricePerSqM;
  const downPaymentAmount = (totalPrice * downPayment) / 100;
  const remainingAmount = totalPrice - downPaymentAmount;
  const monthlyPayment = remainingAmount / months;

  return (
    <div className="text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Detalles del Lote</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tamaño del Lote (m²)</label>
              <select
                className="mt-1 block w-full rounded-lg bg-white/10 border border-white/20 text-white focus:border-white focus:ring focus:ring-white/20 py-2 px-3"
                value={selectedLot.size}
                onChange={(e) => setSelectedLot({ ...selectedLot, size: Number(e.target.value) })}
              >
                <option value="200">200 m²</option>
                <option value="250">250 m²</option>
                <option value="300">300 m²</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Enganche (%)</label>
              <input
                type="range"
                min="20"
                max="50"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-white/80">{downPayment}%</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Plazo (meses)</label>
              <select
                className="mt-1 block w-full rounded-lg bg-white/10 border border-white/20 text-white focus:border-white focus:ring focus:ring-white/20 py-2 px-3"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
              >
                <option value="12">12 meses</option>
                <option value="18">18 meses</option>
                <option value="24">24 meses</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Resumen de Pagos</h3>
          <div className="space-y-4">
            <div>
              <span className="text-white/80">Precio Total:</span>
              <span className="float-right font-semibold">${totalPrice.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-white/80">Enganche:</span>
              <span className="float-right font-semibold">${downPaymentAmount.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-white/80">Pago Mensual:</span>
              <span className="float-right font-semibold">${monthlyPayment.toLocaleString()}</span>
            </div>
            <button className="w-full bg-white text-xelvana-green py-2 rounded-lg hover:bg-white/90 transition-colors mt-4 font-semibold">
              Contactar a Ventas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;