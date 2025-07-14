import React, { useState } from "react";
import {
  Download,
  Heart,
  Calendar,
  Palette,
  X,
  Filter,
  Grid,
  List,
  Search,
  Crown,
  Eye,
  Shirt,
  MapPin,
} from "lucide-react";
import { FashionDesign } from "../App";

interface GalleryProps {
  designs: FashionDesign[];
  darkMode: boolean;
  onClose: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({
  designs,
  darkMode,
  onClose,
}) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteDesigns");
    return saved ? JSON.parse(saved) : [];
  });
  const [filterBy, setFilterBy] = useState<"all" | "favorites" | "recent">(
    "all",
  );
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "style" | "mood">(
    "newest",
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDesign, setSelectedDesign] = useState<FashionDesign | null>(
    null,
  );

  const toggleFavorite = (designId: string) => {
    const newFavorites = favorites.includes(designId)
      ? favorites.filter((id) => id !== designId)
      : [...favorites, designId];

    setFavorites(newFavorites);
    localStorage.setItem("favoriteDesigns", JSON.stringify(newFavorites));
  };

  const downloadImage = async (imageUrl: string, designName: string) => {
    try {
      // Use the new server endpoint for better download handling
      const BASE_URL =
        import.meta.env.MODE === "development"
          ? "http://localhost:5013"
          : "https://fashion-designer.onrender.com";

      const response = await fetch(`${BASE_URL}/api/download-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          filename: `${designName.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.jpg`,
        }),
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${designName.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const filteredDesigns = designs
    .filter((design) => {
      if (filterBy === "favorites") return favorites.includes(design.id);
      if (filterBy === "recent")
        return Date.now() - design.timestamp.getTime() < 24 * 60 * 60 * 1000;
      return true;
    })
    .filter((design) => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        design.specs.style.toLowerCase().includes(searchLower) ||
        design.specs.mood.toLowerCase().includes(searchLower) ||
        design.specs.fabric.toLowerCase().includes(searchLower) ||
        design.specs.colorTheme.toLowerCase().includes(searchLower) ||
        design.specs.season.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest")
        return b.timestamp.getTime() - a.timestamp.getTime();
      if (sortBy === "oldest")
        return a.timestamp.getTime() - b.timestamp.getTime();
      if (sortBy === "style") return a.specs.style.localeCompare(b.specs.style);
      if (sortBy === "mood") return a.specs.mood.localeCompare(b.specs.mood);
      return 0;
    });

  const GridCard = ({ design }: { design: FashionDesign }) => (
    <div
      className={`design-card relative ${
        darkMode ? "bg-gray-800/60" : "bg-white/80"
      } rounded-2xl p-4 hover-scale group backdrop-blur-sm border ${
        darkMode ? "border-gray-700/50" : "border-gray-200/50"
      } shadow-lg hover:shadow-2xl transition-all duration-300`}
    >
      {/* Image */}
      <div className="relative mb-4">
        <img
          src={design.imageUrl}
          alt="Fashion Design"
          className="w-full h-56 object-cover rounded-xl cursor-pointer"
          onClick={() => setSelectedDesign(design)}
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              onClick={() => downloadImage(design.imageUrl, design.specs.style)}
              className="p-2 bg-white/90 rounded-full shadow hover:scale-110 transition-transform"
              title="Download"
            >
              <Download className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => toggleFavorite(design.id)}
              className={`p-2 rounded-full shadow hover:scale-110 transition-transform ${
                favorites.includes(design.id)
                  ? "bg-pink-500 text-white"
                  : "bg-white/90 text-gray-700"
              }`}
              title={
                favorites.includes(design.id)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              <Heart
                className={`w-4 h-4 ${
                  favorites.includes(design.id) ? "fill-current" : ""
                }`}
              />
            </button>
            <button
              onClick={() => setSelectedDesign(design)}
              className="p-2 bg-white/90 rounded-full shadow hover:scale-110 transition-transform"
              title="View Details"
            >
              <Eye className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {design.isBestPick && (
            <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Crown className="w-3 h-3" />
              Best
            </div>
          )}
          {favorites.includes(design.id) && (
            <div className="bg-pink-500 text-white p-1 rounded-full">
              <Heart className="w-3 h-3 fill-current" />
            </div>
          )}
        </div>
      </div>

      {/* Design Info */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3
            className={`font-main font-semibold text-lg leading-tight ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {design.specs.style}
          </h3>
          <div
            className={`flex items-center gap-1 text-xs ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <Calendar className="w-3 h-3" />
            {formatDate(design.timestamp)}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          <span className="tag-pill bg-pink-100 text-pink-800 text-xs px-2 py-1">
            {design.specs.fabric}
          </span>
          <span className="tag-pill bg-purple-100 text-purple-800 text-xs px-2 py-1">
            {design.specs.mood}
          </span>
          <span className="tag-pill bg-blue-100 text-blue-800 text-xs px-2 py-1">
            {design.specs.season}
          </span>
        </div>

        {/* Color and Quick Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: design.specs.mainColor }}
            ></div>
            <span
              className={`text-xs font-main ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {design.specs.colorTheme}
            </span>
          </div>
          <span
            className={`text-xs font-main ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Size {design.specs.modelSize}
          </span>
        </div>

        {/* Quirky Caption */}
        <p
          className={`text-xs italic font-main ${
            darkMode ? "text-gray-400" : "text-gray-500"
          } line-clamp-2`}
        >
          "{design.specs.quirkyCaption}"
        </p>
      </div>
    </div>
  );

  const ListCard = ({ design }: { design: FashionDesign }) => (
    <div
      className={`design-card relative ${
        darkMode ? "bg-gray-800/60" : "bg-white/80"
      } rounded-2xl p-6 hover-scale group backdrop-blur-sm border ${
        darkMode ? "border-gray-700/50" : "border-gray-200/50"
      } shadow-lg hover:shadow-2xl transition-all duration-300`}
    >
      <div className="flex gap-6">
        {/* Image */}
        <div className="relative flex-shrink-0">
          <img
            src={design.imageUrl}
            alt="Fashion Design"
            className="w-32 h-40 object-cover rounded-xl cursor-pointer"
            onClick={() => setSelectedDesign(design)}
          />

          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {design.isBestPick && (
              <div className="bg-yellow-500 text-white px-1 py-0.5 rounded text-xs">
                <Crown className="w-3 h-3" />
              </div>
            )}
            {favorites.includes(design.id) && (
              <div className="bg-pink-500 text-white p-0.5 rounded">
                <Heart className="w-3 h-3 fill-current" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3
                className={`font-main font-bold text-xl mb-2 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {design.specs.style}
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="tag-pill bg-pink-100 text-pink-800 text-xs">
                  {design.specs.fabric}
                </span>
                <span className="tag-pill bg-purple-100 text-purple-800 text-xs">
                  {design.specs.mood}
                </span>
                <span className="tag-pill bg-blue-100 text-blue-800 text-xs">
                  {design.specs.season}
                </span>
                <span className="tag-pill bg-green-100 text-green-800 text-xs">
                  Size {design.specs.modelSize}
                </span>
              </div>
            </div>

            <div
              className={`text-right text-xs ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <div className="flex items-center gap-1 mb-2">
                <Calendar className="w-3 h-3" />
                {formatDate(design.timestamp)}
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: design.specs.mainColor }}
                ></div>
                <span>{design.specs.colorTheme}</span>
              </div>
            </div>
          </div>

          <p
            className={`text-sm font-main ${
              darkMode ? "text-gray-300" : "text-gray-600"
            } line-clamp-2`}
          >
            {design.specs.description}
          </p>

          <p
            className={`text-sm italic font-main ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            "{design.specs.quirkyCaption}"
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => downloadImage(design.imageUrl, design.specs.style)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={() => toggleFavorite(design.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                favorites.includes(design.id)
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${favorites.includes(design.id) ? "fill-current" : ""}`}
              />
              {favorites.includes(design.id) ? "Favorited" : "Favorite"}
            </button>
            <button
              onClick={() => setSelectedDesign(design)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                darkMode
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-purple-500 hover:bg-purple-600 text-white"
              }`}
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`${
          darkMode ? "glassmorphism-dark" : "glassmorphism"
        } rounded-3xl w-full max-w-7xl max-h-[90vh] overflow-hidden`}
      >
        {/* Header */}
        <div
          className={`p-6 border-b ${
            darkMode ? "border-gray-600" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Palette
                className={`w-6 h-6 ${darkMode ? "text-pink-400" : "text-pink-600"}`}
              />
              <h2
                className={`font-title font-bold text-2xl ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Design Gallery
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-main ${
                  darkMode
                    ? "bg-purple-600 text-white"
                    : "bg-pink-100 text-pink-800"
                }`}
              >
                {filteredDesigns.length} designs
              </span>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                darkMode
                  ? "hover:bg-gray-700 text-gray-300"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="Search designs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg border-0 font-main text-sm ${
                  darkMode
                    ? "bg-gray-700 text-white placeholder-gray-400"
                    : "bg-gray-100 text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <Filter
                className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className={`font-main text-sm rounded-lg px-3 py-2 border-0 ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <option value="all">All Designs</option>
                <option value="favorites">
                  Favorites ({favorites.length})
                </option>
                <option value="recent">Recent (24h)</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={`font-main text-sm rounded-lg px-3 py-2 border-0 ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="style">By Style</option>
                <option value="mood">By Mood</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid" ? "bg-white dark:bg-gray-600 shadow" : ""
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list" ? "bg-white dark:bg-gray-600 shadow" : ""
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {filteredDesigns.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎨</div>
              <p
                className={`text-lg font-main ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {searchTerm
                  ? `No designs found matching "${searchTerm}"`
                  : filterBy === "favorites"
                    ? "No favorite designs yet. Heart some designs to see them here!"
                    : filterBy === "recent"
                      ? "No recent designs. Create some new ones!"
                      : "No designs yet. Start creating to build your gallery!"}
              </p>
            </div>
          ) : (
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-6"
              }`}
            >
              {filteredDesigns.map((design) =>
                viewMode === "grid" ? (
                  <GridCard key={design.id} design={design} />
                ) : (
                  <ListCard key={design.id} design={design} />
                ),
              )}
            </div>
          )}
        </div>
      </div>

      {/* Design Detail Modal */}
      {selectedDesign && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div
            className={`${
              darkMode ? "glassmorphism-dark" : "glassmorphism"
            } rounded-3xl max-w-4xl max-h-[90vh] overflow-hidden`}
          >
            {/* Modal Header */}
            <div
              className={`p-6 border-b ${darkMode ? "border-gray-600" : "border-gray-200"} flex items-center justify-between`}
            >
              <h3
                className={`font-title font-bold text-xl ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                {selectedDesign.specs.style}
              </h3>
              <button
                onClick={() => setSelectedDesign(null)}
                className={`p-2 rounded-full transition-colors ${
                  darkMode
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image */}
                <div className="relative">
                  <img
                    src={selectedDesign.imageUrl}
                    alt="Fashion Design"
                    className="w-full h-auto max-h-96 object-cover rounded-2xl"
                  />
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() =>
                        downloadImage(
                          selectedDesign.imageUrl,
                          selectedDesign.specs.style,
                        )
                      }
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-main ${
                        darkMode
                          ? "bg-purple-600 hover:bg-purple-700 text-white"
                          : "bg-purple-500 hover:bg-purple-600 text-white"
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedDesign.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-main ${
                        favorites.includes(selectedDesign.id)
                          ? "bg-pink-500 text-white hover:bg-pink-600"
                          : darkMode
                            ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${favorites.includes(selectedDesign.id) ? "fill-current" : ""}`}
                      />
                      {favorites.includes(selectedDesign.id)
                        ? "Favorited"
                        : "Add to Favorites"}
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h4
                      className={`font-main font-semibold mb-3 ${darkMode ? "text-pink-300" : "text-pink-600"}`}
                    >
                      Basic Information
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span
                          className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Style:
                        </span>
                        <span
                          className={`ml-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {selectedDesign.specs.style}
                        </span>
                      </div>
                      <div>
                        <span
                          className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Fabric:
                        </span>
                        <span
                          className={`ml-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {selectedDesign.specs.fabric}
                        </span>
                      </div>
                      <div>
                        <span
                          className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Mood:
                        </span>
                        <span
                          className={`ml-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {selectedDesign.specs.mood}
                        </span>
                      </div>
                      <div>
                        <span
                          className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Season:
                        </span>
                        <span
                          className={`ml-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {selectedDesign.specs.season}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  {selectedDesign.specs.detailedBreakdown && (
                    <div>
                      <h4
                        className={`font-main font-semibold mb-3 flex items-center gap-2 ${darkMode ? "text-pink-300" : "text-pink-600"}`}
                      >
                        <Shirt className="w-4 h-4" />
                        Complete Look
                      </h4>
                      <div className="space-y-2 text-sm">
                        {selectedDesign.specs.detailedBreakdown.upperWear && (
                          <div>
                            <span className={`font-semibold text-pink-500`}>
                              Upper:
                            </span>
                            <span
                              className={`ml-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              {selectedDesign.specs.detailedBreakdown.upperWear}
                            </span>
                          </div>
                        )}
                        {selectedDesign.specs.detailedBreakdown.lowerWear && (
                          <div>
                            <span className={`font-semibold text-purple-500`}>
                              Lower:
                            </span>
                            <span
                              className={`ml-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              {selectedDesign.specs.detailedBreakdown.lowerWear}
                            </span>
                          </div>
                        )}
                        {selectedDesign.specs.detailedBreakdown.shoes && (
                          <div>
                            <span className={`font-semibold text-blue-500`}>
                              Shoes:
                            </span>
                            <span
                              className={`ml-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              {selectedDesign.specs.detailedBreakdown.shoes}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Styling Notes */}
                  <div>
                    <h4
                      className={`font-main font-semibold mb-3 ${darkMode ? "text-pink-300" : "text-pink-600"}`}
                    >
                      Styling Notes
                    </h4>
                    <p
                      className={`text-sm mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {selectedDesign.specs.stylingTip}
                    </p>
                    <p
                      className={`text-sm italic ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      "{selectedDesign.specs.quirkyCaption}"
                    </p>
                  </div>

                  {/* Created */}
                  <div
                    className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"} border-t pt-3 ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                  >
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Created {formatDate(selectedDesign.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
