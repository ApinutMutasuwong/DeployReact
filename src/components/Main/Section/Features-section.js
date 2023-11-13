import icon1 from "../../image/icon/icon-1.png";
import icon2 from "../../image/icon/icon-2.png";
import icon3 from "../../image/icon/icon-3.png";
import { steps, feature } from "./context";

const icon = [icon1, icon2, icon3];
export default function Features() {
  return (
    <section className="section-features">
      <div className="features-container center-text">
        <span className="subheading">Features</span>
        <h2 className="heading-secondary">Our Features & Services</h2>
      </div>
      <Feature data={feature} order={icon} />
    </section>
  );
}

function Feature({ data, order }) {
  return (
    <div className="features-container grid grid--3--cols">
      {data.map((el, i) => (
        <FeaturesItem title={el.title} text={el.text} order={order[i]} />
      ))}
    </div>
  );
}

function FeaturesItem({ title, text, order }) {
  return (
    <div className="features-box">
      <img src={order} className="icon-img" alt="iCon" />
      <h3 className="features-heading heading-color">{title}</h3>
      <p className="features-description">{text}</p>
    </div>
  );
}
