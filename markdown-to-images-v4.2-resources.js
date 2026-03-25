// ============================================
// Markdown图片生成器 v4.2 豪华版 - 资源库
// 字体：15款 | 主题：12款 | 配色：100+ | 模板：20个
// ============================================

// ==================== 字体库（15款）====================
const FONT_LIBRARY = {
    // 无衬线字体（Sans-Serif）- 现代简约
    sansSerif: [
        {
            name: '思源黑体',
            value: "'Noto Sans SC'",
            weight: [300, 400, 500, 700],
            style: '现代简约，阅读性强',
            recommend: '通用科普、新闻资讯',
            preview: '永和九年，岁在癸丑 The quick brown fox'
        },
        {
            name: '苹方',
            value: "'PingFang SC', 'PingFang TC'",
            weight: [300, 400, 500, 600],
            style: 'Apple官方字体，优雅精致',
            recommend: '高端品牌、设计感内容',
            preview: '永和九年，岁在癸丑 The quick brown fox'
        },
        {
            name: '微软雅黑',
            value: "'Microsoft YaHei'",
            weight: [400, 700],
            style: 'Windows系统字体，清晰易读',
            recommend: '办公文档、通用场景',
            preview: '永和九年，岁在癸丑 The quick brown fox'
        },
        {
            name: '阿里普惠体',
            value: "'Alibaba PuHuiTi'",
            weight: [400, 500, 700],
            style: '免费商用，现代感强',
            recommend: '品牌宣传、电商内容',
            preview: '永和九年，岁在癸丑 The quick brown fox'
        },
        {
            name: '站酷快乐体',
            value: "'Zcool QingKe HuangYou'",
            weight: [400],
            style: '俏皮可爱，活泼跳跃',
            recommend: '儿童教育、趣味内容',
            preview: '永和九年，岁在癸丑 The quick brown fox'
        }
    ],

    // 衬线字体（Serif）- 优雅知性
    serif: [
        {
            name: '思源宋体',
            value: "'Noto Serif SC'",
            weight: [300, 400, 700],
            style: '优雅知性，文化底蕴',
            recommend: '长篇阅读、人文艺术',
            preview: '永和九年，岁在癸丑 The quick brown fox'
        },
        {
            name: '宋体',
            value: "'SimSun', 'STSong'",
            weight: [400],
            style: '传统印刷字体，严谨正式',
            recommend: '正式文档、学术论文',
            preview: '永和九年，岁在癸丑 The quick brown fox'
        },
        {
            name: '方正书宋',
            value: "'FZShuSong-Z01'",
            weight: [400],
            style: '书法韵味，古典雅致',
            recommend: '传统文化、诗词鉴赏',
            preview: '永和九年，岁在癸丑 The quick brown fox'
        }
    ],

    // 手写字体（Handwriting）- 温暖亲和
    handwriting: [
        {
            name: '马善政楷体',
            value: "'Ma Shan Zheng'",
            weight: [400],
            style: '手写楷体，温暖亲和',
            recommend: '母婴育儿、情感文章',
            preview: '永和九年，岁在癸丑 The quick brown fox'
        },
        {
            name: '霞鹜文楷',
            value: "'LXGW WenKai'",
            weight: [400, 700],
            style: '开源楷体，清新自然',
            recommend: '生活分享、美文欣赏',
            preview: '永和九年，岁在癸丑 The quick brown fox'
        },
        {
            name: '钉钉进步体',
            value: "'DingTalk JinBuTi'",
            weight: [400],
            style: '手写风格，轻松随意',
            recommend: '日记随笔、心情分享',
            preview: '永和九年，岁在癸丑 The quick brown fox'
        }
    ],

    // 等宽字体（Monospace）- 技术感
    monospace: [
        {
            name: 'JetBrains Mono',
            value: "'JetBrains Mono'",
            weight: [400, 700],
            style: '程序员最爱，技术感强',
            recommend: '代码教程、技术文档',
            preview: 'const code = "Hello World"'
        },
        {
            name: 'Fira Code',
            value: "'Fira Code'",
            weight: [400, 700],
            style: '连字特性，代码优雅',
            recommend: '编程教程、开发文档',
            preview: 'const code = "Hello World"'
        }
    ],

    // 创意字体（Creative）- 独特个性
    creative: [
        {
            name: '站酷高端黑',
            value: "'Zcool XiaoWei'",
            weight: [400],
            style: '力量感，冲击力强',
            recommend: '运动健身、热血励志',
            preview: '永和九年，岁在癸丑 The quick brown fox'
        },
        {
            name: '优设标题黑',
            value: "'YouSheBiaoTiHei'",
            weight: [400],
            style: '粗壮醒目，标题专用',
            recommend: '大标题、封面设计',
            preview: '永和九年，岁在癸丑 The quick brown fox'
        }
    ]
};

