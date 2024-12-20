import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { AddressInput } from '../components/AddressInput';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  birthDate: string;
  socialSecurity: string;
  motivation: string;
}

interface FormErrors {
  [key: string]: string;
}

export function Register() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    birthDate: '',
    socialSecurity: '',
    motivation: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName) newErrors.lastName = 'Le nom est requis';
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.phone) newErrors.phone = 'Le numéro de téléphone est requis';
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    if (!formData.birthDate) newErrors.birthDate = 'La date de naissance est requise';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#163860] mb-2">
            Rejoignez les Sapeurs-Pompiers
          </h1>
          <p className="text-gray-600">
            Commencez votre carrière au service des autres
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#090909] mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#347879] focus:border-[#347879] ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#090909] mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#347879] focus:border-[#347879] ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#090909] mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#347879] focus:border-[#347879] ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#090909] mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#347879] focus:border-[#347879] ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#090909] mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#347879] focus:border-[#347879] ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#090909] mb-1">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#347879] focus:border-[#347879] ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#090909] mb-1">
                Adresse
              </label>
              <AddressInput
                value={formData.address}
                onChange={(value) => setFormData(prev => ({ ...prev, address: value }))}
                error={errors.address}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#090909] mb-1">
                  Date de naissance
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#347879] focus:border-[#347879] ${
                    errors.birthDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.birthDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.birthDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#090909] mb-1">
                  Numéro de sécurité sociale
                </label>
                <input
                  type="text"
                  name="socialSecurity"
                  value={formData.socialSecurity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-[#347879] focus:border-[#347879]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#090909] mb-1">
                Pourquoi souhaitez-vous devenir pompier ?
              </label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-[#347879] focus:border-[#347879]"
                required
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <AlertCircle className="w-5 h-5 text-[#347879] flex-shrink-0" />
              <p>
                En soumettant ce formulaire, vous acceptez que vos données personnelles
                soient traitées conformément à notre politique de confidentialité.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#347879] text-white py-3 px-4 rounded-lg hover:bg-[#ED6D47] transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Envoi en cours...
                </>
              ) : (
                'Soumettre ma candidature'
              )}
            </button>

            <p className="text-center text-sm text-gray-600">
              Déjà inscrit ?{' '}
              <Link
                to="/login"
                className="text-[#347879] hover:text-[#ED6D47] font-medium transition-colors"
              >
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}