import React, { useRef, useState, useEffect } from "react";
import { Rect, Text, Group, Transformer, Circle } from "react-konva";
import { Html } from "react-konva-utils";
import { EditableText } from "./EditableText";
import StickyPopup from "./StickyPopup";
import EmojiContainer from "./EmojiContainer";

const Sticky = ({
  x,
  y,
  width,
  height,
  text,
  draggable,
  handleDragEnd,
  onChange,
  onDelete,
  color,
  isSelected,
  isText,
  handleSelect,
  shape,
  onSelectText,
  onBorderChange,
  onSquareSizeChange,
  setShape,
  onShapeChange,
}) => {
  const shapeRef = useRef(null);
  const textRef = useRef(null);
  const deleteButtonRef = useRef(null);
  const transformStickyRef = useRef(null);
  const [fontSize, setFontSize] = useState(16);
  const inputRef = useRef(null);
  const [editingText, setEditingText] = useState(true);
  const [stickyColor, setStickyColor] = useState(color);
  const [textWriting, setTextWriting] = useState(false);
  const [textAlign, setTextAlign] = useState("center");
  const [fontfamily, setFontfamily] = useState("Arial");
  const [textUnderline, setTextUnderline] = useState(false);
  const [textColor, setTextColor] = useState("#000");
  const [italic, setItalic] = useState(false);
  const [fontWeight, setFontWeight] = useState(false);
  const [stickyStyle, setStickyStyle] = useState({
    fontWeight: "normal",
    border: false,
    fontStyle: "normal",
    // align: "center"
  });
  const [emojis, setEmojis] = useState([]);

  const handleTextAlignChange = (align) => {
    setTextAlign(align);
  };
  const handleFontFamily = (family) => {
    setFontfamily(family);
  };
  const handleBorderChange = () => {
    setStickyStyle((prevStyle) => ({
      ...prevStyle,
      border: !prevStyle.border,
      fontStyle: "bold",
    }));
  };

  const handleItalicChange = () => {
    setItalic(!italic);
  };

  const handleIncreaseFontSize = () => {
    setFontSize((prevFontSize) => Math.min(prevFontSize + 2, 24));
  };

  const handleDecreaseFontSize = () => {
    setFontSize((prevFontSize) => Math.max(prevFontSize - 2, 10));
  };

  const handleFontWeightChange = () => {
    setFontWeight(!fontWeight);
  };
  let timer;

  const onEmojiClick = (event) => {
    setEmojis((prevEmojis) => [...prevEmojis, event]);
  };

  const onEmojiRemove = (emojiObject) => {
    setEmojis((prevEmojis) =>
      prevEmojis.filter((emoji) => emoji.unified !== emojiObject.unified)
    );
  };

  useEffect(() => {
    if (isSelected) {
      transformStickyRef.current.nodes([
        shapeRef.current,
        textRef.current,
        deleteButtonRef.current,
      ]);
      transformStickyRef.current.getLayer().batchDraw();

      timer = setTimeout(() => {
        transformStickyRef.current.nodes([]);
      }, 15000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isSelected]);
  function colorChange(c) {
    setStickyColor(c);
  }
  function handleText() {
    setTextWriting(!textWriting);
  }

  const handleTextColorChange = (color) => {
    setTextColor(color);
  };

  return (
    <>
      <Group>
        {shape === "Rectangle" && (
          <Rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={stickyColor}
            // stroke="#999966"
            // strokeWidth={4}
            {...(stickyStyle.border && { stroke: "black", strokeWidth: 2 })}
            cornerRadius={10}
            draggable={draggable}
            onDragEnd={handleDragEnd}
            onClick={handleSelect}
            ref={shapeRef}
          />
        )}
        {shape === "circle" && (
          <Circle
            x={x + width / 2} // Set the x-coordinate to the center of the circle
            y={y + height / 2} // Set the y-coordinate to the center of the circle
            radius={width / 2} // Set the radius of the circle
            fill={stickyColor}
            height={height}
            stroke="#999966"
            strokeWidth={4}
            draggable={draggable}
            onDragEnd={handleDragEnd}
            onClick={handleSelect}
            ref={shapeRef}
          />
        )}

        {shape === "square" && (
          <Rect
            x={x}
            y={y}
            width={width}
            height={width}
            fill={stickyColor}
            stroke="#999966"
            strokeWidth={4}
            cornerRadius={10}
            draggable={draggable}
            onDragEnd={handleDragEnd}
            onClick={handleSelect}
            ref={shapeRef}
          />
        )}
        <Text
          x={x + 10}
          y={y + 10}
          width={width - 20}
          height={height - 20}
          onClick={onSelectText}
          // text={text}
          fontFamily="Calibri"
          fontSize={fontSize}
          fill={textColor}
          verticalAlign="middle"
          align={textAlign}
          // fontStyle="bold"
          draggable={draggable}
          onDragEnd={handleDragEnd}
          {...stickyStyle}
          // onDblClick={onChange}
          ref={textRef}
        />

        {isText && (
          <StickyPopup
            x={x}
            y={y - 80} // Adjust the y position to show above the rectangle
            // onClose={handlePopupClose}
            onColorChange={colorChange}
            handleText={handleText}
            onDelete={onDelete}
            onDecreaseFontSize={handleDecreaseFontSize}
            onIncreaseFontSize={handleIncreaseFontSize}
            shape={shape}
            setShape={setShape}
            setFontSize={setFontSize}
            onBorderChange={handleBorderChange}
            onItalicChange={handleItalicChange}
            onTextAlignChange={handleTextAlignChange}
            onFontWeight={handleFontWeightChange}
            fontfamily={fontfamily}
            textAlign={textAlign}
            onFontFamilyChange={handleFontFamily}
            fontSize={fontSize}
            onTextDecoration={() => setTextUnderline(!textUnderline)}
            onEmojiClick={onEmojiClick}
            onShapeChange={onShapeChange}
            stickyColor={stickyColor}
            onSquareSizeChange={onSquareSizeChange}
            textColor={textColor}
            onTextColorChange={handleTextColorChange}
          />
        )}
        <EditableText
          ref={inputRef}
          x={x + 8}
          y={y + 8}
          text={text}
          width={width}
          height={height}
          isEditing={textWriting}
          onChange={onChange}
          fontSize={fontSize}
          italic={italic}
          textAlign={textAlign}
          fontWeight={fontWeight}
          fontFamily={fontfamily}
          textDecoration={textUnderline}
          onTextDecoration={textUnderline}
          emojis={emojis}
          textColor={textColor}

          // onKeyDown={()=>setEditingText(false)}
        />

        <Group
          x={x + width - 35}
          y={y}
          width={30}
          height={30}
          ref={deleteButtonRef}
        >
          {/* <Rect
            width={30}
            height={30}
            fill="red"
            cornerRadius={15}
            onClick={onDelete}
          />
          <Text
            x={10}
            y={5}
            text="-"
            fontFamily="FontAwesome"
            fontSize={20}
            fill="white"
            verticalAlign="middle"
            align="center"
          /> */}
        </Group>
      </Group>
      {isSelected && (
        <Transformer
          ref={transformStickyRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit minimum size of the sticky
            if (newBox.width < 50 || newBox.height < 50) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
      {shape === "Rectangle" && (
        <EmojiContainer
          emojis={emojis}
          fontSize={fontSize}
          x={x}
          y={y}
          height={height}
          onEmojiRemove={onEmojiRemove}
        />
      )}
    </>
  );
};

export default Sticky;
