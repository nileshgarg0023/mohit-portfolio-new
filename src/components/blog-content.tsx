'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

interface BlogContentProps {
  content: string
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none w-full font-mono"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headers
          h1: ({ children }) => (
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            >
              {children}
            </motion.h1>
          ),
          h2: ({ children }) => (
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
            >
              {children}
            </motion.h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-cyan-400">
              {children}
            </h3>
          ),
          // Paragraphs
          p: ({ children }) => (
            <p className="text-gray-300 leading-relaxed mb-6 text-lg">
              {children}
            </p>
          ),
          // Lists
          ul: ({ children }) => (
            <ul className="list-none space-y-2 mb-6 ml-6">
              {React.Children.map(children, (child) => (
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-3 before:w-3 before:h-3 before:border-2 before:border-cyan-500 before:rounded-full">
                  {child}
                </li>
              ))}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2 mb-6 ml-6 text-gray-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-300 leading-relaxed">{children}</li>
          ),
          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-cyan-500 pl-6 my-8 italic bg-black/30 py-4 pr-4 rounded-r-lg shadow-[0_0_15px_rgba(34,211,238,0.1)] text-cyan-400">
              {children}
            </blockquote>
          ),
          // Code blocks
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <div className="relative group mb-8">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-black rounded-lg">
                  <div className="flex items-center gap-2 bg-cyan-950/50 px-4 py-2 rounded-t-lg border-b border-cyan-800/30">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-sm text-cyan-400 font-mono">
                      {match[1]}
                    </span>
                  </div>
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    className="!mt-0 !bg-black !rounded-t-none"
                    showLineNumbers
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              </div>
            ) : (
              <code className="bg-cyan-950/30 text-cyan-400 px-2 py-1 rounded font-mono text-sm" {...props}>
                {children}
              </code>
            )
          },
          // Tables
          table: ({ children }) => (
            <div className="relative group mb-8 w-full overflow-x-auto">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-20"></div>
              <table className="relative w-full border-collapse bg-black/80 rounded-lg">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-cyan-800/30 px-6 py-3 text-left text-cyan-400 font-mono">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-cyan-800/30 px-6 py-3 text-gray-300">
              {children}
            </td>
          ),
          // Links
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-800 hover:decoration-cyan-400 transition-all"
            >
              {children}
            </a>
          ),
          // Images
          img: ({ src, alt }) => (
            <div className="relative group my-8">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-cyan-800/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover"
                />
              </div>
              {alt && (
                <p className="text-center text-sm text-gray-400 mt-2 font-mono">
                  {alt}
                </p>
              )}
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  )
} 