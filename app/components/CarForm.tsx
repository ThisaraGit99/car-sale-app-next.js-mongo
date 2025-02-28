// pages/admin/add-vehicle.tsx

import React, { useState, useRef } from 'react';
import { FaCar, FaMoneyBillWave, FaImage, FaPhone, FaInfoCircle, FaTimes, FaCogs, FaCalendarAlt } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';

interface Vehicle {
  // Basic Vehicle Information
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  mileageUnit: 'miles' | 'km';
  vin: string;
  color: string;
  // Vehicle Categorization
  vehicleType: string;
  fuelType: string;
  transmission: 'Automatic' | 'Manual';
  drivetrain: 'FWD' | 'RWD' | 'AWD';
  // Vehicle Features & Description
  features: { [key: string]: boolean };
  description: string;
  // Images & Media
  images: string[]; // for simplicity using URLs
  // Technical Specifications
  engineDetails: string;
  horsepower: string;
  torque: string;
  fuelEfficiencyCity: string;
  fuelEfficiencyHighway: string;
  safetyFeatures: { [key: string]: boolean };
  // Listing Status & Visibility
  status: 'Draft' | 'Published' | 'Archived';
  featured: boolean;
  expiryDate: string;
}

const initialVehicleState: Vehicle = {
  make: '',
  model: '',
  year: '',
  price: '',
  mileage: '',
  mileageUnit: 'miles',
  vin: '',
  color: '',
  vehicleType: '',
  fuelType: '',
  transmission: 'Automatic',
  drivetrain: 'FWD',
  features: {
    Sunroof: false,
    Navigation: false,
    'Heated Seats': false,
    Bluetooth: false,
  },
  description: '',
  images: [],
  engineDetails: '',
  horsepower: '',
  torque: '',
  fuelEfficiencyCity: '',
  fuelEfficiencyHighway: '',
  safetyFeatures: {
    Airbags: false,
    ABS: false,
    'Lane Assist': false,
    'Blind Spot Monitoring': false,
  },
  status: 'Draft',
  featured: false,
  expiryDate: '',
};

