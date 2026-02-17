import { Terminal } from "lucide-react";

const BlogHeader = () => {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-5 px-6">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Terminal className="w-4 h-4 text-primary" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            dev<span className="text-gradient">.blog</span>
          </span>
        </a>
        <nav className="flex items-center gap-8">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Articles
          </a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
};

export default BlogHeader;
