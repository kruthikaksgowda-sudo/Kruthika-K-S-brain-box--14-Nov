import React, { useState } from "react";

export default function App() {
  const [announcements, setAnnouncements] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    date: "",
    image: "",
  });

  // 🔹 Convert date to readable text: 2025-07-25 → "25 July 2025"
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, image: url });
    }
  };

  const publishAnnouncement = () => {
    if (!formData.title || !formData.desc || !formData.date)
      return alert("Fill all fields");

    setAnnouncements([formData, ...announcements]);
    setFormData({ title: "", desc: "", date: "", image: "" });
  };

  return (
    <>
      <style>{`
        * { 
          box-sizing: border-box; 
          font-family: 'Inter', sans-serif; 
        }

        body { 
          margin: 0; 
          background: #b383ff33; 
        }

        .board-area {
          max-width: 1300px;
          margin: 30px auto;
          background: #f7f0ff;
          border-radius: 22px;
          padding: 35px;
          box-shadow: 0px 12px 35px rgba(0,0,0,0.12);
          border: 2px solid #b383ff;
        }

        .header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .title-main {
          font-size: 34px;
          font-weight: 700;
          color: #7b2fff;
        }

        .address {
          color: #7b2fff;
          font-size: 22px;
          font-weight: 600;
        }

        .datetime {
          font-size: 14px;
          color: #9e6bff;
          margin-top: 3px;
          text-align: right;
        }

        .grid {
          margin-top: 35px;
          display: grid;
          gap: 30px;
          grid-template-columns: 1.4fr 1fr;
        }

        .card {
          background: #efe4ff;
          padding: 20px;
          border-radius: 18px;
          border: 1px solid #b383ff;
        }

        .section-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #7b2fff;
        }

        .ann-title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #7b2fff;
        }

        .announcement-item {
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 1px solid #b383ff;
        }

        .announcement-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 10px;
          border: 1px solid #b383ff;
        }

        .bottom-grid {
          margin-top: 35px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .form-input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #b383ff;
          margin-bottom: 12px;
          font-size: 15px;
          background: #f9f2ff;
        }

        .btn {
          background: #7b2fff;
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          cursor: pointer;
          width: 100%;
          transition: 0.2s;
        }

        .btn:hover {
          background: #6a29e0;
        }
      `}</style>

      <div className="board-area">
        
        {/* HEADER */}
        <div className="header-flex">
          <div className="title-main">Announcements Board</div>
          <div>
            <div className="address">Muntaner, 256</div>
            <div className="datetime">Fri July 25 · 2:59 PM</div>
          </div>
        </div>

        {/* 2 COLUMN */}
        <div className="grid">

          {/* LEFT SIDE LIST */}
          <div>
            <div className="card">
              <div className="ann-title">Announcements</div>

              {announcements.length === 0 && (
                <p style={{ color: "#804dff" }}>No announcements yet.</p>
              )}

              {announcements.map((a, index) => (
                <div className="announcement-item" key={index}>
                  {a.image && <img src={a.image} alt="announcement" />}
                  <h3 style={{ color: "#7b2fff" }}>{a.title}</h3>
                  <p style={{ color: "#6b3fe6" }}>{a.desc}</p>

                  {/* 🔹 Display formatted date */}
                  <small style={{ color: "#9e6bff" }}>
                    {formatDate(a.date)}
                  </small>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div>
            <div className="card">
              <div className="section-title">Add Announcement</div>

              <input
                className="form-input"
                placeholder="Announcement Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <textarea
                className="form-input"
                placeholder="Description"
                rows="4"
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
              ></textarea>

              <input
                className="form-input"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />

              <input
                type="file"
                accept="image/*"
                className="form-input"
                onChange={handleImageUpload}
              />

              <button className="btn" onClick={publishAnnouncement}>
                Publish
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="bottom-grid">
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "35px", fontWeight: "700", color: "#7b2fff" }}>
              20°
            </div>
            <div style={{ color: "#7b2fff" }}>Barcelona</div>
            <div style={{ fontSize: "13px", color: "#9e6bff" }}>
              Max 25°, Min 18°
            </div>
          </div>

          <div className="card">
            <div className="section-title">Contact Information</div>

            <p style={{ color: "#7b2fff" }}>
              <strong>Building president</strong>
              <br />
              Joan Puig – 1r 4a
              <br />
              612 345 678
            </p>

            <p style={{ color: "#7b2fff" }}>
              <strong>Property management</strong>
              <br />
              Finques Barcelona
              <br />
              622 345 678
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
