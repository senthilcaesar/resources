import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Icon,
  useColorMode,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { Sun, Moon, Layers, Search, X, Code, Zap, Cloud } from 'lucide-react';
import TableCard from './components/TableCard';
import { RESOURCES, CATEGORY_ICONS } from './data/resources';
import * as LucideIcons from 'lucide-react';

// --- Header Component ---
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="100"
      backdropFilter="blur(24px) saturate(180%)"
      bg={colorMode === 'dark' ? 'rgba(6,6,15,0.85)' : 'rgba(255, 250, 242, 0.76)'}
      borderBottom="1px solid"
      borderColor={colorMode === 'dark' ? '#3b4252' : 'rgba(93, 61, 36, 0.12)'}
      px="24px"
      transition="background 0.35s, border-color 0.35s"
    >
      <Flex maxW="1200px" mx="auto" h="72px" align="center" justify="space-between">
        <Flex align="center" gap="12px">
          <Flex
            w="40px"
            h="40px"
            bg={colorMode === 'dark' ? '#3b4252' : 'rgba(93, 61, 36, 0.05)'}
            border="1.5px solid"
            borderColor={colorMode === 'dark' ? '#4c566a' : 'rgba(93, 61, 36, 0.25)'}
            borderRadius="12px"
            align="center"
            justify="center"
            boxShadow={`0 0 20px ${colorMode === 'dark' ? '#3b4252' : 'rgba(0,0,0,0.05)'}`}
            flexShrink={0}
            transition="all 0.35s"
            _hover={{
               boxShadow: `0 0 30px ${colorMode === 'dark' ? 'rgba(136, 192, 208, 0.15)' : 'rgba(0,0,0,0.1)'}`
            }}
          >
            <Icon as={Layers} color={colorMode === 'dark' ? '#88c0d0' : '#8c5430'} boxSize="20px" />
          </Flex>
          <Box>
            <Text
              fontSize="1.4rem"
              fontWeight="700"
              color={colorMode === 'dark' ? '#d8dee9' : '#2e2218'}
              letterSpacing="-0.02em"
            >
              My URL Library
            </Text>
            <Text
              fontSize="0.7rem"
              color={colorMode === 'dark' ? '#818cf8' : '#6b7db3'}
              fontWeight="500"
              mt="1px"
              letterSpacing="0.06em"
              textTransform="uppercase"
            >
              Curated URL Hub
            </Text>
          </Box>
        </Flex>

        <Flex align="center" gap="16px">
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<Icon as={Code} boxSize="15px" />}
            color={colorMode === 'dark' ? '#a5b4fc' : '#6b7db3'}
            onClick={onOpen}
            _hover={{
              bg: colorMode === 'dark' ? '#3b4252' : 'rgba(139,92,246,0.1)',
              color: colorMode === 'dark' ? '#c4b5fd' : '#8b5cf6'
            }}
          >
            Tech Stack
          </Button>

          <Box
            position="relative"
          w="52px"
          h="28px"
          bg={colorMode === 'dark' ? '#3b4252' : 'rgba(93, 61, 36, 0.08)'}
          border="1.5px solid"
          borderColor={colorMode === 'dark' ? '#4c566a' : 'rgba(93, 61, 36, 0.2)'}
          borderRadius="999px"
          cursor="pointer"
          transition="all 0.35s"
          display="flex"
          alignItems="center"
          p="3px"
          onClick={toggleColorMode}
          _hover={{
            borderColor: colorMode === 'dark' ? '#81a1c1' : '#8c5430',
            boxShadow: `0 0 0 3px ${colorMode === 'dark' ? 'rgba(136, 192, 208, 0.15)' : 'rgba(140, 84, 48, 0.15)'}, 0 0 20px ${colorMode === 'dark' ? 'rgba(136, 192, 208, 0.15)' : 'rgba(140, 84, 48, 0.15)'}`
          }}
        >
          <Flex
            w="20px"
            h="20px"
            bg={colorMode === 'dark' ? '#88c0d0' : '#8c5430'}
            borderRadius="50%"
            align="center"
            justify="center"
            transition="transform 0.35s, background 0.35s"
            boxShadow={colorMode === 'dark' ? '0 2px 8px rgba(255,255,255,0.2)' : '0 2px 8px rgba(140, 84, 48, 0.3)'}
            transform={colorMode === 'dark' ? 'translateX(24px)' : 'translateX(0)'}
          >
            <Icon as={colorMode === 'dark' ? Moon : Sun} color="#fff" boxSize="12px" />
          </Flex>
        </Box>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered motionPreset="slideInBottom">
        <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.300" />
        <ModalContent
          bg={colorMode === 'dark' ? '#0f0f1a' : '#ffffff'}
          borderColor={colorMode === 'dark' ? 'rgba(136, 192, 208, 0.15)' : 'rgba(0,0,0,0.1)'}
          borderWidth="1px"
          borderRadius="2xl"
          boxShadow="2xl"
        >
          <ModalHeader color={colorMode === 'dark' ? '#d8dee9' : '#1e1e24'}>Project Tech Stack</ModalHeader>
          <ModalCloseButton color={colorMode === 'dark' ? '#a5b4fc' : '#6b7db3'} />
          <ModalBody pb={8} color={colorMode === 'dark' ? '#88c0d0' : '#4a5568'}>
            <Text mb={6}>This app is built using the following technologies:</Text>
            
            <Flex flexDir="column" gap={4}>
              <Flex align="center" gap={4}>
                <Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? '#3b4252' : 'rgba(93, 61, 36, 0.08)'} color={colorMode === 'dark' ? '#eceff4' : '#6f5a4a'}>
                  <Icon as={Code} boxSize="22px" />
                </Box>
                <Box>
                  <Text fontWeight="700" color={colorMode === 'dark' ? '#f8fafc' : '#1e293b'}>React 18 & Vite</Text>
                  <Text fontSize="0.85rem">Fast, modern, component-driven UI framework built for performance.</Text>
                </Box>
              </Flex>
              
              <Flex align="center" gap={4}>
                <Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? '#3b4252' : 'rgba(93, 61, 36, 0.08)'} color={colorMode === 'dark' ? '#eceff4' : '#6f5a4a'}>
                   <Icon as={Layers} boxSize="22px" />
                </Box>
                <Box>
                  <Text fontWeight="700" color={colorMode === 'dark' ? '#f8fafc' : '#1e293b'}>Chakra UI Component Library</Text>
                  <Text fontSize="0.85rem">A simple, modular, and accessible frontend component library.</Text>
                </Box>
              </Flex>
              
              <Flex align="center" gap={4}>
                <Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? '#3b4252' : 'rgba(93, 61, 36, 0.08)'} color={colorMode === 'dark' ? '#eceff4' : '#6f5a4a'}>
                   <Icon as={Zap} boxSize="22px" />
                </Box>
                <Box>
                  <Text fontWeight="700" color={colorMode === 'dark' ? '#f8fafc' : '#1e293b'}>Framer Motion & Vanilla CSS</Text>
                  <Text fontSize="0.85rem">Production-ready animation libraries for smooth UI transitions and backgrounds.</Text>
                </Box>
              </Flex>

              <Flex align="center" gap={4}>
                <Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? '#3b4252' : 'rgba(93, 61, 36, 0.08)'} color={colorMode === 'dark' ? '#eceff4' : '#6f5a4a'}>
                   <Icon as={Cloud} boxSize="22px" />
                </Box>
                <Box>
                  <Text fontWeight="700" color={colorMode === 'dark' ? '#f8fafc' : '#1e293b'}>GitHub Pages & Actions</Text>
                  <Text fontSize="0.85rem">Automated CI/CD pipeline building and deploying the Vite application directly to GitHub Pages.</Text>
                </Box>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

