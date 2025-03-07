'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  summary: string;
  achievements: string[];
}

const experienceData: ExperienceItem[] = [
  {
    company: "Tata Consultancy Services",
    role: "Cybersecurity Analyst",
    period: "2017 - 2020",
    summary: "Performed vulnerability assessments and penetration testing for enterprise clients. Implemented SIEM solutions and security monitoring systems. Developed incident response procedures and conducted security training.",
    achievements: [
      "Detected and mitigated 20+ critical security incidents before they caused damage",
      "Implemented security monitoring solutions for 15+ enterprise clients",
      "Received recognition for outstanding performance in threat detection"
    ]
  }
]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-b from-black via-cyan-950/10 to-black"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="cyber-grid opacity-20"></div>
        <div className="scan-line"></div>
        
        {/* Enhanced star field effect */}
        {Array.from({ length: 75 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 8 + 's',
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced section header with improved glitch effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="mb-24 text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 cyber-glitch-text relative inline-block" data-text="MISSION LOG">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-text">
                MISSION LOG
              </span>
              <div className="absolute -inset-4 blur-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 -z-10 rounded-full"></div>
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <div className="px-8 font-mono text-base text-cyan-400 tracking-wider">EXPERIENCE TIMELINE</div>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-600"></div>

            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative mb-16"
              >
                <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-black glow-cyan"></div>

                  {/* Experience card */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl overflow-hidden">
                      <div className="relative">
                        {/* Glowing border */}
                        <div className="absolute -inset-0.5 rounded-xl opacity-75 blur-sm border-glow bg-gradient-to-br from-cyan-500/30 to-purple-600/30"></div>
                        
                        {/* Content */}
                        <div className="relative p-6">
                          {/* Terminal header */}
                          <div className="flex items-center mb-4 border-b border-cyan-800/50 pb-2">
                            <div className="flex space-x-2 mr-4">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="font-mono text-xs text-cyan-400">mission_log_{index + 1}.sh</div>
                          </div>

                          {/* Company and role */}
                          <h3 className="text-xl font-bold text-white mb-1">{exp.company}</h3>
                          <div className="flex justify-between items-center mb-4">
                            <p className="text-cyan-400 font-mono">{exp.role}</p>
                            <p className="text-cyan-400 font-mono">{exp.period}</p>
                          </div>

                          {/* Summary */}
                          <div className="font-mono text-sm text-gray-300 mb-4">
                            <span className="text-cyan-400">$ ./display_mission.sh --summary</span>
                            <p className="mt-2 leading-relaxed">{exp.summary}</p>
                          </div>

                          {/* Achievements */}
                          <div className="font-mono text-sm">
                            <span className="text-cyan-400">$ ./display_achievements.sh</span>
                            <ul className="mt-2 space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start text-gray-300">
                                  <span className="text-cyan-400 mr-2">→</span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 