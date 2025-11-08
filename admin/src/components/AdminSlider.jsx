import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminSlider = () => {
  const [image, setImage] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);

  const fetchImages = async () => {
    const { data } = await axios.get("/api/slider/list");
    if (data.success) setSliderImages(data.images);
  };

  const handleUpload = async () => {
    if (!image) return alert("Select an image first");
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios.post("/api/slider/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (data.success) {
      alert("Image added!");
      fetchImages();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    await axios.delete(`/api/slider/delete/${id}`);
    fetchImages();
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Slider Images</h2>

      <div className="flex items-center gap-3 mb-5">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {sliderImages.map((img) => (
          <div key={img._id} className="relative">
            <img src={img.image} alt="" className="w-full h-40 object-cover rounded" />
            <button
              onClick={() => handleDelete(img._id)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSlider;
