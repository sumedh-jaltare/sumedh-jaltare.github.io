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
      <WhipLine />
      <ScrollProgressIndicator />
      <Navbar />

      <main>
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
