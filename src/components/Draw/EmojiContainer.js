import React from "react";
import { Group, Text, Rect } from "react-konva";

const EmojiContainer = ({
  emojis,
  fontSize,
  x,
  y,
  height,
  emojiGap = 10,
  onEmojiRemove,
}) => {
  const emojiSize = Math.min(fontSize, 16);
  const padding = 8;
  const maxEmojisPerRow = 4;
  const maxTotalEmojis = 8;
  const leftMargin = 10;
  const bottomMargin = 5;

  // maximum number of emojis to display
  const numEmojisToDisplay = Math.min(emojis.length, maxTotalEmojis);

  return emojis.slice(0, numEmojisToDisplay).map((emoji, index) => {
    // row and column for the current emoji
    const row = Math.floor(index / maxEmojisPerRow);
    const col = index % maxEmojisPerRow;

    // position with reduced gaps
    const xPos = x + leftMargin + col * (emojiSize + emojiGap + 2 * leftMargin);
    const yPos =
      y +
      height -
      25 -
      row * (emojiSize + 2 + 10 + bottomMargin) -
      bottomMargin;

    return (
      <Group key={index} x={xPos} y={yPos}>
        <Rect
          width={emojiSize + 2 * padding}
          height={emojiSize + 2 * padding - 7}
          fill="#fafafa"
          cornerRadius={5}
        />
        <Text
          text={emoji.emoji}
          fontSize={emojiSize}
          x={padding - 4}
          y={padding - 2}
          align="center"
          onClick={() => onEmojiRemove(emoji)}
        />
      </Group>
    );
  });
};

export default EmojiContainer;
