import React from 'react';
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorMode,
  Grid,
  IconButton,
  useBreakpointValue
} from '@chakra-ui/react';
import { FileText, Folder, BarChart2, Hash, Link as LinkIcon, Circle, MinusCircle, CheckCircle, Copy, ExternalLink, Check, SearchX } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { RESOURCES, CATEGORY_ICONS } from '../data/resources';
import { motion } from 'framer-motion';

const MotionGrid = motion(Grid);
const MotionFlex = motion(Flex);

// Fuzzy Search
function fuzzyMatch(resource, query) {
  if (!query) return true;
  const haystack = [
    resource.name,
    resource.description,
    resource.category,
    ...resource.tags
  ].join(" ").toLowerCase();
  return query.toLowerCase().split(/\s+/).every(word => haystack.includes(word));
}

// Domain Extractor
function domainOf(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch { return url; }
}

const TableCard = ({ searchQuery, activeCategory }) => {
    const { colorMode } = useColorMode();
    const [copiedUrl, setCopiedUrl] = React.useState(null);
    const isMobile = useBreakpointValue({ base: true, md: false });

    const filtered = RESOURCES.filter(r => {
        const catMatch  = activeCategory === "All" || r.category === activeCategory;
        const queryMatch = fuzzyMatch(r, searchQuery);
        return catMatch && queryMatch;
    });

    const handleCopy = async (url) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopiedUrl(url);
            setTimeout(() => setCopiedUrl(null), 1800);
        } catch {
            const el = document.createElement("textarea");
            el.value = url;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            setCopiedUrl(url);
            setTimeout(() => setCopiedUrl(null), 1800);
        }
    }

    const getIconPrefix = (iconName) => {
        const IconComponent = LucideIcons[iconName] || LucideIcons.Folder;
        return <Icon as={IconComponent} boxSize="15px" opacity={0.7} mr="6px" />;
    };

    const getBadgeStyle = (importance) => {
        const isDark = colorMode === 'dark';
        const plainBg = isDark ? 'rgba(250, 249, 245, 0.05)' : 'rgba(20, 20, 19, 0.05)';
        const plainColor = isDark ? '#b0aea5' : '#767676';
        const plainBorder = isDark ? 'rgba(250, 249, 245, 0.1)' : 'rgba(20, 20, 19, 0.1)';
        switch (importance) {
            case "High": return { bg: plainBg, color: plainColor, borderColor: plainBorder, icon: Circle, pulse: true };
            case "Medium": return { bg: plainBg, color: plainColor, borderColor: plainBorder, icon: MinusCircle };
            case "Low": return { bg: plainBg, color: plainColor, borderColor: plainBorder, icon: CheckCircle };
            default: return {};
        }
    }

    const getTagClass = (tag) => {
        const isDark = colorMode === 'dark';
        return {
            bg: isDark ? 'rgba(250, 249, 245, 0.05)' : 'rgba(20, 20, 19, 0.05)',
            color: isDark ? '#b0aea5' : '#767676'
        }
    }

    const gridTemplateCols = "2fr 1.2fr 1fr 1.4fr 1.2fr";

    return (
        <Box
          bg={colorMode === 'dark' ? '#141413' : 'rgba(250, 249, 245, 0.76)'}
          border="1px solid"
          borderColor={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.1)' : 'rgba(20, 20, 19, 0.1)'}
          borderRadius="20px"
          boxShadow={colorMode === 'dark' ? '0 12px 40px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.05)'}
          backdropFilter="blur(20px) saturate(150%)"
          overflow="hidden"
          transition="all 0.35s"
        >
            {/* Desktop Header Grid */}
            <Grid
                display={{ base: 'none', md: 'grid' }}
                templateColumns={gridTemplateCols}
                p="16px 28px"
                bg={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.03)' : 'rgba(20, 20, 19, 0.03)'}
                borderBottom="1px solid"
                borderColor={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.1)' : 'rgba(20, 20, 19, 0.1)'}
                gap={0}
            >
                 {[{icon: FileText, text: 'Resource'}, 
                   {icon: Folder, text: 'Category'}, 
                   {icon: BarChart2, text: 'Priority'}, 
                   {icon: Hash, text: 'Tags'}, 
                   {icon: LinkIcon, text: 'URL'}].map(({icon, text}) => (
                     <Flex key={text} align="center" gap="5px" fontFamily="'Poppins', Arial, sans-serif" fontSize="0.76rem" fontWeight="600" textTransform="uppercase" letterSpacing="0.08em" color={colorMode === 'dark' ? '#b0aea5' : '#767676'}>
                         <Icon as={icon} boxSize="13px" /> {text}
                     </Flex>
                 ))}
            </Grid>

            <Flex flexDir="column">
                {filtered.length === 0 ? (
                    <Flex flexDir="column" align="center" justify="center" p="64px 24px" gap="12px" color={colorMode === 'dark' ? '#b0aea5' : '#767676'}>
                        <Icon as={SearchX} boxSize="48px" opacity={0.3} />
                        <Text fontSize="0.9rem">No resources match your search. Try a different query.</Text>
                    </Flex>
                ) : (
                    filtered.map((res, idx) => {
                        const badge = getBadgeStyle(res.importance);
                        
                        // Define interactive styles
                        const interactiveHover = {
                            bg: colorMode === 'dark' ? 'rgba(250, 249, 245, 0.05)' : 'rgba(20, 20, 19, 0.03)',
                            transform: 'translateX(3px) translateY(-2px)',
                            boxShadow: `0 6px 24px ${colorMode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)'}, inset 0 0 0 1px ${colorMode === 'dark' ? 'rgba(217, 119, 87, 0.5)' : 'rgba(217, 119, 87, 0.4)'}`,
                            borderRadius: '12px',
                            '& .res-title': { color: '#d97757' }
                        };

                        // Mobile Card Layout
                        if (isMobile) {
                            return (
                                <MotionFlex
                                    key={res.url + idx}
                                    flexDir="column"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, delay: idx * 0.035 }}
                                    p="20px"
                                    borderBottom={idx === filtered.length - 1 ? 'none' : '1px solid'}
                                    borderColor={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.1)' : 'rgba(20, 20, 19, 0.1)'}
                                    gap="12px"
                                    cursor="default"
                                    position="relative"
                                    _hover={interactiveHover}
                                >
                                    <Flex justify="space-between" align="flex-start" gap="12px">
                                        <Flex flexDir="column" gap="4px" flex="1">
                                            <Text as="a" href={res.url} target="_blank" rel="noopener noreferrer" className="res-title" fontFamily="'Poppins', Arial, sans-serif" fontSize="1.1rem" fontWeight="600" color={colorMode === 'dark' ? '#faf9f5' : '#141413'} lineHeight="1.3" transition="color 0.35s" cursor="pointer" _hover={{ textDecoration: 'underline' }}>{res.name}</Text>
                                            <Text fontSize="0.85rem" color={colorMode === 'dark' ? '#b0aea5' : '#767676'} lineHeight="1.4">{res.description}</Text>
                                        </Flex>
                                        
                                        <Flex gap="6px" flexShrink={0}>
                                            <IconButton
                                                icon={<Icon as={copiedUrl === res.url ? Check : Copy} boxSize="13px" />}
                                                size="sm"
                                                w="32px" h="32px" minW="32px"
                                                border="1.5px solid"
                                                borderColor={copiedUrl === res.url ? '#788c5d' : (colorMode === 'dark' ? 'rgba(250, 249, 245, 0.2)' : 'rgba(20, 20, 19, 0.2)')}
                                                bg={copiedUrl === res.url ? 'rgba(120, 140, 93, 0.15)' : (colorMode === 'dark' ? 'rgba(250, 249, 245, 0.05)' : 'rgba(20, 20, 19, 0.05)')}
                                                borderRadius="8px"
                                                color={copiedUrl === res.url ? '#788c5d' : (colorMode === 'dark' ? '#b0aea5' : '#767676')}
                                                onClick={() => handleCopy(res.url)}
                                                aria-label="Copy link"
                                            />
                                            <IconButton
                                                as="a"
                                                href={res.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                icon={<Icon as={ExternalLink} boxSize="13px" />}
                                                size="sm"
                                                w="32px" h="32px" minW="32px"
                                                border="1.5px solid"
                                                borderColor={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.2)' : 'rgba(20, 20, 19, 0.2)'}
                                                bg={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.05)' : 'rgba(20, 20, 19, 0.05)'}
                                                borderRadius="8px"
                                                color={colorMode === 'dark' ? '#b0aea5' : '#767676'}
                                                aria-label="Open resource"
                                            />
                                        </Flex>
                                    </Flex>
                                    
                                    <Flex wrap="wrap" gap="10px" align="center" mt="4px">
                                        <Flex align="center" fontSize="0.85rem" color={colorMode === 'dark' ? '#b0aea5' : '#767676'} fontWeight="500">
                                             {getIconPrefix(CATEGORY_ICONS[res.category] || CATEGORY_ICONS["Default"])}
                                             {res.category}
                                        </Flex>
                                        
                                        <Box w="4px" h="4px" borderRadius="50%" bg={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.3)' : 'rgba(20, 20, 19, 0.3)'} />
                                        
                                        <Flex align="center" gap="5px" p="4px 10px" borderRadius="999px" fontSize="0.75rem" fontWeight="600" letterSpacing="0.02em" bg={badge.bg} color={badge.color} border="1px solid" borderColor={badge.borderColor}>
                                            <Icon as={badge.icon} boxSize="11px" sx={badge.pulse ? {
                                                animation: 'pulse-dot 1.8s ease-in-out infinite',
                                                '@keyframes pulse-dot': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.4 } }
                                            } : {}} />
                                            {res.importance}
                                        </Flex>
                                    </Flex>

                                    <Flex wrap="wrap" gap="6px" mt="2px">
                                        {res.tags.map(t => {
                                            const tagStyle = getTagClass(t);
                                            return (
                                                <Box key={t} p="4px 10px" borderRadius="6px" fontSize="0.76rem" fontWeight="500" letterSpacing="0.02em" bg={tagStyle.bg} color={tagStyle.color}>
                                                    {t}
                                                </Box>
                                            )
                                        })}
                                    </Flex>
                                </MotionFlex>
                            );
                        }

                        // Desktop Grid Layout
                        return (
                            <MotionGrid
                                key={res.url + idx}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: idx * 0.035 }}
                                templateColumns={gridTemplateCols}
                                p="22px 28px"
                                borderBottom={idx === filtered.length - 1 ? 'none' : '1px solid'}
                                borderColor={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.1)' : 'rgba(20, 20, 19, 0.1)'}
                                alignItems="center"
                                gap={0}
                                cursor="default"
                                position="relative"
                                _hover={interactiveHover}
                            >
                                <Flex flexDir="column" gap="3px" pr="16px">
                                    <Text as="a" href={res.url} target="_blank" rel="noopener noreferrer" className="res-title" fontFamily="'Poppins', Arial, sans-serif" fontSize="1rem" fontWeight="600" color={colorMode === 'dark' ? '#faf9f5' : '#141413'} lineHeight="1.3" transition="color 0.35s" cursor="pointer" _hover={{ textDecoration: 'underline' }}>{res.name}</Text>
                                    <Text fontSize="0.82rem" color={colorMode === 'dark' ? '#b0aea5' : '#767676'} lineHeight="1.4">{res.description}</Text>
                                </Flex>
                                
                                <Flex align="center" fontSize="0.88rem" color={colorMode === 'dark' ? '#b0aea5' : '#767676'} fontWeight="500">
                                     {getIconPrefix(CATEGORY_ICONS[res.category] || CATEGORY_ICONS["Default"])}
                                     {res.category}
                                </Flex>
                                
                                <Flex>
                                    <Flex align="center" gap="5px" p="4px 10px" borderRadius="999px" fontSize="0.75rem" fontWeight="600" letterSpacing="0.02em" bg={badge.bg} color={badge.color} border="1px solid" borderColor={badge.borderColor} w="fit-content">
                                        <Icon as={badge.icon} boxSize="11px" sx={badge.pulse ? {
                                            animation: 'pulse-dot 1.8s ease-in-out infinite',
                                            '@keyframes pulse-dot': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.4 } }
                                        } : {}} />
                                        {res.importance}
                                    </Flex>
                                </Flex>

                                <Flex wrap="wrap" gap="5px" pr="10px">
                                    {res.tags.map(t => {
                                        const tagStyle = getTagClass(t);
                                        return (
                                            <Box key={t} p="4px 10px" borderRadius="6px" fontSize="0.76rem" fontWeight="500" letterSpacing="0.02em" bg={tagStyle.bg} color={tagStyle.color}>
                                                {t}
                                            </Box>
                                        )
                                    })}
                                </Flex>

                                <Flex align="center" gap="8px">
                                    <Text fontSize="0.75rem" color={colorMode === 'dark' ? '#b0aea5' : '#767676'} maxW="100px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" title={res.url}>
                                        {domainOf(res.url)}
                                    </Text>
                                    <IconButton
                                        icon={<Icon as={copiedUrl === res.url ? Check : Copy} boxSize="13px" />}
                                        size="sm"
                                        w="30px" h="30px" minW="30px"
                                        border="1.5px solid"
                                        borderColor={copiedUrl === res.url ? '#788c5d' : (colorMode === 'dark' ? 'rgba(250, 249, 245, 0.2)' : 'rgba(20, 20, 19, 0.2)')}
                                        bg={copiedUrl === res.url ? 'rgba(120, 140, 93, 0.15)' : (colorMode === 'dark' ? 'rgba(250, 249, 245, 0.05)' : 'rgba(20, 20, 19, 0.05)')}
                                        borderRadius="8px"
                                        color={copiedUrl === res.url ? '#788c5d' : (colorMode === 'dark' ? '#b0aea5' : '#767676')}
                                        onClick={() => handleCopy(res.url)}
                                        _hover={{
                                            borderColor: '#d97757',
                                            color: '#d97757',
                                            bg: colorMode === 'dark' ? 'rgba(217, 119, 87, 0.15)' : 'rgba(217, 119, 87, 0.1)',
                                            transform: 'scale(1.15)'
                                        }}
                                        aria-label="Copy link"
                                    />
                                    <IconButton
                                        as="a"
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        icon={<Icon as={ExternalLink} boxSize="13px" />}
                                        size="sm"
                                        w="30px" h="30px" minW="30px"
                                        border="1.5px solid"
                                        borderColor={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.2)' : 'rgba(20, 20, 19, 0.2)'}
                                        bg={colorMode === 'dark' ? 'rgba(250, 249, 245, 0.05)' : 'rgba(20, 20, 19, 0.05)'}
                                        borderRadius="8px"
                                        color={colorMode === 'dark' ? '#b0aea5' : '#767676'}
                                        _hover={{
                                            borderColor: '#d97757',
                                            color: '#d97757',
                                            bg: colorMode === 'dark' ? 'rgba(217, 119, 87, 0.15)' : 'rgba(217, 119, 87, 0.1)',
                                            transform: 'scale(1.15)'
                                        }}
                                        aria-label="Open resource"
                                    />
                                </Flex>
                            </MotionGrid>
                        );
                    })
                )}
            </Flex>
        </Box>
    )
}

export default TableCard;