// --- Hero & Ticker ---
const HeroSection = () => {
    const { colorMode } = useColorMode();
    const [uod, setUod] = useState(RESOURCES[0]);

    useEffect(() => {
        const d = new Date();
        const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
        const x = Math.sin(seed) * 10000;
        const random = x - Math.floor(x);
        const idx = Math.floor(random * RESOURCES.length);
        setUod(RESOURCES[idx]);
    }, []);

    return (
        <Box textAlign="center" py="8px" pb="4px">
            {/* The shimmer text effect */}
             <Text
                as="h1"
                fontSize={{ base: '1.6rem', md: 'clamp(1.8rem, 4vw, 2.6rem)' }}
                fontWeight="700"
                letterSpacing="-0.03em"
                lineHeight="1.2"
                color={colorMode === 'dark' ? '#d8dee9' : '#2e2218'}
                mb="10px"
                animation="shimmerText 6s linear infinite"
                sx={{
                    '@keyframes shimmerText': {
                        '0%': { backgroundPosition: '0% center' },
                        '100%': { backgroundPosition: '200% center' }
                    }
                }}
            >
            </Text>
            
            {/* Ticker */}
            <Box overflow="hidden" whiteSpace="nowrap" mb="18px" py="10px" position="relative" sx={{
                '&:hover .track': { animationPlayState: 'paused' }
            }}>
                <Box className="track" display="inline-block" pl="100%" animation="tickerScroll 12s linear infinite" sx={{
                    '@keyframes tickerScroll': {
                        '0%': { transform: 'translateX(0)' },
                        '100%': { transform: 'translateX(-100%)' }
                    }
                }}>
                    <Flex display="inline-flex" align="center" gap="10px" fontSize="0.88rem" fontWeight="500" color={colorMode === "dark" ? "#818cf8" : "#6b7db3"} letterSpacing="0.01em">
                        <Text as="span" fontWeight="700" fontSize="0.75rem" letterSpacing="0.06em" textTransform="uppercase" color={colorMode === "dark" ? '#e2e8f0' : '#8c5430'}>
                            ✦ URL of the Day
                        </Text>
                        <Text as="span" color={colorMode === "dark" ? "rgba(255,255,255,0.12)" : "#6f5a4a"} fontSize="0.7rem">—</Text>
                        <Text as="a" href={uod?.url} target="_blank" rel="noopener noreferrer" color={colorMode === "dark" ? "#f1f5f9" : "#8c5430"} fontWeight="600" textDecoration="none" transition="color 0.35s" _hover={{ opacity: 0.8 }}>
                           {uod?.name}
                        </Text>
                        <Text as="span" color={colorMode === "dark" ? "rgba(255,255,255,0.12)" : "#6f5a4a"} fontSize="0.7rem">·</Text>
                        <Text as="span" fontWeight="400">{uod?.description}</Text>
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}

function Controls({ searchQuery, setSearchQuery, activeCategory, setActiveCategory }) {
    const { colorMode } = useColorMode();
    const categories = ["All", ...new Set(RESOURCES.map(r => r.category))].sort((a,b) => a === "All" ? -1 : a.localeCompare(b));

    const getIconPrefix = (iconName) => {
        const IconComponent = LucideIcons[iconName] || LucideIcons.Folder;
        return <Icon as={IconComponent} boxSize="13px" mr="6px" />;
    };

    return (
        <Box
           bg={colorMode === 'dark' ? '#3b4252' : 'rgba(255, 250, 242, 0.76)'}
           border="1px solid"
           borderColor={colorMode === 'dark' ? '#3b4252' : 'rgba(93, 61, 36, 0.12)'}
           borderRadius="20px"
           p="20px 22px"
           boxShadow={colorMode === 'dark' ? '0 12px 40px rgba(0,0,0,0.6)' : '0 8px 32px rgba(0,0,0,0.05)'}
           backdropFilter="blur(20px) saturate(150%)"
           mb="24px"
           transition="all 0.35s"
           _hover={{ borderColor: colorMode === 'dark' ? '#4c566a' : 'rgba(93, 61, 36, 0.2)' }}
        >
             <InputGroup mb="16px">
                <InputLeftElement pointerEvents="none" h="100%">
                    <Icon as={Search} color={colorMode === 'dark' ? '#818cf8' : '#6b7db3'} boxSize="17px" />
                </InputLeftElement>
                <Input
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search by name, tags, description…"
                   bg={colorMode === 'dark' ? '#3b4252' : 'rgba(255, 250, 242, 0.5)'}
                   border="1.5px solid"
                   borderColor={colorMode === 'dark' ? '#3b4252' : 'rgba(93, 61, 36, 0.12)'}
                   borderRadius="12px"
                   fontSize="0.95rem"
                   color={colorMode === 'dark' ? '#d8dee9' : '#2e2218'}
                   py="24px"
                   _placeholder={{ color: colorMode === 'dark' ? '#818cf8' : '#6f5a4a' }}
                   _focus={{
                       borderColor: colorMode === 'dark' ? '#81a1c1' : '#8c5430',
                       boxShadow: `0 0 0 4px ${colorMode === 'dark' ? 'rgba(136, 192, 208, 0.15)' : 'rgba(140, 84, 48, 0.15)'}`
                   }}
                />
                {searchQuery && (
                    <InputRightElement h="100%" pr="12px">
                        <IconButton
                            icon={<Icon as={X} boxSize="12px" />}
                            size="sm"
                            rounded="full"
                            bg={colorMode === 'dark' ? '#3b4252' : 'rgba(93, 61, 36, 0.05)'}
                            color={colorMode === 'dark' ? '#818cf8' : '#6f5a4a'}
                            onClick={() => setSearchQuery("")}
                            _hover={{
                                bg: colorMode === 'dark' ? '#4c566a' : 'rgba(93, 61, 36, 0.08)',
                                color: colorMode === 'dark' ? '#d8dee9' : '#2e2218'
                            }}
                            aria-label="Clear search"
                        />
                    </InputRightElement>
                )}
            </InputGroup>

            <Text fontSize="0.72rem" fontWeight="600" textTransform="uppercase" letterSpacing="0.08em" color={colorMode === 'dark' ? '#818cf8' : '#6b7db3'} mb="10px">
                Filter by Category
            </Text>

            <Flex gap="8px" wrap="wrap">
                {categories.map(cat => {
                   const isActive = cat === activeCategory;
                   const iconName = CATEGORY_ICONS[cat] || CATEGORY_ICONS["Default"];

                   return (
                       <Button
                           key={cat}
                           onClick={() => setActiveCategory(cat)}
                           px="14px"
                           py="6px"
                           h="auto"
                           borderRadius="999px"
                           border="1.5px solid"
                           borderColor={isActive ? 'transparent' : (colorMode === 'dark' ? '#4c566a' : 'rgba(93, 61, 36, 0.2)')}
                           bg={isActive ? (colorMode === 'dark' ? '#88c0d0' : '#8c5430') : 'transparent'}
                           color={isActive ? (colorMode === 'dark' ? '#3b4252' : '#fff') : (colorMode === 'dark' ? '#818cf8' : '#6f5a4a')}
                           fontSize="0.82rem"
                           fontWeight="500"
                           transition="all 0.35s"
                           boxShadow={isActive ? `0 4px 12px ${colorMode === 'dark' ? 'rgba(136, 192, 208, 0.15)' : 'rgba(140, 84, 48, 0.3)'}` : 'none'}
                           _hover={!isActive ? {
                               borderColor: colorMode === 'dark' ? '#81a1c1' : '#8c5430',
                               color: colorMode === 'dark' ? '#81a1c1' : '#8c5430',
                               bg: colorMode === 'dark' ? '#3b4252' : 'rgba(140, 84, 48, 0.08)',
                               boxShadow: `0 0 16px ${colorMode === 'dark' ? '#3b4252' : 'rgba(140, 84, 48, 0.15)'}`
                           } : {}}
                       >
                           {getIconPrefix(iconName)}
                           {cat}
                       </Button>
                   )
                })}
            </Flex>
        </Box>
    )
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { colorMode } = useColorMode();

  return (
    <Box>
      <Header />
      
      <Box className="app-wrapper">
        <Box as="main" pt="4px">
          <HeroSection />
          
          <Controls 
             searchQuery={searchQuery}
             setSearchQuery={setSearchQuery}
             activeCategory={activeCategory}
             setActiveCategory={setActiveCategory}
          />
          
          <TableCard 
             searchQuery={searchQuery}
             activeCategory={activeCategory}
          />
        </Box>
        
        <Box as="footer" textAlign="center" pt="28px" fontSize="0.77rem" color={colorMode === 'dark' ? '#818cf8' : '#6b7db3'}>
           <Text>Built with ♥ · <Text as="span" color={colorMode === 'dark' ? '#88c0d0' : '#8c5430'} fontWeight="500">{RESOURCES.length}</Text> resources curated · <Text as="span">My Resources</Text></Text>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
