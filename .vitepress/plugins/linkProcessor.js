/**
 * VitePress 链接处理器插件 (前置处理)
 * 确保在 Vue 插件处理前转换链接中的 # 为 %23
 */

export default function linkProcessorPlugin (userConfig = {}) {
    const config = {
        debug: process.env.DEBUG_LINK_PROCESSOR === 'true' || userConfig.debug || false,
        logLimit: userConfig.logLimit || 3,
        ...userConfig
    }

    return {
        name: 'vite-plugin-link-processor-pre',

        // 关键设置：确保在 Vue 插件之前执行
        enforce: 'pre',

        // 添加文件类型处理顺序
        async transform (code, id) {
            // 仅处理 Markdown 文件
            if (!id.endsWith('.md')) return

            const shortId = id.replace(process.cwd(), '')
            const debugInfo = config.debug ? {
                file: shortId,
                originalCodeLength: code.length,
                processedLinks: 0,
                examples: []
            } : null

            // 更精确的链接匹配正则
            const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g

            let processedCode = code
            let match

            while ((match = linkRegex.exec(code)) !== null) {
                const [fullMatch, text, url] = match

                // 仅处理包含 # 的链接
                if (url.includes('#')) {
                    const processedUrl = url.replace(/#/g, '%23')
                    const newLink = `[${text}](${processedUrl})`

                    processedCode = processedCode.replace(fullMatch, newLink)

                    // 收集调试信息
                    if (debugInfo && debugInfo.examples.length < config.logLimit) {
                        debugInfo.processedLinks++
                        debugInfo.examples.push({
                            original: fullMatch,
                            processed: newLink
                        })
                    }
                }
            }

            // 输出调试信息
            if (debugInfo && debugInfo.processedLinks > 0) {
                console.log(`\n📄 [link-processor-pre] 处理文件: ${shortId}`)
                console.log(`🔗 发现链接: ${(code.match(linkRegex) || []).length} 个`)
                console.log(`🔄 处理链接: ${debugInfo.processedLinks} 个`)

                debugInfo.examples.forEach((ex, i) => {
                    console.log(`\n  🔍 示例 #${i + 1}:`)
                    console.log(`   原始: ${ex.original}`)
                    console.log(`   处理: ${ex.processed}`)
                })

                console.log(`📏 文件大小变化: ${debugInfo.originalCodeLength} → ${processedCode.length} 字符`)
            }

            return processedCode
        }
    }
}
