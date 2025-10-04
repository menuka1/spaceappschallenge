import { motion } from 'framer-motion';

export const Card = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ scale: 0.97, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};