import React from 'react';
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorMode,
  Grid,
  IconButton
} from '@chakra-ui/react';
import { FileText, Folder, BarChart2, Hash, Link as LinkIcon, Circle, MinusCircle, CheckCircle, Copy, ExternalLink, Check, SearchX } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { RESOURCES, CATEGORY_ICONS } from '../data/resources';
import { motion } from 'framer-motion';

const MotionGrid = motion(Grid);

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
        switch (importance) {
            case "High":
                return {
                    bg: isDark ? 'rgba(251,113,133,0.12)' : 'rgba(251,113,133,0.15)',
                    color: isDark ? '#fda4af' : '#fb7185',
                    borderColor: isDark ? 'rgba(251,113,133,0.25)' : 'rgba(251,113,133,0.3)',
                    icon: Circle,
                    pulse: true
                };
            case "Medium":
                return {
                    bg: isDark ? 'rgba(251,191,36,0.12)' : 'rgba(251,191,36,0.15)',
                    color: isDark ? '#fcd34d' : '#fbbf24',
                    borderColor: isDark ? 'rgba(251,191,36,0.25)' : 'rgba(251,191,36,0.3)',
                    icon: MinusCircle
                };
            case "Low":
                return {
                    bg: isDark ? 'rgba(52,211,153,0.12)' : 'rgba(6,214,160,0.15)',
                    color: isDark ? '#6ee7b7' : '#06d6a0',
                    borderColor: isDark ? 'rgba(52,211,153,0.25)' : 'rgba(6,214,160,0.3)',
                    icon: CheckCircle
                };
            default: return {};
        }
    }

    // Dynamic Tags
    const tagColorCount = 8;
    const tagColorMap = {};
    const getTagClass = (tag) => {
        if (!(tag in tagColorMap)) {
            tagColorMap[tag] = Object.keys(tagColorMap).length % tagColorCount;
        }
        const idx = tagColorMap[tag];
        const isDark = colorMode === 'dark';
        const palettes = [
            { bg: 'rgba(99,102,241,0.18)', color: '#a5b4fc', darkBg: 'rgba(99,102,241,0.14)' },
            { bg: 'rgba(6,214,160,0.18)', color: '#6ee7b7', darkBg: 'rgba(6,214,160,0.14)' },
            { bg: 'rgba(251,191,36,0.18)', color: '#fcd34d', darkBg: 'rgba(251,191,36,0.14)' },
            { bg: 'rgba(251,113,133,0.18)', color: '#fda4af', darkBg: 'rgba(251,113,133,0.14)' },
            { bg: 'rgba(167,139,250,0.18)', color: '#c4b5fd', darkBg: 'rgba(167,139,250,0.14)' },
            { bg: 'rgba(56,189,248,0.18)', color: '#7dd3fc', darkBg: 'rgba(56,189,248,0.14)' },
            { bg: 'rgba(244,114,182,0.18)', color: '#f9a8d4', darkBg: 'rgba(244,114,182,0.14)' },
            { bg: 'rgba(251,146,60,0.18)', color: '#fdba74', darkBg: 'rgba(251,146,60,0.14)' }
        ];
        return {
            bg: isDark ? palettes[idx].darkBg : palettes[idx].bg,
            color: palettes[idx].color
        }
    }

    const gridTemplateCols = {
        base: "minmax(160px, 2fr) minmax(110px, 1.2fr) minmax(90px, 1fr) minmax(130px, 1.4fr) minmax(110px, 1.2fr)",
        md: "2fr 1.2fr 1fr 1.4fr 1.2fr",
    };

    return (
        <Box
          bg={colorMode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.06)'}
          border="1px solid"
          borderColor={colorMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.08)'}
          borderRadius="20px"
          boxShadow={colorMode === 'dark' ? '0 12px 40px rgba(0,0,0,0.6)' : '0 8px 32px rgba(0,0,0,0.4)'}
          backdropFilter="blur(20px) saturate(150%)"
          overflow={['auto', 'hidden']}
          transition="all 0.35s"
        >
            <Box minW={['640px', 'auto']}>
                <Grid
                    templateColumns={gridTemplateCols}
                    p="16px 28px"
                    bgGradient={colorMode === 'dark' ? 'linear(to-r, rgba(52,211,153,0.08), transparent)' : 'linear(to-r, rgba(6,214,160,0.1), transparent)'}
                    borderBottom="1px solid"
                    borderColor={colorMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.08)'}
                    gap={0}
                >
                     {[{icon: FileText, text: 'Resource'}, 
                       {icon: Folder, text: 'Category'}, 
                       {icon: BarChart2, text: 'Priority'}, 
                       {icon: Hash, text: 'Tags'}, 
                       {icon: LinkIcon, text: 'URL'}].map(({icon, text}) => (
                         <Flex key={text} align="center" gap="5px" fontSize="0.76rem" fontWeight="600" textTransform="uppercase" letterSpacing="0.08em" color={colorMode === 'dark' ? '#818cf8' : '#6b7db3'}>
                             <Icon as={icon} boxSize="13px" /> {text}
                         </Flex>
                     ))}
                </Grid>

                <Flex flexDir="column">
                    {filtered.length === 0 ? (
                        <Flex flexDir="column" align="center" justify="center" p="64px 24px" gap="12px" color={colorMode === 'dark' ? '#818cf8' : '#6b7db3'}>
                            <Icon as={SearchX} boxSize="48px" opacity={0.3} />
                            <Text fontSize="0.9rem">No resources match your search. Try a different query.</Text>
                        </Flex>
                    ) : (
                        filtered.map((res, idx) => {
                            const badge = getBadgeStyle(res.importance);
                            return (
                                <MotionGrid
                                    key={res.url + idx}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, delay: idx * 0.035 }}
                                    templateColumns={gridTemplateCols}
                                    p="22px 28px"
                                    borderBottom={idx === filtered.length - 1 ? 'none' : '1px solid'}
                                    borderColor={colorMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.08)'}
                                    alignItems="center"
                                    gap={0}
                                    cursor="default"
                                    position="relative"
                                    _hover={{
                                        bg: colorMode === 'dark' ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.12)',
                                        transform: 'translateX(3px) translateY(-2px)',
                                        boxShadow: `0 6px 24px ${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}, inset 0 0 0 1px rgba(6,214,160,0.15)`,
                                        borderRadius: '12px',
                                        '& .res-title': { color: colorMode === 'dark' ? '#34d399' : '#06d6a0' }
                                    }}
                                >
                                    <Flex flexDir="column" gap="3px">
                                        <Text className="res-title" fontSize="1rem" fontWeight="600" color={colorMode === 'dark' ? '#f1f5f9' : '#eef2ff'} lineHeight="1.3" transition="color 0.35s">{res.name}</Text>
                                        <Text fontSize="0.82rem" color={colorMode === 'dark' ? '#818cf8' : '#6b7db3'} lineHeight="1.4">{res.description}</Text>
                                    </Flex>
                                    
                                    <Flex align="center" fontSize="0.88rem" color={colorMode === 'dark' ? '#c4b5fd' : '#a5b4fc'} fontWeight="500">
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

                                    <Flex wrap="wrap" gap="5px">
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
                                        <Text fontSize="0.75rem" color={colorMode === 'dark' ? '#818cf8' : '#6b7db3'} maxW="100px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" title={res.url}>
                                            {domainOf(res.url)}
                                        </Text>
                                        <IconButton
                                            icon={<Icon as={copiedUrl === res.url ? Check : Copy} boxSize="13px" />}
                                            size="sm"
                                            w="30px" h="30px" minW="30px"
                                            border="1.5px solid"
                                            borderColor={copiedUrl === res.url ? (colorMode === 'dark' ? '#34d399' : '#06d6a0') : (colorMode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.14)')}
                                            bg={copiedUrl === res.url ? 'rgba(6,214,160,0.15)' : (colorMode === 'dark' ? 'rgba(52,211,153,0.08)' : 'rgba(6,214,160,0.1)')}
                                            borderRadius="8px"
                                            color={copiedUrl === res.url ? (colorMode === 'dark' ? '#34d399' : '#06d6a0') : (colorMode === 'dark' ? '#818cf8' : '#6b7db3')}
                                            onClick={() => handleCopy(res.url)}
                                            _hover={{
                                                borderColor: colorMode === 'dark' ? '#34d399' : '#06d6a0',
                                                color: colorMode === 'dark' ? '#34d399' : '#06d6a0',
                                                bg: colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)',
                                                transform: 'scale(1.15)',
                                                boxShadow: `0 0 16px ${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}`
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
                                            borderColor={colorMode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.14)'}
                                            bg={colorMode === 'dark' ? 'rgba(52,211,153,0.08)' : 'rgba(6,214,160,0.1)'}
                                            borderRadius="8px"
                                            color={colorMode === 'dark' ? '#818cf8' : '#6b7db3'}
                                            _hover={{
                                                borderColor: colorMode === 'dark' ? '#34d399' : '#06d6a0',
                                                color: colorMode === 'dark' ? '#34d399' : '#06d6a0',
                                                bg: colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)',
                                                transform: 'scale(1.15)',
                                                boxShadow: `0 0 16px ${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}`
                                            }}
                                            aria-label="Open resource"
                                        />
                                    </Flex>
                                </MotionGrid>
                            )
                        })
                    )}
                </Flex>
            </Box>
        </Box>
    )
}

export default TableCard;
