import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageUpload } from '../components/ProfileEditor/ImageUpload';
import { ProgressBar } from '../components/ProfileEditor/ProgressBar';
import { ChatbotButton } from '../components/Chatbot/ChatbotButton';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export function EditProfile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '0123456789',
    address: '123 Rue de Paris'
  });

  const progressSteps = [
    { label: 'Profil complété', completed: true },
    { label: 'Documents fournis', completed: false },
    { label: 'Caserne choisie', completed: true },
    { label: 'Entretien planifié', completed: false }
  ];

  const progress = (progressSteps.filter(step => step.completed).length / progressSteps.length) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#163860] mb-8">
          Modifier mon profil
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ImageUpload
                currentImage="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80"
                onImageChange={(file) => console.log('Image changed:', file)}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <ProgressBar progress={progress} steps={progressSteps} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#347879] focus:border-[#347879]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#347879] focus:border-[#347879]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#347879] focus:border-[#347879]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#347879] focus:border-[#347879]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#347879] focus:border-[#347879]"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#347879] text-white py-2 px-4 rounded-lg hover:bg-[#ED6D47] transition-colors duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Enregistrement...
                    </>
                  ) : (
                    'Enregistrer les modifications'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <ChatbotButton />
    </div>
  );
}