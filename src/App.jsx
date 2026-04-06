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
      bg={colorMode === 'dark' ? 'rgba(20, 20, 19, 0.85)' : 'rgba(250, 249, 245, 0.85)'}
      borderBottom="1px solid"
      borderColor={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.1)' : 'rgba(20, 20, 19, 0.1)'}
      px="24px"
      transition="background 0.35s, border-color 0.35s"
    >
      <Flex maxW="1200px" mx="auto" h="72px" align="center" justify="space-between">
        <Flex align="center" gap="12px">
          <Flex
            w="40px"
            h="40px"
            bg={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.05)' : 'rgba(20, 20, 19, 0.05)'}
            border="1.5px solid"
            borderColor={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.15)' : 'rgba(20, 20, 19, 0.15)'}
            borderRadius="12px"
            align="center"
            justify="center"
            boxShadow={colorMode === 'dark' ? '0 0 20px rgba(0,0,0,0.2)' : '0 0 20px rgba(0,0,0,0.05)'}
            flexShrink={0}
            transition="all 0.35s"
            _hover={{
               boxShadow: `0 0 30px ${colorMode === 'dark' ? 'rgba(217, 119, 87, 0.15)' : 'rgba(217, 119, 87, 0.1)'}`
            }}
          >
            <Icon as={Layers} color="#d97757" boxSize="20px" />
          </Flex>
          <Box>
            <Text
              fontFamily="'Poppins', Arial, sans-serif"
              fontSize={{ base: '1.15rem', md: '1.4rem' }}
              fontWeight="700"
              color={colorMode === 'dark' ? '#faf9f5' : '#141413'}
              letterSpacing="-0.02em"
            >
              My URL Library
            </Text>
            <Text
              fontSize={{ base: '0.65rem', md: '0.7rem' }}
              color={colorMode === 'dark' ? '#b0aea5' : '#767676'}
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
            color={colorMode === 'dark' ? '#b0aea5' : '#767676'}
            onClick={onOpen}
            _hover={{
              bg: colorMode === 'dark' ? 'rgba(250, 249, 245, 0.05)' : 'rgba(20, 20, 19, 0.05)',
              color: colorMode === 'dark' ? '#faf9f5' : '#141413'
            }}
          >
            Tech Stack
          </Button>

          <Box
            position="relative"
            w="52px"
            h="28px"
            bg={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.05)' : 'rgba(20, 20, 19, 0.05)'}
            border="1.5px solid"
            borderColor={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.1)' : 'rgba(20, 20, 19, 0.1)'}
            borderRadius="999px"
            cursor="pointer"
            transition="all 0.35s"
            display="flex"
            alignItems="center"
            p="3px"
            onClick={toggleColorMode}
            _hover={{
              borderColor: '#d97757',
              boxShadow: `0 0 0 3px ${colorMode === 'dark' ? 'rgba(217, 119, 87, 0.15)' : 'rgba(217, 119, 87, 0.15)'}, 0 0 20px ${colorMode === 'dark' ? 'rgba(217, 119, 87, 0.15)' : 'rgba(217, 119, 87, 0.1)'}`
            }}
          >
            <Flex
              w="20px"
              h="20px"
              bg="#d97757"
              borderRadius="50%"
              align="center"
              justify="center"
              transition="transform 0.35s, background 0.35s"
              boxShadow={colorMode === 'dark' ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(217, 119, 87, 0.3)'}
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
          bg={colorMode === 'dark' ? '#141413' : '#faf9f5'}
          borderColor={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.1)' : 'rgba(20, 20, 19, 0.1)'}
          borderWidth="1px"
          borderRadius="2xl"
          boxShadow="2xl"
        >
          <ModalHeader fontFamily="'Poppins', Arial, sans-serif" color={colorMode === 'dark' ? '#faf9f5' : '#141413'}>Project Tech Stack</ModalHeader>
          <ModalCloseButton color={colorMode === 'dark' ? '#b0aea5' : '#767676'} />
          <ModalBody pb={8} color={colorMode === 'dark' ? '#b0aea5' : '#141413'}>
            <Text mb={6}>This app is built using the following technologies:</Text>
            
            <Flex flexDir="column" gap={4}>
              <Flex align="center" gap={4}>
                <Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.05)' : 'rgba(20, 20, 19, 0.05)'} color={colorMode === 'dark' ? '#faf9f5' : '#141413'}>
                  <Icon as={Code} boxSize="22px" />
                </Box>
                <Box>
                  <Text fontFamily="'Poppins', Arial, sans-serif" fontWeight="700" color={colorMode === 'dark' ? '#faf9f5' : '#141413'}>React 18 & Vite</Text>
                  <Text fontSize="0.85rem">Fast, modern, component-driven UI framework built for performance.</Text>
                </Box>
              </Flex>
              
              <Flex align="center" gap={4}>
                <Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.05)' : 'rgba(20, 20, 19, 0.05)'} color={colorMode === 'dark' ? '#faf9f5' : '#141413'}>
                   <Icon as={Layers} boxSize="22px" />
                </Box>
                <Box>
                  <Text fontFamily="'Poppins', Arial, sans-serif" fontWeight="700" color={colorMode === 'dark' ? '#faf9f5' : '#141413'}>Chakra UI Component Library</Text>
                  <Text fontSize="0.85rem">A simple, modular, and accessible frontend component library.</Text>
                </Box>
              </Flex>
              
              <Flex align="center" gap={4}>
                <Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.05)' : 'rgba(20, 20, 19, 0.05)'} color={colorMode === 'dark' ? '#faf9f5' : '#141413'}>
                   <Icon as={Zap} boxSize="22px" />
                </Box>
                <Box>
                  <Text fontFamily="'Poppins', Arial, sans-serif" fontWeight="700" color={colorMode === 'dark' ? '#faf9f5' : '#141413'}>Framer Motion & Vanilla CSS</Text>
                  <Text fontSize="0.85rem">Production-ready animation libraries for smooth UI transitions and backgrounds.</Text>
                </Box>
              </Flex>

              <Flex align="center" gap={4}>
                <Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.05)' : 'rgba(20, 20, 19, 0.05)'} color={colorMode === 'dark' ? '#faf9f5' : '#141413'}>
                   <Icon as={Cloud} boxSize="22px" />
                </Box>
                <Box>
                  <Text fontFamily="'Poppins', Arial, sans-serif" fontWeight="700" color={colorMode === 'dark' ? '#faf9f5' : '#141413'}>GitHub Pages & Actions</Text>
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


