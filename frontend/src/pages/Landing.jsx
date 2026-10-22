import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { 
  HiOutlineRocketLaunch, 
  HiOutlineMap, 
  HiOutlineLightBulb, 
  HiOutlineDocumentText,
  HiOutlineAcademicCap,
  HiOutlineChartBar
} from 'react-icons/hi2';

const Landing = () => {
  const features = [
    {
      icon: <HiOutlineRocketLaunch className="w-6 h-6" />,
      title: 'Career Guidance',
      description: 'Get personalized advice on career transitions, promotions, and navigating workplace challenges from expert AI agents.'
    },
    {
      icon: <HiOutlineMap className="w-6 h-6" />,
      title: 'Learning Roadmaps',
      description: 'Generate step-by-step learning paths tailored to your target role, current skills, and available time.'
    },
    {
      icon: <HiOutlineChartBar className="w-6 h-6" />,
      title: 'Skill Gap Detection',
      description: 'Identify missing skills for your dream job and get actionable recommendations on how to acquire them.'
    },
    {
      icon: <HiOutlineDocumentText className="w-6 h-6" />,
      title: 'Resume Analysis',
      description: 'Get feedback on your resume tailored to specific job descriptions to increase your chances of landing interviews.'
    },
    {
      icon: <HiOutlineLightBulb className="w-6 h-6" />,
      title: 'Project Ideas',
      description: 'Discover portfolio projects matched to your skill level that demonstrate exactly what employers are looking for.'
    },
    {
      icon: <HiOutlineAcademicCap className="w-6 h-6" />,
      title: 'Certifications',
      description: 'Find the most valuable certifications for your industry and get study plans to help you pass.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-sans overflow-x-hidden selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xl">
            G
          </div>
          <span className="font-bold text-xl tracking-tight">Guidance Pilot</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Log in
          </Link>
          <Link to="/signup">
            <Button variant="primary" size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 flex flex-col items-center justify-center text-center min-h-[90vh]">
        {/* Background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 dark:bg-violet-500/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6 border border-indigo-100 dark:border-indigo-800/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Meet Your New Career Advisor
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Navigate your career with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              AI-powered precision
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Personalized learning roadmaps, expert guidance, and actionable project recommendations tailored to your unique skills and ambitions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                See How It Works
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900/50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to level up</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Our multi-agent AI system analyzes your profile to provide comprehensive career support across multiple dimensions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-indigo-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Guidance Pilot Works</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              A simple process to accelerate your professional growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0 -z-10 -translate-y-1/2"></div>

            {[
              { step: '01', title: 'Tell us about yourself', desc: 'Create your profile with current skills, experience, and your dream role.' },
              { step: '02', title: 'Chat with AI Agents', desc: 'Discuss your goals with our specialized AI agents who analyze your unique situation.' },
              { step: '03', title: 'Get Your Flight Plan', desc: 'Receive actionable roadmaps, project ideas, and guidance to reach your destination.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-500 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl font-bold mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-indigo-600 dark:bg-indigo-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to accelerate your career?</h2>
          <p className="text-indigo-100 text-lg mb-10">
            Join thousands of professionals using Guidance Pilot to navigate their career paths with confidence.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-50 font-bold px-8 py-4 text-lg">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <p>© {new Date().getFullYear()} Guidance Pilot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
