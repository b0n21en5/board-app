import React, { useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";

export function ResizableText({
  x,
  y,
  text,
  isSelected,
  width,
  onResize,
  onClick,
  onDoubleClick,
  fontFamily,
  fontStyle,
  fontSize,
  textAlign,
  textDecoration,
  textColor
}) {
  const textRef = useRef(null);
  const transformerRef = useRef(null);

  useEffect(() => {
    if (isSelected && transformerRef.current !== null) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  function handleResize() {
    if (textRef.current !== null) {
      const textNode = textRef.current;
      const newWidth = textNode.width() * textNode.scaleX()-10;
      const newHeight = textNode.height() * textNode.scaleY();
      textNode.setAttrs({
        width: newWidth,
        scaleX: 1,
      });
      onResize(newWidth, newHeight);
    }
  }

  const transformer = isSelected ? (
    <Transformer
      ref={transformerRef}
      rotateEnabled={false}
      flipEnabled={false}
      enabledAnchors={["middle-left", "middle-right"]}
      boundBoxFunc={(oldBox, newBox) => {
        newBox.width = Math.max(30, newBox.width);
        return newBox;
      }}
    />
  ) : null;

  const verticalAlign='middle'

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Text
        x={x}
        y={y}
        ref={textRef}
        text={text}
        fill={textColor}
        fontFamily={fontFamily}
        fontStyle={fontStyle?"italic":"normal"}
        fontSize={fontSize}
        textDecoration={textDecoration?"underline":"none"}
        align={textAlign}
        verticalAlign={verticalAlign}
        offsetY={(verticalAlign === 'middle' ? -1 : verticalAlign === 'top' ? 1 : 0) * 60}
        perfectDrawEnabled={false}
        onTransform={handleResize}
        onClick={onClick}
        onTap={onClick}
        onDblClick={onDoubleClick}
        onDblTap={onDoubleClick}
        width={width-10}
      />
      {transformer}
    </div>
  );
}
