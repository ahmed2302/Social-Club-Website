import { useContext, useEffect, useState } from "react";
import { SideBarContext } from "../Context/SideBarContext";

export default function ThemesPopup() {
  const { linksState, setLinksState } = useContext(SideBarContext);
  const [activeSize, setActiveSize] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  });

  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize");
    const savedTopRight = localStorage.getItem("topRight");
    const savedTopLeft = localStorage.getItem("topLeft");
    if (savedFontSize) {
      document.documentElement.style.fontSize = savedFontSize;
    }
    if (savedFontSize) {
      document.documentElement.style.setProperty(
        "--sticky-top-left",
        savedTopRight
      );
    }
    if (savedFontSize) {
      document.documentElement.style.setProperty(
        "--sticky-top-right",
        savedTopLeft
      );
    }
  }, []);

  function handleSize(e) {
    setActiveSize({
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
    });
    setActiveSize((prev) => ({
      ...prev,
      [e.target.title]: true,
    }));

    let newFontSize;
    let topLeft, topRight;

    switch (e.target.classList[0]) {
      case "font-size-1":
        newFontSize = "10px";
        topLeft = "5.4rem";
        topRight = "5.4rem";
        break;
      case "font-size-2":
        newFontSize = "13px";
        topLeft = "5.4rem";
        topRight = "-7rem";
        break;
      case "font-size-3":
        newFontSize = "16px";
        topLeft = "-2rem";
        topRight = "-17rem";
        break;
      case "font-size-4":
        newFontSize = "19px";
        topLeft = "-5rem";
        topRight = "-25rem";
        break;
      case "font-size-5":
        newFontSize = "22px";
        topLeft = "-12rem";
        topRight = "-35rem";
        break;
      default:
        newFontSize = "16px";
        topLeft = "0rem";
        topRight = "0rem";
    }

    document.documentElement.style.fontSize = newFontSize;
    document.documentElement.style.setProperty("--sticky-top-left", topLeft);
    document.documentElement.style.setProperty("--sticky-top-right", topRight);
    localStorage.setItem("fontSize", newFontSize);
    localStorage.setItem("topRight", topRight);
    localStorage.setItem("topLeft", topLeft);
  }

  // ==============================================================

  const [activeColor, setActiveColor] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  });

  useEffect(() => {
    const savedColor = localStorage.getItem("color");
    if (savedColor) {
      document.documentElement.style.setProperty(
        "--primary-color-hue",
        savedColor
      );
    }
  }, []);

  function handleColor(e) {
    setActiveColor({
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
    });
    setActiveColor((prev) => ({
      ...prev,
      [e.target.title]: true,
    }));

    let newColor;

    switch (e.target.classList[0]) {
      case "color-1":
        newColor = 252;

        break;
      case "color-2":
        newColor = 52;

        break;
      case "color-3":
        newColor = 352;

        break;
      case "color-4":
        newColor = 152;

        break;
      case "color-5":
        newColor = 202;

        break;
      default:
        newColor = 252;
    }
    window.localStorage.setItem("color", newColor);
    document.documentElement.style.setProperty("--primary-color-hue", newColor);
  }

  // ==============================================================

  const [activeTheme, setActiveTheme] = useState({
    one: false,
    two: false,
    three: false,
  });

  useEffect(() => {
    let lightColorLightness = localStorage.getItem("lightColorLightness");
    let whiteColorLightness = localStorage.getItem("whiteColorLightness");
    let darkColorLightness = localStorage.getItem("darkColorLightness");
    if (lightColorLightness) {
      document.documentElement.style.setProperty(
        "--light-color-lightness",
        lightColorLightness
      );
    }

    if (whiteColorLightness) {
      document.documentElement.style.setProperty(
        "--white-color-lightness",
        whiteColorLightness
      );
    }

    if (darkColorLightness) {
      document.documentElement.style.setProperty(
        "--dark-color-lightness",
        darkColorLightness
      );
    }
  }, []);

  function handlTheme(e) {
    setActiveTheme({
      one: false,
      two: false,
      three: false,
    });
    setActiveTheme((prev) => ({
      ...prev,
      [e.target.title]: true,
    }));

    let lightColorLightness;
    let whiteColorLightness;
    let darkColorLightness;

    switch (e.target.classList[0]) {
      case "bg-1":
        darkColorLightness = "17%";
        lightColorLightness = "95%";
        whiteColorLightness = "100%";
        break;
      case "bg-2":
        darkColorLightness = "95%";
        whiteColorLightness = "20%";
        lightColorLightness = "15%";

        break;
      case "bg-3":
        darkColorLightness = "95%";
        whiteColorLightness = "10%";
        lightColorLightness = "0%";

        break;
      default:
        darkColorLightness = "95%";
        whiteColorLightness = "20%";
        lightColorLightness = "15%";
    }
    document.documentElement.style.setProperty(
      "--light-color-lightness",
      lightColorLightness
    );
    document.documentElement.style.setProperty(
      "--white-color-lightness",
      whiteColorLightness
    );
    document.documentElement.style.setProperty(
      "--dark-color-lightness",
      darkColorLightness
    );
    localStorage.setItem("lightColorLightness", lightColorLightness);
    localStorage.setItem("whiteColorLightness", whiteColorLightness);
    localStorage.setItem("darkColorLightness", darkColorLightness);
  }

  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains("customize-theme")) {
          setLinksState((prev) => ({
            ...prev,
            theme: false,
          }));
        }
      }}
      className={
        linksState.theme ? "customize-theme active" : "customize-theme"
      }>
      <div className="card">
        <h2>Customize your view</h2>
        <p className="text-muted">
          Manage your font size, color, and background
        </p>
        {/*--------- FONT SIZE ---------*/}
        <div className="font-size">
          <h4>Font Size</h4>
          <div>
            <h6>Aa</h6>
            <div className="choose-size">
              <span
                onClick={handleSize}
                title="one"
                className={
                  activeSize.one ? "font-size-1 active" : "font-size-1"
                }
              />
              <span
                onClick={handleSize}
                title="two"
                className={
                  activeSize.two ? "font-size-2 active" : "font-size-2"
                }
              />
              <span
                onClick={handleSize}
                title="three"
                className={
                  activeSize.three ? "font-size-3 active" : "font-size-3"
                }
              />
              <span
                onClick={handleSize}
                title="four"
                className={
                  activeSize.four ? "font-size-4 active" : "font-size-4"
                }
              />
              <span
                onClick={handleSize}
                title="five"
                className={
                  activeSize.five ? "font-size-5 active" : "font-size-5"
                }
              />
            </div>
            <h3>Aa</h3>
          </div>
        </div>
        {/*--------- PRIMARY COLORS ---------*/}
        <div className="color">
          <h4>Color</h4>
          <div className="choose-color">
            <span
              onClick={handleColor}
              title="one"
              className={activeColor.one ? "color-1 active" : "color-1"}
            />
            <span
              onClick={handleColor}
              title="two"
              className={activeColor.two ? "color-2 active" : "color-2"}
            />
            <span
              onClick={handleColor}
              title="three"
              className={activeColor.three ? "color-3 active" : "color-3"}
            />
            <span
              onClick={handleColor}
              title="four"
              className={activeColor.four ? "color-4 active" : "color-4"}
            />
            <span
              onClick={handleColor}
              title="five"
              className={activeColor.five ? "color-5 active" : "color-5"}
            />
          </div>
        </div>
        {/*--------- BACKGROUND COLORS ---------*/}
        <div className="background">
          <h4>Background</h4>
          <div className="choose-bg">
            <div
              onClick={handlTheme}
              title="one"
              className={activeTheme.one ? "bg-1 active" : "bg-1"}>
              <span />
              <h5 htmlFor="bg-1">Light</h5>
            </div>
            <div
              onClick={handlTheme}
              title="two"
              className={activeTheme.two ? "bg-2 active" : "bg-2"}>
              <span />
              <h5 htmlFor="bg-2">Dim</h5>
            </div>
            <div
              onClick={handlTheme}
              title="three"
              className={activeTheme.three ? "bg-3 active" : "bg-3"}>
              <span />
              <h5 htmlFor="bg-3">Dark</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
