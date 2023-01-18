import { motion } from 'framer-motion';

type Props = {
  className: string;
  children: JSX.Element | JSX.Element[];
};

export const FadeIn = ({ className, children }: Props) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {children}
  </motion.div>
);
