'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:bg-black relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Neon glow orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 dark:opacity-20 animate-pulse" />
      <div className="absolute -bottom-8 right-0 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 dark:opacity-20 animate-pulse [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-5 dark:opacity-10 animate-pulse [animation-delay:2s]" />

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-fuchsia-400 to-purple-400 rounded-xl blur-lg opacity-40 animate-pulse" />
              <div className="relative w-full h-full bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-purple-500 rounded-xl flex items-center justify-center border border-cyan-400/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-400 hover:text-cyan-400 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-purple-500 rounded-lg blur opacity-40 group-hover:opacity-70 transition duration-300" />
              <div className="relative px-6 py-2.5 bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-purple-600 rounded-lg text-white font-medium">
                Get Started Free
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm font-semibold text-cyan-400 backdrop-blur-sm">
              ✨ The Future of Task Management
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight">
            Organize Your Life,
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
              One Task at a Time
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Experience the most intuitive task management platform. Stay organized,
            boost productivity, and achieve your goals with powerful features designed for modern workflows.
          </p>

          <div className="flex gap-4 justify-center mt-8">
            <Link
              href="/signup"
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-purple-500 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-300" />
              <div className="relative px-8 py-4 bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-purple-600 rounded-xl text-white font-semibold text-lg flex items-center gap-2">
                Start Free Trial →
              </div>
            </Link>
            <a
              href="#features"
              className="px-8 py-4 bg-black/50 border border-cyan-500/30 text-cyan-400 rounded-xl font-semibold text-lg hover:border-cyan-400/50 hover:bg-black/70 backdrop-blur-sm transition-all duration-200"
            >
              See Features
            </a>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Unlimited tasks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to Stay Productive
          </h2>
          <p className="text-xl text-gray-400">
            Powerful features that help you manage tasks like a pro
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="group relative bg-black/50 border border-cyan-500/20 p-8 rounded-2xl hover:border-cyan-400/40 backdrop-blur-sm transition-all duration-300">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/50">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Secure Authentication</h3>
              <p className="text-gray-400 leading-relaxed">
                Enterprise-grade JWT authentication with encrypted tokens. Your data is protected with industry-standard security protocols.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-black/50 border border-fuchsia-500/20 p-8 rounded-2xl hover:border-fuchsia-400/40 backdrop-blur-sm transition-all duration-300">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-fuchsia-500/50">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-fuchsia-400 mb-3">Smart Organization</h3>
              <p className="text-gray-400 leading-relaxed">
                Organize tasks with priorities, due dates, tags, and categories. Advanced filtering and search to find what you need instantly.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-black/50 border border-purple-500/20 p-8 rounded-2xl hover:border-purple-400/40 backdrop-blur-sm transition-all duration-300">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-purple-500/50">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-purple-400 mb-3">Lightning Fast</h3>
              <p className="text-gray-400 leading-relaxed">
                Built with Next.js 16 and optimized for performance. Real-time updates and instant sync across all your devices.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group relative bg-black/50 border border-cyan-500/20 p-8 rounded-2xl hover:border-cyan-400/40 backdrop-blur-sm transition-all duration-300">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/50">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Task Analytics</h3>
              <p className="text-gray-400 leading-relaxed">
                Track your productivity with detailed analytics. Visualize completion rates, trends, and insights to optimize your workflow.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="group relative bg-black/50 border border-fuchsia-500/20 p-8 rounded-2xl hover:border-fuchsia-400/40 backdrop-blur-sm transition-all duration-300">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-500 to-purple-500 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-fuchsia-500/50">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-fuchsia-400 mb-3">Export & Backup</h3>
              <p className="text-gray-400 leading-relaxed">
                Export your tasks to CSV, JSON, or PDF. Automatic backups ensure your data is always safe and accessible.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="group relative bg-black/50 border border-purple-500/20 p-8 rounded-2xl hover:border-purple-400/40 backdrop-blur-sm transition-all duration-300">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-purple-500/50">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-purple-400 mb-3">Keyboard Shortcuts</h3>
              <p className="text-gray-400 leading-relaxed">
                Power user? Use keyboard shortcuts for lightning-fast task management. Create, complete, and navigate without touching your mouse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="relative bg-black/50 border border-cyan-500/20 rounded-3xl p-12 backdrop-blur-sm">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-purple-500 rounded-3xl blur opacity-10" />

          <div className="relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Get Started in 3 Simple Steps
              </h2>
              <p className="text-xl text-gray-400">
                Start managing your tasks in less than a minute
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Create Account</h3>
                <p className="text-gray-400 leading-relaxed">
                  Sign up with your email in seconds. No credit card required, no commitments.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-fuchsia-500/50">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <h3 className="text-2xl font-bold text-fuchsia-400 mb-4">Add Your Tasks</h3>
                <p className="text-gray-400 leading-relaxed">
                  Create tasks, set priorities, add due dates, and organize with tags.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-cyan-500 to-fuchsia-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/50">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Get Things Done</h3>
                <p className="text-gray-400 leading-relaxed">
                  Track progress, complete tasks, and watch your productivity soar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="relative bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl shadow-cyan-500/20">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-purple-500 rounded-3xl blur opacity-50 animate-pulse" />

          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already managing their tasks smarter, not harder.
            </p>
            <Link
              href="/signup"
              className="inline-block px-10 py-4 bg-white text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 border-2 border-white"
            >
              Start Your Free Trial →
            </Link>
            <p className="text-cyan-100 mt-4 text-sm">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-cyan-500/20 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">TaskFlow</span>
            </div>
            <p className="text-gray-500 text-sm">
              The most intuitive way to manage your tasks and boost productivity.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-cyan-400 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-fuchsia-400 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-fuchsia-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-purple-400 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cyan-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2025 TaskFlow. Built with Next.js 16+ • FastAPI • PostgreSQL
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-cyan-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a
              href="https://github.com/Asmayaseen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-fuchsia-400 transition-colors"
              title="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
