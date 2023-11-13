import "./section-style.css";
import "./section-queries.css";
import object1 from "../../image/toilet-paper.png";
import Intro from "./Intro-section";
import How from "./How-section";
import Features from "./Features-section";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';

export default function Section() {
  const navigate = useNavigate();

  const LinktoShare = () => {
    navigate('/share');
  };

  const LinktoFind = () => {
    navigate('/find');
  };

  return (
    <>
      <div className="hero-section">
        <h1 className="heading-primary">
          <span className="heading-main">Poop Prom</span>
          <span className="heading-sub">Your best toilet finder</span>
        </h1>
        <div className="hero-btn-box">
          <button onClick = {LinktoFind} className="hero-btn mr">Find</button>
          <button onClick = {LinktoShare} className="hero-btn share">Share</button>
        </div>
      </div>

      <Intro />
      <How />
      <Features />

      <section className="section-cta">
        <div className="container">
          <div className="cta">
            <div className="cta-text-box">
              <h2 className="heading-secondary">
                Register Your Toilet Facility Today!
              </h2>
              <p className="cta-text">
                Register your toilet facility today and join hundreds of
                businesses making a difference in our community. Help users find
                your facility easily, promote your business, and contribute to
                better access to clean restrooms.
              </p>
              <button onClick = {LinktoShare} className="cta-btn">Share Now !</button>
            </div>
            <div className="cta-img-box" aria-label="map img">
              <img className="obj-img" src={object1} alt="toilet paper" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
