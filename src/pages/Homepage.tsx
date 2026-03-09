import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, ShoppingCart, Star, Box, Heart, Image as ImageIcon } from 'lucide-react';
import api from '../api/axios';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to fetch trending products for the homepage
    // We would need to implement this endpoint or grab it from a general endpoint
    // We'll mock it if it falls back.
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products.php'); // Assuming this point exists to fetch all products
        if (response.data && response.data.success) {
          // Take top 4 or rely on server side limit in a real app
          setProducts(response.data.data.slice(0, 4));
        }
      } catch (err) {
        // Fallback for demo purposes matching the PHP fallback mechanism
        setProducts([
          { id: 1, name: "Premium Wireless Headphones", price: 3499000, description: "Noise-cancelling over-ear headphones with 30-hour battery life.", image: "" },
          { id: 2, name: "Ultra-Slim Laptop Pro", price: 24500000, description: "High-performance laptop for professionals with stunning Retina display.", image: "" },
          { id: 3, name: "Smart Fitness Watch", price: 1890000, description: "Track your health metrics, steps, and heart rate all day.", image: "" },
          { id: 4, name: "4K Action Camera", price: 5600000, description: "Capture your adventures in stunning detail, waterproof up to 10m.", image: "" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Layers className="text-indigo-600 w-8 h-8" />
              <span className="font-bold text-xl text-gray-900 tracking-tight">TechStore</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/homepage" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
              <Link to="/products" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Products</Link>
              <Link to="/categories" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Categories</Link>
              <Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">About Us</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Admin Login</Link>
              <button className="flex items-center bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
                <ShoppingCart className="w-4 h-4 mr-2" /> Cart (0)
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-10 sm:pt-16 lg:pt-24 xl:pt-32">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Next Generation</span>
                  <span className="block text-indigo-600 xl:inline mt-1">Tech Products</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover the latest smartphones, cutting-edge laptops, and premium accessories. Elevate your digital life with our curated selection of top-tier electronics.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a href="#featured" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300">
                      Shop Now
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/categories" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-all duration-300">
                      View Categories
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full bg-indigo-50" src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80" alt="Tech workspace" />
          <div className="absolute inset-0 bg-indigo-600 mix-blend-multiply opacity-20"></div>
        </div>
      </div>

      {/* Featured Products */}
      <div id="featured" className="bg-gray-50 py-16 sm:py-24 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Trending Products</h2>
            <Link to="/products" className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block transition-colors">
              Shop the collection <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {loading ? (
             <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
               <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
               <p className="text-gray-500">Loading brilliant products...</p>
             </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <Box className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No products available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {products.map((prod) => (
                <div key={prod.id} className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                  <div className="w-full h-60 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center relative">
                    {prod.image ? (
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity" />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-300" />
                    )}
                    
                    <div className="absolute top-2 right-2">
                      <button className="bg-white/80 backdrop-blur p-2 rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm flex items-center justify-center">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex-1 flex flex-col">
                    <h3 className="text-sm font-medium text-gray-900 flex-1">
                      <Link to={`/product/${prod.id}`}>
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {prod.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{prod.description || 'High performance tech product.'}</p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-bold text-indigo-600">{formatCurrency(prod.price)}</p>
                      <div className="flex items-center text-xs text-yellow-400">
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/products" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Shop all products <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Layers className="text-indigo-400 w-8 h-8" />
                <span className="font-bold text-xl tracking-tight">TechStore</span>
              </div>
              <p className="text-gray-400 text-sm max-w-sm">
                Providing the best tech gadgets and electronics with guaranteed quality and premium customer service.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
                <li><Link to="/products" className="hover:text-indigo-400 transition-colors">Shop</Link></li>
                <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TechStore. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
