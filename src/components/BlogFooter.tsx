const BlogFooter = () => {
  return (
    <footer className="border-t border-border mt-20">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2025 dev.blog — Built with passion for engineering.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            RSS
          </a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Twitter
          </a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default BlogFooter;
