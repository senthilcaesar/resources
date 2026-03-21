const fs = require('fs');

function replaceContent(filepath, replacements) {
    let content = fs.readFileSync(filepath, 'utf8');
    for (let i = 0; i < replacements.length; i++) {
        if (content.indexOf(replacements[i][0]) === -1) {
            console.error(`Missing target ${i} in ${filepath}`);
        }
        content = content.replace(replacements[i][0], replacements[i][1]);
    }
    fs.writeFileSync(filepath, content);
}

// Replacements for App.jsx
const appReplacements = [
    [
        `            bg={colorMode === 'dark' ? 'rgba(52,211,153,0.08)' : 'rgba(6,214,160,0.1)'}\n            border="1.5px solid"\n            borderColor={colorMode === 'dark' ? 'rgba(52,211,153,0.22)' : 'rgba(6,214,160,0.25)'}\n            borderRadius="12px"\n            align="center"\n            justify="center"\n            boxShadow={\`0 0 20px \${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}\`}\n            flexShrink={0}\n            transition="all 0.35s"\n            _hover={{\n               boxShadow: \`0 0 30px \${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}, 0 0 60px rgba(6,214,160,0.15)\`\n            }}\n          >\n            <Icon as={Layers} color={colorMode === 'dark' ? '#34d399' : '#06d6a0'} boxSize="20px" />`,
        `            bg={colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(93, 61, 36, 0.05)'}\n            border="1.5px solid"\n            borderColor={colorMode === 'dark' ? 'rgba(255,255,255,0.22)' : 'rgba(93, 61, 36, 0.25)'}\n            borderRadius="12px"\n            align="center"\n            justify="center"\n            boxShadow={\`0 0 20px \${colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}\`}\n            flexShrink={0}\n            transition="all 0.35s"\n            _hover={{\n               boxShadow: \`0 0 30px \${colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}\`\n            }}\n          >\n            <Icon as={Layers} color={colorMode === 'dark' ? '#e2e8f0' : '#8c5430'} boxSize="20px" />`
    ],
    [
        `              bgGradient={colorMode === 'dark' ? 'linear(to-br, #34d399, #a78bfa)' : 'linear(to-br, #06d6a0, #8b5cf6)'}\n              bgClip="text"`,
        `              color={colorMode === 'dark' ? '#f1f5f9' : '#2e2218'}`
    ],
    [
        `            borderColor: colorMode === 'dark' ? '#34d399' : '#06d6a0',\n            boxShadow: \`0 0 0 3px \${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}, 0 0 20px \${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}\`\n          }}\n        >\n          <Flex\n            w="20px"\n            h="20px"\n            bg={colorMode === 'dark' ? 'linear-gradient(135deg, #818cf8, #a78bfa)' : 'linear-gradient(135deg, #fbbf24, #f59e0b)'}\n            borderRadius="50%"\n            align="center"\n            justify="center"\n            transition="transform 0.35s, background 0.35s"\n            boxShadow={colorMode === 'dark' ? '0 2px 8px rgba(129,140,248,0.4)' : '0 2px 8px rgba(251,191,36,0.4)'}`,
        `            borderColor: colorMode === 'dark' ? '#ffffff' : '#8c5430',\n            boxShadow: \`0 0 0 3px \${colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(140, 84, 48, 0.15)'}, 0 0 20px \${colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(140, 84, 48, 0.15)'}\`\n          }}\n        >\n          <Flex\n            w="20px"\n            h="20px"\n            bg={colorMode === 'dark' ? '#e2e8f0' : '#8c5430'}\n            borderRadius="50%"\n            align="center"\n            justify="center"\n            transition="transform 0.35s, background 0.35s"\n            boxShadow={colorMode === 'dark' ? '0 2px 8px rgba(255,255,255,0.2)' : '0 2px 8px rgba(140, 84, 48, 0.3)'}`
    ],
    [
        `<Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? 'rgba(56,189,248,0.1)' : 'rgba(56,189,248,0.15)'} color="#38bdf8">`,
        `<Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(93, 61, 36, 0.08)'} color={colorMode === 'dark' ? '#cbd5e1' : '#6f5a4a'}>`
    ],
    [
        `<Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? 'rgba(52,211,153,0.1)' : 'rgba(6,214,160,0.15)'} color="#34d399">`,
        `<Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(93, 61, 36, 0.08)'} color={colorMode === 'dark' ? '#cbd5e1' : '#6f5a4a'}>`
    ],
    [
        `<Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? 'rgba(244,114,182,0.1)' : 'rgba(244,114,182,0.15)'} color="#f472b6">`,
        `<Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(93, 61, 36, 0.08)'} color={colorMode === 'dark' ? '#cbd5e1' : '#6f5a4a'}>`
    ],
    [
        `<Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? 'rgba(167,139,250,0.1)' : 'rgba(139,92,246,0.15)'} color={colorMode === 'dark' ? '#c4b5fd' : '#8b5cf6'}>`,
        `<Box p={3} borderRadius="lg" bg={colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(93, 61, 36, 0.08)'} color={colorMode === 'dark' ? '#cbd5e1' : '#6f5a4a'}>`
    ],
    [
        `                bgGradient={colorMode === 'dark' ? 'linear(to-br, #34d399 0%, #a78bfa 50%, #fb7185 100%)' : 'linear(to-br, #06d6a0 0%, #8b5cf6 50%, #f472b6 100%)'}\n                bgSize="200% auto"\n                bgClip="text"`,
        `                color={colorMode === 'dark' ? '#f1f5f9' : '#2e2218'}`
    ],
    [
        `<Text as="span" fontWeight="700" fontSize="0.75rem" letterSpacing="0.06em" textTransform="uppercase" bgGradient={colorMode === "dark" ? 'linear(to-br, #34d399, #a78bfa)' : 'linear(to-br, #06d6a0, #8b5cf6)'} bgClip="text">`,
        `<Text as="span" fontWeight="700" fontSize="0.75rem" letterSpacing="0.06em" textTransform="uppercase" color={colorMode === "dark" ? '#e2e8f0' : '#8c5430'}>`
    ],
    [
        `<Text as="a" href={uod?.url} target="_blank" rel="noopener noreferrer" color={colorMode === "dark" ? "#f1f5f9" : "#8c5430"} fontWeight="600" textDecoration="none" transition="color 0.35s" _hover={{ color: colorMode === "dark" ? '#34d399' : '#06d6a0' }}>`,
        `<Text as="a" href={uod?.url} target="_blank" rel="noopener noreferrer" color={colorMode === "dark" ? "#f1f5f9" : "#8c5430"} fontWeight="600" textDecoration="none" transition="color 0.35s" _hover={{ opacity: 0.8 }}>`
    ],
    [
        `                   _focus={{\n                       borderColor: colorMode === 'dark' ? '#34d399' : '#06d6a0',\n                       boxShadow: \`0 0 0 4px \${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}, 0 0 30px rgba(6,214,160,0.15)\`\n                   }}`,
        `                   _focus={{\n                       borderColor: colorMode === 'dark' ? '#ffffff' : '#8c5430',\n                       boxShadow: \`0 0 0 4px \${colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(140, 84, 48, 0.15)'}\`\n                   }}`
    ],
    [
        `                            bg={colorMode === 'dark' ? 'rgba(52,211,153,0.08)' : 'rgba(6,214,160,0.1)'}\n                            color={colorMode === 'dark' ? '#818cf8' : '#6b7db3'}\n                            onClick={() => setSearchQuery("")}\n                            _hover={{\n                                bg: colorMode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(93, 61, 36, 0.08)',\n                                color: colorMode === 'dark' ? '#f1f5f9' : '#2e2218'\n                            }}`,
        `                            bg={colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(93, 61, 36, 0.05)'}\n                            color={colorMode === 'dark' ? '#818cf8' : '#6f5a4a'}\n                            onClick={() => setSearchQuery("")}\n                            _hover={{\n                                bg: colorMode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(93, 61, 36, 0.08)',\n                                color: colorMode === 'dark' ? '#f1f5f9' : '#2e2218'\n                            }}`
    ],
    [
        `                           bg={isActive ? (colorMode === 'dark' ? 'linear-gradient(135deg, #34d399, #a78bfa)' : 'linear-gradient(135deg, #06d6a0, #8b5cf6)') : 'transparent'}\n                           color={isActive ? '#fff' : (colorMode === 'dark' ? '#818cf8' : '#6f5a4a')}\n                           fontSize="0.82rem"\n                           fontWeight="500"\n                           transition="all 0.35s"\n                           boxShadow={isActive ? \`0 4px 20px \${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}\` : 'none'}\n                           _hover={!isActive ? {\n                               borderColor: colorMode === 'dark' ? '#34d399' : '#06d6a0',\n                               color: colorMode === 'dark' ? '#34d399' : '#06d6a0',\n                               bg: colorMode === 'dark' ? 'rgba(52,211,153,0.08)' : 'rgba(6,214,160,0.1)',\n                               boxShadow: \`0 0 16px \${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}\`\n                           } : {}}`,
        `                           bg={isActive ? (colorMode === 'dark' ? '#e2e8f0' : '#8c5430') : 'transparent'}\n                           color={isActive ? (colorMode === 'dark' ? '#0f172a' : '#fff') : (colorMode === 'dark' ? '#818cf8' : '#6f5a4a')}\n                           fontSize="0.82rem"\n                           fontWeight="500"\n                           transition="all 0.35s"\n                           boxShadow={isActive ? \`0 4px 12px \${colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(140, 84, 48, 0.3)'}\` : 'none'}\n                           _hover={!isActive ? {\n                               borderColor: colorMode === 'dark' ? '#ffffff' : '#8c5430',\n                               color: colorMode === 'dark' ? '#ffffff' : '#8c5430',\n                               bg: colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(140, 84, 48, 0.08)',\n                               boxShadow: \`0 0 16px \${colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(140, 84, 48, 0.15)'}\`\n                           } : {}}`
    ],
    [
        `<Text>Built with ♥ · <Text as="span" color={colorMode === 'dark' ? '#34d399' : '#06d6a0'} fontWeight="500">{RESOURCES.length}</Text> resources curated · <Text as="span">My Resources</Text></Text>`,
        `<Text>Built with ♥ · <Text as="span" color={colorMode === 'dark' ? '#e2e8f0' : '#8c5430'} fontWeight="500">{RESOURCES.length}</Text> resources curated · <Text as="span">My Resources</Text></Text>`
    ]
];

