"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<null | any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [images, setImages] = useState([
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200",
      title: "Transmission Hackathon",
      category: "Technical",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200",
      title: "Sparx Football Finals",
      category: "Sports",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=1200",
      title: "Cultural Fest Night",
      category: "Cultural",
    },
  ]);

  // 🧾 New image form state
  const [newImage, setNewImage] = useState({
    title: "",
    category: "Cultural",
    src: "",
  });

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newImage.title || !newImage.src) {
      alert("Please fill all fields");
      return;
    }

    const newEntry = {
      id: images.length + 1,
      ...newImage,
    };

    setImages([...images, newEntry]);
    setIsAddModalOpen(false);
    setNewImage({ title: "", category: "Cultural", src: "" });
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-1rem)] bg-white text-gray-900 p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Gallery
          </h2>
          <p className="text-gray-500 text-sm">
            Explore and manage images from Spandan, Transmission, and Sparx.
          </p>
        </div>

        {/* ➕ Add Image Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md"
        >
          <Plus size={18} />
          <span className="hidden sm:block text-sm font-medium">Add Image</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
      >
        {images.map((img) => (
          <motion.div
            key={img.id}
            layout
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-lg cursor-pointer group shadow-sm hover:shadow-md"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img.src}
              alt={img.title}
              width={500}
              height={400}
              className="object-cover w-full h-40 sm:h-48 md:h-52 lg:h-56 transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-3 text-white">
              <h3 className="text-sm font-semibold">{img.title}</h3>
              <p
                className={`text-xs ${
                  img.category === "Cultural"
                    ? "text-pink-300"
                    : img.category === "Technical"
                    ? "text-blue-300"
                    : "text-green-300"
                }`}
              >
                {img.category}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 🖼️ Image View Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all z-50"
              >
                <X size={20} />
              </button>

              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />

              <div className="mt-3 text-center text-gray-200">
                <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                <p
                  className={`text-sm ${
                    selectedImage.category === "Cultural"
                      ? "text-pink-400"
                      : selectedImage.category === "Technical"
                      ? "text-blue-400"
                      : "text-green-400"
                  }`}
                >
                  {selectedImage.category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ➕ Add Image Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Add New Image
              </h3>

              <form onSubmit={handleAddImage} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newImage.title}
                    onChange={(e) =>
                      setNewImage({ ...newImage, title: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Event title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newImage.category}
                    onChange={(e) =>
                      setNewImage({ ...newImage, category: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Cultural">Cultural</option>
                    <option value="Technical">Technical</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={newImage.src}
                    onChange={(e) =>
                      setNewImage({ ...newImage, src: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md py-2 transition-all"
                >
                  Add Image
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
