import React, { useState } from "react";
import "../AdminDashboard.css";
import "./GalleryAdmin.css";
import logo from "../assets/2.png"; // Use your logo
import parisImg from "../assets/paris.png";
import londonImg from "../assets/london.png";

const initialGallery = [
  {
    id: 1,
    destination: "Paris",
    url: parisImg,
  },
  {
    id: 2,
    destination: "London",
    url: londonImg,
  },
];

const GalleryAdmin = ({ onBack }) => {
  const [gallery, setGallery] = useState(initialGallery);
  const [showAddGallery, setShowAddGallery] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ destination: "", url: null });
  const [galleryImagePreview, setGalleryImagePreview] = useState(null);
  const [editingGallery, setEditingGallery] = useState(null);
  const [editGalleryForm, setEditGalleryForm] = useState({
    destination: "",
    url: null,
    imagePreview: ""
  });

  // Image upload
  const handleGalleryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGalleryForm({ ...galleryForm, url: file });
      setGalleryImagePreview(URL.createObjectURL(file));
    }
  };

  // Add Gallery
  const handleAddGallery = (e) => {
    e.preventDefault();
    if (!galleryForm.destination || !galleryForm.url) return;
    const newGallery = {
      id: Date.now(),
      destination: galleryForm.destination,
      url: galleryImagePreview,
    };
    setGallery([newGallery, ...gallery]);
    setShowAddGallery(false);
    setGalleryForm({ destination: "", url: null });
    setGalleryImagePreview(null);
  };

  // Update Gallery
  const handleUpdateGallery = (galleryItem) => {
    setEditingGallery(galleryItem);
    setEditGalleryForm({
      destination: galleryItem.destination,
      url: null,
      imagePreview: galleryItem.url
    });
  };

  // Delete Gallery
  const handleDeleteGallery = (id) => {
    setGallery(gallery.filter(g => g.id !== id));
  };

  return (
    <section className="gallery-section" style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">All Gallery Photos</h2>
          <div className="title-underline mx-auto"></div>
        </div>
        <div className="admin-main-row">
          <div className="admin-header-actions">
            <button className="admin-back-btn" onClick={onBack}>Back to Dashboard</button>
            <button className="admin-action-btn" onClick={() => setShowAddGallery(true)}>+ Add Photo</button>
          </div>
          <div className="gallery-grid">
            {gallery.map(g => (
              <div className="gallery-card" key={g.id}>
                <div className="gallery-image-wrapper">
                  <img src={g.url} alt={g.destination} />
                  <div className="gallery-overlay">
                    <img src={logo} alt="Logo" className="gallery-icon" />
                  </div>
                </div>
                <div className="gallery-title">{g.destination}</div>
                <div className="gallery-actions">
                  <button className="admin-update-btn" onClick={() => handleUpdateGallery(g)}>Update</button>
                  <button className="admin-delete-btn" onClick={() => handleDeleteGallery(g.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {showAddGallery && (
          <div className="admin-overlay">
            <div className="admin-overlay-form">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <button className="admin-back-btn" onClick={() => setShowAddGallery(false)}>
                  ← Cancel
                </button>
                <h2 className="admin-form-title">Add Photo</h2>
                <span style={{ minWidth: 180 }}></span>
              </div>
              <form className="row g-3 mb-5" onSubmit={handleAddGallery}>
                <div className="col-md-6">
                  <label className="form-label">Destination</label>
                  <input
                    type="text"
                    className="form-control"
                    value={galleryForm.destination}
                    onChange={e => setGalleryForm({ ...galleryForm, destination: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleGalleryImageChange}
                    required
                  />
                  {galleryImagePreview && (
                    <img
                      src={galleryImagePreview}
                      alt="Preview"
                      style={{ width: "100%", marginTop: 10, borderRadius: 8, objectFit: "cover", height: 120 }}
                    />
                  )}
                </div>
                <div className="col-12 text-end">
                  <button type="submit" className="admin-action-btn" style={{ marginRight: 8 }}>
                    Add
                  </button>
                  <button
                    type="button"
                    className="admin-action-btn"
                    style={{ background: "#eee", color: "#333" }}
                    onClick={() => {
                      setShowAddGallery(false);
                      setGalleryImagePreview(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Update Overlay */}
        {editingGallery && (
          <div className="admin-overlay">
            <div className="admin-overlay-form">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <button className="admin-back-btn" onClick={() => setEditingGallery(null)}>
                  ← Cancel
                </button>
                <h2 className="admin-form-title">Update Photo</h2>
                <span style={{ minWidth: 180 }}></span>
              </div>
              <form className="row g-3 mb-5" onSubmit={handleUpdateGallery}>
                <div className="col-md-6">
                  <label className="form-label">Destination</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editGalleryForm.destination}
                    onChange={e => setEditGalleryForm({ ...editGalleryForm, destination: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={e => {
                      const file = e.target.files[0];
                      setEditGalleryForm({
                        ...editGalleryForm,
                        url: file,
                        imagePreview: file ? URL.createObjectURL(file) : editGalleryForm.imagePreview
                      });
                    }}
                  />
                  {editGalleryForm.imagePreview && (
                    <img
                      src={editGalleryForm.imagePreview}
                      alt="Preview"
                      style={{ width: "100%", marginTop: 10, borderRadius: 8, objectFit: "cover", height: 120 }}
                    />
                  )}
                </div>
                <div className="col-12 text-end">
                  <button type="submit" className="admin-action-btn" style={{ marginRight: 8 }}>
                    Update
                  </button>
                  <button
                    type="button"
                    className="admin-action-btn"
                    style={{ background: "#eee", color: "#333" }}
                    onClick={() => setEditingGallery(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryAdmin;