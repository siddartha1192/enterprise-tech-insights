import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";
import FeaturedPost from "@/components/FeaturedPost";
import PostCard from "@/components/PostCard";
import { posts } from "@/data/posts";

const Index = () => {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BlogHeader />

      <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
        {/* Hero — Multicolored Gradient */}
        <section className="hero-gradient-bg mb-14 px-8 py-16 md:px-12 md:py-20 relative">
          {/* Floating gradient orbs */}
          <div className="hero-orb hero-orb--violet" aria-hidden="true" />
          <div className="hero-orb hero-orb--rose" aria-hidden="true" />
          <div className="hero-orb hero-orb--cyan" aria-hidden="true" />
          <div className="hero-orb hero-orb--amber" aria-hidden="true" />
          <div className="hero-orb hero-orb--emerald" aria-hidden="true" />

          {/* Edge fades */}
          <div className="hero-fade-top" aria-hidden="true" />
          <div className="hero-fade-bottom" aria-hidden="true" />

          {/* Inner vignette */}
          <div className="hero-vignette" aria-hidden="true" />

          {/* Border glow */}
          <div className="hero-border-glow" aria-hidden="true" />

          {/* Content */}
          <div className="relative z-10">
            <p className="text-sm font-mono text-white/70 mb-3 tracking-wide uppercase">
              Engineering Blog
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-5">
              Thoughts on building
              <br />
              <span className="text-gradient-hero">software that scales.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed">
              Deep dives into systems design, infrastructure, developer tooling, and the craft of engineering.
            </p>
          </div>
        </section>

        {/* Featured */}
        {featured && (
          <section className="mb-14">
            <FeaturedPost post={featured} />
          </section>
        )}

        {/* Grid */}
        <section>
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
            Latest Articles
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {rest.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </section>
      </main>

      <BlogFooter />
    </div>
  );
};

export default Index;
