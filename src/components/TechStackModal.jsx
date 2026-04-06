import React from 'react';
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Box, 
  Text, 
  Button, 
  IconButton, 
  VStack, 
  HStack 
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, Cpu, Palette, Terminal, Box as BoxIcon, Zap } from 'lucide-react';

const MotionBox = motion(Box);

const TechStackModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
      <ModalOverlay 
        backdropFilter="blur(10px)" 
        bg="blackAlpha.700"
      />
      <ModalContent 
        bg="var(--bg-sidebar)" 
        border="1px solid" 
        borderColor="var(--border-subtle)" 
        borderRadius="32px"
        boxShadow="0 24px 48px -12px rgba(0, 0, 0, 0.5)"
        p={4}
        maxW="520px"
      >
        <ModalHeader p={6} pb={4}>
          <HStack spacing={4}>
            <Box 
              w="48px" 
              h="48px" 
              borderRadius="16px" 
              bg="var(--bg-hover)" 
              color="var(--accent-primary)" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
            >
              <Cpu size={24} />
            </Box>
            <VStack align="start" spacing={0}>
              <Text fontSize="1.25rem" fontWeight="700" color="var(--text-primary)">
                Project Blueprint
              </Text>
              <Text fontSize="0.75rem" color="var(--text-dim)">
                Technical stack & engineering details
              </Text>
            </VStack>
            <IconButton
              aria-label="Close"
              icon={<X size={20} />}
              variant="ghost"
              borderRadius="full"
              color="var(--text-dim)"
              _hover={{ bg: "var(--bg-hover)", color: "var(--text-primary)" }}
              onClick={onClose}
              ml="auto"
            />
          </HStack>
        </ModalHeader>

        <ModalBody px={6} pb={6}>
          <VStack spacing={3} align="stretch">
            <TechItem 
              icon={<Code2 size={20} />} 
              iconColor="#61dafb"
              title="React 18 & Vite" 
              description="Lightning-fast HMR and modern component architecture."
              index={0}
            />
            <TechItem 
              icon={<BoxIcon size={20} />} 
              iconColor="#319795"
              title="Chakra UI" 
              description="Robust component library for structural integrity and layout."
              index={1}
            />
            <TechItem 
              icon={<Zap size={20} />} 
              iconColor="#ff0080"
              title="Framer Motion" 
              description="High-performance animations and staggered transitions."
              index={2}
            />
            <TechItem 
              icon={<Palette size={20} />} 
              iconColor="#d97757"
              title="Custom Design Tokens" 
              description="Vanilla CSS variables for bespoke Parchment & Dark themes."
              index={3}
            />
            <TechItem 
              icon={<Terminal size={20} />} 
              iconColor="var(--text-dim)"
              title="Lucide Icons" 
              description="Consistent, lightweight stroke-based iconography."
              index={4}
            />
          </VStack>
        </ModalBody>

        <ModalFooter px={6} pb={6}>
          <Button 
            w="full" 
            h="52px" 
            bg="var(--accent-primary)" 
            color="white" 
            borderRadius="16px" 
            fontWeight="700"
            _hover={{ filter: "brightness(1.1)", transform: "translateY(-1px)" }}
            _active={{ transform: "translateY(0)" }}
            boxShadow="0 4px 12px rgba(217, 119, 6, 0.2)"
            onClick={onClose}
          >
            Close Blueprint
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const TechItem = ({ icon, iconColor, title, description, index }) => (
  <MotionBox
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
    display="flex"
    alignItems="center"
    gap={4}
    p={4}
    borderRadius="20px"
    bg="whiteAlpha.100"
    border="1px solid"
    borderColor="var(--border-subtle)"
    _hover={{ 
      borderColor: "rgba(217, 119, 6, 0.2)", 
      bg: "whiteAlpha.200",
      transform: "translateX(4px)" 
    }}
    cursor="default"
  >
    <Box 
      w="42px" 
      h="42px" 
      borderRadius="12px" 
      bg="blackAlpha.200" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      color={iconColor}
    >
      {icon}
    </Box>
    <VStack align="start" spacing={0}>
      <Text fontSize="0.875rem" fontWeight="600" color="var(--text-primary)">{title}</Text>
      <Text fontSize="0.75rem" color="var(--text-dim)" lineHeight="1.4">{description}</Text>
    </VStack>
  </MotionBox>
);

export default TechStackModal;
