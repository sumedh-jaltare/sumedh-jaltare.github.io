import About from '../components/About'
import Experience from '../components/Experience'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import ProjectList from '../components/ProjectList'
import ScrollProgressIndicator from '../components/ScrollProgressIndicator'
import Skills from '../components/Skills'
import WhipLine from '../components/WhipLine'

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[80] focus:bg-ink focus:px-4 focus:py-2 focus:font-sans focus:text-[12px] focus:tracking-wide focus:text-paper focus:uppercase"
      >
        Skip to content
      </a>
      <WhipLine />
      <ScrollProgressIndicator />
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <ProjectList />
        <Experience />
        <Skills />
        <Footer />
      </main>
    </div>
  )
}

export default Home