// ==================== Markdown主题（12款）====================
const MD_THEMES = {
    // 基础主题（4款）
    basic: [
        {
            id: 'default',
            name: '默认简约',
            desc: '清晰层次，色块标题',
            scene: '通用科普、新闻资讯',
            features: ['彩色标题栏', '左侧边框', '清晰层次'],
            preview: 'preview-default.png'
        },
        {
            id: 'minimal',
            name: '极简线条',
            desc: '细线分割，轻量感',
            scene: '极简风格、现代设计',
            features: ['细线装饰', '大留白', '高级感'],
            preview: 'preview-minimal.png'
        },
        {
            id: 'classic',
            name: '经典印刷',
            desc: '传统印刷风格',
            scene: '正式文档、学术论文',
            features: ['宋体排版', '传统装饰', '严谨正式'],
            preview: 'preview-classic.png'
        },
        {
            id: 'modern',
            name: '现代商务',
            desc: '专业商务风格',
            scene: '商务报告、行业分析',
            features: ['粗体标题', '灰色基调', '专业感'],
            preview: 'preview-modern.png'
        }
    ],

    // 创意主题（4款）
    creative: [
        {
            id: 'card',
            name: '卡片风格',
            desc: '渐变标题，灰色背景',
            scene: '知识卡片、要点总结',
            features: ['渐变色块', '圆角卡片', '层次丰富'],
            preview: 'preview-card.png'
        },
        {
            id: 'magazine',
            name: '杂志排版',
            desc: '多栏布局，视觉丰富',
            scene: '时尚杂志、生活方式',
            features: ['多栏布局', '大标题', '时尚感'],
            preview: 'preview-magazine.png'
        },
        {
            id: 'paper',
            name: '纸质笔记',
            desc: '纸张纹理，手写感',
            scene: '读书笔记、学习心得',
            features: ['纸张纹理', '手写批注', '温暖感'],
            preview: 'preview-paper.png'
        },
        {
            id: 'tech',
            name: '科技未来',
            desc: '霓虹效果，科技感',
            scene: 'AI科技、数码评测',
            features: ['霓虹边框', '渐变色彩', '未来感'],
            preview: 'preview-tech.png'
        }
    ],

    // 文艺主题（4款）
    literary: [
        {
            id: 'serif',
            name: '优雅衬线',
            desc: '宋体排版，2倍行距',
            scene: '深度长文、人文艺术',
            features: ['衬线字体', '大行距', '优雅感'],
            preview: 'preview-serif.png'
        },
        {
            id: 'handwrite',
            name: '温暖手写',
            desc: '楷体标题，亲和力',
            scene: '母婴育儿、情感文章',
            features: ['手写字体', '温暖配色', '亲和力'],
            preview: 'preview-handwrite.png'
        },
        {
            id: 'poetry',
            name: '诗词古韵',
            desc: '古典装饰，文化底蕴',
            scene: '诗词鉴赏、传统文化',
            features: ['古典花纹', '宋体排版', '文化感'],
            preview: 'preview-poetry.png'
        },
        {
            id: 'fresh',
            name: '清新文艺',
            desc: '淡雅配色，小清新',
            scene: '美文欣赏、生活分享',
            features: ['淡雅色调', '手绘元素', '清新感'],
            preview: 'preview-fresh.png'
        }
    ]
};

