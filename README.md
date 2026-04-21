# DFTI - Delta Force Type Indicator
## 《三角洲行动》角色人格原型测试站

这是一个基于 MBTI 骨架与《三角洲行动》世界观多阵营人格原型构建的测试站项目。

### 1. 项目定位
本项目旨在通过情境化题目，将用户匹配至《三角洲行动》中的干员、NPC 或阵营原型，并融合玩家社区的梗文化（如“认祖归洲”、“嘴硬战神”等）。

### 2. 主要功能
- **情境化测试**: 12+ 道基于战场场景的 MBTI 测试题。
- **多阵营结果**: 角色命中 (GTI/Asara/Haverk) + 阵营人格归属 + 社区气质标签。
- **可信度审计**: 每一条数据都标注了 Source Type (Official/Community) 与 Confidence 级别。
- **全档案库**: 浏览全员图鉴与社区梗档案。
- **分享友好**: 战术 UI 风格的结果卡片。

### 3. 技术实现
- **React 18 + Vite**: 高性能单页应用。
- **Tailwind CSS 4**: 现代战术视觉风格。
- **Motion**: 流畅的页面切换与交互动画。
- **MBTI Algorithm**: 8 轴加权算法，支持多重匹配修正。

### 4. 数据扩展
数据存储在 `src/data/` 目录下：
- `characters.json`: 角色与原型定义。
- `memes.json`: 社区梗数据库。
- `questions.json`: 测试题库。
- `config.json`: 全局配置（免责声明、版本等）。

### 5. 如何新增角色
1. 在 `src/data/characters.json` 中添加新条目。
2. 定义其 `mbti_axis_weights` (各维度 0-1 的权重)。
3. 设置 `source_type` (official / community)。

### 6. 使用状态文件 (Memory Protocol)
项目维护了 5 个关键状态文件，用于保持开发连续性：
- `PROJECT_BRIEF.md`: 项目目标与边界。
- `TASKS.md`: 任务追踪。
- `CHANGELOG.md`: 变更记录。
- `DECISIONS.md`: 设计决策。
- `MEMORY_PROTOCOL.md`: 状态持久化规约。

### 7. 免责声明
本站仅供《三角洲行动》同人娱乐使用，不代表官方立场。
所有社区梗内容均由玩家群体自发形成。