const AddVehiclePage = () => {
  const [vehicle, setVehicle] = useState<Vehicle>(initialVehicleState);
  const [errors, setErrors] = useState<Partial<Record<keyof Vehicle, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Example validation function – you can expand this per field
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Vehicle, string>> = {};
    if (!vehicle.make) newErrors.make = 'Make is required';
    if (!vehicle.model) newErrors.model = 'Model is required';
    if (!vehicle.year) newErrors.year = 'Year is required';
    if (!vehicle.price || Number(vehicle.price) <= 0) newErrors.price = 'Valid price is required';
    if (!vehicle.vin) newErrors.vin = 'VIN is required';
    if (vehicle.images.length < 5 || vehicle.images.length > 20) {
      newErrors.images = 'Please upload between 5 and 20 images';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, section: 'features' | 'safetyFeatures') => {
    const { name, checked } = e.target;
    setVehicle((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: checked,
      },
    }));
  };

  const handleImageURLsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow comma-separated URLs for simplicity
    const urls = e.target.value.split(',').map((url) => url.trim()).filter(Boolean);
    setVehicle((prev) => ({ ...prev, images: urls }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // For demo purposes, simulate file upload by reading the file names as URLs.
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      // In a real app, you'd upload these files and get URLs back.
      const urls = filesArray.map((file) => URL.createObjectURL(file));
      setVehicle((prev) => ({ ...prev, images: urls }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    // Reset form or redirect as needed.
    alert('Vehicle listing submitted successfully!');
    setVehicle(initialVehicleState);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FaCar className="text-blue-500" />
          Add New Vehicle
        </h1>
        {/* Optional Cancel/Close Button */}
        <button className="text-gray-500 hover:text-gray-700">
          <FaTimes className="text-2xl" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Basic Vehicle Information */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Vehicle Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Make</label>
              <input
                type="text"
                name="make"
                value={vehicle.make}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${errors.make ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500`}
                placeholder="e.g., Toyota"
              />
              {errors.make && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><FaInfoCircle /> {errors.make}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Model</label>
              <input
                type="text"
                name="model"
                value={vehicle.model}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${errors.model ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500`}
                placeholder="e.g., Camry"
              />
              {errors.model && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><FaInfoCircle /> {errors.model}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <select
                name="year"
                value={vehicle.year}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${errors.year ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Year</option>
                {Array.from({ length: 25 }, (_, i) => 2000 + i).map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
              {errors.year && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><FaInfoCircle /> {errors.year}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  name="price"
                  value={vehicle.price}
                  onChange={handleInputChange}
                  className={`w-full pl-8 p-3 rounded-lg border ${errors.price ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., 25000"
                />
              </div>
              {errors.price && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><FaInfoCircle /> {errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mileage</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="mileage"
                  value={vehicle.mileage}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 50000"
                />
                <select
                  name="mileageUnit"
                  value={vehicle.mileageUnit}
                  onChange={handleInputChange}
                  className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="miles">Miles</option>
                  <option value="km">Km</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">VIN</label>
              <input
                type="text"
                name="vin"
                value={vehicle.vin}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${errors.vin ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500`}
                placeholder="Vehicle Identification Number"
              />
              {errors.vin && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><FaInfoCircle /> {errors.vin}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <input
                type="text"
                name="color"
                value={vehicle.color}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Red"
              />
            </div>
          </div>
        </section>

        {/* 2. Vehicle Categorization */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Vehicle Categorization</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Vehicle Type</label>
              <select
                name="vehicleType"
                value={vehicle.vehicleType}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Coupe">Coupe</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fuel Type</label>
              <select
                name="fuelType"
                value={vehicle.fuelType}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Fuel</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Transmission</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="transmission"
                    value="Automatic"
                    checked={vehicle.transmission === 'Automatic'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Automatic
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="transmission"
                    value="Manual"
                    checked={vehicle.transmission === 'Manual'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Manual
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Drivetrain</label>
              <div className="flex items-center space-x-4">
                {['FWD', 'RWD', 'AWD'].map((drive) => (
                  <label key={drive} className="flex items-center">
                    <input
                      type="radio"
                      name="drivetrain"
                      value={drive}
                      checked={vehicle.drivetrain === drive}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    {drive}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Vehicle Features & Description */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Vehicle Features & Description</h2>
          <div className="mb-4">
            <p className="mb-2 font-medium">Features</p>
            <div className="flex flex-wrap gap-4">
              {Object.keys(vehicle.features).map((feature) => (
                <label key={feature} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={feature}
                    checked={vehicle.features[feature]}
                    onChange={(e) => handleCheckboxChange(e, 'features')}
                    className="h-4 w-4"
                  />
                  <span>{feature}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={vehicle.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the vehicle's features, condition, and history..."
            />
          </div>
        </section>

        {/* 4. Images & Media */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Images & Media</h2>
          <div className="mb-4">
            <p className="mb-2 text-sm text-gray-600">Drag and drop images or click to upload (5 to 20 images).</p>
            <div
              className="border-dashed border-2 border-gray-200 rounded-lg p-6 flex items-center justify-center hover:border-blue-500 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {vehicle.images.length > 0 ? (
                <div className="grid grid-cols-4 gap-2">
                  {vehicle.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`Vehicle ${idx + 1}`} className="w-full h-24 object-cover rounded" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <FaImage className="text-3xl mb-2" />
                  <span>Click or drop images here</span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              className="hidden"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Or enter image URLs (comma-separated)</label>
            <input
              type="text"
              name="imageURLs"
              onChange={handleImageURLsChange}
              className={`w-full p-3 rounded-lg border ${errors.images ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500`}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg, ..."
            />
            {errors.images && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><FaInfoCircle /> {errors.images}</p>}
          </div>
        </section>

        {/* 5. Technical Specifications */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Engine Details</label>
              <input
                type="text"
                name="engineDetails"
                value={vehicle.engineDetails}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 2.0L Turbocharged I4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Horsepower</label>
              <input
                type="text"
                name="horsepower"
                value={vehicle.horsepower}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 250 HP"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Torque</label>
              <input
                type="text"
                name="torque"
                value={vehicle.torque}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 320 Nm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fuel Efficiency (City)</label>
              <input
                type="text"
                name="fuelEfficiencyCity"
                value={vehicle.fuelEfficiencyCity}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 25 MPG"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fuel Efficiency (Highway)</label>
              <input
                type="text"
                name="fuelEfficiencyHighway"
                value={vehicle.fuelEfficiencyHighway}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 35 MPG"
              />
            </div>
            <div className="md:col-span-2">
              <p className="mb-2 font-medium">Safety Features</p>
              <div className="flex flex-wrap gap-4">
                {Object.keys(vehicle.safetyFeatures).map((feature) => (
                  <label key={feature} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={feature}
                      checked={vehicle.safetyFeatures[feature]}
                      onChange={(e) => handleCheckboxChange(e, 'safetyFeatures')}
                      className="h-4 w-4"
                    />
                    <span>{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Listing Status & Visibility */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Listing Status & Visibility</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                name="status"
                value={vehicle.status}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={vehicle.featured}
                  onChange={(e) => setVehicle((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="h-4 w-4"
                />
                Mark as Featured
              </label>
              <label className="block text-sm font-medium mb-2">Listing Expiry Date</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="date"
                  name="expiryDate"
                  value={vehicle.expiryDate}
                  onChange={handleInputChange}
                  className="w-full pl-10 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 7. Admin Actions */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => alert('Preview Listing functionality not implemented.')}
              className="bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Preview Listing
            </button>
            <button
              type="button"
              onClick={() => alert('Copy from Existing Listing functionality not implemented.')}
              className="bg-yellow-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              Copy from Existing Listing
            </button>
          </div>
          <div className="flex gap-4">
            <button
              type="reset"
              onClick={() => setVehicle(initialVehicleState)}
              className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel / Reset Form
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center gap-2"
            >
              {isSubmitting && <ImSpinner8 className="animate-spin" />}
              {isSubmitting ? 'Submitting...' : 'Publish Now'}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddVehiclePage;
