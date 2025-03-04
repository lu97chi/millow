# TuHogar - Real Estate Website

TuHogar is a modern, responsive real estate website built with Next.js and Tailwind CSS. The website features a clean, sophisticated design with a warm aesthetic that makes users feel at home while browsing properties.

## Features

- **Modern UI Design**: Clean, sophisticated interface with warm color palette
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Components**: Animated sections using Framer Motion
- **Property Listings**: Featured properties showcase with filtering options
- **Testimonials**: Client testimonials with auto-rotation
- **Search Functionality**: Property search with location and type filters

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Lucide Icons**: Beautiful, consistent icon set

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tuhogar.git
   cd tuhogar
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
tuhogar/
├── public/            # Static assets
│   └── images/        # Image assets
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   │   ├── layout/    # Layout components
│   │   └── ui/        # UI components
│   └── styles/        # Global styles
├── scripts/           # Utility scripts
└── ...
```

## Customization

### Colors

The color scheme can be customized in the `src/app/globals.css` file. The primary color is a warm orange tone that gives the website a cozy feel.

### Images

Replace the placeholder images in the `public/images` directory with your own images. You can use the `scripts/download-images.js` script to download placeholder images for development.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Images from [Unsplash](https://unsplash.com/)
- Icons from [Lucide](https://lucide.dev/)
