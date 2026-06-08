import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card } from "@/components/cards/Card";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { Footer } from "@/components/layout/Footer";
import CounterStat from "@/components/home/CounterStat";
import TestimonialCard from "@/components/home/TestimonialCard";
import { HeroButtons } from "@/components/home/HeroButtons";
import { CTASection } from "@/components/home/CTASection";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-red-50 dark:from-slate-900 dark:via-orange-950/20 dark:to-red-950 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="flex flex-col justify-center">
              <FadeIn duration={300}>
                <SlideUp duration={300} delay={0}>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 font-display">
                    <span className="bg-gradient-to-r from-red-600 via-orange-500 to-teal-500 dark:from-red-400 dark:via-orange-400 dark:to-teal-400 bg-clip-text text-transparent">
                      Your AI-Powered GCSE Success Platform
                    </span>
                  </h1>
                </SlideUp>
              </FadeIn>

              <SlideUp duration={300} delay={100}>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-md">
                  Master every subject with personalized AI tutors, revision plans, and expert guidance
                </p>
              </SlideUp>

              <SlideUp duration={300} delay={150}>
                <div className="flex items-center gap-2 mb-8 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Trusted by 50,000+ UK students
                </div>
              </SlideUp>

              <SlideUp duration={300} delay={200}>
                <HeroButtons />
              </SlideUp>
            </div>

            {/* Right Column - Hero Image Placeholder */}
            <FadeIn duration={300} delay={300}>
              <div className="hidden lg:block w-full">
                <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎓</div>
                    <p className="text-slate-600 dark:text-slate-400">Hero Image</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-orange-950 dark:bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 font-display text-slate-900 dark:text-white">
              Why Choose GCSC Hub?
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Tutors That Adapt to You",
                description: "8 specialized AI agents covering every subject and learning style",
                delay: 0,
              },
              {
                title: "Revision Made Intelligent",
                description: "SM-2 spaced repetition meets AI-generated flashcards",
                delay: 50,
              },
              {
                title: "Connect with Real Tutors",
                description: "Book verified tutors, connect instantly, track progress",
                delay: 100,
              },
            ].map((feature, index) => (
              <SlideUp key={index} delay={feature.delay} duration={300}>
                <Card
                  variant="default"
                  hoverable
                  className="p-8 border-2 border-orange-200 dark:border-orange-700/30 hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-lg hover:scale-105 transition-all duration-200 h-full flex flex-col bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-6 flex items-center justify-center text-white text-xl">
                    {index === 0 && "🤖"}
                    {index === 1 && "📚"}
                    {index === 2 && "👥"}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                  <a
                    href="#"
                    className="mt-4 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline"
                  >
                    Explore →
                  </a>
                </Card>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-50/50 to-orange-50 dark:from-teal-900/10 dark:to-orange-900/10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 font-display text-slate-900 dark:text-white">
              Loved by Students
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Ahmed",
                achievement: "Improved from Grade 5 to Grade 9",
                quote: "The AI tutors helped me understand difficult concepts in minutes!",
                avatar: "👩",
              },
              {
                name: "James Chen",
                achievement: "Improved from Grade 6 to Grade 8",
                quote: "Smart flashcards made revision so much more effective.",
                avatar: "👨",
              },
              {
                name: "Emma Wilson",
                achievement: "Achieved Grade 9 in 5 subjects",
                quote: "Best investment for my GCSE prep. Absolutely worth it!",
                avatar: "👩‍🦰",
              },
              {
                name: "Marcus Johnson",
                achievement: "Improved from Grade 4 to Grade 7",
                quote: "The real tutors on the marketplace gave me personalized help.",
                avatar: "👨‍🦱",
              },
            ].map((testimonial, index) => (
              <SlideUp key={index} delay={index * 50} duration={300}>
                <TestimonialCard testimonial={testimonial} />
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50/50 to-white dark:from-red-900/10 dark:to-slate-900">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 font-display text-slate-900 dark:text-white">
              By The Numbers
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: 50000, label: "Active Students", suffix: "+" },
              { number: 8, label: "AI Agents", suffix: "" },
              { number: 10000, label: "Tutors Available", suffix: "+" },
              { number: 98, label: "Success Rate", suffix: "%" },
            ].map((stat, index) => (
              <SlideUp key={index} delay={index * 100} duration={300}>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-700/30 rounded-lg p-8 text-center">
                  <CounterStat
                    target={stat.number}
                    suffix={stat.suffix}
                    delay={index * 200}
                  />
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-4">
                    {stat.label}
                  </p>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
