const fs = require('fs');
const tcPath = '/Users/senthilpalanivelu/resources/src/components/TableCard.jsx';
let content = fs.readFileSync(tcPath, 'utf8');

content = content.replace('const TableCard = ({ searchQuery, activeCategory }) => {', 'const TableCard = ({ searchQuery, activeCategory, viewMode = \'list\' }) => {');

const insertion = `
    if (viewMode === 'card') {
        return (
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }} gap="20px">
                {filtered.length === 0 ? (
                    <Flex flexDir="column" align="center" justify="center" p="64px 24px" gap="12px" color={colorMode === 'dark' ? '#818cf8' : '#6b7db3'} gridColumn="1 / -1">
                        <Icon as={SearchX} boxSize="48px" opacity={0.3} />
                        <Text fontSize="0.9rem">No resources match your search. Try a different query.</Text>
                    </Flex>
                ) : (
                    filtered.map((res, idx) => {
                        const badge = getBadgeStyle(res.importance);
                        return (
                            <motion.div
                                key={res.url + idx}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: idx * 0.035 }}
                            >
                                <Box
                                    bg={colorMode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255, 250, 242, 0.76)'}
                                    border="1px solid"
                                    borderColor={colorMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(93, 61, 36, 0.12)'}
                                    borderRadius="16px"
                                    p="24px"
                                    h="100%"
                                    display="flex"
                                    flexDirection="column"
                                    transition="all 0.35s"
                                    _hover={{
                                        bg: colorMode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(93, 61, 36, 0.04)',
                                        transform: 'translateY(-4px)',
                                        boxShadow: \`0 12px 30px \${colorMode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.08)'}\`,
                                        borderColor: colorMode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(93, 61, 36, 0.25)'
                                    }}
                                >
                                    <Flex justify="space-between" align="flex-start" mb="12px">
                                        <Flex align="center" gap="6px" fontSize="0.75rem" fontWeight="600" letterSpacing="0.02em" bg={badge.bg} color={badge.color} border="1px solid" borderColor={badge.borderColor} p="4px 10px" borderRadius="999px">
                                            <Icon as={badge.icon} boxSize="11px" />
                                            {res.importance}
                                        </Flex>
                                        <Flex align="center" fontSize="0.8rem" color={colorMode === 'dark' ? '#c4b5fd' : '#6f5a4a'} fontWeight="500">
                                            {getIconPrefix(CATEGORY_ICONS[res.category] || CATEGORY_ICONS['Default'])}
                                            {res.category}
                                        </Flex>
                                    </Flex>

                                    <Text fontSize="1.1rem" fontWeight="700" color={colorMode === 'dark' ? '#f1f5f9' : '#2e2218'} mb="8px" lineHeight="1.3">
                                        {res.name}
                                    </Text>
                                    
                                    <Text fontSize="0.9rem" color={colorMode === 'dark' ? '#94a3b8' : '#6f5a4a'} mb="20px" lineHeight="1.5" flex="1">
                                        {res.description}
                                    </Text>

                                    <Flex wrap="wrap" gap="6px" mb="24px">
                                        {res.tags.map(t => {
                                            const tagStyle = getTagClass(t);
                                            return (
                                                <Box key={t} p="4px 10px" borderRadius="6px" fontSize="0.72rem" fontWeight="500" bg={tagStyle.bg} color={tagStyle.color}>
                                                    {t}
                                                </Box>
                                            )
                                        })}
                                    </Flex>

                                    <Flex align="center" justify="space-between" mt="auto" pt="16px" borderTop="1px solid" borderColor={colorMode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(93, 61, 36, 0.1)'}>
                                        <Text fontSize="0.75rem" color={colorMode === 'dark' ? '#818cf8' : '#6f5a4a'} maxW="150px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" title={res.url}>
                                            {domainOf(res.url)}
                                        </Text>
                                        <Flex gap="8px">
                                            <IconButton
                                                icon={<Icon as={copiedUrl === res.url ? Check : Copy} boxSize="14px" />}
                                                size="sm" w="32px" h="32px"
                                                border="1.5px solid" borderColor={copiedUrl === res.url ? (colorMode === 'dark' ? '#34d399' : '#06d6a0') : (colorMode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(93, 61, 36, 0.2)')}
                                                bg={copiedUrl === res.url ? 'rgba(6,214,160,0.15)' : (colorMode === 'dark' ? 'rgba(52,211,153,0.08)' : 'rgba(95, 58, 27, 0.08)')}
                                                borderRadius="8px"
                                                color={copiedUrl === res.url ? (colorMode === 'dark' ? '#34d399' : '#06d6a0') : (colorMode === 'dark' ? '#818cf8' : '#6f5a4a')}
                                                onClick={() => handleCopy(res.url)}
                                                _hover={{ borderColor: colorMode === 'dark' ? '#ffffff' : '#8c5430', color: colorMode === 'dark' ? '#ffffff' : '#8c5430', bg: colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(140, 84, 48, 0.12)' }}
                                                aria-label="Copy link"
                                            />
                                            <IconButton
                                                as="a" href={res.url} target="_blank" rel="noopener noreferrer"
                                                icon={<Icon as={ExternalLink} boxSize="14px" />}
                                                size="sm" w="32px" h="32px"
                                                border="1.5px solid" borderColor={colorMode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(93, 61, 36, 0.2)'}
                                                bg={colorMode === 'dark' ? 'rgba(52,211,153,0.08)' : 'rgba(95, 58, 27, 0.08)'}
                                                borderRadius="8px"
                                                color={colorMode === 'dark' ? '#818cf8' : '#6f5a4a'}
                                                _hover={{ borderColor: colorMode === 'dark' ? '#ffffff' : '#8c5430', color: colorMode === 'dark' ? '#ffffff' : '#8c5430', bg: colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(140, 84, 48, 0.12)' }}
                                                aria-label="Open resource"
                                            />
                                        </Flex>
                                    </Flex>
                                </Box>
                            </motion.div>
                        )
                    })
                )}
            </Grid>
        );
    }
\`;

content = content.replace('    return (\n        <Box\n          bg={colorMode === \\'dark\\' ? \\'rgba(255,255,255,0.04)\\' : \\'rgba(255, 250, 242, 0.76)\\'}', insertion + '\n    return (\n        <Box\n          bg={colorMode === \\'dark\\' ? \\'rgba(255,255,255,0.04)\\' : \\'rgba(255, 250, 242, 0.76)\\''}');

fs.writeFileSync(tcPath, content);
console.log("Patched TableCard.jsx");
