import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  Search, 
  BarChart3, 
  Leaf, 
  Heart,
  Shield,
  Users
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: 'Live Plant Scanning',
      description: 'Use your camera to instantly identify medicinal plants with our CNN-powered recognition system.',
      link: '/scan'
    },
    {
      icon: Search,
      title: 'Search Database',
      description: 'Browse through our comprehensive database of 10 DOH-approved Philippine medicinal plants.',
      link: '/search'
    },
    {
      icon: BarChart3,
      title: 'View Statistics',
      description: 'Explore detailed analytics and performance metrics of our classification system.',
      link: '/stats'
    }
  ];

  const plants = [
    'Lagundi', 'Sambong', 'Tsaang Gubat', 'Ampalaya', 'Bawang',
    'Bayabas', 'Niyog-niyogan', 'Yerba Buena', 'Akapulko', 'Ulasimang Bato'
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <section className="nature-green-gradient rounded-2xl p-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white bg-opacity-20 rounded-full">
              <Leaf className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            HerbBayog
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-green-100">
            Calbayog City Herbal Research
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Advanced AI-powered identification system for Philippine medicinal plants. 
            Instantly recognize and learn about 10 DOH-approved herbal remedies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/scan" className="nature-button bg-white text-green-700 hover:bg-green-50">
              <Camera className="w-5 h-5 mr-2" />
              Start Scanning
            </Link>
            <Link to="/search" className="nature-button-secondary bg-green-700 text-white hover:bg-green-600">
              <Search className="w-5 h-5 mr-2" />
              Browse Plants
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Powerful Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                to={feature.link}
                className="card-shadow p-6 hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Icon className="w-6 h-6 text-green-700" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Plants Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          DOH Approved Medicinal Plants
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {plants.map((plant, index) => (
            <div
              key={index}
              className="card-shadow p-4 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="font-semibold text-gray-800">{plant}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="card-shadow p-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-700" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">10</h3>
          <p className="text-gray-600">DOH Approved Plants</p>
        </div>
        
        <div className="card-shadow p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-green-700" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">95%</h3>
          <p className="text-gray-600">Classification Accuracy</p>
        </div>
        
        <div className="card-shadow p-6 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-purple-700" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">1000+</h3>
          <p className="text-gray-600">Training Images</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