// ==================== 配色方案（100+）====================
const COLOR_SCHEMES = {
    // 1. 奶油色系（12款）
    cream: [
        { name: '纯白色', bg: '#FFFFFF', border: '#E5E7EB', accent: '#6B7280' },
        { name: '奶油白', bg: '#FFF8F0', border: '#E8D7C3', accent: '#C9A88C' },
        { name: '暖杏色', bg: '#F5E6D3', border: '#D4C4A8', accent: '#B5A594' },
        { name: '米色', bg: '#E8DDD1', border: '#C9B8A3', accent: '#AA9988' },
        { name: '浅驼色', bg: '#D4C4B7', border: '#B5A594', accent: '#968775' },
        { name: '杏仁白', bg: '#FAF0E6', border: '#E0D1C6', accent: '#C7B8AD' },
        { name: '香草色', bg: '#F3EAD8', border: '#D9CFBD', accent: '#BFB5A3' },
        { name: '亚麻色', bg: '#EDE4D4', border: '#D3CAB9', accent: '#B9B09F' },
        { name: '卡布奇诺', bg: '#DCC9AA', border: '#C3B091', accent: '#AA9778' },
        { name: '榛果色', bg: '#E0C9A6', border: '#C7B08D', accent: '#AE9774' },
        { name: '沙滩色', bg: '#F4EAD5', border: '#DBD1BC', accent: '#C2B8A3' },
        { name: '鹅黄', bg: '#F8F4DC', border: '#DFDBC3', accent: '#C6C2AA' }
    ],

    // 2. 莫兰迪色系（12款）
    morandi: [
        { name: '豆沙粉', bg: '#E5C9C7', border: '#C9A8A6', accent: '#AD8785' },
        { name: '雾霾蓝', bg: '#BED1D4', border: '#9DB5B8', accent: '#7C999C' },
        { name: '姜黄色', bg: '#E1C89F', border: '#C4AA7E', accent: '#A78C5D' },
        { name: '薄荷绿', bg: '#C1D8C3', border: '#A0B9A2', accent: '#7F9A81' },
        { name: '藕粉色', bg: '#E6D1D3', border: '#C7B0B2', accent: '#A88F91' },
        { name: '浅灰紫', bg: '#D4CECF', border: '#B3ACAD', accent: '#928A8B' },
        { name: '暖灰', bg: '#D1CBC8', border: '#B0AAA7', accent: '#8F8986' },
        { name: '冷驼色', bg: '#CEC4BC', border: '#ADA39B', accent: '#8C827A' },
        { name: '烟熏紫', bg: '#C9BFCB', border: '#A89FA8', accent: '#877E85' },
        { name: '雾松色', bg: '#B8C9C6', border: '#97A8A5', accent: '#768784' },
        { name: '茶色', bg: '#D6C2B0', border: '#B5A18F', accent: '#94806E' },
        { name: '藤色', bg: '#C7B8C9', border: '#A697A8', accent: '#857687' }
    ],

    // 3. 中国传统色（16款）
    chinese: [
        { name: '月白', bg: '#D6ECF0', border: '#B0D0D4', accent: '#8AB4B8' },
        { name: '缃叶', bg: '#F0E2D0', border: '#D0C2B0', accent: '#B0A290' },
        { name: '秋香色', bg: '#D2B48C', border: '#B29A6C', accent: '#92804C' },
        { name: '水色', bg: '#D2E9E8', border: '#B2C9C8', accent: '#92A9A8' },
        { name: '鸭黄', bg: '#F7D94C', border: '#D7B92C', accent: '#B7990C' },
        { name: '玉白', bg: '#F0F0E8', border: '#D0D0C8', accent: '#B0B0A8' },
        { name: '竹青', bg: '#D0E4D5', border: '#B0C4B5', accent: '#90A495' },
        { name: '藕荷', bg: '#E9D7DF', border: '#C9B7BF', accent: '#A9979F' },
        { name: '胭脂', bg: '#F3D3D5', border: '#D3B3B5', accent: '#B39395' },
        { name: '靛青', bg: '#BFD1E5', border: '#9FB1C5', accent: '#7F91A5' },
        { name: '黛绿', bg: '#C1D5CD', border: '#A1B5AD', accent: '#81958D' },
        { name: '朱砂', bg: '#F0C9C0', border: '#D0A9A0', accent: '#B08980' },
        { name: '松花', bg: '#BCE1CE', border: '#9CC1AE', accent: '#7CA18E' },
        { name: '石青', bg: '#B0D5DF', border: '#90B5BF', accent: '#70959F' },
        { name: '藤黄', bg: '#FFF1B8', border: '#DFD198', accent: '#BFB178' },
        { name: '黛蓝', bg: '#C5D6E8', border: '#A5B6C8', accent: '#8596A8' }
    ],

    // 4. 纯净色系（12款）
    pure: [
        { name: '冰雪白', bg: '#FAFAFA', border: '#E0E0E0', accent: '#BDBDBD' },
        { name: '云灰', bg: '#F5F5F5', border: '#DBDBDB', accent: '#C1C1C1' },
        { name: '月光蓝', bg: '#F0F4F8', border: '#D6DAE0', accent: '#BCC0C6' },
        { name: '晨露绿', bg: '#F0F8F0', border: '#D6DED6', accent: '#BCC4BC' },
        { name: '樱花粉', bg: '#FFF0F5', border: '#E5D6DB', accent: '#CCBCC1' },
        { name: '薰衣草', bg: '#F5F0FF', border: '#DBD6E5', accent: '#C1BCCB' },
        { name: '浅杏色', bg: '#FFF5EE', border: '#E5DBD4', accent: '#CCC1BA' },
        { name: '浅青色', bg: '#F0FFFF', border: '#D6E5E5', accent: '#BCCBCB' },
        { name: '淡黄', bg: '#FFFACD', border: '#E5E0B3', accent: '#CCC699' },
        { name: '淡紫', bg: '#F8F0FF', border: '#DED6E5', accent: '#C4BCCB' },
        { name: '淡蓝', bg: '#F0F8FF', border: '#D6DEE5', accent: '#BCC4CB' },
        { name: '淡绿', bg: '#F5FFF0', border: '#DBE5D6', accent: '#C1CBBC' }
    ],

    // 5. 时尚流行色（12款）
    fashion: [
        { name: '珊瑚粉', bg: '#FFD4D4', border: '#FFB4B4', accent: '#FF9494' },
        { name: '薄雾灰', bg: '#E8E8E8', border: '#C8C8C8', accent: '#A8A8A8' },
        { name: '焦糖色', bg: '#F4D9C6', border: '#D4B9A6', accent: '#B49986' },
        { name: '雾蓝色', bg: '#C9D6DF', border: '#A9B6BF', accent: '#89969F' },
        { name: '浅驼色', bg: '#E8DDD1', border: '#C8BDB1', accent: '#A89D91' },
        { name: '粉紫色', bg: '#E8D4DF', border: '#C8B4BF', accent: '#A8949F' },
        { name: '浅褐色', bg: '#D4C4B7', border: '#B4A497', accent: '#948477' },
        { name: '灰绿色', bg: '#D1D8D4', border: '#B1B8B4', accent: '#919894' },
        { name: '蜜桃粉', bg: '#FFD7C4', border: '#FFB7A4', accent: '#FF9784' },
        { name: '雾松绿', bg: '#C8D8D0', border: '#A8B8B0', accent: '#889890' },
        { name: '奶茶色', bg: '#E8D4C0', border: '#C8B4A0', accent: '#A89480' },
        { name: '烟熏粉', bg: '#E5D0D8', border: '#C5B0B8', accent: '#A59098' }
    ],

    // 6. 马卡龙色系（12款）
    macaron: [
        { name: '马卡龙粉', bg: '#FFE4E1', border: '#FFC4C1', accent: '#FFA4A1' },
        { name: '马卡龙蓝', bg: '#E0F4FF', border: '#C0D4EF', accent: '#A0B4CF' },
        { name: '马卡龙黄', bg: '#FFF9E6', border: '#FFD9C6', accent: '#FFB9A6' },
        { name: '马卡龙绿', bg: '#E8F5E9', border: '#C8D5C9', accent: '#A8B5A9' },
        { name: '马卡龙紫', bg: '#F3E5F5', border: '#D3C5D5', accent: '#B3A5B5' },
        { name: '马卡龙橙', bg: '#FFF3E0', border: '#FFD3C0', accent: '#FFB3A0' },
        { name: '薄荷马卡龙', bg: '#D5F5E3', border: '#B5D5C3', accent: '#95B5A3' },
        { name: '薰衣草马卡龙', bg: '#E8DAEF', border: '#C8BACF', accent: '#A89AAF' },
        { name: '柠檬马卡龙', bg: '#FFF9C4', border: '#FFD9A4', accent: '#FFB984' },
        { name: '玫瑰马卡龙', bg: '#FADBD8', border: '#DABBB8', accent: '#BA9B98' },
        { name: '天空马卡龙', bg: '#D6EAF8', border: '#B6CAD8', accent: '#96AAB8' },
        { name: '抹茶马卡龙', bg: '#D5E8D4', border: '#B5C8B4', accent: '#95A894' }
    ],

    // 7. 日本传统色（12款）
    japanese: [
        { name: '樱色', bg: '#FEF4F4', border: '#FED4D4', accent: '#FEB4B4' },
        { name: '水浅葱', bg: '#BCE2E8', border: '#9CC2C8', accent: '#7CA2A8' },
        { name: '山吹色', bg: '#F8C471', border: '#D8A451', accent: '#B88431' },
        { name: '藤紫', bg: '#B9A6C7', border: '#9986A7', accent: '#796687' },
        { name: '珊瑚色', bg: '#F88379', border: '#D86359', accent: '#B84339' },
        { name: '鼠色', bg: '#D6D6D6', border: '#B6B6B6', accent: '#969696' },
        { name: '桃色', bg: '#F4C2C2', border: '#D4A2A2', accent: '#B48282' },
        { name: '青磁色', bg: '#98D98E', border: '#78B96E', accent: '#58994E' },
        { name: '枯草色', bg: '#E6B422', border: '#C69402', accent: '#A67400' },
        { name: '茜色', bg: '#E45E32', border: '#C43E12', accent: '#A42000' },
        { name: '白百合色', bg: '#FEFEFE', border: '#DEDEDE', accent: '#BEBEBE' },
        { name: '常盘绿', bg: '#007B43', border: '#005B23', accent: '#003B03' }
    ],

    // 8. 自然系配色（12款）
    nature: [
        { name: '森林绿', bg: '#D5E8D4', border: '#B5C8B4', accent: '#95A894' },
        { name: '湖水蓝', bg: '#D6EAF8', border: '#B6CAD8', accent: '#96AAB8' },
        { name: '沙漠黄', bg: '#F9E79F', border: '#D9C77F', accent: '#B9A75F' },
        { name: '海洋蓝', bg: '#AED6F1', border: '#8EB6D1', accent: '#6E96B1' },
        { name: '草地绿', bg: '#ABEBC6', border: '#8BCBA6', accent: '#6BAB86' },
        { name: '天空蓝', bg: '#D6EAF8', border: '#B6CAD8', accent: '#96AAB8' },
        { name: '日落橙', bg: '#F8B88B', border: '#D8986B', accent: '#B8784B' },
        { name: '雪山白', bg: '#FDFEFE', border: '#DDDEDE', accent: '#BDBEBE' },
        { name: '岩石灰', bg: '#D5DBDB', border: '#B5BBBB', accent: '#959B9B' },
        { name: '珊瑚橙', bg: '#F9C5A7', border: '#D9A587', accent: '#B98567' },
        { name: '薄荷绿', bg: '#C1F0E3', border: '#A1D0C3', accent: '#81B0A3' },
        { name: '薰衣草紫', bg: '#E8DAEF', border: '#C8BACF', accent: '#A89AAF' }
    ]
};

