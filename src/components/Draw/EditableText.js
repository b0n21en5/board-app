import React from "react";
import { ResizableText } from "./ResizableText";
import { EditableTextInput } from "./EditableTextInput";

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

export function EditableText({
  x,
  y,
  isEditing,
  isTransforming,
  onToggleEdit,
  onToggleTransform,
  onChange,
  onResize,
  text,
  width,
  height,
  onKeyDown,
  fontSize,
  italic,
  textAlign,
  fontWeight,
  fontFamily,
  textDecoration,
  onTextDecoration,
  textColor
}) {
  if (isEditing) {
    return (
      <EditableTextInput
        x={x - 10}
        y={y + 20}
        width={width}
        height={height}
        value={text}
        onChange={onChange}
        fontSize={fontSize}
        italic={italic}
        textAlign={textAlign}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        textDecoration={onTextDecoration}
        textColor={textColor}
        // onKeyDown={onKeyDown}
      />
    );
  }
  return (
    <ResizableText
      x={x}
      y={y}
      fontFamily={fontFamily}
      fontStyle={italic}
      fontSize={fontSize}
      textAlign={textAlign}
      isSelected={isTransforming}
      onClick={onToggleTransform}
      onDoubleClick={onToggleEdit}
      textDecoration={textDecoration}
      onResize={onResize}
      text={text}
      width={width}
      height={height}
      textColor={textColor}
    />
  );
}
