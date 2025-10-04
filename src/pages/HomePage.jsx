import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { motion } from 'framer-motion';

export const HomePage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-full max-w-4xl mx-auto py-8"
    >
      <div className="text-center mb-12 px-4">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Welcome to Orbit Lab Hub
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-xl text-gray-600 mb-8"
        >
          Pioneering the Future of Space Research through Orbital Research as a Service (ORaaS)
        </motion.p>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button to="/pods">Browse Research Pods</Button>
          <Button to="/dashboard" variant="outline">View Dashboard</Button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid md:grid-cols-2 gap-8 mb-12 px-4">
        <Card className="text-left">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">What is ORaaS?</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Orbital Research as a Service (ORaaS) revolutionizes space research by providing easy access to Low Earth Orbit (LEO) laboratory facilities. Our state-of-the-art research pods enable groundbreaking experiments in microgravity conditions.
          </p>
          <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-2">
            <li>Access cutting-edge space research facilities</li>
            <li>Conduct experiments in true microgravity</li>
            <li>Receive real-time data from your experiments</li>
            <li>Full support from mission planning to completion</li>
          </ul>
        </Card>

        <Card className="text-left">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Why Choose Us?</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-blue-600">Flexible Duration Options</h3>
              <p className="text-sm sm:text-base text-gray-600">Choose from 3, 6, or 12-month mission durations to suit your research needs.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-600">Specialized Research Pods</h3>
              <p className="text-sm sm:text-base text-gray-600">Purpose-built facilities for pharmaceutical, materials, agricultural, and other research fields.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-600">End-to-End Support</h3>
              <p className="text-sm sm:text-base text-gray-600">From experiment design to data analysis, our team supports you at every step.</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center px-4"
      >
        <motion.h2 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-2xl sm:text-3xl font-bold mb-6"
        >
          Ready to Start Your Space Research Journey?
        </motion.h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button to="/pods" size="lg">Explore Available Pods</Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};