// ==================== 行业模板（20个）====================
const INDUSTRY_TEMPLATES = {
    // 母婴育儿（3个）
    baby: [
        {
            id: 'baby-milk',
            icon: '👶',
            name: '婴幼儿奶粉',
            desc: '奶油白背景 + 温暖配色',
            config: {
                aspectRatio: '3:4',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'default',
                bgColor: '#FFF8F0',
                borderColor: '#E8D7C3',
                borderWidth: 4,
                frameTheme: 'rounded-shadow',
                maxChars: 500
            },
            markdown: `# 婴幼儿奶粉选购指南

## 一、奶粉选择三大原则

### 1. 安全第一
选择符合国家标准的正规品牌

### 2. 营养全面
关注蛋白质、DHA、益生菌等关键营养

### 3. 适合宝宝
根据月龄和体质选择

---

## 二、如何辨别奶粉质量

**观察粉质**：细腻均匀，无结块
**闻气味**：自然乳香，无异味
**看溶解度**：温水快速溶解`
        },
        {
            id: 'baby-care',
            icon: '🍼',
            name: '宝宝护理',
            desc: '粉色系 + 温柔风格',
            config: {
                aspectRatio: '3:4',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'card',
                bgColor: '#FFF0F5',
                borderColor: '#FFC0CB',
                borderWidth: 3,
                frameTheme: 'rounded-shadow',
                maxChars: 450
            },
            markdown: `# 新生儿护理要点

## 每日护理清单

### 晨间护理
- 清洁面部和屁屁
- 检查脐带情况
- 观察大小便

### 洗澡时间
水温38-40℃，5-10分钟

### 睡前护理
换尿布、喂奶、哄睡`
        },
        {
            id: 'baby-food',
            icon: '🥣',
            name: '辅食添加',
            desc: '清新绿 + 健康感',
            config: {
                aspectRatio: '3:4',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'default',
                bgColor: '#F0F8F0',
                borderColor: '#90C695',
                borderWidth: 4,
                frameTheme: 'rounded-shadow',
                maxChars: 500
            },
            markdown: `# 6-12月龄辅食添加指南

## 6-7月龄（初期）

### 推荐食材
- 米粉、米糊
- 蔬菜泥：胡萝卜、南瓜
- 水果泥：苹果、香蕉

### 添加原则
从单一到多样，观察3-5天

---

## 8-9月龄（中期）

### 新增食材
- 肉泥：鸡肉、猪肉
- 蛋黄
- 豆腐

### 质地升级
从泥状到颗粒状`
        }
    ],

    // 科技数码（3个）
    tech: [
        {
            id: 'tech-ai',
            icon: '🤖',
            name: 'AI技术',
            desc: '科技蓝 + 未来感',
            config: {
                aspectRatio: '16:9',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'tech',
                bgColor: '#F0F4F8',
                borderColor: '#3B82F6',
                borderWidth: 2,
                frameTheme: 'minimal',
                maxChars: 600
            },
            markdown: `# AI大模型技术趋势

## 1. GPT-4o 多模态突破

文本、图像、语音统一处理

## 2. 开源模型崛起

Llama 3、Claude 3 性能逼近闭源

## 3. 端侧部署加速

AI能力下沉到手机、PC

---

## 未来展望

**AGI时代** 通用人工智能即将到来`
        },
        {
            id: 'tech-mobile',
            icon: '📱',
            name: '手机评测',
            desc: '灰白调 + 专业感',
            config: {
                aspectRatio: '4:3',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'modern',
                bgColor: '#FAFAFA',
                borderColor: '#9CA3AF',
                borderWidth: 2,
                frameTheme: 'solid-border',
                maxChars: 550
            },
            markdown: `# iPhone 16 Pro 深度评测

## 外观设计

### 钛合金材质
重量仅187g，轻盈手感

### 6.3英寸屏幕
ProMotion自适应120Hz

---

## 影像系统

### 主摄升级
4800万像素，f/1.78光圈

### 5倍潜望长焦
光学防抖加持

---

## 性能表现

A18 Pro芯片，3nm工艺
跑分240万+`
        },
        {
            id: 'tech-code',
            icon: '💻',
            name: '编程教程',
            desc: '深色主题 + 代码风',
            config: {
                aspectRatio: '16:9',
                fontFamily: "'JetBrains Mono'",
                mdTheme: 'tech',
                bgColor: '#1F2937',
                borderColor: '#10B981',
                borderWidth: 2,
                frameTheme: 'minimal',
                maxChars: 600
            },
            markdown: `# Python异步编程入门

## asyncio基础

\`\`\`python
import asyncio

async def main():
    await asyncio.sleep(1)
    print("Hello Async")

asyncio.run(main())
\`\`\`

## 并发执行任务

使用 \`gather\` 同时运行多个协程

---

## 实战案例

爬虫加速、API并发请求`
        }
    ],

    // 美食餐饮（2个）
    food: [
        {
            id: 'food-recipe',
            icon: '🍜',
            name: '菜谱教程',
            desc: '暖橙色 + 食欲感',
            config: {
                aspectRatio: '1:1',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'card',
                bgColor: '#FFF3E0',
                borderColor: '#FF9800',
                borderWidth: 3,
                frameTheme: 'solid-border',
                maxChars: 450
            },
            markdown: `# 川菜经典：麻婆豆腐

## 食材准备（2人份）

**主料**
- 嫩豆腐 400g
- 牛肉末 100g

**调料**
- 豆瓣酱 2勺
- 花椒粉 1勺
- 辣椒粉 1勺
- 葱姜蒜适量

---

## 烹饪步骤

1. 豆腐切块焯水
2. 热油炒牛肉末
3. 加豆瓣酱炒香
4. 下豆腐炖煮5分钟
5. 撒花椒粉出锅`
        },
        {
            id: 'food-review',
            icon: '🍰',
            name: '餐厅测评',
            desc: '清新绿 + 生活感',
            config: {
                aspectRatio: '3:4',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'magazine',
                bgColor: '#F0FFF0',
                borderColor: '#32CD32',
                borderWidth: 3,
                frameTheme: 'rounded-shadow',
                maxChars: 500
            },
            markdown: `# 成都网红甜品店测评

## 店铺信息

**名称**：云朵甜品工坊
**地址**：太古里B1层
**人均**：¥65

---

## 必点单品

### 云朵芝士蛋糕 ★★★★★
入口即化，奶香浓郁

### 抹茶千层 ★★★★☆
层次分明，茶香十足

---

## 环境氛围

ins风装修，拍照绝美
适合闺蜜下午茶`
        }
    ],

    // 旅行攻略（2个）
    travel: [
        {
            id: 'travel-guide',
            icon: '✈️',
            name: '城市攻略',
            desc: '天空蓝 + 清爽感',
            config: {
                aspectRatio: '4:3',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'default',
                bgColor: '#E6F7FF',
                borderColor: '#1890FF',
                borderWidth: 3,
                frameTheme: 'rounded-shadow',
                maxChars: 550
            },
            markdown: `# 成都三日游攻略

## Day 1：市区经典

**上午**
9:00 宽窄巷子
11:00 人民公园喝茶

**下午**
14:00 武侯祠
16:00 锦里古街

**晚上**
18:00 春熙路
20:00 太古里

---

## Day 2：熊猫基地

近距离观赏国宝大熊猫
建议早上8点前到达

---

## Day 3：周边游

青城山或都江堰一日游`
        },
        {
            id: 'travel-hotel',
            icon: '🏨',
            name: '酒店测评',
            desc: '金色调 + 奢华感',
            config: {
                aspectRatio: '16:9',
                fontFamily: "'Noto Serif SC'",
                mdTheme: 'serif',
                bgColor: '#FFFBF0',
                borderColor: '#D4AF37',
                borderWidth: 3,
                frameTheme: 'solid-border',
                maxChars: 600
            },
            markdown: `# 成都博舍酒店测评

## 酒店概况

**定位**：奢华精品酒店
**房间数**：100间套房
**人均**：¥2500/晚

---

## 房间体验

### 庭院套房
42平米独立庭院
传统四合院布局

### 设施配置
意大利Frette床品
Bose音响系统
智能家居控制

---

## 餐饮服务

法式餐厅、川菜馆、屋顶酒吧
米其林级别出品`
        }
    ],

    // 金融理财（2个）
    finance: [
        {
            id: 'finance-fund',
            icon: '💰',
            name: '基金投资',
            desc: '商务灰 + 专业感',
            config: {
                aspectRatio: '16:9',
                fontFamily: "'Noto Serif SC'",
                mdTheme: 'modern',
                bgColor: '#F5F5F5',
                borderColor: '#6B7280',
                borderWidth: 2,
                frameTheme: 'solid-border',
                maxChars: 600
            },
            markdown: `# 基金投资入门指南

## 一、基金类型

### 股票型基金
高风险高收益，适合激进型投资者

### 债券型基金
稳健收益，适合保守型投资者

### 混合型基金
平衡风险与收益

---

## 二、投资原则

**分散投资**
不要把鸡蛋放在一个篮子里

**长期持有**
避免频繁买卖

**定投策略**
平摊成本降低风险

---

## 三、风险提示

市场有风险，投资需谨慎`
        },
        {
            id: 'finance-stock',
            icon: '📈',
            name: '股票分析',
            desc: '红绿配色 + 专业感',
            config: {
                aspectRatio: '16:9',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'tech',
                bgColor: '#1F2937',
                borderColor: '#EF4444',
                borderWidth: 2,
                frameTheme: 'minimal',
                maxChars: 600
            },
            markdown: `# A股市场周报 2026.03.25

## 市场概况

**上证指数** 3250点 ↑ 1.2%
**深证成指** 11800点 ↑ 0.8%
**创业板指** 2450点 ↑ 1.5%

---

## 热门板块

### AI芯片 ↑↑↑
政策利好，资金流入

### 新能源车 ↑↑
销量超预期

### 医药生物 ↓
获利回吐

---

## 下周展望

关注美联储议息会议
科技板块或迎来反弹`
        }
    ],

    // 教育学习（2个）
    education: [
        {
            id: 'edu-method',
            icon: '📚',
            name: '学习方法',
            desc: '书香蓝 + 知识感',
            config: {
                aspectRatio: '3:4',
                fontFamily: "'Noto Serif SC'",
                mdTheme: 'serif',
                bgColor: '#EFF6FF',
                borderColor: '#3B82F6',
                borderWidth: 4,
                frameTheme: 'rounded-shadow',
                maxChars: 500
            },
            markdown: `# 高效学习方法论

## 一、费曼学习法

### 第一步：选择概念
确定要学习的知识点

### 第二步：讲给别人听
用简单语言解释

### 第三步：回顾反思
找出理解的薄弱环节

### 第四步：简化精炼
用类比和例子帮助理解

---

## 二、番茄工作法

25分钟专注 + 5分钟休息
4个番茄后休息15-30分钟

---

## 三、艾宾浩斯复习法

及时复习，对抗遗忘曲线`
        },
        {
            id: 'edu-exam',
            icon: '✏️',
            name: '考试技巧',
            desc: '清新绿 + 激励感',
            config: {
                aspectRatio: '3:4',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'card',
                bgColor: '#F0FFF0',
                borderColor: '#10B981',
                borderWidth: 4,
                frameTheme: 'rounded-shadow',
                maxChars: 500
            },
            markdown: `# 考试答题技巧

## 考前准备

### 物品清单
- 身份证、准考证
- 黑色签字笔3支
- 2B铅笔、橡皮
- 手表（不能用电子表）

---

## 答题策略

### 选择题
先易后难，不要留空

### 大题
分点作答，条理清晰

### 作文
拟好提纲再动笔

---

## 时间分配

留出10分钟检查
重点检查选择题和填空题`
        }
    ],

    // 健康养生（2个）
    health: [
        {
            id: 'health-fitness',
            icon: '💪',
            name: '健身指南',
            desc: '活力橙 + 运动感',
            config: {
                aspectRatio: '9:16',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'default',
                bgColor: '#FFF5E6',
                borderColor: '#FF6B35',
                borderWidth: 4,
                frameTheme: 'rounded-shadow',
                maxChars: 450
            },
            markdown: `# 新手健身计划

## 每周训练安排

### 周一：胸肌+三头
- 卧推 4组x12
- 飞鸟 3组x15
- 臂屈伸 3组x12

### 周三：背肌+二头
- 引体向上 4组x10
- 划船 4组x12
- 弯举 3组x15

### 周五：腿部+肩部
- 深蹲 5组x10
- 推举 4组x12
- 侧平举 3组x15

---

## 饮食原则

高蛋白、适量碳水、低脂肪`
        },
        {
            id: 'health-diet',
            icon: '🥗',
            name: '减脂餐',
            desc: '清新绿 + 健康感',
            config: {
                aspectRatio: '1:1',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'fresh',
                bgColor: '#F0FFF4',
                borderColor: '#34D399',
                borderWidth: 3,
                frameTheme: 'rounded-shadow',
                maxChars: 450
            },
            markdown: `# 7天减脂餐食谱

## Day 1

**早餐**
燕麦+牛奶+鸡蛋
热量：350kcal

**午餐**
鸡胸肉150g+西兰花+糙米
热量：450kcal

**晚餐**
三文鱼100g+蔬菜沙拉
热量：350kcal

---

## 减脂要点

### 热量缺口
每日摄入<消耗500kcal

### 营养配比
蛋白质40% + 碳水30% + 脂肪30%`
        }
    ],

    // 时尚美妆（2个）
    fashion: [
        {
            id: 'fashion-makeup',
            icon: '💄',
            name: '化妆教程',
            desc: '粉色系 + 少女感',
            config: {
                aspectRatio: '3:4',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'magazine',
                bgColor: '#FFF0F5',
                borderColor: '#FF69B4',
                borderWidth: 3,
                frameTheme: 'rounded-shadow',
                maxChars: 450
            },
            markdown: `# 日常淡妆教程

## 底妆步骤

### 1. 妆前护肤
水→乳→防晒→妆前乳

### 2. 粉底液
点涂后用美妆蛋晕开

### 3. 遮瑕
针对痘印、黑眼圈

### 4. 定妆
散粉轻扫T区

---

## 眼妆步骤

### 眼影
大地色打底

### 眼线
内眼线拉长

### 睫毛膏
Z字形刷2遍

---

## 唇妆

豆沙色口红，少女感满满`
        },
        {
            id: 'fashion-style',
            icon: '👗',
            name: '穿搭指南',
            desc: '时尚灰 + 高级感',
            config: {
                aspectRatio: '3:4',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'minimal',
                bgColor: '#FAFAFA',
                borderColor: '#9CA3AF',
                borderWidth: 2,
                frameTheme: 'minimal',
                maxChars: 500
            },
            markdown: `# 春季穿搭公式

## 公式1：针织衫+阔腿裤

**上装**：奶油色针织开衫
**下装**：高腰黑色阔腿裤
**鞋子**：小白鞋

**适合场景**：通勤、约会

---

## 公式2：衬衫+牛仔裤

**上装**：白衬衫
**下装**：浅蓝色直筒牛仔裤
**配饰**：帆布包

**适合场景**：休闲、逛街

---

## 配色技巧

### 经典搭配
黑白灰、蓝白、卡其+白

### 撞色搭配
红配绿、蓝配橙`
        }
    ],

    // 职场办公（2个）
    office: [
        {
            id: 'office-excel',
            icon: '📊',
            name: 'Excel技巧',
            desc: '商务蓝 + 专业感',
            config: {
                aspectRatio: '16:9',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'modern',
                bgColor: '#F0F4F8',
                borderColor: '#2563EB',
                borderWidth: 2,
                frameTheme: 'solid-border',
                maxChars: 600
            },
            markdown: `# Excel高效技巧Top 10

## 1. 快捷键必备

\`Ctrl+C/V/X\` 复制/粘贴/剪切
\`Ctrl+Z/Y\` 撤销/重做
\`Ctrl+1\` 设置单元格格式

---

## 2. 函数公式

### VLOOKUP
\`=VLOOKUP(A2,B:D,3,0)\`

### SUMIF
\`=SUMIF(A:A,"条件",B:B)\`

### IF嵌套
\`=IF(A2>90,"优秀",IF(A2>60,"及格","不及格"))\`

---

## 3. 数据透视表

插入→数据透视表
拖拽字段快速汇总`
        },
        {
            id: 'office-ppt',
            icon: '📽️',
            name: 'PPT设计',
            desc: '商务灰 + 设计感',
            config: {
                aspectRatio: '16:9',
                fontFamily: "'Noto Sans SC'",
                mdTheme: 'minimal',
                bgColor: '#F5F5F5',
                borderColor: '#6B7280',
                borderWidth: 2,
                frameTheme: 'minimal',
                maxChars: 600
            },
            markdown: `# PPT设计黄金法则

## 一、配色原则

### 60-30-10法则
主色60% + 辅色30% + 点缀色10%

### 推荐配色
- 商务：蓝白灰
- 科技：蓝黑绿
- 时尚：粉紫灰

---

## 二、排版技巧

### 对齐原则
左对齐、居中、右对齐保持一致

### 留白
页面留白≥30%

### 字体
标题+正文，最多2种字体

---

## 三、图表使用

数据用图表，避免大段文字`
        }
    ]
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FONT_LIBRARY,
        MD_THEMES,
        COLOR_SCHEMES,
        INDUSTRY_TEMPLATES
    };
}
