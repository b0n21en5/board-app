import React, { useState, useRef } from "react";
import { Html } from "react-konva-utils";
import Picker from "emoji-picker-react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import StickyStyle from "./StickyStyle";
import { TbBorderStyle } from "react-icons/tb";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "2px solid black",
  borderRadius: "6px",
  gap: "10px",
  backgroundColor: "#d4d4d4",
  padding: "10px",
};

function StickyPopup({
  x,
  y,
  onClose,
  onColorChange,
  handleText,
  onDelete,
  onIncreaseFontSize,
  onDecreaseFontSize,
  setFontSize,
  onBorderChange,
  onItalicChange,
  onTextAlignChange,
  onFontWeight,
  shape,
  setShape,
  onShapeChange,
  fontfamily,
  textAlign,
  fontSize,
  onFontFamilyChange,
  onTextDecoration,
  onEmojiClick,
  stickyColor,
  onSquareSizeChange,
  textColor,
  onTextColorChange,
}) {
  const fontSizeOptions = [10, 12, 14, 16, 18, 20, 22, 24];
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [size, setSize] = useState("m");
  const groupRef = useRef(null);

  const handleColorClick = (color) => {
    if (typeof onColorChange === "function") {
      onColorChange(color);
    }
  };

  const handleSelectFontSize = (event) => {
    const newFontSize = event.target.value;
    setFontSize(newFontSize);
  };

  const handleEmojiPicker = () => {
    setEmojiPicker((prev) => !prev);
  };

  const handleFontChange = (event) => {
    const fontName = event.target.value;
    onFontFamilyChange(fontName);
  };

  const handleSquareSize = (event) => {
    const newSize = event.target.value;
    setSize(newSize);
    if (newSize === "s") {
      onSquareSizeChange(150, 150);
    } else if (newSize === "m") {
      onSquareSizeChange(200, 200);
    } else {
      onSquareSizeChange(300, 300);
    }
  };

  return (
    <>
      <Html groupRef={groupRef} groupProps={{ x, y }} divProps={containerStyle}>
        <div style={containerStyle}>
          {/* <ShapeSelector
          /> */}
          <StickyStyle
            section="shapes"
            selectedShape={shape}
            setShape={setShape}
            onShapeChange={onShapeChange}
          />
          <span style={{ cursor: "pointer" }}>
            <i className="fa fa-pencil" onClick={handleText}></i>
          </span>
          <select value={fontfamily} onChange={handleFontChange}>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
          </select>
          <select
            value={fontSize}
            onChange={handleSelectFontSize}
            style={{ appearance: "none", cursor: "pointer", padding: "0 4px" }}
          >
            {fontSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <GoTriangleUp onClick={onIncreaseFontSize} />
            <GoTriangleDown onClick={onDecreaseFontSize} />
          </span>
          <StickyStyle
            section="text-color"
            textColor={textColor}
            onTextColorChange={onTextColorChange}
          />
          <span style={{ cursor: "pointer" }}>
            <i class="fa-sharp fa-regular fa-rectangle"></i>
          </span>
          <StickyStyle
            section="font-style"
            onFontWeight={onFontWeight}
            onTextDecoration={onTextDecoration}
            onItalicChange={onItalicChange}
          />
          <StickyStyle
            section="align"
            textAlign={textAlign}
            onFontAlignChange={onTextAlignChange}
          />
          {shape === "square" && (
            <select
              value={size}
              style={{
                fontSize: "1rem",
                appearance: "none",
                padding: "0 4px",
                cursor: "pointer",
                background: "transparent",
              }}
              onChange={handleSquareSize}
            >
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
            </select>
          )}
          <StickyStyle
            section="color-palette"
            selectedColor={stickyColor}
            onColorChange={onColorChange}
          />
          {shape === "Rectangle" && (
            <span style={{ fontSize: "1.2rem", cursor: "pointer" }}>
              <i
                class="fa-regular fa-face-smile"
                onClick={handleEmojiPicker}
              ></i>
            </span>
          )}
          <TbBorderStyle onClick={onBorderChange} />
          <span style={{ cursor: "pointer" }}>
            <i className="fa fa-trash" onClick={onDelete}></i>
          </span>
        </div>

        {emojiPicker && (
          <Picker
            onEmojiClick={(e) => {
              setEmojiPicker(false);
              onEmojiClick(e);
            }}
            width={350}
            height={350}
            skinTonesDisabled
            previewConfig={{ showPreview: false }}
          />
        )}
      </Html>
    </>
  );
}

export default StickyPopup;
