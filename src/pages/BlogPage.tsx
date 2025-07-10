
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHero from "@/components/common/PageHero";
import BlogPostCard from "@/components/common/BlogPostCard";
import blogPostsData from "@/data/generatedBlogPosts.json";
import { BlogCategory } from "@/types";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlogCategory | null>(null);
  
  const categories: BlogCategory[] = [
    "DIY Plumbing",
    "Plumbing Tips",
    "Industry News",
    "How-To Guides"
  ];
  
  // Filter posts based on active category and search query
  const filteredPosts = blogPostsData.filter(post => {
    const matchesCategory = !activeCategory || post.category === activeCategory;
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Sort posts by date (newest first)
  const sortedPosts = [...filteredPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  return (
    <div>
      <PageHero
        title="Plumbing Blog & Advice"
        subtitle="Expert tips, tricks, and insights for New York homeowners."
      >
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white pl-10 h-12"
            />
          </div>
        </form>
      </PageHero>
      
      <div className="container mx-auto px-4 py-12">
        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            onClick={() => setActiveCategory(null)}
            className="mb-2"
          >
            All Categories
          </Button>
          
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Featured Post */}
        {sortedPosts.length > 0 && (
          <div className="mb-12">
            <BlogPostCard post={sortedPosts[0]} featured={true} />
          </div>
        )}
        
        {/* Post Grid */}
        {sortedPosts.length > 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.slice(1).map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setActiveCategory(null);
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
        
        {/* Popular Tags */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold text-primary mb-4 text-center">
            Popular Topics
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {["Blocked Drains", "Water Leaks", "Hot Water Systems", "Toilet Repairs", 
              "Pipe Installation", "Water Saving", "Emergency Plumbing", "DIY", 
              "Maintenance Tips", "NYC", "Winter Plumbing", "Gas Fitting"].map(tag => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-sm py-2 px-4 bg-secondary-light hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
