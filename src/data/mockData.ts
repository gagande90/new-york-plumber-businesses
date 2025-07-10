
import { Suburb, Region, Plumber, BlogPost, BlogCategory } from "../types";

// Sample regions and suburbs in Melbourne
export const regions: { [key in Region]: string[] } = {
  "Inner Melbourne": [
    "Carlton", "Docklands", "East Melbourne", "Kensington", "Melbourne CBD", 
    "North Melbourne", "Southbank", "West Melbourne"
  ],
  "Northern Suburbs": [
    "Brunswick", "Coburg", "Essendon", "Fawkner", "Glenroy", "Pascoe Vale", 
    "Preston", "Reservoir", "Thornbury"
  ],
  "Eastern Suburbs": [
    "Balwyn", "Box Hill", "Camberwell", "Doncaster", "Hawthorn", "Kew", 
    "Mont Albert", "Ringwood", "Surrey Hills"
  ],
  "Southern Suburbs": [
    "Brighton", "Caulfield", "Cheltenham", "Elsternwick", "Malvern", "Oakleigh", 
    "Sandringham", "St Kilda"
  ],
  "Western Suburbs": [
    "Altona", "Footscray", "Newport", "Sunshine", "Werribee", "Williamstown", 
    "Yarraville"
  ],
};

// Generate suburbs data
export const suburbs: Suburb[] = Object.entries(regions).flatMap(
  ([region, suburbNames]) =>
    suburbNames.map((name, index) => ({
      id: `${region.toLowerCase().replace(/\s+/g, "-")}-${index}`,
      name,
      region: region as Region,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      description: `${name} is located in the ${region} of Melbourne. Find trusted local plumbers serving this area.`
    }))
);

// Sample plumbing services
const plumbingServices = [
  "Emergency Repairs",
  "Blocked Drains",
  "Hot Water Systems",
  "Leaking Taps",
  "Gas Fitting",
  "Bathroom Renovations",
  "Kitchen Plumbing",
  "Toilet Repairs",
  "Pipe Installation",
  "Water Filter Installation",
  "Drain Camera Inspections",
  "Commercial Plumbing"
];

// Generate plumbers data
export const plumbers: Plumber[] = Array(25)
  .fill(null)
  .map((_, index) => {
    // Randomly select 2-4 regions to service
    const servicesCount = Math.floor(Math.random() * 3) + 2;
    const selectedServices = [...plumbingServices]
      .sort(() => 0.5 - Math.random())
      .slice(0, servicesCount);
    
    // Randomly select 3-8 suburbs to service
    const suburbsCount = Math.floor(Math.random() * 6) + 3;
    const servicedSuburbs = [...suburbs]
      .sort(() => 0.5 - Math.random())
      .slice(0, suburbsCount)
      .map(suburb => suburb.id);

    return {
      id: `plumber-${index}`,
      businessName: `Melbourne Pro Plumbing ${index + 1}`,
      description: `A professional plumbing service with over ${Math.floor(
        Math.random() * 20
      ) + 5} years of experience serving Melbourne. We pride ourselves on quality workmanship and customer satisfaction.`,
      services: selectedServices,
      areasServiced: servicedSuburbs,
      phone: `0${Math.floor(Math.random() * 100000000)
        .toString()
        .padStart(8, "4")}`,
      email: `contact@melbourneplumbing${index + 1}.com.au`,
      website: Math.random() > 0.3 ? `https://melbourneplumbing${index + 1}.com.au` : undefined,
      reviews: Array(Math.floor(Math.random() * 5))
        .fill(null)
        .map((_, reviewIndex) => ({
          id: `review-${index}-${reviewIndex}`,
          author: `Customer ${reviewIndex + 1}`,
          rating: Math.floor(Math.random() * 3) + 3, // 3-5 stars
          comment: "Great service! Very professional and fixed our problem quickly.",
          date: new Date(
            Date.now() - Math.floor(Math.random() * 10000000000)
          ).toISOString()
        }))
    };
  });

// Blog categories and sample posts
const blogCategories: BlogCategory[] = [
  "DIY Plumbing",
  "Plumbing Tips",
  "Industry News",
  "How-To Guides"
];

const blogTitles = [
  "Top 5 Plumbing Issues in Melbourne Homes",
  "How to Prepare Your Pipes for Winter",
  "Understanding Water Pressure Problems",
  "DIY Fixes for Leaky Taps",
  "When to Call a Professional Plumber",
  "New Plumbing Regulations in Victoria",
  "Water-Saving Tips for Melbourne Homeowners",
  "Signs Your Hot Water System Needs Replacing",
  "How to Choose the Right Plumber",
  "Common Causes of Blocked Drains"
];

// Generate blog posts
export const blogPosts: BlogPost[] = blogTitles.map((title, index) => {
  const category = blogCategories[index % blogCategories.length];
  return {
    id: `blog-${index}`,
    title,
    slug: title.toLowerCase().replace(/\s+/g, "-"),
    excerpt: `Learn about ${title.toLowerCase()} and how to deal with them effectively.`,
    content: `
      <p>Melbourne homeowners often face various plumbing issues that can disrupt daily life. This article explores common problems and solutions.</p>
      <h2>Common Issues</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, eget aliquam nisl nunc eget nisl.</p>
      <h2>Professional Solutions</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, eget aliquam nisl nunc eget nisl.</p>
      <h2>Preventative Maintenance</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, eget aliquam nisl nunc eget nisl.</p>
    `,
    category,
    tags: ["Melbourne", "Plumbing", "Maintenance", "Home Repairs"],
    author: "Plumbing Expert",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
  };
});

// Function to get plumbers by suburb
export const getPlumbersBySuburb = (suburbId: string): Plumber[] => {
  return plumbers.filter(plumber => plumber.areasServiced.includes(suburbId));
};

// Function to get suburbs by region
export const getSuburbsByRegion = (region: Region): Suburb[] => {
  return suburbs.filter(suburb => suburb.region === region);
};

// Function to get a single plumber by id
export const getPlumberById = (plumberId: string): Plumber | undefined => {
  return plumbers.find(plumber => plumber.id === plumberId);
};

// Function to get a single suburb by slug
export const getSuburbBySlug = (slug: string): Suburb | undefined => {
  return suburbs.find(suburb => suburb.slug === slug);
};

// Function to get a single blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Function to get blog posts by category
export const getBlogPostsByCategory = (category: BlogCategory): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};
