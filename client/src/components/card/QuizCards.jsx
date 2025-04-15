import React from 'react'
import { ArrowRight, Code, Brain, Server } from 'lucide-react'

const quizzes = [
  {
    title: "Frontend Quiz",
    description: "Test your HTML, CSS, and JavaScript skills.",
    icon: <Code className="w-6 h-6 text-white" />,
    color: "from-indigo-600 via-purple-600 to-pink-500",
    questions: 10,
  },
  {
    title: "Backend Quiz",
    description: "Check your knowledge in Node.js, databases, and APIs.",
    icon: <Server className="w-6 h-6 text-white" />,
    color: "from-green-600 via-emerald-500 to-teal-400",
    questions: 12,
  },
  {
    title: "General Knowledge",
    description: "Explore fun facts and trivia across various topics.",
    icon: <Brain className="w-6 h-6 text-white" />,
    color: "from-yellow-500 via-orange-500 to-red-500",
    questions: 8,
  },
]

const QuizCards = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 p-4">
      {quizzes.map((quiz, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${quiz.color} text-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl cursor-pointer`}
        >
          <div className="p-6 space-y-4">
            <div className="bg-white/20 p-3 rounded-full w-fit">{quiz.icon}</div>
            <h3 className="text-xl font-bold">{quiz.title}</h3>
            <p className="text-sm opacity-90">{quiz.description}</p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm bg-white text-black font-semibold px-3 py-1 rounded-full">
                {quiz.questions} Questions
              </span>
              <ArrowRight className="w-5 h-5 opacity-80 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuizCards
