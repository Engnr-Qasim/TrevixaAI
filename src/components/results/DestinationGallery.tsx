import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { GalleryItem } from '../../types/tripResult';

interface DestinationGalleryProps {
  customImages?: GalleryItem[];
  destinationName?: string;
}

export const DestinationGallery: React.FC<DestinationGalleryProps> = ({
  customImages,
  destinationName = 'Hunza Valley',
}) => {
  const defaultGallery: GalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Majestic Peaks & Karakoram Highway',
      category: 'Landscape',
      location: `${destinationName} Valley Floor`,
      imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      caption: 'Spectacular snow-capped 7,000m peaks towering over winding mountain highway routes.',
    },
    {
      id: 'gal-2',
      title: 'Centuries-Old Wooden Heritage Fort',
      category: 'Culture',
      location: 'Baltit Fort Heritage Site',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      caption: 'Tibetan-influenced architectural masterpieces carved with ancient geometric patterns.',
    },
    {
      id: 'gal-3',
      title: 'Fresh Mountain Trout & Organic Cuisine',
      category: 'Food',
      location: 'Local Riverside Restaurant',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      caption: 'Delicious fresh trout grilled with local organic herbs and traditional flatbreads.',
    },
    {
      id: 'gal-4',
      title: 'Hussaini Suspension Bridge Crossing',
      category: 'Adventure',
      location: 'Upper Hunza Gojal',
      imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      caption: 'Thrilling footbridge across roaring glacial waters against cathedral peak backdrops.',
    },
    {
      id: 'gal-5',
      title: 'Turquoise Glacier Melt Lake Waters',
      category: 'Nature',
      location: 'Attabad Alpine Lake',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      caption: 'Crystalline emerald waters inviting peaceful boat cruises and watersports.',
    },
    {
      id: 'gal-6',
      title: 'Passu Cathedral Cones at Sunset',
      category: 'Landscape',
      location: 'Passu Cathedral Viewpoint',
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      caption: 'Golden hour sunlight illuminating the razor-sharp granite cathedral cones.',
    },
  ];

  const images = customImages && customImages.length > 0 ? customImages : defaultGallery;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Landscape', 'Culture', 'Food', 'Adventure', 'Nature'];

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter((img) => img.category === selectedCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex(activeLightboxIndex === 0 ? filteredImages.length - 1 : activeLightboxIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex(activeLightboxIndex === filteredImages.length - 1 ? 0 : activeLightboxIndex + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-sky-500" />
            <h2 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight">
              Destination Visual Gallery
            </h2>
          </div>
          <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium mt-0.5">
            High-resolution photography showcasing landscape, culture, adventure & dining in {destinationName}.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: idx * 0.04 }}
            onClick={() => setActiveLightboxIndex(idx)}
            className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all border border-slate-200/80 dark:border-slate-800"
          >
            <img
              src={img.imageUrl}
              alt={img.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            <div className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-slate-950/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>

            <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-sky-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
              {img.category}
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <div className="flex items-center gap-1.5 text-sky-300 text-[11px] font-bold">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{img.location}</span>
              </div>
              <h3 className="text-sm font-black truncate">{img.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && filteredImages[activeLightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev & Next Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image & Caption Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex flex-col"
            >
              <div className="relative flex-1 bg-black min-h-[300px] sm:min-h-[450px] overflow-hidden flex items-center justify-center">
                <img
                  src={filteredImages[activeLightboxIndex].imageUrl}
                  alt={filteredImages[activeLightboxIndex].title}
                  className="max-w-full max-h-[65vh] object-contain"
                />
              </div>

              <div className="p-6 bg-slate-900 text-white space-y-2 border-t border-slate-800">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-sky-500 text-white text-[10px] font-black uppercase">
                      {filteredImages[activeLightboxIndex].category}
                    </span>
                    <span className="text-xs text-sky-400 font-bold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {filteredImages[activeLightboxIndex].location}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    {activeLightboxIndex + 1} / {filteredImages.length}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white">
                  {filteredImages[activeLightboxIndex].title}
                </h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {filteredImages[activeLightboxIndex].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
