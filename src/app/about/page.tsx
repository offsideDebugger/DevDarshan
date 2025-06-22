"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, 
  BookmarkPlus, 
  GitBranch, 
  Users, 
  Target, 
  ArrowRight,
  Github,
  Heart,
  Lightbulb,
  Rocket,
  Globe,
  Calendar,
  Award
} from 'lucide-react';
import Link from 'next/link';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Open Source First",
      description: "We believe in the power of open source to transform lives and create opportunities for developers worldwide.",
      color: "text-red-400"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Constantly evolving to provide the best tools and insights for the GSoC community.",
      color: "text-yellow-400"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building bridges between mentors, organizations, and aspiring contributors in the GSoC ecosystem.",
      color: "text-green-400"
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "DevDarshan Launch",
      description: "Started as a simple idea to help GSoC participants track organizations more effectively."
    },
    {
      year: "2024",
      title: "Community Growth",
      description: "Reached 1000+ active users helping them navigate their GSoC journey."
    },
    {
      year: "2025",
      title: "Feature Expansion",
      description: "Added advanced analytics, repository tracking, and mentor connection features."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.05),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.05),transparent)] pointer-events-none" />
      
      {/* Navigation */}
      <nav className="relative z-50 border-b border-gray-800 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                DevDarshan
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#features" className="text-gray-300 hover:text-white transition-colors duration-200">Features</Link>
              <Link href="/about" className="text-white font-medium">About</Link>
              <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Badge variant="secondary" className="mb-6 bg-gray-900 text-purple-300 border-purple-500/30">
              <Rocket className="w-4 h-4 mr-2" />
              About DevDarshan
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Empowering GSoC Dreams
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              DevDarshan was born from the belief that every developer deserves a clear path to contribute to open source. 
              We're here to guide you through your Google Summer of Code journey.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                We believe that contributing to open source should be accessible to everyone. DevDarshan simplifies 
                the complex process of finding, tracking, and engaging with GSoC organizations.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our platform bridges the gap between aspiring contributors and meaningful open source projects, 
                making the path to GSoC success clearer and more achievable.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Globe className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-white mb-2">500+</div>
                  <div className="text-gray-400">Organizations</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6 text-center">
                  <GitBranch className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-white mb-2">10K+</div>
                  <div className="text-gray-400">Repositories</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-white mb-2">2.5K+</div>
                  <div className="text-gray-400">Contributors</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-white mb-2">95%</div>
                  <div className="text-gray-400">Success Rate</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Our Values
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do at DevDarshan.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-4 ${value.color}`}>
                    <value.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-white text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Our Journey
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Key milestones in the DevDarshan story.
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <Badge variant="secondary" className="bg-gray-900 text-purple-300 border-purple-500/30">
                      {milestone.year}
                    </Badge>
                    <h3 className="text-xl font-semibold text-white">{milestone.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-gray-900/30 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Join Our Mission
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Be part of the community that's making open source more accessible for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3">
                  <Github className="mr-2 w-5 h-5" />
                  Contribute
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                DevDarshan
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Contact
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DevDarshan. Walk the path. Write the code. Earn the karma.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}