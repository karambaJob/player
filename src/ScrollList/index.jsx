import React from "react";

const ScrollList = ({
  items,
  onHover,
  onActive,
  hoverIndex,
  activeVideoIndex,
}) => {
  return (
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        height: "100%",
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
