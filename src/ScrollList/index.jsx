import React from "react";

const ScrollList = ({
  items,
  onHover,
  onActive,
  hoverIndex,
  activeVideoIndex,
}) => {
  const repeat = Math.round(items.length / 3);

  return (
    <div
      style={{
        display: "grid",
        overflowX: "auto",
        height: "100%",
        gridTemplateColumns: "repeat(" + repeat + ", 300px)",
        gap: "20px",
      }}
    >
      {items.map((item, index) => {
        let className = "preview";

        if (index === activeVideoIndex) {
          className += " selected";
        } else if (index === hoverIndex) {
          className += " active";
        }
        return (
          <img
            key={index}
            src={
              item.img ||
              `https://img.youtube.com/vi/${item.url.split("=")[1]}/0.jpg`
            }
            className={className}
            onTouchEnd={() => {
              console.log("index: ", index);
              onHover(index);
              if (index === hoverIndex) {
                onActive(index);
              }
            }}
          />
        );
      })}
    </div>
  );
};

export default ScrollList;