const tableCardReplacements = [
    [
        `    const getBadgeStyle = (importance) => {\n        const isDark = colorMode === 'dark';\n        switch (importance) {\n            case "High":\n                return {\n                    bg: isDark ? 'rgba(251,113,133,0.12)' : 'rgba(251,113,133,0.15)',\n                    color: isDark ? '#fda4af' : '#fb7185',\n                    borderColor: isDark ? 'rgba(251,113,133,0.25)' : 'rgba(251,113,133,0.3)',\n                    icon: Circle,\n                    pulse: true\n                };\n            case "Medium":\n                return {\n                    bg: isDark ? 'rgba(251,191,36,0.12)' : 'rgba(251,191,36,0.15)',\n                    color: isDark ? '#fcd34d' : '#fbbf24',\n                    borderColor: isDark ? 'rgba(251,191,36,0.25)' : 'rgba(251,191,36,0.3)',\n                    icon: MinusCircle\n                };\n            case "Low":\n                return {\n                    bg: isDark ? 'rgba(52,211,153,0.12)' : 'rgba(6,214,160,0.15)',\n                    color: isDark ? '#6ee7b7' : '#06d6a0',\n                    borderColor: isDark ? 'rgba(52,211,153,0.25)' : 'rgba(6,214,160,0.3)',\n                    icon: CheckCircle\n                };\n            default: return {};\n        }\n    }`,
        `    const getBadgeStyle = (importance) => {\n        const isDark = colorMode === 'dark';\n        const plainBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(93, 61, 36, 0.08)';\n        const plainColor = isDark ? '#cbd5e1' : '#6f5a4a';\n        const plainBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(93, 61, 36, 0.2)';\n        switch (importance) {\n            case "High": return { bg: plainBg, color: plainColor, borderColor: plainBorder, icon: Circle, pulse: true };\n            case "Medium": return { bg: plainBg, color: plainColor, borderColor: plainBorder, icon: MinusCircle };\n            case "Low": return { bg: plainBg, color: plainColor, borderColor: plainBorder, icon: CheckCircle };\n            default: return {};\n        }\n    }`
    ],
    [
        `    // Dynamic Tags\n    const tagColorCount = 8;\n    const tagColorMap = {};\n    const getTagClass = (tag) => {\n        if (!(tag in tagColorMap)) {\n            tagColorMap[tag] = Object.keys(tagColorMap).length % tagColorCount;\n        }\n        const idx = tagColorMap[tag];\n        const isDark = colorMode === 'dark';\n        const palettes = [\n            { bg: 'rgba(99,102,241,0.18)', color: '#a5b4fc', darkBg: 'rgba(99,102,241,0.14)' },\n            { bg: 'rgba(6,214,160,0.18)', color: '#6ee7b7', darkBg: 'rgba(6,214,160,0.14)' },\n            { bg: 'rgba(251,191,36,0.18)', color: '#fcd34d', darkBg: 'rgba(251,191,36,0.14)' },\n            { bg: 'rgba(251,113,133,0.18)', color: '#fda4af', darkBg: 'rgba(251,113,133,0.14)' },\n            { bg: 'rgba(167,139,250,0.18)', color: '#c4b5fd', darkBg: 'rgba(167,139,250,0.14)' },\n            { bg: 'rgba(56,189,248,0.18)', color: '#7dd3fc', darkBg: 'rgba(56,189,248,0.14)' },\n            { bg: 'rgba(244,114,182,0.18)', color: '#f9a8d4', darkBg: 'rgba(244,114,182,0.14)' },\n            { bg: 'rgba(251,146,60,0.18)', color: '#fdba74', darkBg: 'rgba(251,146,60,0.14)' }\n        ];\n        return {\n            bg: isDark ? palettes[idx].darkBg : palettes[idx].bg,\n            color: palettes[idx].color\n        }\n    }`,
        `    // Dynamic Tags\n    const getTagClass = (tag) => {\n        const isDark = colorMode === 'dark';\n        return {\n            bg: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(93, 61, 36, 0.05)',\n            color: isDark ? '#cbd5e1' : '#6f5a4a'\n        }\n    }`
    ],
    [
        `                    bgGradient={colorMode === 'dark' ? 'linear(to-r, rgba(52,211,153,0.08), transparent)' : 'linear(to-r, rgba(6,214,160,0.1), transparent)'}`,
        `                    bg={colorMode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(93, 61, 36, 0.02)'}`
    ],
    [
        `                                        boxShadow: \`0 6px 24px \${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}, inset 0 0 0 1px rgba(6,214,160,0.15)\`,\n                                        borderRadius: '12px',\n                                        '& .res-title': { color: colorMode === 'dark' ? '#34d399' : '#06d6a0' }`,
        `                                        boxShadow: \`0 6px 24px \${colorMode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)'}, inset 0 0 0 1px \${colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(93, 61, 36, 0.15)'}\`,\n                                        borderRadius: '12px',\n                                        '& .res-title': { color: colorMode === 'dark' ? '#ffffff' : '#8c5430' }`
    ],
    [
        `                                            _hover={{\n                                                borderColor: colorMode === 'dark' ? '#34d399' : '#06d6a0',\n                                                color: colorMode === 'dark' ? '#34d399' : '#06d6a0',\n                                                bg: colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)',\n                                                transform: 'scale(1.15)',\n                                                boxShadow: \`0 0 16px \${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}\`\n                                            }}`,
        `                                            _hover={{\n                                                borderColor: colorMode === 'dark' ? '#ffffff' : '#8c5430',\n                                                color: colorMode === 'dark' ? '#ffffff' : '#8c5430',\n                                                bg: colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(140, 84, 48, 0.12)',\n                                                transform: 'scale(1.15)'\n                                            }}`
    ],
    [
        `                                            _hover={{\n                                                borderColor: colorMode === 'dark' ? '#34d399' : '#06d6a0',\n                                                color: colorMode === 'dark' ? '#34d399' : '#06d6a0',\n                                                bg: colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)',\n                                                transform: 'scale(1.15)',\n                                                boxShadow: \`0 0 16px \${colorMode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(6,214,160,0.3)'}\`\n                                            }}`,
        `                                            _hover={{\n                                                borderColor: colorMode === 'dark' ? '#ffffff' : '#8c5430',\n                                                color: colorMode === 'dark' ? '#ffffff' : '#8c5430',\n                                                bg: colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(140, 84, 48, 0.12)',\n                                                transform: 'scale(1.15)'\n                                            }}`
    ]
];

console.log("Replacing App.jsx");
replaceContent('/Users/senthilpalanivelu/resources/src/App.jsx', appReplacements);
console.log("Replacing TableCard.jsx");
replaceContent('/Users/senthilpalanivelu/resources/src/components/TableCard.jsx', tableCardReplacements);
console.log("Done!");
