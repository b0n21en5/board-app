import React, { useState, useRef } from "react";
import { Html } from "react-konva-utils";
import { FaBold } from "react-icons/fa";
import { ImBold, ImItalic } from "react-icons/im";
import { MdFormatUnderlined } from "react-icons/md";
import { IoSquareOutline } from "react-icons/io5";
import { TbRectangleVertical } from "react-icons/tb";
import { BiCircle } from "react-icons/bi";
import { DrawingColors } from "../../utils/DrawingColor";
import { ImTextColor } from "react-icons/im";

const stickyStyleContainer = {
  display: "flex",
  justifyContent: "space-between",
  border: "2px solid black",
  borderRadius: "10px",
  gap: "10px",
  backgroundColor: "gray",
  padding: "10px",
};

const StickyStyle = ({
  section,
  selectedShape,
  setShape,
  onShapeChange,
  textAlign,
  onFontAlignChange,
  onFontWeight,
  onTextDecoration,
  onItalicChange,
  selectedColor,
  onColorChange,
  textColor,
  onTextColorChange,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleShapeChange = (newShape) => {
    setShowOptions(false);
    setShape(newShape);

    if (newShape === "square") {
      onShapeChange(newShape, 200, 200);
    } else {
      onShapeChange(newShape, 200, 300);
    }
  };

  const handleAlignChange = (align) => {
    setShowOptions(false);
    onFontAlignChange(align);
  };

  return (
    <>
      {section === "shapes" && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            onClick={() => setShowOptions(!showOptions)}
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
          >
            {selectedShape === "circle" ? (
              <BiCircle />
            ) : selectedShape === "square" ? (
              <IoSquareOutline />
            ) : (
              <TbRectangleVertical />
            )}
          </div>

          {showOptions && (
            <div
              style={{
                fontSize: "2rem",
                position: "absolute",
                top: "50px",
                left: "0",
                padding: "10px",
                width: "140px",
                background: "#d4d4d4",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                zIndex: "1000",
              }}
            >
              <BiCircle
                style={{ cursor: "pointer" }}
                onClick={() => handleShapeChange("circle")}
              />
              <IoSquareOutline
                style={{ cursor: "pointer" }}
                onClick={() => handleShapeChange("square")}
              />
              <TbRectangleVertical
                style={{ cursor: "pointer" }}
                onClick={() => handleShapeChange("Rectangle")}
              />
            </div>
          )}
        </div>
      )}

      {section === "align" && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            onClick={() => setShowOptions(!showOptions)}
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
          >
            {textAlign === "left" ? (
              <i className="fa fa-align-left"></i>
            ) : textAlign === "center" ? (
              <i className="fa fa-align-center"></i>
            ) : (
              <i className="fa fa-align-right"></i>
            )}
          </div>

          {showOptions && (
            <div
              style={{
                fontSize: "1rem",
                position: "absolute",
                top: "50px",
                left: "0",
                padding: "10px",
                width: "140px",
                background: "#d4d4d4",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                zIndex: "1000",
              }}
            >
              <i
                className="fa fa-align-left"
                style={{ cursor: "pointer" }}
                onClick={() => handleAlignChange("left")}
              ></i>
              <i
                className="fa fa-align-center"
                style={{ cursor: "pointer" }}
                onClick={() => handleAlignChange("center")}
              ></i>
              <i
                className="fa fa-align-right"
                style={{ cursor: "pointer" }}
                onClick={() => handleAlignChange("right")}
              ></i>
            </div>
          )}
        </div>
      )}
      {section === "font-style" && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            onClick={() => setShowOptions(!showOptions)}
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
          >
            <FaBold />
          </div>

          {showOptions && (
            <div
              style={{
                fontSize: "1rem",
                position: "absolute",
                top: "50px",
                left: "0",
                padding: "10px",
                width: "140px",
                background: "#d4d4d4",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                zIndex: "1000",
              }}
            >
              <ImBold
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowOptions(false);
                  onFontWeight();
                }}
              />
              <ImItalic
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowOptions(false);
                  onItalicChange();
                }}
              />
              <MdFormatUnderlined
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowOptions(false);
                  onTextDecoration();
                }}
              />
            </div>
          )}
        </div>
      )}
      {section === "color-palette" && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            style={{
              backgroundColor: selectedColor,
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => setShowOptions(!showOptions)}
          />
          {showOptions && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                right: "0",
                padding: "10px",
                width: "180px",
                background: "#d4d4d4",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                zIndex: "1000",
              }}
            >
              {DrawingColors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: color.color,
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    margin: "4px",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={() => {
                    onColorChange(color.color);
                    setShowOptions(false);
                  }}
                >
                  {color.color === selectedColor && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        border: "2px solid #fff",
                        backgroundColor: "#3498db",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {section === "text-color" && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            style={{
              fontSize: "1.2rem",
              position: "relative",
              left: "5px",
              cursor: "pointer",
            }}
            onClick={() => setShowOptions(!showOptions)}
          >
            <ImTextColor style={{ marginLeft: "2px" }} />
            <div
              style={{
                backgroundColor: textColor,
                width: "25px",
                height: "4px",
              }}
            />
          </div>
          {showOptions && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                right: "0",
                padding: "10px",
                width: "180px",
                background: "#d4d4d4",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                zIndex: "1000",
              }}
            >
              {DrawingColors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: color.color,
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    margin: "4px",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={() => {
                    onTextColorChange(color.color);
                    setShowOptions(false);
                  }}
                >
                  {color.color === textColor && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        border: "2px solid #fff",
                        backgroundColor: "#3498db",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StickyStyle;
