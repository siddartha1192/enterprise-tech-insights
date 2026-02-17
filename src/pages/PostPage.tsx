import { useParams, useNavigate } from "react-router-dom";
import { posts } from "@/data/posts";
import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";
import { ArrowLeft } from "lucide-react";

const PostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <BlogHeader />
        <main className="flex-1 container mx-auto px-6 py-20 max-w-3xl text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-primary hover:underline"
          >
            ← Back to articles
          </button>
        </main>
        <BlogFooter />
      </div>
    );
  }

  // Simple markdown-like rendering for code blocks
  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```|##\s.+)/g);
    return parts.map((part, i) => {
      if (part.startsWith("```")) {
        const code = part.replace(/```\w*\n?/g, "").trim();
        return (
          <pre
            key={i}
            className="bg-secondary rounded-lg p-5 overflow-x-auto text-sm font-mono text-secondary-foreground my-6 border border-border"
          >
            <code>{code}</code>
          </pre>
        );
      }
      if (part.startsWith("## ")) {
        return (
          <h2 key={i} className="text-xl font-bold text-foreground mt-10 mb-4">
            {part.replace("## ", "")}
          </h2>
        );
      }
      if (part.trim()) {
        return part.split("\n\n").map((paragraph, j) => (
          <p key={`${i}-${j}`} className="text-secondary-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ));
      }
      return null;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BlogHeader />
      <main className="flex-1 container mx-auto px-6 py-12 max-w-3xl">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to articles
        </button>

        <article className="animate-fade-in">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-5">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime} read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex gap-2 mb-10">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="border-t border-border pt-8">
            {renderContent(post.content)}
          </div>
        </article>
      </main>
      <BlogFooter />
    </div>
  );
};

export default PostPage;
