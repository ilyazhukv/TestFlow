import { Button } from "@heroui/button";
import { Link } from "react-router-dom";
import { Play, Plus, ArrowRight } from "@gravity-ui/icons";
import { useQuery } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

import { testsQueryOptions } from "@/entities/test/test.api";
import { TestCard } from "@/entities/test/test-card.ui";
import { sessionQueryOptions } from "@/entities/session/session.api";

export default function HomePage() {
  const { data: session } = useQuery(sessionQueryOptions);
  const { data } = useSuspenseQuery(testsQueryOptions({ page: "1" }));

  return (
    <div className="animate-slide-up">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl mx-4 mt-6 mb-12 min-h-[400px]">
        <div className="kahoot-gradient absolute inset-0" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 md:py-16 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
              Learn & Play
              <span className="block text-yellow-300">with Quizzes</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Create, share, and play interactive quizzes. Challenge your friends
              and track your progress in the most fun way possible.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button
                as={Link}
                to="/test"
                className="font-bold text-purple-700 bg-white hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all px-8 py-6 text-lg"
                endContent={<Play fill="currentColor" className="w-5 h-5" />}
                radius="full"
                size="lg"
              >
                Discover Quizzes
              </Button>
              {session && (
                <Button
                  as={Link}
                  to="/editor"
                  className="font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-all px-8 py-6 text-lg"
                  endContent={<Plus fill="currentColor" className="w-5 h-5" />}
                  radius="full"
                  size="lg"
                  variant="bordered"
                >
                  Create Quiz
                </Button>
              )}
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="w-64 h-64 bg-white/10 rounded-full animate-float backdrop-blur-md border border-white/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🎯</div>
                <p className="text-white font-bold text-lg">TestFlow</p>
                <p className="text-white/60 text-sm">Interactive Learning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quizzes */}
      <section className="mb-16 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-foreground">
              Popular Quizzes
            </h2>
            <p className="text-default-500 mt-1">
              Discover the most played quizzes
            </p>
          </div>
          <Button
            as={Link}
            to="/test"
            className="font-bold"
            color="primary"
            endContent={<ArrowRight fill="currentColor" className="w-4 h-4" />}
            radius="full"
            variant="flat"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.tests.slice(0, 3).map((test: any) => (
            <div key={test._id} className="animate-scale-in">
              <TestCard key={test._id} data={test} />
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">
            Why TestFlow?
          </h2>
          <p className="text-default-500 max-w-md mx-auto">
            Everything you need to create engaging learning experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🎨",
              title: "Easy to Create",
              desc: "Build beautiful quizzes in minutes with our intuitive editor",
              gradient: "from-pink-500 to-rose-500",
            },
            {
              icon: "🎮",
              title: "Fun to Play",
              desc: "Interactive gameplay with timers, scores, and instant feedback",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: "📊",
              title: "Track Progress",
              desc: "Monitor your performance with detailed analytics and history",
              gradient: "from-emerald-500 to-teal-500",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="relative group bg-background rounded-2xl p-8 border border-default-200 hover:border-primary/30 kahoot-card-hover cursor-default"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-default-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}