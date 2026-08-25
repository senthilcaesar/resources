import React, { useState } from 'react';
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
  HStack,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Code2,
  Cpu,
  Palette,
  Terminal,
  Box as BoxIcon,
  Zap,
  Volume2,
  Database,
  Search,
  Sparkles,
  Layers,
  Check,
  Copy,
} from 'lucide-react';

const MotionBox = motion(Box);

const TECH_STACK_ITEMS = [
  {
    category: 'Core Engine',
    items: [
      {
        icon: Code2,
        iconColor: '#61dafb',
        iconBg: 'rgba(97, 218, 251, 0.12)',
        title: 'React 18 & Vite 5',
        badge: 'v18.3 / v5.3',
        description:
          'Modern component architecture with concurrent rendering and instant Rollup/HMR bundling.',
      },
      {
        icon: Zap,
        iconColor: '#ff0080',
        iconBg: 'rgba(255, 0, 128, 0.12)',
        title: 'Framer Motion 11',
        badge: '60fps Spring',
        description:
          'Hardware-accelerated layout transitions, drawer slide-overs, and popLayout animations.',
      },
    ],
  },
  {
    category: 'Design & Component System',
    items: [
      {
        icon: BoxIcon,
        iconColor: '#319795',
        iconBg: 'rgba(49, 151, 149, 0.12)',
        title: 'Chakra UI & Emotion',
        badge: '@emotion/styled',
        description:
          'Accessible component primitives and dynamic style injection for modal dialogs.',
      },
      {
        icon: Palette,
        iconColor: '#ff7a59',
        iconBg: 'rgba(255, 122, 89, 0.12)',
        title: 'Multi-Theme Token Architecture',
        badge: '3 Palettes',
        description:
          'CSS custom properties powering Cyber Nebula, Nordic Editorial, and Emerald Matrix modes.',
      },
      {
        icon: Layers,
        iconColor: '#a78bfa',
        iconBg: 'rgba(167, 139, 250, 0.12)',
        title: 'Lucide React Iconography',
        badge: 'SVG Vectors',
        description:
          'Clean, consistent stroke-based vector icons for category indexing and interface actions.',
      },
    ],
  },
  {
    category: 'Audio & Data Storage',
    items: [
      {
        icon: Volume2,
        iconColor: '#38bdf8',
        iconBg: 'rgba(56, 189, 248, 0.12)',
        title: 'Web Audio API Synthesizer',
        badge: 'Zero Assets',
        description:
          'Real-time audio frequency synthesis for tactile roulette spins, clicks, and bookmark feedback.',
      },
      {
        icon: Database,
        iconColor: '#f59e0b',
        iconBg: 'rgba(245, 158, 11, 0.12)',
        title: 'LocalStorage Persistence Engine',
        badge: 'Client Cache',
        description:
          'Real-time persistence for bookmarks/backpack collection, theme preferences, and active view.',
      },
      {
        icon: Search,
        iconColor: '#10b981',
        iconBg: 'rgba(16, 185, 129, 0.12)',
        title: 'Multi-Attribute Search & Tag Matrix',
        badge: 'Fuzzy Index',
        description:
          'Sub-millisecond filtering across resource titles, descriptions, categories, and tags.',
      },
    ],
  },
];

