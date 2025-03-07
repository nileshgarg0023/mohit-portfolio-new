import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

const contactInfo = {
  email: "security@mohitportfolio.com",
  phone: "+1 (555) 123-4567",
  location: "Silicon Valley, CA",
  social: {
    github: "https://github.com/mohit-security",
    linkedin: "https://linkedin.com/in/mohit-security",
    twitter: "https://twitter.com/mohit_security"
  }
}

export default function ContactInfo() {
  return (
    <div className="relative p-6 bg-black/80 backdrop-blur-md rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-colors duration-300">
      {/* Glowing border */}
      <div className="absolute -inset-0.5 rounded-xl opacity-75 blur-md bg-gradient-to-br from-cyan-500/30 to-purple-600/30 group-hover:from-cyan-500/50 group-hover:to-purple-600/50 transition-colors duration-300"></div>
      
      {/* Content */}
      <div className="relative">
        {/* Terminal-style header */}
        <div className="flex items-center mb-6 border-b border-cyan-800/50 pb-3">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="font-mono text-xs text-cyan-400">contact_info.sh</div>
        </div>

        {/* Contact details */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-900/30 flex items-center justify-center border border-cyan-800/30 group-hover:border-cyan-500/30 transition-colors duration-300">
              <FiMail className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400 font-mono">Email</div>
              <div className="text-white font-mono group-hover:text-cyan-400 transition-colors duration-300">
                {contactInfo.email}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-center space-x-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-900/30 flex items-center justify-center border border-cyan-800/30 group-hover:border-cyan-500/30 transition-colors duration-300">
              <FiPhone className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400 font-mono">Phone</div>
              <div className="text-white font-mono group-hover:text-cyan-400 transition-colors duration-300">
                {contactInfo.phone}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center space-x-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-900/30 flex items-center justify-center border border-cyan-800/30 group-hover:border-cyan-500/30 transition-colors duration-300">
              <FiMapPin className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400 font-mono">Location</div>
              <div className="text-white font-mono group-hover:text-cyan-400 transition-colors duration-300">
                {contactInfo.location}
              </div>
            </div>
          </motion.div>

          {/* Social links */}
          <div className="pt-6 border-t border-cyan-800/30">
            <div className="flex space-x-4">
              <motion.a
                href={contactInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="w-10 h-10 rounded-lg bg-cyan-900/30 flex items-center justify-center border border-cyan-800/30 hover:border-cyan-500/30 transition-colors duration-300 group"
              >
                <FiGithub className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
              </motion.a>
              
              <motion.a
                href={contactInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="w-10 h-10 rounded-lg bg-cyan-900/30 flex items-center justify-center border border-cyan-800/30 hover:border-cyan-500/30 transition-colors duration-300 group"
              >
                <FiLinkedin className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
              </motion.a>
              
              <motion.a
                href={contactInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="w-10 h-10 rounded-lg bg-cyan-900/30 flex items-center justify-center border border-cyan-800/30 hover:border-cyan-500/30 transition-colors duration-300 group"
              >
                <FiTwitter className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Data flow animation */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 data-flow"></div>
      </div>
    </div>
  )
} 