function Controls({ searchQuery, setSearchQuery, activeCategory, setActiveCategory }) {
    const { colorMode } = useColorMode();
    const categories = ["All", ...new Set(RESOURCES.map(r => r.category))].sort((a,b) => a === "All" ? -1 : a.localeCompare(b));

    const getIconPrefix = (iconName) => {
        const IconComponent = LucideIcons[iconName] || LucideIcons.Folder;
        return <Icon as={IconComponent} boxSize="13px" mr="6px" />;
    };

    return (
        <Box
           bg={colorMode === 'dark' ? '#141413' : '#faf9f5'}
           border="1px solid"
           borderColor={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.1)' : 'rgba(20, 20, 19, 0.1)'}
           borderRadius="20px"
           p="20px 22px"
           boxShadow={colorMode === 'dark' ? '0 12px 40px rgba(0,0,0,0.6)' : '0 8px 32px rgba(0,0,0,0.05)'}
           backdropFilter="blur(20px) saturate(150%)"
           mb="24px"
           transition="all 0.35s"
           _hover={{ borderColor: colorMode === 'dark' ? 'rgba(250, 249, 245, 0.2)' : 'rgba(20, 20, 19, 0.2)' }}
        >
             <InputGroup mb="16px">
                <InputLeftElement pointerEvents="none" h="100%">
                    <Icon as={Search} color={colorMode === 'dark' ? '#b0aea5' : '#767676'} boxSize="17px" />
                </InputLeftElement>
                <Input
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search by name, tags, description…"
                   bg={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.03)' : 'rgba(20, 20, 19, 0.03)'}
                   border="1.5px solid"
                   borderColor={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.1)' : 'rgba(20, 20, 19, 0.1)'}
                   borderRadius="12px"
                   fontSize="0.95rem"
                   color={colorMode === 'dark' ? '#faf9f5' : '#141413'}
                   py="24px"
                   _placeholder={{ color: colorMode === 'dark' ? '#b0aea5' : '#767676' }}
                   _focus={{
                       borderColor: '#d97757',
                       boxShadow: `0 0 0 4px ${colorMode === 'dark' ? 'rgba(217, 119, 87, 0.15)' : 'rgba(217, 119, 87, 0.15)'}`
                   }}
                />
                {searchQuery && (
                    <InputRightElement h="100%" pr="12px">
                        <IconButton
                            icon={<Icon as={X} boxSize="12px" />}
                            size="sm"
                            rounded="full"
                            bg={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.05)' : 'rgba(20, 20, 19, 0.05)'}
                            color={colorMode === 'dark' ? '#b0aea5' : '#767676'}
                            onClick={() => setSearchQuery("")}
                            _hover={{
                                bg: colorMode === 'dark' ? 'rgba(250, 249, 245, 0.1)' : 'rgba(20, 20, 19, 0.1)',
                                color: colorMode === 'dark' ? '#faf9f5' : '#141413'
                            }}
                            aria-label="Clear search"
                        />
                    </InputRightElement>
                )}
            </InputGroup>

            <Text fontFamily="'Poppins', Arial, sans-serif" fontSize="0.72rem" fontWeight="600" textTransform="uppercase" letterSpacing="0.08em" color={colorMode === 'dark' ? '#b0aea5' : '#767676'} mb="10px">
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
                           borderColor={isActive ? 'transparent' : (colorMode === 'dark' ? 'rgba(250, 249, 245, 0.2)' : 'rgba(20, 20, 19, 0.2)')}
                           bg={isActive ? '#d97757' : 'transparent'}
                           color={isActive ? '#faf9f5' : (colorMode === 'dark' ? '#b0aea5' : '#767676')}
                           fontSize="0.82rem"
                           fontWeight="500"
                           transition="all 0.35s"
                           boxShadow={isActive ? `0 4px 12px rgba(217, 119, 87, 0.3)` : 'none'}
                           _hover={!isActive ? {
                               borderColor: '#d97757',
                               color: '#d97757',
                               bg: colorMode === 'dark' ? 'rgba(217, 119, 87, 0.1)' : 'rgba(217, 119, 87, 0.05)',
                               boxShadow: `0 0 16px ${colorMode === 'dark' ? 'rgba(217, 119, 87, 0.2)' : 'rgba(217, 119, 87, 0.15)'}`
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
        
        <Box as="footer" textAlign="center" pt="28px" fontSize="0.77rem" color={colorMode === 'dark' ? '#b0aea5' : '#767676'}>
           <Text>Built with ♥ · <Text as="span" color="#d97757" fontWeight="500">{RESOURCES.length}</Text> resources curated · <Text as="span">My Resources</Text></Text>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
