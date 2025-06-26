import React, { useState } from "react";
import BlogsAdmin from "./admin/BlogsAdmin";
import TestimonialsAdmin from "./admin/TestimonialsAdmin";
import GalleryAdmin from "./admin/GalleryAdmin";
import "./AdminDashboard.css";

const AdminDashboard = () => {
	const [section, setSection] = useState(null);

	// Initial three big buttons
	if (!section) {
		return (
			<div className="admin-dashboard-bg" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}>
				<h1 className="admin-main-title">Welcome, Admin!</h1>
				<div className="admin-big-btn-group">
					<button className="admin-big-btn blogs" onClick={() => setSection("blogs")}>
						Blogs
					</button>
					<button className="admin-big-btn testimonials" onClick={() => setSection("testimonials")}>
						Testimonials
					</button>
					<button className="admin-big-btn gallery" onClick={() => setSection("gallery")}>
						Gallery
					</button>
				</div>
			</div>
		);
	}

	// Section view
	if (section === "blogs") return <BlogsAdmin onBack={() => setSection(null)} />;
	if (section === "testimonials") return <TestimonialsAdmin onBack={() => setSection(null)} />;
	if (section === "gallery") return <GalleryAdmin onBack={() => setSection(null)} />;

	return null;
};

export default AdminDashboard;
