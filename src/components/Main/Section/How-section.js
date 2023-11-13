import screen1 from "../../image/screen/screen-1.png";
import screen2 from "../../image/screen/screen-2.png";
import screen3 from "../../image/screen/screen-3.png";
import { steps, feature } from "./context";
const img = [screen1, screen2, screen3];

export default function How() {
  return (
    <section className="section-how" id="how">
      <div className="how-container">
        <span className="subheading">How it works</span>
        <h2 className="small-margin">
          Your daily dose of health in 3 simple steps
        </h2>
      </div>
      <Step data={steps} order={img} />
    </section>
  );
}

function Step({ data, order }) {
  return (
    <div className="how-container grid grid--2--cols grid--center--v">
      {data.map((el, i) => (
        <>
          {i % 2 === 0 ? ( // Check if i is even
            <>
              <StepItem
                title={el.title}
                text={el.text}
                num={i}
                key={el.title}
              />
              <StepImage order={order[i]} />
            </>
          ) : (
            // i is odd
            <>
              <StepImage order={order[i]} />
              <StepItem
                title={el.title}
                text={el.text}
                num={i}
                key={el.title}
              />
            </>
          )}
        </>
      ))}
    </div>
  );
}

function StepItem({ num, title, text }) {
  return (
    <div className="step-text-box">
      <p className="step-number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <h3 className="heading-tertiary">{title}</h3>
      <p className="step-description">{text}</p>
    </div>
  );
}

function StepImage({ order }) {
  console.log(order);
  return (
    <div className="step-img-box">
      <img
        src={order}
        className="step-img"
        alt="iPhone app preferences selection screen"
      />
    </div>
  );
}
