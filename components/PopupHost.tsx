'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { HostForm } from '@/types/host';
import sendHost from '@/utils/sendHost';
import SuccesMsg from './SuccesMsg';

type PopupHostProps = {
  onClose: () => void;
};

export default function PopupHost({ onClose }: PopupHostProps) {
  const [formData, setFormData] = useState<HostForm>({
    name: "",
    phone: "",
    email: "",
    location: "",
    carsCount: 0,
    message: ""
  });
  const [errors, setErrors] = useState<Partial<HostForm & { securityAnswer: string }>>({});
  const [mathProblem, setMathProblem] = useState<{ a: number; b: number; answer: number } | null>(null);
  const [securityAnswer, setSecurityAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showMsg, setShowMsg] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Special handling for carsCount so it's stored as a number (if possible)
    setFormData(prev => ({
      ...prev,
      [name]: name === "carsCount"
        ? (value === "" ? 0 : Number(value.replace(/[^0-9]/g, "")))
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      const result = await sendHost(formData);
      if (result.success) {
        setFormData({
          name: "",
          phone: "",
          email: "",
          location: "",
          carsCount: 0,
          message: ""
        });
        setSecurityAnswer('');
        setLoading(false);
        setShowMsg(true);
      } else {
        setLoading(false);
        // Optionally show an error toast
        console.error('Submission failed:', result.error);
      }
    }
  };

  const validate = () => {
    const newErrors: Partial<HostForm & { securityAnswer: string }> = {};
    if (!formData.name) newErrors.name = "Oops! What should we call you?";
    if (!formData.phone) newErrors.phone = "Can’t reach you without your number!";
    if (!formData.email) newErrors.email = "Missing our professional way for communication";
    if (!formData.location) newErrors.location = "Please enter your city or area";
    if (!formData.carsCount || isNaN(formData.carsCount) || formData.carsCount < 1) newErrors.carsCount = "How many cars do you want to list?";
    if (!formData.message) newErrors.message = "Let us know more about your vehicles or preferences!";
    if (parseInt(securityAnswer) !== mathProblem?.answer) newErrors.securityAnswer = 'Just a quick check – what’s the sum?';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setMathProblem({ a, b, answer: a + b });
  }, [errors]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex p-4 md:p-6 flex-col gap-3 items-center justify-center">
      <div className="w-full flex flex-col md:flex-row max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl bg-white rounded-[20px] overflow-hidden shadow-2xl mx-auto">
        {/* Left Side */}
        <div
          className="relative showBg w-full md:w-1/2 bg-[#0c0c27] lg:border-[16px] lg:rounded-l-4xl text-white p-4 md:p-10 flex md:flex-col justify-between"
          style={{ backgroundImage: "url('/car.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 text-2xl font-bold text-white hover:text-gray-900"
          >
            ×
          </button>
          <div className='py-2 xl:py-6 3xl:py-8 4xl:py-10'>
            <h2 className="text-3xl xl:text-5xl 3xl:text-6xl 4xl:text-7xl font-bold leading-tight mb-6">
              Become a <br />Host with <br /> Quzeedrive
            </h2>
            <p className="hidden md:block text-base xl:text-lg 3xl:text-xl tracking-wide text-gray-300 mr-24">
              Turn your parked car into a passive income machine. Start earning every time someone books your vehicle.
            </p>
          </div>
          <div className="hidden md:flex items-center">
            <Image
              src='/icons/award.svg'
              alt='award'
              width={200}
              height={200}
              className='h-auto pr-2 w-26 xl:w-24 3xl:w-36 4xl:w-48'
            />
          </div>
        </div>
        {/* Right Side */}
        <div className="w-full h-full md:w-1/2 py-6 px-4 sm:px-8 md:p-10 relative overflow-y-auto flex items-center">
          <button
            onClick={onClose}
            className="hidden md:block absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-900"
          >
            ×
          </button>
          {showMsg ? (
            <SuccesMsg onClose={onClose} />
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full mx-5 lg:mx-0 flex-col gap-6 xl:pt-6 text-black">
              {/* Name */}
              <div>
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                />
                {errors.name && <span className="text-red-300 text-sm">{errors.name}</span>}
              </div>
              {/* Phone */}
              <div>
                <input
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                />
                {errors.phone && <span className="text-red-300 text-sm">{errors.phone}</span>}
              </div>
              {/* Email */}
              <div>
                <input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                />
                {errors.email && <span className="text-red-300 text-sm">{errors.email}</span>}
              </div>
              {/* Location */}
              <div>
                <input
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                />
                {errors.location && <span className="text-red-300 text-sm">{errors.location}</span>}
              </div>
              {/* Cars Count */}
              <div>
                <input
                  name="carsCount"
                  type="number"
                  min={1}
                  step={1}
                  placeholder="How many cars do you want to list? (e.g., 1, 2, 3)"
                  value={formData.carsCount === 0 ? "" : formData.carsCount}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                />
                {errors.carsCount && <span className="text-red-300 text-sm">{errors.carsCount}</span>}
              </div>
              {/* Message */}
              <div>
                <input
                  name="message"
                  placeholder="Tell us about your cars or preferences"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                />
                {errors.message && <span className="text-red-300 text-sm">{errors.message}</span>}
              </div>
              {/* Security / Math problem */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-bold flex">{mathProblem?.a} + {mathProblem?.b} ?</label>
                <input
                  name="securityAnswer"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  className="border-b border-gray-300 py-2 focus:outline-none"
                />
              </div>
              {errors.securityAnswer && <span className="text-red-300 text-sm">{errors.securityAnswer}</span>}
              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-fit flex items-center gap-2 px-4 py-2 xl:px-6 rounded-full font-semibold transition-all
                  ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r cursor-pointer from-blue-500 to-blue-700 text-white hover:from-blue-600'}
                `}
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Booking...
                  </>
                ) : (
                  'BOOK NOW'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
