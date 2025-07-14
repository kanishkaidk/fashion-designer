import React from "react";
import {
  Download,
  ExternalLink,
  Crown,
  GalleryVertical as GalleryIcon,
  Info,
  Palette,
  Shirt,
  Eye,
  Calendar,
  User,
  MapPin,
} from "lucide-react";
import { FashionDesign } from "../App";

interface OutputSectionProps {
  designs: FashionDesign[];
  darkMode: boolean;
  onShowHistory: () => void;
}

export const OutputSection: React.FC<OutputSectionProps> = ({
  designs,
  darkMode,
  onShowHistory,
}) => {
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
      // Fallback to direct download attempt
      try {
        const response = await fetch(imageUrl, {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${designName.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (fallbackError) {
        console.error("Fallback download failed:", fallbackError);
        window.open(imageUrl, "_blank");
      }
    }
  };

  const exportToFigma = () => {
    const figmaData = {
      name: "Fashion Design Export",
      type: "FRAME",
      children: designs.map((design, index) => ({
        name: `Design ${index + 1} - ${design.specs.style}`,
        type: "RECTANGLE",
        fills: [
          {
            type: "IMAGE",
            imageRef: design.imageUrl,
          },
        ],
        constraints: {
          horizontal: "LEFT",
          vertical: "TOP",
        },
        absoluteBoundingBox: {
          x: index * 300,
          y: 0,
          width: 280,
          height: 360,
        },
      })),
    };

    const dataStr = JSON.stringify(figmaData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fashion-designs-figma.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert(
      '🎨 Figma-compatible file downloaded! Import this JSON into Figma using a plugin like "JSON to Figma"',
    );
  };

  const copyDescription = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Description copied to clipboard!");
  };

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`font-title font-bold text-3xl md:text-4xl mb-4 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Your AI-Generated Designs
          </h2>
          <p
            className={`font-main text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Fresh from the digital runway, crafted just for you
          </p>

          <button
            onClick={onShowHistory}
            className={`font-main inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover-scale ${
              darkMode
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-pink-500 hover:bg-pink-600 text-white"
            }`}
          >
            <GalleryIcon className="w-4 h-4" />✨ Open Gallery
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {designs.map((design) => (
            <div
              key={design.id}
              className={`design-card relative ${
                darkMode ? "glassmorphism-dark" : "glassmorphism"
              } rounded-3xl p-6 shadow-2xl hover-scale`}
            >
              {design.isBestPick && (
                <div className="best-pick-badge flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Best Pick
                </div>
              )}

              <div className="relative group mb-6">
                <img
                  src={design.imageUrl}
                  alt="AI Fashion Design"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  style={{
                    borderColor: design.specs.mainColor,
                    borderWidth: "3px",
                    borderStyle: "solid",
                  }}
                />

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        downloadImage(design.imageUrl, design.specs.style)
                      }
                      className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                      title="Download"
                    >
                      <Download className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={exportToFigma}
                      className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                      title="Export to Figma"
                    >
                      <ExternalLink className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Image Ratio Info */}
                {design.specs.detailedBreakdown?.imageRatio && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {design.specs.detailedBreakdown.imageRatio.split(" - ")[0]}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Title and Basic Info */}
                <div>
                  <h3
                    className={`font-main font-bold text-xl mb-2 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {design.specs.style}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="tag-pill bg-pink-100 text-pink-800">
                      {design.specs.fabric}
                    </span>
                    <span className="tag-pill bg-purple-100 text-purple-800">
                      {design.specs.colorTheme}
                    </span>
                    <span className="tag-pill bg-blue-100 text-blue-800">
                      {design.specs.length}
                    </span>
                    <span className="tag-pill bg-green-100 text-green-800">
                      {design.specs.season}
                    </span>
                    <span className="tag-pill bg-yellow-100 text-yellow-800">
                      {design.specs.modelSize}
                    </span>
                    {design.specs.occasion && (
                      <span className="tag-pill bg-orange-100 text-orange-800">
                        {design.specs.occasion}
                      </span>
                    )}
                  </div>
                </div>

                {/* Color Info */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: design.specs.mainColor }}
                  ></div>
                  <span
                    className={`font-main text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {design.specs.mainColor} • {design.specs.colorTheme}
                  </span>
                </div>

                {/* Enhanced Details Section */}
                <div
                  className={`p-5 rounded-2xl ${
                    darkMode ? "bg-purple-900/30" : "bg-pink-50"
                  }`}
                >
                  {/* Complete Look Breakdown */}
                  {design.specs.detailedBreakdown && (
                    <div className="space-y-4 mb-6">
                      <h4
                        className={`font-main font-semibold text-sm flex items-center gap-2 ${
                          darkMode ? "text-pink-300" : "text-pink-600"
                        }`}
                      >
                        <Shirt className="w-4 h-4" />✨ Complete Look Breakdown
                      </h4>

                      <div className="grid grid-cols-1 gap-3 text-sm">
                        {design.specs.detailedBreakdown.upperWear && (
                          <div
                            className={`flex flex-col ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            <span className="font-semibold text-pink-500">
                              Upper Wear:
                            </span>
                            <span className="text-xs mt-1">
                              {design.specs.detailedBreakdown.upperWear}
                            </span>
                          </div>
                        )}
                        {design.specs.detailedBreakdown.lowerWear && (
                          <div
                            className={`flex flex-col ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            <span className="font-semibold text-purple-500">
                              Lower Wear:
                            </span>
                            <span className="text-xs mt-1">
                              {design.specs.detailedBreakdown.lowerWear}
                            </span>
                          </div>
                        )}
                        {design.specs.detailedBreakdown.shoes && (
                          <div
                            className={`flex flex-col ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            <span className="font-semibold text-blue-500">
                              Footwear:
                            </span>
                            <span className="text-xs mt-1">
                              {design.specs.detailedBreakdown.shoes}
                            </span>
                          </div>
                        )}
                        {design.specs.detailedBreakdown.accessories && (
                          <div
                            className={`flex flex-col ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            <span className="font-semibold text-green-500">
                              Accessories:
                            </span>
                            <span className="text-xs mt-1">
                              {design.specs.detailedBreakdown.accessories}
                            </span>
                          </div>
                        )}
                        {design.specs.detailedBreakdown.hairstyle && (
                          <div
                            className={`flex flex-col ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            <span className="font-semibold text-orange-500">
                              Hairstyle:
                            </span>
                            <span className="text-xs mt-1">
                              {design.specs.detailedBreakdown.hairstyle}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Advanced Styling Insights */}
                  {design.specs.detailedBreakdown && (
                    <div className="space-y-3 mb-5">
                      <h4
                        className={`font-main font-semibold text-sm flex items-center gap-2 ${
                          darkMode ? "text-pink-300" : "text-pink-600"
                        }`}
                      >
                        <Info className="w-4 h-4" />
                        Fashion Insights
                      </h4>

                      <div className="space-y-2 text-xs">
                        {design.specs.detailedBreakdown.colorPalette && (
                          <div
                            className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/50" : "bg-white/50"}`}
                          >
                            <p
                              className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                            >
                              <strong
                                className={`${darkMode ? "text-purple-300" : "text-purple-600"} flex items-center gap-1`}
                              >
                                <Palette className="w-3 h-3" />
                                Color Story:
                              </strong>
                              <span className="mt-1 block">
                                {design.specs.detailedBreakdown.colorPalette}
                              </span>
                            </p>
                          </div>
                        )}

                        {design.specs.detailedBreakdown.fabricDetails && (
                          <div
                            className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/50" : "bg-white/50"}`}
                          >
                            <p
                              className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                            >
                              <strong
                                className={`${darkMode ? "text-purple-300" : "text-purple-600"} flex items-center gap-1`}
                              >
                                <Eye className="w-3 h-3" />
                                Fabric Notes:
                              </strong>
                              <span className="mt-1 block">
                                {design.specs.detailedBreakdown.fabricDetails}
                              </span>
                            </p>
                          </div>
                        )}

                        {design.specs.detailedBreakdown.occasionFit && (
                          <div
                            className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/50" : "bg-white/50"}`}
                          >
                            <p
                              className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                            >
                              <strong
                                className={`${darkMode ? "text-purple-300" : "text-purple-600"} flex items-center gap-1`}
                              >
                                <MapPin className="w-3 h-3" />
                                Perfect For:
                              </strong>
                              <span className="mt-1 block">
                                {design.specs.detailedBreakdown.occasionFit}
                              </span>
                            </p>
                          </div>
                        )}

                        {design.specs.detailedBreakdown.bodyTypeNotes && (
                          <div
                            className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/50" : "bg-white/50"}`}
                          >
                            <p
                              className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                            >
                              <strong
                                className={`${darkMode ? "text-purple-300" : "text-purple-600"} flex items-center gap-1`}
                              >
                                <User className="w-3 h-3" />
                                Body Type:
                              </strong>
                              <span className="mt-1 block">
                                {design.specs.detailedBreakdown.bodyTypeNotes}
                              </span>
                            </p>
                          </div>
                        )}

                        {design.specs.detailedBreakdown.colorPsychology && (
                          <div
                            className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/50" : "bg-white/50"}`}
                          >
                            <p
                              className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                            >
                              <strong
                                className={`${darkMode ? "text-purple-300" : "text-purple-600"} flex items-center gap-1`}
                              >
                                <Eye className="w-3 h-3" />
                                Color Psychology:
                              </strong>
                              <span className="mt-1 block">
                                {design.specs.detailedBreakdown.colorPsychology}
                              </span>
                            </p>
                          </div>
                        )}

                        {design.specs.detailedBreakdown.seasonalContext && (
                          <div
                            className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/50" : "bg-white/50"}`}
                          >
                            <p
                              className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                            >
                              <strong
                                className={`${darkMode ? "text-purple-300" : "text-purple-600"} flex items-center gap-1`}
                              >
                                <Calendar className="w-3 h-3" />
                                Seasonal Styling:
                              </strong>
                              <span className="mt-1 block">
                                {design.specs.detailedBreakdown.seasonalContext}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Styling Tips */}
                  <div className="space-y-3">
                    <p
                      className={`font-main text-sm font-semibold ${
                        darkMode ? "text-pink-300" : "text-pink-600"
                      }`}
                    >
                      💡 {design.specs.stylingTip}
                    </p>

                    {design.specs.advancedStyling?.moodTip && (
                      <p
                        className={`font-main text-xs ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <strong>Mood Styling:</strong>{" "}
                        {design.specs.advancedStyling.moodTip}
                      </p>
                    )}

                    <p
                      className={`font-main text-sm italic ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      "{design.specs.quirkyCaption}"
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => copyDescription(design.specs.description)}
                  className={`font-main w-full py-3 rounded-2xl font-semibold transition-all duration-300 hover-scale ${
                    darkMode
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                  }`}
                >
                  ✨ Copy Full Description
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
