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
        {/* Hero */}
        <section className="mb-14">
          <p className="text-sm font-mono text-primary mb-3 tracking-wide uppercase">Engineering Blog</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground mb-4">
            Thoughts on building
            <br />
            <span className="text-gradient">software that scales.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Deep dives into systems design, infrastructure, developer tooling, and the craft of engineering.
          </p>
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
