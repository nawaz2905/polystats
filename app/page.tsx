"use client"
import { TrendingUp, BarChart3, Wallet, Activity, PieChart, Shield, Eye } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Home() {
  const ref = useRef(null)
  const { scrollY } = useScroll()

  // Parallax drift
  const bgY = useTransform(scrollY, [0, 800], [0, -120])
  const features = [
  TrendingUp,
  BarChart3,
  Wallet,
  Activity,
  PieChart,
]

  return (
  <div className="relative min-h-screen flex flex-col">

    {/* Glass Navbar */}
<header className="fixed top-0 left-0 w-full z-50">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mt-4 flex items-center justify-between 
      rounded-2xl 
      bg-white/10 dark:bg-white/5
      backdrop-blur-xl 
      border border-white/20
      px-6 py-3
      shadow-lg
    ">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Polystats Logo"
          width={36}
          height={36}
          className="object-contain"
        />
        <span className="text-xl font-bold tracking-wide text-foreground">

          POLYSTATS
        </span>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-600 dark:text-zinc-400">
        <a href="#" className="hover:text-white transition">Features</a>
        <a href="#" className="hover:text-white transition">Pricing</a>
        <a href="#" className="hover:text-white transition">Docs</a>
      </nav>

      {/* Dark Mode Toggle Placeholder */}
      <div>
        <ThemeToggle />
      </div>

    </div>
  </div>
</header>


    <main className="relative min-h-screen transition-colors duration-300 bg-background text-foreground">


      {/* ========================= */}
      {/* ANIMATED MESH BACKGROUND  */}
      {/* ========================= */}
      {/* Animated Mesh Background */}
<motion.div
  className="absolute inset-0 -z-10 overflow-hidden"
>

  <motion.div
    className="absolute w-[900px] h-[900px] rounded-full bg-cyan-400 opacity-10 dark:opacity-15 blur-[200px] dark:blur-[160px]"
    animate={{ x: [0, 120, 0], y: [0, -100, 0] }}
    transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
    style={{ top: "-200px", left: "-200px" }}
  />

  <motion.div
    className="absolute w-[800px] h-[800px] rounded-full bg-emerald-400 opacity-15 blur-[160px]"
    animate={{ x: [0, -150, 0], y: [0, 120, 0] }}
    transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
    style={{ bottom: "-250px", right: "-150px" }}
  />

  <motion.div
    className="absolute w-[700px] h-[700px] rounded-full bg-blue-500 opacity-15 blur-[160px]"
    animate={{ x: [0, 100, 0], y: [0, 150, 0] }}
    transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
    style={{ top: "30%", left: "50%" }}
  />
</motion.div>


      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 overflow-hidden"
      >


        {/* Gradient Mesh Layers */}
        <motion.div
          className="absolute w-[900px] h-[900px] rounded-full bg-cyan-400 opacity-10 blur-[140px]"
          animate={{ x: [0, 120, 0], y: [0, -100, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "-200px", left: "-200px" }}
        />

        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full bg-emerald-400 opacity-10 blur-[140px]"
          animate={{ x: [0, -150, 0], y: [0, 120, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "-250px", right: "-150px" }}
        />

        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full bg-blue-500 opacity-10 blur-[140px]"
          animate={{ x: [0, 100, 0], y: [0, 150, 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "30%", left: "50%" }}
        />

        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      {/* ========================= */}
      {/* HERO SECTION */}
      {/* ========================= */}

      <section className="flex flex-col items-center justify-center text-center px-6 pt-40 pb-32 relative">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-semibold leading-tight text-black dark:text-white"
        >
          Track Any{" "}
          <span className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
            Polymarket Wallet
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 text-black dark:text-zinc-400 text-lg max-w-2xl"
        >
          Real-time analytics, P&L tracking, and portfolio insights for any
          Polymarket wallet address.
        </motion.p>

        {/* Wallet Input */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-10 w-full max-w-xl
bg-white dark:bg-white/5
border border-slate-300 dark:border-white/10
backdrop-blur-lg
rounded-xl p-2
flex items-center shadow-sm"
        >
          <input
            placeholder="Enter wallet address (0x...)"
            className="flex-1 bg-transparent outline-none text-slate-900 dark:text-foreground placeholder-slate-400"

          />
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-medium shadow-lg hover:shadow-cyan-500/30 transition"
          >
            Analyze →
          </motion.button>
        </motion.div>

        {/* Floating Icons */}
        
    <div className="flex justify-center gap-8 translate-y-20">

      {features.map((Icon, i) => (
        <motion.div
  key={i}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1, y: [-6, 6, -6] }}
  transition={{
    opacity: { delay: i * 0.1, duration: 0.6 },
    y: {
      duration: 3 + i,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  className="
    w-16 h-16
    rounded-2xl
    bg-white/5
    border border-white/10
    backdrop-blur-md
    flex items-center justify-center
    shadow-lg
  "
        >
          <Icon className="w-6 h-6 text-cyan-400" />
        </motion.div>
      ))}
    </div>
      </section>

      {/* ========================= */}
      {/* STATS SECTION (Reveal) */}
      {/* ========================= */}

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

          {[
            { label: "Wallets Tracked", value: "12.4K+" },
            { label: "Volume Analyzed", value: "$840M" },
            { label: "Uptime", value: "99.9%" },
            { label: "Avg Latency", value: "120ms" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 text-center"
            >
              <div className="text-2xl font-semibold">
                {stat.value}
              </div>
              <div className="text-zinc-400 text-sm mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}

        </div>
      </motion.section>

      {/* Gradient Animation Style */}
      <style jsx global>{`
        .animate-gradient {
          animation: gradientMove 10s ease infinite;
        }

        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
{/* ============================= */}
{/* FEATURES SECTION */}
{/* ============================= */}

<section className="py-24 px-6 relative">

  {/* Section Heading */}
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-bold text-foreground">
      Everything you need to{" "}
      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        analyze
      </span>
    </h2>

    <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
      Powerful tools built for serious Polymarket traders and analysts.
    </p>
  </div>

  {/* Cards Grid */}
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

    {/* Card 1 */}
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-8 hover:bg-white/10 transition">

      <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
        <BarChart3 className="w-6 h-6 text-cyan-400" />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-3">
        Portfolio Analytics
      </h3>

      <p className="text-zinc-400 leading-relaxed">
        Deep-dive into any wallet's positions, P&L, and trading history across all markets.
      </p>
    </div>

    {/* Card 2 */}
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-8 hover:bg-white/10 transition">

      <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
        <Activity className="w-6 h-6 text-cyan-400" />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-3">
        Real-Time Tracking
      </h3>

      <p className="text-zinc-400 leading-relaxed">
        Live updates on positions, trades, and market movements as they happen.
      </p>
    </div>

    {/* Card 3 */}
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-8 hover:bg-white/10 transition">

      <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
        <Shield className="w-6 h-6 text-cyan-400" />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-3">
        Risk Insights
      </h3>

      <p className="text-zinc-400 leading-relaxed">
        Understand exposure, concentration risk, and portfolio health at a glance.
      </p>
    </div>

    {/* Card 4 */}
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-8 hover:bg-white/10 transition">

      <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
        <Eye className="w-6 h-6 text-cyan-400" />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-3">
        Whale Watching
      </h3>

      <p className="text-zinc-400 leading-relaxed">
        Monitor top traders and follow the smart money across Polymarket.
      </p>
    </div>
    {/* FOOTER
    <div className="mt-auto text-center py-6 text-sm text-zinc-400">
      © 2026 Polystats. Built for the prediction market community.
    </div> */}

  </div>
</section>

{/* FOOTER */}
    <div className="mt-auto text-center py-6 text-sm text-zinc-400">
      © 2026 Polystats. Built for the prediction market community.
    </div>
    
</main>
    </div>
  )
}

