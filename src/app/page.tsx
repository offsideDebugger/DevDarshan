import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MessageBanner from '@/components/MessageBanner';
import MainPageNav from '@/components/MainPageNav';
import { Suspense } from 'react';

import { 
  Code2, 
  BookmarkPlus, 
  GitBranch, 
  Users, 
  Zap, 
  Target, 
  ArrowRight,
  Github,
  Globe,
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: BookmarkPlus,
    title: "Smart Bookmarking",
    description: "Save and organize your favorite GSoC organizations with intelligent tagging and categorization.",
    color: "text-purple-400"
  },
  {
    icon: GitBranch,
    title: "Repository Tracking",
    description: "Monitor project repositories, track contributions, and stay updated with the latest developments.",
    color: "text-blue-400"
  },
  {
    icon: Users,
    title: "Community Insights",
    description: "Connect with mentors, discover project opportunities, and build meaningful relationships.",
    color: "text-green-400"
  }
];

const howItWorksSteps = [
  {
    step: "01",
    title: "Discover Organizations",
    description: "Browse through hundreds of GSoC participating organizations with detailed profiles and project information.",
    icon: Globe
  },
  {
    step: "02",
    title: "Track & Bookmark",
    description: "Save your favorite organizations and repositories. Get notified about important updates and deadlines.",
    icon: BookmarkPlus
  },
  {
    step: "03",
    title: "Monitor Progress",
    description: "Track your contributions, analyze your growth, and celebrate your achievements along the way.",
    icon: Target
  }
];

export default function Home() {

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.05),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.05),transparent)] pointer-events-none" />
      
      {/* Error/Success Messages */}
      <Suspense fallback={null}>
        <MessageBanner />
      </Suspense>
      
      {/* Navigation */}
      <Suspense fallback={null}>
        <MainPageNav />
      </Suspense>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center transform transition-all duration-1000">
            <Badge variant="secondary" className="mb-4 lg:mb-6 bg-gray-900 text-purple-300 border-purple-500/30 text-xs lg:text-sm">
              <Zap className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
              GSoC Organization Tracker
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl lg:text-7xl font-bold mb-4 lg:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                DevDarshan
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-3 lg:mb-4 max-w-4xl mx-auto font-light">
              Walk the path. Write the code. Earn the karma.
            </p>
            
            <p className="text-base lg:text-lg text-gray-400 mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
              Your ultimate companion for navigating Google Summer of Code. 
              Discover organizations, track repositories, and build your open-source journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 lg:px-8 py-3 text-base lg:text-lg">
                <Link href="/signup">Start Your Journey</Link>
                <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 lg:px-8 py-3 text-base lg:text-lg">
                <Github className="mr-2 w-4 h-4 lg:w-5 lg:h-5" />
               <Link href="https://github.com/offsideDebugger/DevDarshan">View on GitHub</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Everything you need to succeed in Google Summer of Code, all in one place.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <CardTitle className="text-white text-base lg:text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 leading-relaxed text-sm lg:text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 lg:py-20 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Get started with DevDarshan in three simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {howItWorksSteps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                  <item.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="text-xl lg:text-2xl font-bold text-purple-400 mb-3 lg:mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm lg:text-base px-4">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 lg:py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hidden lg:flex items-center justify-center">
                <Code2 className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                DevDarshan
              </span>
            </div>
            <p className="text-gray-400 text-sm lg:text-base mb-6">
              Empowering developers to succeed in Google Summer of Code
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
              <span>© 2025 DevDarshan. All rights reserved.</span>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            <div className="mt-6 text-xs text-gray-500">
              Made by <a href="https://twitter.com/offsidedebugger" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">@offsidedebugger</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}