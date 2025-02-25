const fs = require('fs');
const path = require('path');
const https = require('https');

// Create images directory if it doesn't exist
const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// List of images to download
const images = [
  {
    name: 'hero-home.jpg',
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1920&auto=format&fit=crop',
    description: 'Modern luxury home exterior'
  },
  {
    name: 'property-1.jpg',
    url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
    description: 'Modern apartment interior'
  },
  {
    name: 'property-2.jpg',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    description: 'Family home with garden'
  },
  {
    name: 'property-3.jpg',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
    description: 'Luxury home exterior'
  },
  {
    name: 'property-4.jpg',
    url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop',
    description: 'Charming studio apartment'
  },
  {
    name: 'testimonial-1.jpg',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    description: 'Professional woman smiling'
  },
  {
    name: 'testimonial-2.jpg',
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    description: 'Professional man with crossed arms'
  },
  {
    name: 'testimonial-3.jpg',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    description: 'Young woman smiling'
  },
  {
    name: 'pattern.svg',
    url: 'https://raw.githubusercontent.com/tailwindlabs/heroicons/master/optimized/24/outline/squares-2x2.svg',
    description: 'Pattern for background'
  }
];

// Function to download an image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename);
    
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`File ${filename} already exists, skipping...`);
      resolve();
      return;
    }
    
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there's an error
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  console.log('Starting download of images...');
  
  for (const image of images) {
    try {
      await downloadImage(image.url, image.name);
    } catch (error) {
      console.error(`Error downloading ${image.name}:`, error);
    }
  }
  
  console.log('All downloads completed!');
}

downloadAllImages(); 