import React, { useState } from 'react';
import { DollarSign, Server, Cloud, Download, Calculator, TrendingUp, AlertCircle } from 'lucide-react';

export default function TCOCalculator() {
  const [timeframe, setTimeframe] = useState(5);
  const [onPrem, setOnPrem] = useState({
    servers: 10,
    serverCost: 5000,
    storage: 50,
    storageCostPerTB: 500,
    network: 10000,
    powerCostPerMonth: 1000,
    coolingCostPerMonth: 500,
    facilitySpaceCost: 2000,
    itStaffSalaries: 150000,
    maintenancePercent: 15,
    softwareLicenses: 25000
  });

  const [cloud, setCloud] = useState({
    computeMonthly: 8000,
    storageMonthly: 2000,
    networkMonthly: 1500,
    backupMonthly: 500,
    securityMonthly: 1000,
    supportMonthly: 2000,
    dataTransferMonthly: 1000
  });

  const calculateOnPremTCO = () => {
    const initialCapex = 
      (onPrem.servers * onPrem.serverCost) +
      (onPrem.storage * onPrem.storageCostPerTB) +
      onPrem.network;

    const annualOpex = 
      (onPrem.powerCostPerMonth * 12) +
      (onPrem.coolingCostPerMonth * 12) +
      (onPrem.facilitySpaceCost * 12) +
      onPrem.itStaffSalaries +
      (initialCapex * (onPrem.maintenancePercent / 100)) +
      onPrem.softwareLicenses;

    const totalTCO = initialCapex + (annualOpex * timeframe);

    return {
      initialCapex,
      annualOpex,
      totalTCO,
      monthlyAverage: totalTCO / (timeframe * 12)
    };
  };

  const calculateCloudTCO = () => {
    const monthlyTotal = 
      cloud.computeMonthly +
      cloud.storageMonthly +
      cloud.networkMonthly +
      cloud.backupMonthly +
      cloud.securityMonthly +
      cloud.supportMonthly +
      cloud.dataTransferMonthly;

    const annualTotal = monthlyTotal * 12;
    const totalTCO = annualTotal * timeframe;

    return {
      monthlyTotal,
      annualTotal,
      totalTCO
    };
  };

  const onPremResults = calculateOnPremTCO();
  const cloudResults = calculateCloudTCO();
  const savings = onPremResults.totalTCO - cloudResults.totalTCO;
  const savingsPercent = ((savings / onPremResults.totalTCO) * 100).toFixed(1);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleOnPremChange = (field, value) => {
    setOnPrem({ ...onPrem, [field]: parseFloat(value) || 0 });
  };

  const handleCloudChange = (field, value) => {
    setCloud({ ...cloud, [field]: parseFloat(value) || 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">TCO Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg">Cloud vs On-Premises Infrastructure Cost Analysis</p>
        </div>

        {/* Timeframe Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Analysis Timeframe: {timeframe} Years
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={timeframe}
            onChange={(e) => setTimeframe(parseInt(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>1 year</span>
            <span>5 years</span>
            <span>10 years</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* On-Premises Input */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Server className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-800">On-Premises</h2>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 border-b pb-2">Initial Capital Expenses</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Servers</label>
                <input
                  type="number"
                  value={onPrem.servers}
                  onChange={(e) => handleOnPremChange('servers', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost per Server ($)</label>
                <input
                  type="number"
                  value={onPrem.serverCost}
                  onChange={(e) => handleOnPremChange('serverCost', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Storage (TB)</label>
                <input
                  type="number"
                  value={onPrem.storage}
                  onChange={(e) => handleOnPremChange('storage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost per TB ($)</label>
                <input
                  type="number"
                  value={onPrem.storageCostPerTB}
                  onChange={(e) => handleOnPremChange('storageCostPerTB', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Network Equipment ($)</label>
                <input
                  type="number"
                  value={onPrem.network}
                  onChange={(e) => handleOnPremChange('network', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <h3 className="font-semibold text-gray-700 border-b pb-2 mt-6">Operating Expenses (Annual)</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Power Cost ($/month)</label>
                <input
                  type="number"
                  value={onPrem.powerCostPerMonth}
                  onChange={(e) => handleOnPremChange('powerCostPerMonth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cooling Cost ($/month)</label>
                <input
                  type="number"
                  value={onPrem.coolingCostPerMonth}
                  onChange={(e) => handleOnPremChange('coolingCostPerMonth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facility Space ($/month)</label>
                <input
                  type="number"
                  value={onPrem.facilitySpaceCost}
                  onChange={(e) => handleOnPremChange('facilitySpaceCost', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IT Staff Salaries ($/year)</label>
                <input
                  type="number"
                  value={onPrem.itStaffSalaries}
                  onChange={(e) => handleOnPremChange('itStaffSalaries', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance (% of CapEx)</label>
                <input
                  type="number"
                  value={onPrem.maintenancePercent}
                  onChange={(e) => handleOnPremChange('maintenancePercent', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Software Licenses ($/year)</label>
                <input
                  type="number"
                  value={onPrem.softwareLicenses}
                  onChange={(e) => handleOnPremChange('softwareLicenses', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Cloud Input */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Cloud className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Cloud</h2>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 border-b pb-2">Monthly Operating Expenses</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Compute Instances ($/month)</label>
                <input
                  type="number"
                  value={cloud.computeMonthly}
                  onChange={(e) => handleCloudChange('computeMonthly', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Storage ($/month)</label>
                <input
                  type="number"
                  value={cloud.storageMonthly}
                  onChange={(e) => handleCloudChange('storageMonthly', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Network/VPC ($/month)</label>
                <input
                  type="number"
                  value={cloud.networkMonthly}
                  onChange={(e) => handleCloudChange('networkMonthly', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Backup Services ($/month)</label>
                <input
                  type="number"
                  value={cloud.backupMonthly}
                  onChange={(e) => handleCloudChange('backupMonthly', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Security Services ($/month)</label>
                <input
                  type="number"
                  value={cloud.securityMonthly}
                  onChange={(e) => handleCloudChange('securityMonthly', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Plan ($/month)</label>
                <input
                  type="number"
                  value={cloud.supportMonthly}
                  onChange={(e) => handleCloudChange('supportMonthly', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Transfer ($/month)</label>
                <input
                  type="number"
                  value={cloud.dataTransferMonthly}
                  onChange={(e) => handleCloudChange('dataTransferMonthly', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mt-6">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-1">Cloud Benefits:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>No upfront capital expenses</li>
                      <li>Pay-as-you-go pricing</li>
                      <li>Automatic scaling</li>
                      <li>Managed infrastructure</li>
                      <li>Global availability</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* On-Prem Results */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">On-Premises TCO</h3>
              <Server className="w-8 h-8" />
            </div>
            <div className="space-y-3">
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-sm opacity-90">Initial CapEx</p>
                <p className="text-2xl font-bold">{formatCurrency(onPremResults.initialCapex)}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-sm opacity-90">Annual OpEx</p>
                <p className="text-2xl font-bold">{formatCurrency(onPremResults.annualOpex)}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-sm opacity-90">Monthly Average</p>
                <p className="text-2xl font-bold">{formatCurrency(onPremResults.monthlyAverage)}</p>
              </div>
              <div className="bg-white bg-opacity-30 rounded-lg p-4 mt-4">
                <p className="text-sm opacity-90">Total {timeframe}-Year TCO</p>
                <p className="text-3xl font-bold">{formatCurrency(onPremResults.totalTCO)}</p>
              </div>
            </div>
          </div>

          {/* Cloud Results */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Cloud TCO</h3>
              <Cloud className="w-8 h-8" />
            </div>
            <div className="space-y-3">
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-sm opacity-90">Monthly Cost</p>
                <p className="text-2xl font-bold">{formatCurrency(cloudResults.monthlyTotal)}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-sm opacity-90">Annual Cost</p>
                <p className="text-2xl font-bold">{formatCurrency(cloudResults.annualTotal)}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-sm opacity-90">No CapEx Required</p>
                <p className="text-2xl font-bold">{formatCurrency(0)}</p>
              </div>
              <div className="bg-white bg-opacity-30 rounded-lg p-4 mt-4">
                <p className="text-sm opacity-90">Total {timeframe}-Year TCO</p>
                <p className="text-3xl font-bold">{formatCurrency(cloudResults.totalTCO)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Analysis */}
        <div className={`rounded-xl shadow-lg p-6 ${savings > 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-orange-600'} text-white`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Cost Analysis</h3>
            </div>
            <DollarSign className="w-10 h-10" />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-1">Cost Difference</p>
              <p className="text-3xl font-bold">{formatCurrency(Math.abs(savings))}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-1">Percentage</p>
              <p className="text-3xl font-bold">{Math.abs(savingsPercent)}%</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-1">Winner</p>
              <p className="text-3xl font-bold">{savings > 0 ? 'Cloud' : 'On-Prem'}</p>
            </div>
          </div>
          <p className="mt-4 text-center text-lg">
            {savings > 0 
              ? `Cloud saves ${formatCurrency(savings)} (${savingsPercent}%) over ${timeframe} years`
              : `On-Premises saves ${formatCurrency(Math.abs(savings))} (${Math.abs(savingsPercent)}%) over ${timeframe} years`
            }
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>TCO Calculator v1.0 - Compare infrastructure costs effectively</p>
          <p className="mt-2">Adjust parameters to match your specific requirements</p>
        </div>
      </div>
    </div>
  );
}
