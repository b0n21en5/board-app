import React, { useState, useEffect } from "react";
import { Popover } from "react-bootstrap";
import { DrawingColors } from "../../utils/DrawingColor";
import { BsSquare, BsStickiesFill } from "react-icons/bs";

const CustomStickyPopover = ({
  setSelectedColor,
  clickCount,
  setClickCount,
}) => {
  const [popoverVisible, setPopoverVisible] = useState(false); 


  const handleClick = (color) => {
    if (!clickCount) {
      setSelectedColor(color);
      setClickCount(1);
    }
  };

  return (
    <Popover id="popover-basic">
      <Popover.Body>
        <div style={{ padding: "15px 0", borderBottom: "2px solid #e0e0e0" }}>
          <div
            style={{
              padding: "10px 20px",
              backgroundColor: "#00000010",
              borderRadius: "4px",
            }}
          >
            View templates
          </div>
        </div>
        <div
          style={{
            width: "130px",
            padding: "20px 10px",
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
          }}
        >
          {DrawingColors.map((color) => (
            <div
              key={color.color}
              onClick={() => handleClick(color.color)}
              style={{
                backgroundColor: color.color,
                width: "40px",
                height: "40px",
                cursor: "pointer",
                border: `1.5px solid ${color.border}`,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
              }}
              title={color.title}
            ></div>
          ))}
        </div>
      </Popover.Body>
    </Popover>
  );
};

export default CustomStickyPopover;
