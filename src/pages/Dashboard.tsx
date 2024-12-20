import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, FileCheck, FileText, ClipboardList, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';

interface ApplicationStep {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [applicationSteps] = useState<ApplicationStep[]>([
    {
      id: 1,
      title: 'Dossier reçu',
      status: 'completed',
      date: '15/03/2024'
    },
    {
      id: 2,
      title: 'Vérification des documents',
      status: 'current',
      date: '18/03/2024'
    },
    {
      id: 3,
      title: 'Tests physiques',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Entretien psychologique',
      status: 'pending'
    },
    {
      id: 5,
      title: 'Décision finale',
      status: 'pending'
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FileCheck className="h-8 w-8 text-red-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">
                Espace Candidat
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
              <Button variant="secondary" onClick={handleLogout}>
                <LogOut className="h-5 w-5 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gray-100 p-3 rounded-full">
                <User className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <Button className="w-full">
              Modifier mon profil
            </Button>
          </div>

          {/* Application Progress */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-2 mb-6">
              <ClipboardList className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold">Suivi de candidature</h2>
            </div>
            <div className="space-y-4">
              {applicationSteps.map((step, index) => (
                <div key={step.id} className="relative">
                  {index !== applicationSteps.length - 1 && (
                    <div className="absolute left-5 top-8 h-full w-0.5 bg-gray-200" />
                  )}
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-green-100' :
                      step.status === 'current' ? 'bg-blue-100' :
                      'bg-gray-100'
                    }`}>
                      <FileText className={`h-5 w-5 ${
                        step.status === 'completed' ? 'text-green-600' :
                        step.status === 'current' ? 'text-blue-600' :
                        'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">{step.title}</h3>
                        {step.date && (
                          <span className="text-sm text-gray-500">{step.date}</span>
                        )}
                      </div>
                      {step.status === 'current' && (
                        <p className="mt-1 text-sm text-blue-600">
                          En cours de traitement
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}