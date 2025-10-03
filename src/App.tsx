// Landing page app
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import appLogo from './assets/iTunesArtwork@3x.png'

function App() {
    const { t, i18n } = useTranslation()
    const rootRef = useRef<HTMLDivElement | null>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const elements = Array.from(root.querySelectorAll('.will-fade'))

        // Fallback: if IntersectionObserver is unavailable, reveal all immediately
        if (typeof window.IntersectionObserver === 'undefined') {
            elements.forEach((el) => el.classList.add('is-visible'))
            return
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible')
                    observer.unobserve(entry.target)
                }
            })
        }, { threshold: 0.01, rootMargin: '0px' })

        // Observe all elements and immediately reveal those already in viewport
        const revealIfInViewport = (el: Element) => {
            const rect = (el as HTMLElement).getBoundingClientRect()
            const inView = rect.top < window.innerHeight && rect.bottom > 0
            if (inView) (el as HTMLElement).classList.add('is-visible')
            observer.observe(el)
        }

        elements.forEach(revealIfInViewport)

        // Extra safety: check on scroll/resize in case observer misses due to layout changes
        const checkAll = () => {
            elements.forEach((el) => {
                if ((el as HTMLElement).classList.contains('is-visible')) return
                const r = (el as HTMLElement).getBoundingClientRect()
                if (r.top < window.innerHeight && r.bottom > 0) {
                    (el as HTMLElement).classList.add('is-visible')
                    observer.unobserve(el)
                }
            })
        }
        window.addEventListener('scroll', checkAll, { passive: true })
        window.addEventListener('resize', checkAll)

        // Final fallback: reveal anything left after initial layout settles
        const timeoutId = window.setTimeout(checkAll, 600)

        return () => {
            window.removeEventListener('scroll', checkAll)
            window.removeEventListener('resize', checkAll)
            window.clearTimeout(timeoutId)
            observer.disconnect()
        }
    }, [i18n.language])

    return (
        <div ref={rootRef} className="min-h-screen flex flex-col">
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
                <div className="container-default py-4 flex items-center justify-between">
                    <a href="#top" className="group flex items-center gap-3 transition-all duration-300 hover:scale-105">
                        <div className="relative">
                            <img src={appLogo} alt="EasyMap logo" className="h-10 w-10 rounded-xl shadow-lg ring-1 ring-slate-200/50 bg-white object-cover transition-all duration-300 group-hover:shadow-xl" />
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">EasyMap 夾車易</span>
                    </a>
                    
                    <div className="hidden lg:flex items-center gap-8">
                        {[
                            { href: '#problem', label: t('sections.problem') },
                            { href: '#solution', label: t('sections.solution') },
                            { href: '#business-plan', label: t('sections.businessPlan') },
                            { href: '#team', label: t('sections.team') },
                            { href: '#download', label: t('sections.download.navLabel') },
                            { href: '#contact', label: t('sections.contact') }
                        ].map((item) => (
                            <a 
                                key={item.href}
                                href={item.href} 
                                className="relative text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-300 group"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh-TW' : 'en')}
                            className="group relative px-4 py-2 text-sm font-medium text-slate-600 bg-white/70 hover:bg-white rounded-xl ring-1 ring-slate-200/50 hover:ring-slate-300/50 transition-all duration-300 hover:shadow-md"
                        >
                            <span className="relative z-10">{i18n.language === 'en' ? '繁體中文' : 'English'}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                        <a 
                            href="#contact" 
                            className="group relative hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <span className="relative z-10">{t('common.ctaContact')}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                        
                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-300"
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-b border-slate-200 shadow-lg">
                    <div className="container-default py-4">
                        <div className="flex flex-col space-y-3">
                            {/* Language Toggle */}
                            <button
                                onClick={() => {
                                    i18n.changeLanguage(i18n.language === 'en' ? 'zh-TW' : 'en')
                                    setIsMobileMenuOpen(false)
                                }}
                                className="flex items-center justify-between px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200"
                            >
                                <span>{i18n.language === 'en' ? '繁體中文' : 'English'}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                </svg>
                            </button>
                            
                            {/* Contact Button */}
                            <a 
                                href="#contact" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                {t('common.ctaContact')}
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <header className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
                {/* Abstract Background Elements */}
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15)_0%,_transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(139,195,74,0.1)_0%,_transparent_50%)]" />
                
                {/* Floating Abstract Shapes */}
                <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-blue-400 to-purple-500 animate-float-slow" />
                <div className="pointer-events-none absolute top-1/3 -left-16 h-64 w-64 rounded-full blur-2xl opacity-20 bg-gradient-to-br from-emerald-400 to-teal-500 animate-float-slow" style={{animationDelay: '2s'}} />
                <div className="pointer-events-none absolute bottom-0 right-1/4 h-48 w-48 rounded-full blur-xl opacity-25 bg-gradient-to-tl from-amber-400 to-orange-500 animate-float-slow" style={{animationDelay: '4s'}} />
                
                {/* Wave Shapes */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
                <svg className="absolute bottom-0 left-0 w-full h-24 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
                </svg>

				<div className="container-default relative py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-12 max-w-4xl will-fade is-visible mx-auto text-center">
                            {/* Brand Logo and Name */}
                            <div className="flex flex-col items-center justify-center mb-8">
                                <img 
                                    src={appLogo} 
                                    alt="EasyMap 夾車易 logo" 
                                    className="h-20 w-20 sm:h-24 sm:w-24 mb-4 mx-auto" 
                                />
                                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent text-center">
                                    EasyMap 夾車易
                                </h2>
                            </div>
                            
							<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 text-balance leading-tight text-center">
                                <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                                    {t('common.heroTitle')}
                                </span>
                            </h1>
							<p className="mt-6 text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto text-center">{t('common.heroSubtitle')}</p>
                            

                            <div className="mt-10 flex flex-wrap justify-center items-center gap-4 will-fade">
                                <a className="group inline-flex items-center justify-center rounded-xl px-8 py-4 text-white font-semibold shadow-lg focus:outline-none focus:ring-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5" href="#contact">
                                    {t('common.ctaContact')}
                                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </a>
                                <a className="inline-flex items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm px-8 py-4 text-slate-700 font-semibold ring-1 ring-slate-200/50 hover:ring-slate-300/50 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md" href="#solution">
                                    {t('common.ctaLearnMore')}
                                </a>
							</div>
                        </div>
                    </div>
				</div>
			</header>
            <div className="section-divider" />

            <section id="problem" className="relative py-20 sm:py-24 will-fade">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-orange-50/20 to-amber-50/30" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-200/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-orange-200/10 to-transparent rounded-full blur-3xl" />
                
                <div className="container-default relative">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">{t('sections.problem')}</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">{t('sections.problemSubtitle')}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: '🚗', title: t('sections.cards.congestion.title'), desc: t('sections.cards.congestion.desc'), color: 'red', metric: '40%', metricLabel: t('sections.ui.metrics.trafficIncrease') },
                            { icon: '💰', title: t('sections.cards.cost.title'), desc: t('sections.cards.cost.desc'), color: 'orange', metric: 'HK$2.5K', metricLabel: t('sections.ui.metrics.monthlyCost') },
                            { icon: '⏱', title: t('sections.cards.commute.title'), desc: t('sections.cards.commute.desc'), color: 'amber', metric: '45min', metricLabel: t('sections.ui.metrics.avgCommute') },
                            { icon: '🌍', title: t('sections.cards.environment.title'), desc: t('sections.cards.environment.desc'), color: 'emerald', metric: '2.1T', metricLabel: t('sections.ui.metrics.co2Annual') },
                        ].map((item) => (
                            <div key={item.title} className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl ring-1 ring-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 will-fade">
                                    {/* Icon with gradient background */}
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <span className="text-2xl">{item.icon}</span>
                                    </div>
                                    
                                    
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
			</section>
            <div className="section-divider" />

            <section id="solution" className="relative py-20 sm:py-24 will-fade">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 via-emerald-50/30 to-teal-50/40" />
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-200/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-emerald-200/10 to-transparent rounded-full blur-3xl" />
                
                {/* Cloud-like shapes */}
                <div className="absolute top-1/4 right-1/4 w-32 h-16 bg-white/20 rounded-full blur-xl" />
                <div className="absolute bottom-1/3 left-1/3 w-24 h-12 bg-white/15 rounded-full blur-lg" />
                
                <div className="container-default relative">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">{t('sections.solution')}</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">{t('sections.solutionDesc')}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { feature: String(t('sections.features.f1')), color: 'blue' },
                            { feature: String(t('sections.features.f2')), color: 'emerald' },
                            { feature: String(t('sections.features.f3')), color: 'purple' },
                            { feature: String(t('sections.features.f4')), color: 'teal' },
                        ].map((item) => (
                            <div key={item.feature} className="group relative">
                                <div className={`absolute -inset-1 bg-gradient-to-r from-${item.color}-600 to-${item.color}-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300`} />
                                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl ring-1 ring-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 will-fade">
                                    <p className="text-lg font-semibold text-slate-900 leading-relaxed">{item.feature}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
			</section>
            <div className="section-divider" />

            <section id="business-plan" className="relative py-20 sm:py-24 will-fade">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-200/10 to-transparent rounded-full blur-3xl" />
                
                <div className="container-default relative">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">{t('sections.businessPlan')}</h2>
                    </div>
                    
                    {/* Vision & Mission Dashboard */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                            <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl ring-1 ring-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                        <span className="text-2xl">🎯</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">{t('sections.vision')}</h3>
                                </div>
                                <p className="text-slate-600 leading-relaxed text-lg">{t('sections.visionDesc')}</p>
                                
                                {/* Vision Metrics */}
                                <div className="mt-6 grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">100%</div>
                                        <div className="text-xs text-slate-500">Eco-Friendly</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                                        <div className="text-xs text-slate-500">Available</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">∞</div>
                                        <div className="text-xs text-slate-500">Scalable</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                            <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl ring-1 ring-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                                        <span className="text-2xl">🚀</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">{t('sections.mission')}</h3>
                                </div>
                                <p className="text-slate-600 leading-relaxed text-lg">{t('sections.missionDesc')}</p>
                                
                                {/* Mission Progress */}
                                <div className="mt-6">
                                        <div className="flex justify-between text-sm text-slate-500 mb-2">
                                            <span>{t('sections.ui.metrics.progress')}</span>
                                            <span>25%</span>
                                        </div>
                                    <div className="w-full bg-slate-100 rounded-full h-3">
                                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full w-1/4 transition-all duration-1000" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Business Model Dashboard */}
                    <div className="mb-16">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">{t('sections.businessModel')}</h3>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('sections.ui.descriptions.twoPhaseApproach')}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Phase 1 */}
                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl ring-1 ring-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                                            <span className="text-xl font-bold text-green-700">1</span>
                                        </div>
                                        <div>
                                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 mb-1">
                                                {t('sections.ui.labels.phase1')}
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-900">{t('sections.phase1')}</h4>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <div className="text-sm font-semibold text-green-600 mb-1">{t('sections.ui.labels.focus')}</div>
                                            <p className="text-slate-700">{t('sections.phase1Focus')}</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <div className="text-sm font-semibold text-green-600 mb-1">{t('sections.ui.labels.monetization')}</div>
                                            <p className="text-slate-700">{t('sections.phase1Monetization')}</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <div className="text-sm font-semibold text-green-600 mb-1">{t('sections.ui.labels.strategy')}</div>
                                            <p className="text-slate-700">{t('sections.phase1Strategy')}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Phase 1 Metrics */}
                                    <div className="mt-6 grid grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-green-600">0-6M</div>
                                        <div className="text-xs text-slate-500">{t('sections.ui.metrics.timeline')}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-green-600">HK$50K</div>
                                        <div className="text-xs text-slate-500">{t('sections.ui.metrics.investment')}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-green-600">1K+</div>
                                        <div className="text-xs text-slate-500">{t('sections.ui.metrics.users')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 2 */}
                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl ring-1 ring-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                            <span className="text-xl font-bold text-blue-700">2</span>
                                        </div>
                                        <div>
                                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 mb-1">
                                                {t('sections.ui.labels.phase2')}
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-900">{t('sections.phase2')}</h4>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <div className="text-sm font-semibold text-blue-600 mb-1">{t('sections.ui.labels.monetization')}</div>
                                            <p className="text-slate-700">{t('sections.phase2Monetization')}</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <div className="text-sm font-semibold text-blue-600 mb-1">{t('sections.ui.labels.marketPotential')}</div>
                                            <p className="text-slate-700">{t('sections.phase2Market')}</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <div className="text-sm font-semibold text-blue-600 mb-1">{t('sections.ui.labels.targetExpansion')}</div>
                                            <p className="text-slate-700">{t('sections.phase2Target')} • {t('sections.phase2Expansion')}</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <div className="text-sm font-semibold text-blue-600 mb-1">{t('sections.ui.labels.futureTech')}</div>
                                            <p className="text-slate-700">{t('sections.phase2Tech')}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Phase 2 Metrics */}
                                    <div className="mt-6 grid grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-blue-600">6-18M</div>
                                        <div className="text-xs text-slate-500">{t('sections.ui.metrics.timeline')}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-blue-600">HK$500K</div>
                                        <div className="text-xs text-slate-500">{t('sections.ui.metrics.investment')}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-blue-600">50K+</div>
                                        <div className="text-xs text-slate-500">{t('sections.ui.metrics.users')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* B2B Extension */}
                    <div className="mb-16">
                        <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                            <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl ring-1 ring-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                                        <span className="text-xl font-bold text-purple-700">B2B</span>
                                    </div>
                                    <div>
                                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 mb-1">
                                            {t('sections.ui.labels.enterprise')}
                                        </div>
                                        <h4 className="text-2xl font-bold text-slate-900">{t('sections.b2bExtension')}</h4>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-slate-50 rounded-xl p-6">
                                        <div className="text-sm font-semibold text-purple-600 mb-2">{t('sections.ui.labels.partnerships')}</div>
                                        <p className="text-slate-700">{t('sections.b2bPartnerships')}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-6">
                                        <div className="text-sm font-semibold text-purple-600 mb-2">{t('sections.ui.labels.benefits')}</div>
                                        <p className="text-slate-700">{t('sections.b2bBenefits')}</p>
                                    </div>
                                </div>
                                
                                {/* B2B Metrics */}
                                <div className="mt-6 grid grid-cols-4 gap-4">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-purple-600">500+</div>
                                        <div className="text-xs text-slate-500">{t('sections.ui.metrics.companies')}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-purple-600">HK$2M</div>
                                        <div className="text-xs text-slate-500">{t('sections.ui.metrics.revenue')}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-purple-600">95%</div>
                                        <div className="text-xs text-slate-500">{t('sections.ui.metrics.satisfaction')}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-purple-600">24/7</div>
                                        <div className="text-xs text-slate-500">{t('sections.ui.metrics.support')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Market Strategy Dashboard */}
                    <div className="mb-16">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">{t('sections.marketStrategy')}</h3>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('sections.marketStrategySubtitle')}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl ring-1 ring-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                                            <span className="text-2xl">🎯</span>
                                        </div>
                                        <h4 className="text-2xl font-bold text-slate-900">{t('sections.targetMarket')}</h4>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                                            <div className="text-sm font-semibold text-blue-600 mb-2">Primary (B2C)</div>
                                            <p className="text-slate-700">{t('sections.primaryMarket')}</p>
                                        </div>
                                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
                                            <div className="text-sm font-semibold text-purple-600 mb-2">Secondary (B2B)</div>
                                            <p className="text-slate-700">{t('sections.secondaryMarket')}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Market Size Chart */}
                                    <div className="mt-6">
                                        <div className="text-sm font-semibold text-slate-700 mb-3">{t('sections.ui.marketStrategy.marketSize')}</div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs text-slate-500">
                                                <span>B2C Market</span>
                                                <span>75%</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full w-3/4" />
                                            </div>
                                            <div className="flex justify-between text-xs text-slate-500">
                                                <span>B2B Market</span>
                                                <span>25%</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full w-1/4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl ring-1 ring-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                                            <span className="text-2xl">📈</span>
                                        </div>
                                        <h4 className="text-2xl font-bold text-slate-900">{t('sections.goToMarket')}</h4>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
                                            <div className="text-sm font-semibold text-green-600 mb-2">{t('sections.ui.marketStrategy.phase1Strategy')}</div>
                                            <p className="text-slate-700">{t('sections.goToMarketPhase1')}</p>
                                        </div>
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                                            <div className="text-sm font-semibold text-blue-600 mb-2">{t('sections.ui.marketStrategy.phase2Strategy')}</div>
                                            <p className="text-slate-700">{t('sections.goToMarketPhase2')}</p>
                                        </div>
                                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
                                            <div className="text-sm font-semibold text-purple-600 mb-2">{t('sections.ui.labels.brandPositioning')}</div>
                                            <p className="text-slate-700">{t('sections.brandPositioning')}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Growth Metrics */}
                                    <div className="mt-6 grid grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-teal-600">150%</div>
                                            <div className="text-xs text-slate-500">YoY Growth</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-teal-600">3M</div>
                                        <div className="text-xs text-slate-500">{t('sections.ui.metrics.usersTarget')}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-teal-600">HK$10M</div>
                                        <div className="text-xs text-slate-500">{t('sections.ui.metrics.revenueGoal')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Financial Dashboard */}
                    <div className="mb-16">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">{t('sections.financials')}</h3>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('sections.ui.descriptions.comprehensiveFinancials')}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl ring-1 ring-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                                            <span className="text-2xl">💰</span>
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900">{t('sections.estimatedCosts')}</h4>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <div className="text-sm font-semibold text-red-600 mb-1">{t('sections.ui.labels.development')}</div>
                                            <p className="text-slate-700">{t('sections.developmentCost')}</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <div className="text-sm font-semibold text-red-600 mb-1">{t('sections.ui.labels.operations')}</div>
                                            <p className="text-slate-700">{t('sections.operationsCost')}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Cost Breakdown Chart */}
                                    <div className="mt-6">
                                        <div className="text-sm font-semibold text-slate-700 mb-3">{t('sections.ui.labels.costDistribution')}</div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs text-slate-500">
                                                <span>{t('sections.ui.labels.development')}</span>
                                                <span>60%</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full w-3/5" />
                                            </div>
                                            <div className="flex justify-between text-xs text-slate-500">
                                                <span>{t('sections.ui.labels.operations')}</span>
                                                <span>40%</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-pink-500 to-pink-400 h-2 rounded-full w-2/5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl ring-1 ring-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                                            <span className="text-2xl">📊</span>
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900">{t('sections.revenueStreams')}</h4>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <div className="text-sm font-semibold text-green-600 mb-1">{t('sections.ui.labels.phase1Revenue')}</div>
                                            <p className="text-slate-700">{t('sections.revenuePhase1')}</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <div className="text-sm font-semibold text-green-600 mb-1">{t('sections.ui.labels.phase2Revenue')}</div>
                                            <p className="text-slate-700">{t('sections.revenuePhase2')}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Revenue Growth Chart */}
                                    <div className="mt-6">
                                        <div className="text-sm font-semibold text-slate-700 mb-3">{t('sections.ui.metrics.growthProjection')}</div>
                                        <div className="h-20 bg-slate-50 rounded-xl p-3">
                                            <div className="h-full flex items-end justify-between gap-1">
                                                {[30, 45, 65, 85, 95].map((height, i) => (
                                                    <div key={i} className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t-md" style={{height: `${height}%`}} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-500 text-center mt-2">{t('sections.ui.metrics.fiveYearRevenueGrowth')}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl ring-1 ring-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                            <span className="text-2xl">🎯</span>
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900">{t('sections.projection')}</h4>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <div className="text-sm font-semibold text-blue-600 mb-1">{t('sections.ui.labels.marketSales')}</div>
                                            <p className="text-slate-700">{t('sections.marketSales')}</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <div className="text-sm font-semibold text-blue-600 mb-1">{t('sections.ui.labels.targetShare')}</div>
                                            <p className="text-slate-700">{t('sections.targetShare')}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Key Financial Metric */}
                                    <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">{t('sections.revenue')}</div>
                                        <div className="text-sm text-slate-600">{t('sections.ui.metrics.projectedAnnualRevenue')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Exit Strategy */}
                    <div className="mb-16">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">{t('sections.exitStrategy')}</h3>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('sections.ui.descriptions.multiplePathways')}</p>
                        </div>
                        
                        <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                            <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl ring-1 ring-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
                                        <span className="text-2xl">🚀</span>
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-900">{t('sections.ui.labels.strategicExitOptions')}</h4>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                                            <div className="text-sm font-semibold text-blue-600 mb-2">{t('sections.ui.labels.acquisition')}</div>
                                            <p className="text-slate-700">{t('sections.exitAcquisition')}</p>
                                        </div>
                                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
                                            <div className="text-sm font-semibold text-purple-600 mb-2">{t('sections.ui.labels.corporatePartnership')}</div>
                                            <p className="text-slate-700">{t('sections.exitCorporate')}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
                                            <div className="text-sm font-semibold text-green-600 mb-2">{t('sections.ui.labels.ipo')}</div>
                                            <p className="text-slate-700">{t('sections.exitIpo')}</p>
                                        </div>
                                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
                                            <div className="text-sm font-semibold text-orange-600 mb-2">{t('sections.ui.labels.strategicPartnerships')}</div>
                                            <p className="text-slate-700">{t('sections.exitPartnerships')}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Exit Timeline */}
                                <div className="mt-8">
                                    <div className="text-sm font-semibold text-slate-700 mb-4">{t('sections.ui.metrics.exitTimeline')}</div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-center">
                                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">1</div>
                                            <div className="text-xs text-slate-500 mt-2">{t('sections.ui.metrics.year1to2')}</div>
                                        </div>
                                        <div className="flex-1 h-0.5 bg-slate-200 mx-4"></div>
                                        <div className="text-center">
                                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">2</div>
                                            <div className="text-xs text-slate-500 mt-2">{t('sections.ui.metrics.year3to4')}</div>
                                        </div>
                                        <div className="flex-1 h-0.5 bg-slate-200 mx-4"></div>
                                        <div className="text-center">
                                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">3</div>
                                            <div className="text-xs text-slate-500 mt-2">{t('sections.ui.metrics.year5plus')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
			</section>
            <div className="section-divider" />

            <section id="team" className="relative py-20 sm:py-24 will-fade">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-200/10 to-transparent rounded-full blur-3xl" />
                
                <div className="container-default relative">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">{t('sections.team')}</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">{t('sections.ui.descriptions.teamIntro')}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {[
                            { 
                                name: 'Kelvin Lam', 
                                role: 'Technical Lead (Full Stack Developer)', 
                                img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop', 
                                linkedin: 'https://www.linkedin.com/in/tat-yin-lam-87bb351ab/', 
                                bio: 'Kelvin is an experienced full-stack engineer with hands-on expertise in frontend, backend, and DevOps. He has developed and deployed enterprise-grade systems in the insurance industry, working across React.js, Spring Boot, SQL, Docker, Kubernetes, and Jenkins. At Blue Insurance and during his secondment at FTLife, he built secure APIs, integrated CI/CD pipelines, and led full-stack system development. He is skilled in agile delivery, observability tools, and system scalability, and has successfully launched apps and optimized performance monitoring across distributed services.',
                                contrib: 'As Technical Lead, Kelvin will oversee end-to-end development of the carpool app with a robust, scalable architecture. He will build the web frontend in React.js, develop backend services with Spring Boot for authentication, ride matching, and real-time processing, and manage SQL integrations for profiles and trips. He will also deliver Flutter apps for Android and iOS, and set up DevOps with Docker, Kubernetes, and Jenkins for CI/CD and monitoring—enabling rapid iteration on geolocation, push notifications, and secure APIs to ensure privacy, compliance, and scalable growth from MVP to high-traffic operations.',
                                color: 'blue'
                            },
                            { 
                                name: 'Timothy Wong', 
                                role: 'Operations & Compliance Lead (Project Manager)', 
                                img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop', 
                                linkedin: 'https://www.linkedin.com/in/timothywong0816/', 
                                bio: 'Timothy is a Project Manager with a proven record in financial services, retirement projects, and regulatory compliance. At Manulife, he led large-scale initiatives such as the ORSO administration partnership and new product launches in Macau, reporting to top management. He has managed cross-company standardization projects, coordinated with regulators, and optimized processes for both frontend and backend solutions. With certifications including Professional Scrum Master I and Certified Software Tester, Timothy brings strong expertise in agile project management, compliance, and multi-stakeholder coordination.',
                                contrib: 'As Operations & Compliance Lead, Timothy will manage timeline, resources, and stakeholder communications for on-time delivery. He will apply agile practices to coordinate sprints across development, testing, and iteration, ensuring adherence to data protection laws, transportation regulations, and insurance requirements. He will partner with authorities and vendors for background checks and payments, and optimize operations like onboarding, dispute resolution, and maintenance to scale smoothly from MVP to market rollout with minimized risk.',
                                color: 'emerald'
                            },
                            { 
                                name: 'Vincent Tse', 
                                role: 'Business & Analytics Lead (Index Review Assistant Manager)', 
                                img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', 
                                linkedin: 'https://www.linkedin.com/in/vincent-tse-54b65b176/', 
                                bio: 'Vincent specializes in data analytics, automation, and financial modeling. At Hang Seng Indexes, he managed reviews of 100+ market, sector, and ESG indexes, handling datasets with millions of rows and automations that reduced processing time by 80%. He executed index rebalancing for products linked to US$65B AUM. Previously at Equinix (Fortune 500), he supported M&A worth over US$180M and built financial models for regional expansion. His Python, SQL, and finance blend powers data-driven strategy and insights.',
                                contrib: 'As Business & Analytics Lead, Vincent will drive data-informed decisions to refine the business model and UX. Using Python and SQL, he will analyze usage patterns, forecast demand, and automate metrics reporting to surface opportunities like dynamic pricing and route optimization. He will build revenue models (e.g., premium features, ads), conduct market sizing, and integrate ESG metrics (e.g., carbon savings). His large-scale data experience supports AI-driven matching, while his M&A background informs partnerships, funding, and expansion.',
                                color: 'purple'
                            },
                        ].map((member) => {
                            const gradientClass = member.color === 'blue' ? 'from-blue-600 to-blue-500' : 
                                                member.color === 'emerald' ? 'from-emerald-600 to-emerald-500' : 
                                                'from-purple-600 to-purple-500';
                            
                            return (
                            <div key={member.name} className="group relative">
                                <div className={`absolute -inset-1 bg-gradient-to-r ${gradientClass} rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300`} />
                                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl ring-1 ring-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 will-fade">
                                    {/* Profile Header */}
                                    <div className="flex items-start justify-between gap-4 mb-6">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                                            <p className="text-sm font-medium text-slate-600">{member.role}</p>
                                        </div>
                                        <a 
                                            href={member.linkedin} 
                                            aria-label={`${member.name} LinkedIn`} 
                                            className="group/link inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            <svg className="w-4 h-4 group-hover/link:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </a>
                                    </div>
                                    
                                    {/* Bio Section */}
                                    <div className="space-y-4">
                                        <div className="bg-slate-50/80 rounded-xl p-4">
                                            <div className="text-sm font-semibold text-slate-700 mb-2">{t('sections.ui.labels.background')}</div>
                                            <p className="text-sm text-slate-600 leading-relaxed">{member.bio}</p>
                                        </div>
                                        
                                        <div className="bg-slate-50/80 rounded-xl p-4">
                                            <div className="text-sm font-semibold text-slate-700 mb-2">{t('sections.ui.labels.roleContributions')}</div>
                                            <p className="text-sm text-slate-600 leading-relaxed">{member.contrib}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Expertise Tags */}
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {member.color === 'blue' && ['React.js', 'Spring Boot', 'DevOps', 'Kubernetes'].map((skill) => (
                                            <span key={skill} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                {skill}
                                            </span>
                                        ))}
                                        {member.color === 'emerald' && ['Project Management', 'Compliance', 'Agile', 'Stakeholder Coordination'].map((skill) => (
                                            <span key={skill} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                                {skill}
                                            </span>
                                        ))}
                                        {member.color === 'purple' && ['Data Analytics', 'Python', 'Financial Modeling', 'ESG Metrics'].map((skill) => (
                                            <span key={skill} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <div className="section-divider" />

            <section id="download" className="relative py-20 sm:py-24 will-fade">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 via-emerald-50/30 to-teal-50/40" />
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-200/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-emerald-200/10 to-transparent rounded-full blur-3xl" />
                
                <div className="container-default relative">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">{t('sections.download.title')}</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">{t('sections.download.subtitle')}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Download Buttons */}
                        <div className="space-y-8 will-fade">
                            {/* Android APK Download */}
                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl ring-1 ring-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.0589 13.8533 7.8505 12 7.8505s-3.5902.2084-5.1367.5968L4.841 4.9444a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900">{t('sections.ui.labels.android')}</h3>
                                            <p className="text-slate-600">{t('sections.download.apkDesc')}</p>
                                        </div>
                                    </div>
                                    
                                    <a 
                                        href="/app-release.apk" 
                                        download="EasyMap-夾車易.apk"
                                        className="group/btn inline-flex items-center justify-center w-full px-8 py-4 text-white font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        <svg className="w-5 h-5 mr-3 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.0589 13.8533 7.8505 12 7.8505s-3.5902.2084-5.1367.5968L4.841 4.9444a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
                                        </svg>
                                        {t('sections.download.apkButton')}
                                        <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* iOS App Store Coming Soon */}
                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-slate-400 to-slate-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl ring-1 ring-slate-200/50 shadow-lg opacity-75">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900">{t('sections.ui.labels.ios')}</h3>
                                            <p className="text-slate-600">{t('sections.download.appStoreDesc')}</p>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        disabled
                                        className="inline-flex items-center justify-center w-full px-8 py-4 text-slate-400 font-semibold bg-slate-100 rounded-xl cursor-not-allowed"
                                    >
                                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                        </svg>
                                        {t('sections.download.appStoreComingSoon')}
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Features Preview */}
                        <div className="will-fade">
                            <div className="relative">
                                <div className="absolute -inset-6 bg-gradient-to-tr from-green-400/20 via-emerald-500/20 to-teal-400/20 blur-3xl rounded-3xl" />
                                <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl ring-1 ring-slate-200/50 shadow-2xl">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('sections.ui.labels.appFeatures')}</h3>
                                    
                                    <div className="space-y-4">
                                        {[
                                            { feature: t('sections.download.downloadFeatures.f1'), icon: '🚀', color: 'blue' },
                                            { feature: t('sections.download.downloadFeatures.f2'), icon: '🛡️', color: 'emerald' },
                                            { feature: t('sections.download.downloadFeatures.f3'), icon: '💰', color: 'purple' },
                                            { feature: t('sections.download.downloadFeatures.f4'), icon: '⭐', color: 'amber' },
                                        ].map((item) => (
                                            <div key={item.feature} className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-xl">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 flex items-center justify-center`}>
                                                    <span className="text-xl">{item.icon}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-slate-900">{item.feature}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer id="contact" className="bg-slate-950 text-slate-100 will-fade">
				<div className="container-default py-16">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
						<div>
							<h3 className="text-xl font-semibold">{t('sections.contact')}</h3>
					<p className="mt-2 text-slate-300">
						{t('sections.contactSubtitle')}
						<a href="mailto:kelvinlamtatyin@gmail.com" className="underline text-white ml-1">kelvinlamtatyin@gmail.com</a>
					</p>
						</div>
						<div className="flex flex-col justify-between">
							<div>
								<p className="text-2xl font-bold">{t('sections.footer.tagline')}</p>
								<p className="mt-2 text-slate-300">{t('sections.footer.desc')}</p>
							</div>
							<p className="mt-10 text-sm text-slate-400">{t('sections.footer.rights')}</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default App
