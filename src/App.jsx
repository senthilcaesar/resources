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
  Button
} from '@chakra-ui/react';
import { Sun, Moon, Layers, Search, X } from 'lucide-react';
import TableCard from './components/TableCard';
import { RESOURCES, CATEGORY_ICONS } from './data/resources';
import * as LucideIcons from 'lucide-react';

// --- Aurora Background Component ---
const AuroraBackground = () => (
  <Box className="aurora-bg">
    <Box className="orb orb-1" />
    <Box className="orb orb-2" />
    <Box className="orb orb-3" />
  </Box>
);

// --- Header Component ---
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="100"
      backdropFilter="blur(24px) saturate(180%)"
      bg={colorMode === 'dark' ? 'rgba(6,6,15,0.85)' : 'rgba(15,15,26,0.82)'}
      borderBottom="1px solid"
      borderColor={colorMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.08)'}
      px="24px"
      transition="background 0.35s, border-color 0.35s"
    >
      <Flex maxW="1200px" mx="auto" h="72px" align="center" justify="space-between">
        <Flex align="center" gap="12px">
          <Flex
            w="40px"
            h="40px"
            bg={colorMode === 'dark' ? 'rgba(52,211,153,0.08)' : 'rgba(6,214,160,0.1)'}
            border="1.5px solid"
            borderColor={colorMode === 'dark' ? 'rgba(52,211,153,0.22)' : 'rgba(6,214,160,0.25)'}
            borderRadius="12px"
            align="center"
            justify="center"
            boxShadow={`0 0 20px ${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}`}
            flexShrink={0}
            transition="all 0.35s"
            _hover={{
               boxShadow: `0 0 30px ${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}, 0 0 60px rgba(6,214,160,0.15)`
            }}
          >
            <Icon as={Layers} color={colorMode === 'dark' ? '#34d399' : '#06d6a0'} boxSize="20px" />
          </Flex>
          <Box>
            <Text
              fontSize="1.4rem"
              fontWeight="700"
              bgGradient={colorMode === 'dark' ? 'linear(to-br, #34d399, #a78bfa)' : 'linear(to-br, #06d6a0, #8b5cf6)'}
              bgClip="text"
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

        <Box
          position="relative"
          w="52px"
          h="28px"
          bg={colorMode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.06)'}
          border="1.5px solid"
          borderColor={colorMode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.14)'}
          borderRadius="999px"
          cursor="pointer"
          transition="all 0.35s"
          display="flex"
          alignItems="center"
          p="3px"
          onClick={toggleColorMode}
          _hover={{
            borderColor: colorMode === 'dark' ? '#34d399' : '#06d6a0',
            boxShadow: `0 0 0 3px ${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}, 0 0 20px ${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}`
          }}
        >
          <Flex
            w="20px"
            h="20px"
            bg={colorMode === 'dark' ? 'linear-gradient(135deg, #818cf8, #a78bfa)' : 'linear-gradient(135deg, #fbbf24, #f59e0b)'}
            borderRadius="50%"
            align="center"
            justify="center"
            transition="transform 0.35s, background 0.35s"
            boxShadow={colorMode === 'dark' ? '0 2px 8px rgba(129,140,248,0.4)' : '0 2px 8px rgba(251,191,36,0.4)'}
            transform={colorMode === 'dark' ? 'translateX(24px)' : 'translateX(0)'}
          >
            <Icon as={colorMode === 'dark' ? Moon : Sun} color="#fff" boxSize="12px" />
          </Flex>
        </Box>
      </Flex>
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
                bgGradient={colorMode === 'dark' ? 'linear(to-br, #34d399 0%, #a78bfa 50%, #fb7185 100%)' : 'linear(to-br, #06d6a0 0%, #8b5cf6 50%, #f472b6 100%)'}
                bgSize="200% auto"
                bgClip="text"
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
                        <Text as="span" fontWeight="700" fontSize="0.75rem" letterSpacing="0.06em" textTransform="uppercase" bgGradient={colorMode === "dark" ? 'linear(to-br, #34d399, #a78bfa)' : 'linear(to-br, #06d6a0, #8b5cf6)'} bgClip="text">
                            ✦ URL of the Day
                        </Text>
                        <Text as="span" color={colorMode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.14)"} fontSize="0.7rem">—</Text>
                        <Text as="a" href={uod?.url} target="_blank" rel="noopener noreferrer" color={colorMode === "dark" ? "#f1f5f9" : "#eef2ff"} fontWeight="600" textDecoration="none" transition="color 0.35s" _hover={{ color: colorMode === "dark" ? '#34d399' : '#06d6a0' }}>
                           {uod?.name}
                        </Text>
                        <Text as="span" color={colorMode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.14)"} fontSize="0.7rem">·</Text>
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
           bg={colorMode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.06)'}
           border="1px solid"
           borderColor={colorMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.08)'}
           borderRadius="20px"
           p="20px 22px"
           boxShadow={colorMode === 'dark' ? '0 12px 40px rgba(0,0,0,0.6)' : '0 8px 32px rgba(0,0,0,0.4)'}
           backdropFilter="blur(20px) saturate(150%)"
           mb="24px"
           transition="all 0.35s"
           _hover={{ borderColor: colorMode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.14)' }}
        >
             <InputGroup mb="16px">
                <InputLeftElement pointerEvents="none" h="100%">
                    <Icon as={Search} color={colorMode === 'dark' ? '#818cf8' : '#6b7db3'} boxSize="17px" />
                </InputLeftElement>
                <Input
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search by name, tags, description…"
                   bg={colorMode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.05)'}
                   border="1.5px solid"
                   borderColor={colorMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.08)'}
                   borderRadius="12px"
                   fontSize="0.95rem"
                   color={colorMode === 'dark' ? '#f1f5f9' : '#eef2ff'}
                   py="24px"
                   _placeholder={{ color: colorMode === 'dark' ? '#818cf8' : '#6b7db3' }}
                   _focus={{
                       borderColor: colorMode === 'dark' ? '#34d399' : '#06d6a0',
                       boxShadow: `0 0 0 4px ${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}, 0 0 30px rgba(6,214,160,0.15)`
                   }}
                />
                {searchQuery && (
                    <InputRightElement h="100%" pr="12px">
                        <IconButton
                            icon={<Icon as={X} boxSize="12px" />}
                            size="sm"
                            rounded="full"
                            bg={colorMode === 'dark' ? 'rgba(52,211,153,0.08)' : 'rgba(6,214,160,0.1)'}
                            color={colorMode === 'dark' ? '#818cf8' : '#6b7db3'}
                            onClick={() => setSearchQuery("")}
                            _hover={{
                                bg: colorMode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.14)',
                                color: colorMode === 'dark' ? '#f1f5f9' : '#eef2ff'
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
                           borderColor={isActive ? 'transparent' : (colorMode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.14)')}
                           bg={isActive ? (colorMode === 'dark' ? 'linear-gradient(135deg, #34d399, #a78bfa)' : 'linear-gradient(135deg, #06d6a0, #8b5cf6)') : 'transparent'}
                           color={isActive ? '#fff' : (colorMode === 'dark' ? '#818cf8' : '#6b7db3')}
                           fontSize="0.82rem"
                           fontWeight="500"
                           transition="all 0.35s"
                           boxShadow={isActive ? `0 4px 20px ${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}` : 'none'}
                           _hover={!isActive ? {
                               borderColor: colorMode === 'dark' ? '#34d399' : '#06d6a0',
                               color: colorMode === 'dark' ? '#34d399' : '#06d6a0',
                               bg: colorMode === 'dark' ? 'rgba(52,211,153,0.08)' : 'rgba(6,214,160,0.1)',
                               boxShadow: `0 0 16px ${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}`
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
      <AuroraBackground />
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
           <Text>Built with ♥ · <Text as="span" color={colorMode === 'dark' ? '#34d399' : '#06d6a0'} fontWeight="500">{RESOURCES.length}</Text> resources curated · <Text as="span">My Resources</Text></Text>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