const TechStackModal = ({ isOpen, onClose }) => {
  const [copiedSpec, setCopiedSpec] = useState(false);

  const copyBlueprintSummary = () => {
    const summary = `HyperVault Architecture:\n- Frontend: React 18 + Vite 5\n- Styling: Chakra UI + Custom CSS Tokens + Emotion\n- Animation: Framer Motion 11\n- Icons: Lucide React\n- Audio: Web Audio API Synthesizer\n- Storage: LocalStorage Cache Engine`;
    navigator.clipboard.writeText(summary);
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset='slideInBottom'
    >
      <ModalOverlay backdropFilter='blur(12px)' bg='rgba(5, 7, 12, 0.85)' />
      <ModalContent
        bg='var(--bg-sidebar)'
        border='1px solid'
        borderColor='var(--border-subtle)'
        borderRadius='28px'
        boxShadow='0 24px 64px rgba(0, 0, 0, 0.7)'
        p={2}
        maxW='640px'
        maxH='88vh'
        overflow='hidden'
        display='flex'
        flexDirection='column'
      >
        {/* Header */}
        <ModalHeader
          p={5}
          pb={3}
          borderBottom='1px solid'
          borderColor='var(--border-subtle)'
        >
          <HStack spacing={3} align='center'>
            <Box
              w='44px'
              h='44px'
              borderRadius='14px'
              bg='var(--bg-hover)'
              color='var(--accent-primary)'
              display='flex'
              alignItems='center'
              justifyContent='center'
              boxShadow='0 0 16px var(--accent-glow)'
            >
              <Cpu size={22} />
            </Box>
            <VStack align='start' spacing={0} flex={1}>
              <HStack spacing={2}>
                <Text
                  fontSize='1.15rem'
                  fontWeight='800'
                  color='var(--text-primary)'
                  fontFamily='var(--font-heading)'
                >
                  Project Blueprint & Architecture
                </Text>
              </HStack>
              <Text fontSize='0.75rem' color='var(--text-dim)'>
                Underlying frameworks, libraries & runtime capabilities
              </Text>
            </VStack>
            <IconButton
              aria-label='Close'
              icon={<X size={18} />}
              variant='ghost'
              borderRadius='full'
              color='var(--text-dim)'
              _hover={{ bg: 'var(--bg-hover)', color: 'var(--text-primary)' }}
              onClick={onClose}
              size='sm'
            />
          </HStack>
        </ModalHeader>

        {/* Scrollable Body */}
        <ModalBody px={5} py={4} overflowY='auto' maxH='calc(88vh - 150px)'>
          <VStack spacing={5} align='stretch'>
            {TECH_STACK_ITEMS.map((group, groupIdx) => (
              <Box key={group.category}>
                <Text
                  fontSize='0.72rem'
                  fontWeight='700'
                  textTransform='uppercase'
                  letterSpacing='0.08em'
                  color='var(--text-dim)'
                  mb={2.5}
                  pl={1}
                >
                  {group.category}
                </Text>
                <VStack spacing={2.5} align='stretch'>
                  {group.items.map((item, itemIdx) => {
                    const IconComp = item.icon;
                    const overallIndex = groupIdx * 3 + itemIdx;
                    return (
                      <MotionBox
                        key={item.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.05 + overallIndex * 0.04,
                          duration: 0.25,
                        }}
                        display='flex'
                        alignItems='flex-start'
                        gap={3.5}
                        p={3.5}
                        borderRadius='16px'
                        bg='var(--bg-card)'
                        border='1px solid'
                        borderColor='var(--border-subtle)'
                        _hover={{
                          borderColor: 'var(--border-active)',
                          bg: 'var(--bg-card-hover)',
                          transform: 'translateY(-1px)',
                          boxShadow: 'var(--shadow-soft)',
                        }}
                        cursor='default'
                      >
                        <Box
                          w='38px'
                          h='38px'
                          borderRadius='12px'
                          bg={item.iconBg}
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          color={item.iconColor}
                          flexShrink={0}
                          mt={0.5}
                        >
                          <IconComp size={19} />
                        </Box>
                        <VStack align='start' spacing={1} flex={1}>
                          <HStack justify='space-between' w='full'>
                            <Text
                              fontSize='0.88rem'
                              fontWeight='700'
                              color='var(--text-primary)'
                            >
                              {item.title}
                            </Text>
                            <Box
                              fontSize='0.68rem'
                              fontFamily='var(--font-mono)'
                              fontWeight='600'
                              color={item.iconColor}
                              bg={item.iconBg}
                              px={2}
                              py={0.5}
                              borderRadius='6px'
                            >
                              {item.badge}
                            </Box>
                          </HStack>
                          <Text
                            fontSize='0.76rem'
                            color='var(--text-secondary)'
                            lineHeight='1.4'
                          >
                            {item.description}
                          </Text>
                        </VStack>
                      </MotionBox>
                    );
                  })}
                </VStack>
              </Box>
            ))}
          </VStack>
        </ModalBody>

        {/* Footer Actions */}
        <ModalFooter
          px={5}
          py={3.5}
          borderTop='1px solid'
          borderColor='var(--border-subtle)'
          bg='var(--bg-input)'
        >
          <HStack w='full' spacing={3}>
            <Button
              flex={1}
              h='40px'
              variant='outline'
              borderColor='var(--border-subtle)'
              color='var(--text-secondary)'
              borderRadius='12px'
              fontSize='0.82rem'
              fontWeight='600'
              leftIcon={
                copiedSpec ? (
                  <Check size={14} className='text-emerald-400' />
                ) : (
                  <Copy size={14} />
                )
              }
              _hover={{
                bg: 'var(--bg-hover)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-active)',
              }}
              onClick={copyBlueprintSummary}
            >
              {copiedSpec ? 'Blueprint Copied!' : 'Copy Tech Spec'}
            </Button>
            <Button
              flex={1}
              h='40px'
              bg='var(--accent-primary)'
              color='white'
              borderRadius='12px'
              fontSize='0.82rem'
              fontWeight='700'
              _hover={{
                filter: 'brightness(1.1)',
                transform: 'translateY(-1px)',
              }}
              _active={{ transform: 'translateY(0)' }}
              boxShadow='0 2px 10px var(--accent-glow)'
              onClick={onClose}
            >
              Close Blueprint
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TechStackModal;
