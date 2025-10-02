// Landing page app
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import appLogo from './assets/iTunesArtwork@3x.png'

function App() {
    const { t, i18n } = useTranslation()
    const rootRef = useRef<HTMLDivElement | null>(null)

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
            <nav className="sticky top-0 z-40 nav-glass">
                <div className="container-default py-3 flex items-center justify-between">
                    <a href="#top" className="flex items-center gap-3">
                        <img src={appLogo} alt="EasyMap logo" className="h-8 w-8 rounded-md shadow-sm ring-1 ring-slate-200 bg-white object-cover" />
                        <span className="text-slate-900 font-semibold">EasyMap</span>
                    </a>
                    <div className="hidden md:flex items-center gap-6 text-sm text-slate-700">
                        <a href="#problem" className="hover:text-slate-900">{t('sections.problem')}</a>
                        <a href="#solution" className="hover:text-slate-900">{t('sections.solution')}</a>
                        <a href="#team" className="hover:text-slate-900">{t('sections.team')}</a>
                        <a href="#contact" className="hover:text-slate-900">{t('sections.contact')}</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh-TW' : 'en')}
                            className="rounded-md px-3 py-1 text-sm ring-1 ring-slate-300 bg-white/70 hover:bg-white"
                        >
                            {i18n.language === 'en' ? '繁體中文' : 'English'}
                        </button>
                        <a href="#contact" className="hidden sm:inline-flex items-center justify-center rounded-md px-3 py-1.5 text-white font-medium bg-[var(--brand-600)] hover:bg-[var(--brand-700)] ring-1 ring-[color-mix(in_srgb,var(--brand-600),transparent)]">{t('common.ctaContact')}</a>
                    </div>
                </div>
            </nav>

            <header className="relative overflow-hidden bg-gradient-to-br from-[var(--brand-50)] via-white to-[var(--brand-100)]">
                <div className="absolute inset-0 bg-grid opacity-60" />
                <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_0%,_color-mix(in_srgb,_var(--brand-500)_18%,_transparent),_transparent_60%)]" />
                <div className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full blur-3xl opacity-40 bg-gradient-to-tr from-[var(--brand-300)] to-[var(--brand-600)] animate-float-slow" />
				<div className="container-default relative py-20 sm:py-24 lg:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-7 max-w-3xl will-fade is-visible">
                            <p className="inline-flex items-center rounded-full bg-white/80 ring-1 ring-brand-200 px-3 py-1 text-xs font-medium text-brand-700 mb-4">
                                {t('common.tagline')}
                            </p>
							<h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 text-balance">
                                <span className="text-gradient">{t('common.heroTitle')}</span>
                            </h1>
							<p className="mt-5 text-lg text-slate-600">{t('common.heroSubtitle')}</p>
                            <div className="mt-8 flex flex-wrap gap-3 will-fade">
                                <a className="inline-flex items-center justify-center rounded-md px-5 py-3 text-white font-medium shadow-sm focus:outline-none focus:ring-2 bg-[var(--brand-600)] hover:bg-[var(--brand-700)] focus:ring-brand-500 btn-shimmer" href="#contact">{t('common.ctaContact')}</a>
                                <a className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-brand-700 font-medium ring-1 ring-brand-200 hover:ring-brand-300" href="#solution">{t('common.ctaLearnMore')}</a>
							</div>
                        </div>
                        <div className="lg:col-span-5 will-fade">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--brand-300)]/30 to-[var(--brand-600)]/30 blur-2xl rounded-3xl" />
                                <div className="relative surface-card p-4 sm:p-6 rounded-2xl overflow-hidden">
                                    <div className="aspect-[10/7] w-full rounded-xl ring-1 ring-slate-200 bg-white flex items-center justify-center">
                                        <img src={appLogo} alt="App preview" className="h-24 w-24 object-cover rounded-lg shadow-sm" />
                                    </div>
                                    <div className="mt-4 grid grid-cols-3 gap-2">
                                        <div className="h-2 rounded bg-slate-200" />
                                        <div className="h-2 rounded bg-slate-200" />
                                        <div className="h-2 rounded bg-slate-200" />
                                        <div className="col-span-3 h-2 rounded bg-slate-200" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
				</div>
			</header>
            <div className="section-divider" />

            <section id="problem" className="container-default py-14 sm:py-16 will-fade">
				<h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">{t('sections.problem')}</h2>
				<p className="mt-2 text-slate-600">{t('sections.problemSubtitle')}</p>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{[
						{ icon: '🚗', title: t('sections.cards.congestion.title'), desc: t('sections.cards.congestion.desc') },
						{ icon: '💰', title: t('sections.cards.cost.title'), desc: t('sections.cards.cost.desc') },
						{ icon: '⏱', title: t('sections.cards.commute.title'), desc: t('sections.cards.commute.desc') },
						{ icon: '🌍', title: t('sections.cards.environment.title'), desc: t('sections.cards.environment.desc') },
					].map((item) => (
                        <div key={item.title} className="surface-card p-6 transition-shadow hover:shadow-md will-fade hover-raise tap-active relative overflow-hidden">
                            <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(400px 200px at var(--mx,50%) var(--my,50%), rgba(2,132,199,0.08), transparent 60%)' }} />
							<div className="text-3xl" aria-hidden>{item.icon}</div>
							<h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
							<p className="mt-2 text-slate-600">{item.desc}</p>
						</div>
					))}
				</div>
			</section>
            <div className="section-divider" />

            <section id="solution" className="bg-brand-50/40 will-fade">
				<div className="container-default py-16 sm:py-20">
					<div className="max-w-3xl">
						<h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">{t('sections.solution')}</h2>
						<p className="mt-3 text-slate-600">{t('sections.solutionDesc')}</p>
					</div>
					<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							String(t('sections.features.f1')),
							String(t('sections.features.f2')),
							String(t('sections.features.f3')),
							String(t('sections.features.f4')),
						].map((f) => (
                            <div key={f} className="surface-card p-6 transition-shadow hover:shadow-md will-fade hover-raise tap-active relative overflow-hidden">
                                <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(400px 200px at var(--mx,50%) var(--my,50%), rgba(2,132,199,0.08), transparent 60%)' }} />
                                <div className="h-10 w-10 rounded-lg bg-gradient-brand text-white flex items-center justify-center font-bold">✓</div>
								<p className="mt-4 font-medium text-slate-900">{f}</p>
							</div>
						))}
					</div>
				</div>
			</section>
            <div className="section-divider" />

            <section className="container-default py-14 sm:py-16 will-fade">
				<h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">{t('sections.vmp')}</h2>
				<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="surface-card p-6">
						<h3 className="text-lg font-semibold text-slate-900">{t('sections.vision')}</h3>
						<p className="mt-2 text-slate-600">{t('sections.visionDesc')}</p>
					</div>
                    <div className="surface-card p-6">
						<h3 className="text-lg font-semibold text-slate-900">{t('sections.mission')}</h3>
						<p className="mt-2 text-slate-600">{t('sections.missionDesc')}</p>
					</div>
                    <div className="surface-card p-6 will-fade">
						<h3 className="text-lg font-semibold text-slate-900">{t('sections.positioning')}</h3>
						<ul className="mt-2 list-disc list-inside text-slate-600 space-y-1">
							<li>{t('sections.positioningBullets.b1')}</li>
							<li>{t('sections.positioningBullets.b2')}</li>
							<li>{t('sections.positioningBullets.b3')}</li>
							<li>{t('sections.positioningBullets.b4')}</li>
						</ul>
					</div>
				</div>
			</section>
            <div className="section-divider" />

            <section className="bg-brand-50/40 will-fade">
				<div className="container-default py-16 sm:py-20">
					<h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">{t('sections.highlights')}</h2>
					<div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="surface-card p-6 will-fade">
							<h3 className="text-lg font-semibold text-slate-900">{t('sections.roadmap')}</h3>
							<ol className="mt-6 relative border-s border-slate-200 pl-6">
								<li className="mb-6">
                                    <div className="absolute -left-3 mt-1 h-6 w-6 rounded-full bg-[var(--brand-500)] ring-4 ring-white" />
									<p className="font-medium text-slate-900">{t('sections.phase1')}</p>
									<p className="text-slate-600">{t('sections.phase1Desc')}</p>
								</li>
								<li>
                                    <div className="absolute -left-3 mt-1 h-6 w-6 rounded-full bg-[var(--brand-700)] ring-4 ring-white" />
									<p className="font-medium text-slate-900">{t('sections.phase2')}</p>
									<p className="text-slate-600">{t('sections.phase2Desc')}</p>
								</li>
							</ol>
						</div>

                        <div className="surface-card p-6 will-fade">
							<h3 className="text-lg font-semibold text-slate-900">{t('sections.financial')}</h3>
							<ul className="mt-4 space-y-3 text-slate-700">
								<li>{t('sections.market1')}</li>
								<li>{t('sections.market2')}</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
            <div className="section-divider" />

            <section id="team" className="container-default py-16 sm:py-20 will-fade">
				<h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">{t('sections.team')}</h2>
				<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
					{[
						{ 
							name: 'Kelvin Lam', 
							role: 'Technical Lead (Full Stack Developer)', 
							img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop', 
							linkedin: 'https://www.linkedin.com/in/tat-yin-lam-87bb351ab/', 
							bio: 'Kelvin is an experienced full-stack engineer with hands-on expertise in frontend, backend, and DevOps. He has developed and deployed enterprise-grade systems in the insurance industry, working across React.js, Spring Boot, SQL, Docker, Kubernetes, and Jenkins. At Blue Insurance and during his secondment at FTLife, he built secure APIs, integrated CI/CD pipelines, and led full-stack system development. He is skilled in agile delivery, observability tools, and system scalability, and has successfully launched apps and optimized performance monitoring across distributed services.',
							contrib: 'As Technical Lead, Kelvin will oversee end-to-end development of the carpool app with a robust, scalable architecture. He will build the web frontend in React.js, develop backend services with Spring Boot for authentication, ride matching, and real-time processing, and manage SQL integrations for profiles and trips. He will also deliver Flutter apps for Android and iOS, and set up DevOps with Docker, Kubernetes, and Jenkins for CI/CD and monitoring—enabling rapid iteration on geolocation, push notifications, and secure APIs to ensure privacy, compliance, and scalable growth from MVP to high-traffic operations.'
						},
						{ 
							name: 'Timothy Wong', 
							role: 'Operations & Compliance Lead (Project Manager)', 
							img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop', 
							linkedin: 'https://www.linkedin.com/in/timothywong0816/', 
							bio: 'Timothy is a Project Manager with a proven record in financial services, retirement projects, and regulatory compliance. At Manulife, he led large-scale initiatives such as the ORSO administration partnership and new product launches in Macau, reporting to top management. He has managed cross-company standardization projects, coordinated with regulators, and optimized processes for both frontend and backend solutions. With certifications including Professional Scrum Master I and Certified Software Tester, Timothy brings strong expertise in agile project management, compliance, and multi-stakeholder coordination.',
							contrib: 'As Operations & Compliance Lead, Timothy will manage timeline, resources, and stakeholder communications for on-time delivery. He will apply agile practices to coordinate sprints across development, testing, and iteration, ensuring adherence to data protection laws, transportation regulations, and insurance requirements. He will partner with authorities and vendors for background checks and payments, and optimize operations like onboarding, dispute resolution, and maintenance to scale smoothly from MVP to market rollout with minimized risk.'
						},
						{ 
							name: 'Vincent Tse', 
							role: 'Business & Analytics Lead (Index Review Assistant Manager)', 
							img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', 
							linkedin: 'https://www.linkedin.com/in/vincent-tse-54b65b176/', 
							bio: 'Vincent specializes in data analytics, automation, and financial modeling. At Hang Seng Indexes, he managed reviews of 100+ market, sector, and ESG indexes, handling datasets with millions of rows and automations that reduced processing time by 80%. He executed index rebalancing for products linked to US$65B AUM. Previously at Equinix (Fortune 500), he supported M&A worth over US$180M and built financial models for regional expansion. His Python, SQL, and finance blend powers data-driven strategy and insights.',
							contrib: 'As Business & Analytics Lead, Vincent will drive data-informed decisions to refine the business model and UX. Using Python and SQL, he will analyze usage patterns, forecast demand, and automate metrics reporting to surface opportunities like dynamic pricing and route optimization. He will build revenue models (e.g., premium features, ads), conduct market sizing, and integrate ESG metrics (e.g., carbon savings). His large-scale data experience supports AI-driven matching, while his M&A background informs partnerships, funding, and expansion.'
						},
					].map((m) => (
                        <article key={m.name} className="surface-card overflow-hidden hover:shadow-md transition-shadow will-fade hover-raise tap-active relative">
                            <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(500px 240px at var(--mx,50%) var(--my,50%), rgba(2,132,199,0.06), transparent 60%)' }} />
							<div className="p-6">
								<div className="flex items-start justify-between gap-4">
									<div>
										<h3 className="text-lg font-semibold text-slate-900">{m.name}</h3>
										<p className="text-sm text-slate-600">{m.role}</p>
									</div>
                                    <a href={m.linkedin} aria-label={`${m.name} LinkedIn`} className="inline-flex items-center rounded-md px-3 py-1 text-brand-700 ring-1 ring-brand-200 bg-white hover:bg-brand-50">LinkedIn</a>
								</div>
							<p className="mt-3 text-sm text-slate-700 leading-6">{m.bio}</p>
							<p className="mt-3 text-sm text-slate-700 leading-6"><span className="font-medium">Role and Contributions:</span> {m.contrib}</p>
							</div>
						</article>
					))}
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
