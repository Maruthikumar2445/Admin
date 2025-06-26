import React, { useState } from "react";
import "../AdminDashboard.css";
import "./TestimonialsAdmin.css";
import bharathImg from "../assets/Bharath Kannan.png";
import vijayImg from "../assets/Vijayaraghavan Venkatadri.png";

const initialTestimonials = [
  {
    id: 1,
    image: bharathImg,
    name: "Bharath Kannan",
    role: "Adventure Traveler",
    quote: "Kudos FrugalTrail! We as a family of 6 had an effortless and cozy first time international trip to Malaysia organised by Frugal trail.",
    rating: 5,
    location: "Swiss Alps Tour",
  },
  {
    id: 2,
    image: vijayImg,
    name: "Vijayaraghavan Venkatadri",
    role: "Family Tourist",
    quote: "Expert Guidance That Felt Personal. Monish is an exceptional travel explorer and the ultimate go-to person for travel guidance.",
    rating: 5,
    location: "Bali Adventure",
  },
];

const TestimonialsAdmin = ({ onBack }) => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "",
    quote: "",
    rating: 5,
    location: "",
    image: null,
  });
  const [testimonialImagePreview, setTestimonialImagePreview] = useState(null);

  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editTestimonialForm, setEditTestimonialForm] = useState({
    name: "",
    role: "",
    quote: "",
    rating: 5,
    location: "",
    image: null,
    imagePreview: "",
  });

  // Image upload for add
  const handleTestimonialImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTestimonialForm({ ...testimonialForm, image: file });
      setTestimonialImagePreview(URL.createObjectURL(file));
    }
  };

  // Image upload for edit
  const handleEditTestimonialImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditTestimonialForm({
        ...editTestimonialForm,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  // Add Testimonial
  const handleAddTestimonial = (e) => {
    e.preventDefault();
    if (
      !testimonialForm.name ||
      !testimonialForm.role ||
      !testimonialForm.quote ||
      !testimonialForm.image
    )
      return;
    const newTestimonial = {
      id: Date.now(),
      ...testimonialForm,
      image: testimonialImagePreview,
    };
    setTestimonials([newTestimonial, ...testimonials]);
    setShowAddTestimonial(false);
    setTestimonialForm({
      name: "",
      role: "",
      quote: "",
      rating: 5,
      location: "",
      image: null,
    });
    setTestimonialImagePreview(null);
  };

  // Open Edit Overlay
  const handleEditClick = (t) => {
    setEditingTestimonial(t);
    setEditTestimonialForm({
      name: t.name,
      role: t.role,
      quote: t.quote,
      rating: t.rating,
      location: t.location,
      image: null,
      imagePreview: t.image,
    });
  };

  // Update Testimonial
  const handleUpdateTestimonial = (e) => {
    e.preventDefault();
    const updatedTestimonial = {
      ...editingTestimonial,
      name: editTestimonialForm.name,
      role: editTestimonialForm.role,
      quote: editTestimonialForm.quote,
      rating: editTestimonialForm.rating,
      location: editTestimonialForm.location,
      image: editTestimonialForm.imagePreview || editingTestimonial.image,
    };
    setTestimonials(
      testimonials.map((t) =>
        t.id === updatedTestimonial.id ? updatedTestimonial : t
      )
    );
    setEditingTestimonial(null);
    setEditTestimonialForm({
      name: "",
      role: "",
      quote: "",
      rating: 5,
      location: "",
      image: null,
      imagePreview: "",
    });
  };

  // Delete Testimonial
  const handleDeleteTestimonial = (id) =>
    setTestimonials(testimonials.filter((t) => t.id !== id));

  return (
    <section className="testimonials py-5" style={{ minHeight: "100vh" }}>
      <div className="bg-pattern"></div>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">All Testimonials</h2>
          <div className="title-underline mx-auto"></div>
        </div>
        <div className="admin-main-row">
          <div className="admin-header-actions">
            <button className="admin-back-btn" onClick={onBack}>
              Back to Dashboard
            </button>
            <button
              className="admin-action-btn"
              onClick={() => setShowAddTestimonial(true)}
            >
              + Add Testimonial
            </button>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div className="testimonial-card" key={t.id}>
                <div className="testimonial-img-wrapper">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="testimonial-img"
                  />
                </div>
                <div className="testimonial-author">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
                <div className="testimonial-content">{t.quote}</div>
                <div className="testimonial-location">{t.location}</div>
                <div className="testimonial-actions">
                  <button
                    className="admin-update-btn"
                    onClick={() => handleEditClick(t)}
                  >
                    Update
                  </button>
                  <button
                    className="admin-delete-btn"
                    onClick={() => handleDeleteTestimonial(t.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Testimonial Overlay */}
      {showAddTestimonial && (
        <div className="admin-overlay">
          <div className="admin-overlay-form">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <button
                className="admin-back-btn"
                onClick={() => setShowAddTestimonial(false)}
              >
                ← Cancel
              </button>
              <h2 className="admin-form-title">Add Testimonial</h2>
              <span style={{ minWidth: 180 }}></span>
            </div>
            <form className="row g-3 mb-5" onSubmit={handleAddTestimonial}>
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={testimonialForm.name}
                  onChange={(e) =>
                    setTestimonialForm({
                      ...testimonialForm,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={testimonialForm.role}
                  onChange={(e) =>
                    setTestimonialForm({
                      ...testimonialForm,
                      role: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Quote</label>
                <input
                  type="text"
                  className="form-control"
                  value={testimonialForm.quote}
                  onChange={(e) =>
                    setTestimonialForm({
                      ...testimonialForm,
                      quote: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={testimonialForm.location}
                  onChange={(e) =>
                    setTestimonialForm({
                      ...testimonialForm,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleTestimonialImageChange}
                  required
                />
                {testimonialImagePreview && (
                  <img
                    src={testimonialImagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      marginTop: 10,
                      borderRadius: 8,
                      objectFit: "cover",
                      height: 120,
                    }}
                  />
                )}
              </div>
              <div className="col-12 text-end">
                <button
                  type="submit"
                  className="admin-action-btn"
                  style={{ marginRight: 8 }}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="admin-action-btn"
                  style={{ background: "#eee", color: "#333" }}
                  onClick={() => setShowAddTestimonial(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Testimonial Overlay */}
      {editingTestimonial && (
        <div className="admin-overlay">
          <div className="admin-overlay-form">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <button
                className="admin-back-btn"
                onClick={() => setEditingTestimonial(null)}
              >
                ← Cancel
              </button>
              <h2 className="admin-form-title">Update Testimonial</h2>
              <span style={{ minWidth: 180 }}></span>
            </div>
            <form className="row g-3 mb-5" onSubmit={handleUpdateTestimonial}>
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editTestimonialForm.name}
                  onChange={(e) =>
                    setEditTestimonialForm({
                      ...editTestimonialForm,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={editTestimonialForm.role}
                  onChange={(e) =>
                    setEditTestimonialForm({
                      ...editTestimonialForm,
                      role: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Quote</label>
                <input
                  type="text"
                  className="form-control"
                  value={editTestimonialForm.quote}
                  onChange={(e) =>
                    setEditTestimonialForm({
                      ...editTestimonialForm,
                      quote: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={editTestimonialForm.location}
                  onChange={(e) =>
                    setEditTestimonialForm({
                      ...editTestimonialForm,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleEditTestimonialImageChange}
                />
                {editTestimonialForm.imagePreview && (
                  <img
                    src={editTestimonialForm.imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      marginTop: 10,
                      borderRadius: 8,
                      objectFit: "cover",
                      height: 120,
                    }}
                  />
                )}
              </div>
              <div className="col-12 text-end">
                <button
                  type="submit"
                  className="admin-action-btn"
                  style={{ marginRight: 8 }}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="admin-action-btn"
                  style={{ background: "#eee", color: "#333" }}
                  onClick={() => setEditingTestimonial(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsAdmin;