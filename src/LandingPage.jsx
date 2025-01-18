import React from 'react';
import { Button } from "./components/ui/button.tsx";
import { Card, CardContent } from "./components/ui/card.tsx";
import { Calendar, Ticket, Users, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  const features = [
    { icon: <Calendar className="h-6 w-6" />, title: "Easy Scheduling", description: "Book events with just a few clicks" },
    { icon: <Ticket className="h-6 w-6" />, title: "Secure Tickets", description: "Digital tickets delivered instantly" },
    { icon: <Users className="h-6 w-6" />, title: "Group Booking", description: "Special rates for group bookings" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative Bubbles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-xl opacity-70" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-indigo-100 rounded-full blur-xl opacity-70" />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-100 rounded-full blur-xl opacity-70" />
      <div className="absolute -bottom-10 right-1/3 w-36 h-36 bg-pink-100 rounded-full blur-xl opacity-70" />
      
      {/* Navigation */}
      <nav className="relative bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Ticket className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-indigo-900">EventHub</span>
            </div>
            <div className="flex gap-4">
              <Button asChild variant="ghost">
                <a href="/login" className="text-indigo-600 hover:text-indigo-700">Login</a>
              </Button>
              <Button asChild>
                <a href="/signup" className="bg-indigo-900 hover:bg-indigo-700 text-white">Sign Up</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 leading-tight">
                Discover Amazing Events Near You
              </h1>
              <p className="text-xl text-slate-600">
                Book tickets for the best events in your city with just a few clicks
              </p>
              <Button size="lg" className="bg-indigo-900 hover:bg-indigo-700 text-white gap-2">
                Get Started <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative hidden md:block">
              <img 
                src="/api/placeholder/500/400"
                alt="Event Preview"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-full" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-indigo-100 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-900">Why Choose EventHub?</h2>
            <p className="mt-4 text-slate-600">
              Experience the easiest way to book and manage your events
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="inline-block p-3 bg-indigo-100 rounded-lg text-indigo-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 bg-indigo-900">
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/80 mb-8">
            Join thousands of people booking amazing events every day
          </p>
          <Button asChild variant="secondary" size="lg" className="bg-white text-indigo-900 hover:bg-white/90">
            <a href="/signup">Create Account</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;