import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  'zh-TW': {
    translation: {
      common: {
        tagline: '香港 · 共乘',
        heroTitle: '革新香港的城市出行',
        heroSubtitle: '更實惠．更可持續．以社群為本的共乘',
        ctaContact: '聯絡我們',
        ctaLearnMore: '了解更多',
      },
      sections: {
        problem: '痛點問題',
        problemSubtitle: '我們所解決的痛點',
        solution: '解決方案',
        solutionDesc: '一個以社群為先的共乘平台，連接同路的車主與乘客。',
        features: {
          f1: 'AI 路線配對',
          f2: '已驗證檔案與透明評分',
          f3: '加密內置聊天',
          f4: '靈活的分攤模式',
        },
        vmp: '願景 / 使命 / 定位',
        vision: '願景',
        visionDesc:
          '讓共享通勤成為香港的出行首選，打造可持續、實惠、以社群為本的交通生態。',
        mission: '使命',
        missionDesc:
          '提供 B2C 數碼平台，帶來安全、靈活、可分攤費用的行程，減少擠塞、降低排放，提升所有通勤者的可達性。',
        positioning: '市場定位',
        positioningBullets: {
          b1: '比商業叫車（Uber、滴滴）更實惠',
          b2: '比公共交通更靈活',
          b3: '比非正式的共乘群組更安全可靠',
          b4: '與企業／大學／市政合作的 B2B 規模化 ESG 通勤方案',
        },
        highlights: '業務亮點',
        roadmap: '路線圖時間線',
        phase1: '第一階段（修例前）',
        phase1Desc: '搶佔市場份額，透過應用內廣告覆蓋成本。',
        phase2: '第二階段（修例後）',
        phase2Desc: '每程 15% 服務費、會員制度、ESG 報告、物聯網與區塊鏈整合。',
        financial: '財務概覽',
        market1: '香港叫車市場：約 9 億港元／年',
        market2: '目標 50% 份額 → 約 1.35 億港元收入',
        team: '團隊',
        contact: '聯絡我們',
        contactSubtitle: '如需查詢，請電郵至：',
        form: {
          name: '姓名',
          email: '電郵',
          message: '訊息',
          submit: '發送訊息',
        },
        footer: {
          tagline: 'EasyMap 夾車易',
          desc: '為香港提供更實惠、可持續、以社群為本的共乘方案。',
          rights: '© EasyMap 夾車易 2025 版權所有',
        },
        cards: {
          congestion: {
            title: '交通擠塞',
            desc: '道路容量有限卻有過多車輛，導致每日塞車。',
          },
          cost: {
            title: '交通成本高',
            desc: '對日常通勤者而言，叫車服務費用過高。',
          },
          commute: {
            title: '通勤時間長',
            desc: '非市區家庭需要多次轉乘，耗時甚多。',
          },
          environment: {
            title: '環境影響',
            desc: '私家車增加排放，加劇空氣污染。',
          },
        },
      },
    },
  },
  en: {
    translation: {
      common: {
        tagline: 'Hong Kong · Carpooling',
        heroTitle: 'Revolutionizing Urban Mobility in Hong Kong',
        heroSubtitle: 'Affordable. Sustainable. Community-Driven Carpooling.',
        ctaContact: 'Get in touch',
        ctaLearnMore: 'Learn more',
      },
      sections: {
        problem: 'Problem',
        problemSubtitle: 'Pain points we address',
        solution: 'Our Solution',
        solutionDesc:
          'A community-first carpooling platform that connects drivers and passengers traveling in the same direction.',
        features: {
          f1: 'AI-powered route matching',
          f2: 'Verified profiles & transparent ratings',
          f3: 'Encrypted in-app chat',
          f4: 'Flexible cost-sharing model',
        },
        vmp: 'Vision / Mission / Positioning',
        vision: 'Vision',
        visionDesc:
          'To make shared commuting the default choice in Hong Kong, creating a sustainable, affordable, and community-driven transport ecosystem.',
        mission: 'Mission',
        missionDesc:
          'To provide a B2C digital platform that delivers safe, flexible, and cost-sharing journeys, reducing congestion, cutting emissions, and improving accessibility for all commuters.',
        positioning: 'Positioning',
        positioningBullets: {
          b1: 'More affordable than commercial ride-hailing (Uber, DiDi)',
          b2: 'More flexible than public transport',
          b3: 'Safer and more reliable than informal carpooling groups',
          b4: 'Scalable B2B opportunities with corporates, universities, and municipalities for ESG-aligned commuting',
        },
        highlights: 'Business Highlights',
        roadmap: 'Roadmap Timeline',
        phase1: 'Phase 1 (Pre-Ride-Hailing Amendment)',
        phase1Desc: 'Capture market share, cover costs via in-app ads.',
        phase2: 'Phase 2 (Post-Amendment)',
        phase2Desc:
          'Service fee of 15% per ride, loyalty system, ESG reporting, IoT & blockchain integration.',
        financial: 'Financial Snapshot',
        market1: 'Hong Kong ride-hailing market: ~HK$900M annually',
        market2: 'Target 50% share → ~HK$135M projected revenue',
        team: 'Team',
        contact: 'Contact Us',
        contactSubtitle: 'Contact us via email:',
        form: {
          name: 'Name',
          email: 'Email',
          message: 'Message',
          submit: 'Send Message',
        },
        footer: {
          tagline: 'EasyMap 夾車易',
          desc: 'Affordable, sustainable, and community-driven carpooling for Hong Kong.',
          rights: '© EasyMap 夾車易 2025. All Rights Reserved.',
        },
        cards: {
          congestion: {
            title: 'Traffic Congestion',
            desc: 'Too many cars on limited roads, causing daily jams.',
          },
          cost: {
            title: 'High Transport Costs',
            desc: 'Ride-hailing services are too expensive for everyday commuters.',
          },
          commute: {
            title: 'Long Commutes',
            desc: 'Families in non-urban areas face multiple transfers and wasted time.',
          },
          environment: {
            title: 'Environmental Impact',
            desc: 'Private vehicles increase emissions and worsen air quality.',
          },
        },
      },
    },
  },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['zh-TW', 'en'],
    interpolation: { escapeValue: false },
    detection: {
      // Ensure default is English unless explicitly set via URL or localStorage
      order: ['querystring', 'localStorage'],
      lookupQuerystring: 'lng',
      caches: ['localStorage'],
    },
  })

export default i18n

