import useResizeAware from "react-resize-aware";
import styled from "styled-components";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { User, useMe } from "@ecranked/api";

const HeatmapStyle = styled.div`
  // flex-wrap: wrap;
  display: flex;
  width: 100%;
  height: 100%;

  flex-direction: column;
  padding: 10px 10px 10px;
  background-color: #282828;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  // max-height: 20%;
  gap: 10px;
  box-sizing: border-box;
`;
const HeatmapButtonStyle = styled.div`
  color: white;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  flex: 40px 0 0;
  min-height: 20px;
  &:hover {
    background-color: #555;
    color: #000;
  }
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
`;
interface HeatmapProps {
  userData: User | null;
  isFullscreenComponent: boolean,
  isAnimating: boolean,
  useFullscreenState: () => [boolean, React.Dispatch<boolean>]
  useSharedState: <T>() => [T, React.Dispatch<T>],
}
export const Heatmap = ({
  userData, isFullscreenComponent, isAnimating, useFullscreenState, useSharedState
}: HeatmapProps) => {


  const Images = useMemo(
    () => [
      {
        width: 1394,
        height: 591,
        name: "combustion",
      },
      {
        width: 874,
        height: 556,
        name: "dyson",
      },
      {
        width: 1589,
        height: 458,
        name: "fission",
      },
      {
        width: 1641,
        height: 877,
        name: "surge",
      },
    ],
    []
  );

  const [finalImageSize, setFinalImageSize] = useState({
    scale: 1,
  });

  const [resizeListener, sizes] = useResizeAware();

  const [imageLoaded, setImageLoaded] = useState(false);

  const [sharedState, setSharedState] = useSharedState<{ selectedHeatmap: number }>();
  const [isFullscreen, setIsFullscreen] = useFullscreenState()

  // const heatmapZoomComponentRef = useRef();
  const imageRef = useRef<HTMLDivElement>(null);
  const fullscreenImageRef = useRef<HTMLDivElement>(null);

  const imageZoomRef = useRef<ReactZoomPanPinchRef>(null);
  const fullscreenImageZoomRef = useRef<ReactZoomPanPinchRef>(null);


  const { me } = useMe()

  useEffect(() => {
    var image;
    if (fullscreenImageRef.current !== null) {
      image = fullscreenImageRef.current;
    } else if (imageRef.current !== null) {
      image = imageRef.current;
    } else {
      return;
    }

    var targetWidth = Images[sharedState.selectedHeatmap ?? 2].width;
    var targetHeight = Images[sharedState.selectedHeatmap ?? 2].height;

    var parentWidth = image.getBoundingClientRect().width;
    var parentHeight = image.getBoundingClientRect().height;

    // parentWidth -= parentWidth - prevImageState.width;
    // parentHeight -= parentHeight - prevImageState.height;
    var finalWidth = targetWidth;
    var finalHeight = targetHeight;
    var decreasePercentage = 0;
    var finalScale = 1;
    if (finalWidth >= parentWidth) {
      decreasePercentage = parentWidth / finalWidth;
      finalWidth *= decreasePercentage;
      finalHeight *= decreasePercentage;
      finalScale *= decreasePercentage;
    }
    if (finalHeight >= parentHeight) {
      decreasePercentage = parentHeight / finalHeight;
      finalWidth *= decreasePercentage;
      finalHeight *= decreasePercentage;
      finalScale *= decreasePercentage;
    }
    setFinalImageSize({
      scale: finalScale,
    });
    fullscreenImageZoomRef?.current?.centerView?.(finalScale, 0);
    imageZoomRef?.current?.centerView?.(finalScale, 0);
  }, [
    sizes.width,
    sizes.height,
    sharedState,
    imageLoaded,
    Images,
    isFullscreen,
  ]);
  // useEffect(() => {
  //   console.log("IMAGE LOADED");
  //   fullscreenImageZoomRef?.current?.centerView?.(0.2, 0, 0);
  //   imageZoomRef?.current?.centerView?.(0.2, 0, 0);
  // }, [imageLoaded]);
  const onHeatmapRequested = async () => {
    try {
      await userData?.requestHeatmaps()

    } catch (err) {
      console.error("There was an error when requesting your heatmap. " + err);
      alert("There was an error when requesting your heatmap. Please contact a moderator if this problem persists")
    }
  };

  const changeSelectedHeatmap = (change: number) => {
    setImageLoaded(false);

    console.log("CHANGING HEATMAP");
    var newSelectedHeatmap = (sharedState.selectedHeatmap ?? 0) + change;
    //Change selected heatmap by the change provided. If it goes out of bounds, set it to the last or first index
    if (newSelectedHeatmap < 0) {
      newSelectedHeatmap = Images.length - 1;
    } else if (newSelectedHeatmap >= Images.length) {
      newSelectedHeatmap = 0;
    }
    console.log("CHANGING HEATMAP", { selectedHeatmap: newSelectedHeatmap });

    setSharedState({ selectedHeatmap: newSelectedHeatmap });
  }

  var ableToUpdateHeatmap = false;

  if (me?.moderator) {
    ableToUpdateHeatmap = true
  } else if (me?.oculus_id === userData?.oculus_id) {
    if (userData?.heatmap_render_date ?? 0 <
      Math.round(Date.now() / 1000) + 60 * 60 * 24 * 3) {
      ableToUpdateHeatmap = true;
    }
  }




  if (userData?.heatmap_completed === true) {
    return (
      <HeatmapStyle>
        <a href={"https://ecranked.ddns.net/public/" +
          userData.oculus_id +
          "/heatmap_" +
          Images[sharedState.selectedHeatmap ?? 2].name +
          "_recent.png"}>
          <HeatmapButtonStyle onClick={onHeatmapRequested}>
            View Raw!
          </HeatmapButtonStyle>
        </a>

        <div
          style={{
            display: "flex",
            width: "100%",
            flex: "200px 1",
            height: "100px",
          }}
        >
          <HeatmapButtonStyle
            onClick={() => {
              changeSelectedHeatmap(-1);
            }}
          >
            {"<"}
          </HeatmapButtonStyle>
          <div
            style={{
              flex: "0px 8 1",
              position: "relative",
            }}
            ref={isFullscreenComponent ? fullscreenImageRef : imageRef}
          >
            {" "}
            {resizeListener}
            {/* Your content here. (div sizes are {sizes.width} x {sizes.height}) */}
            <div
              style={{
                position: "absolute",
                // backgroundColor: "red",
                width: "100%",
                height: "100%",
              }}
            >
              <TransformWrapper
                onZoom={(e) => {
                  if (isFullscreenComponent) {
                    if (e.state.scale <= finalImageSize.scale)
                      setIsFullscreen(false);
                  } else {
                    if (e.state.scale > finalImageSize.scale) {
                      setIsFullscreen(true);
                    }
                  }
                }}
                initialScale={finalImageSize.scale}
                minScale={finalImageSize.scale}
                centerOnInit={true}
                limitToBounds={false}
                disabled={isFullscreenComponent ? isAnimating : false}
                ref={isFullscreenComponent ? fullscreenImageZoomRef : imageZoomRef}
              >
                <TransformComponent
                  // ref={heatmapZoomComponentRef}
                  wrapperStyle={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    style={{
                      opacity: imageLoaded ? "100%" : "0%",
                    }}
                    src={"https://ecranked.ddns.net/public/" +
                      userData.oculus_id +
                      "/heatmap_" +
                      Images[sharedState.selectedHeatmap ?? 2].name +
                      "_recent.png"}
                    alt="test"
                    onLoad={() => {
                      setImageLoaded(true);
                    }} />
                </TransformComponent>
              </TransformWrapper>
            </div>
          </div>
          <HeatmapButtonStyle
            onClick={() => {
              changeSelectedHeatmap(1);
            }}
          >
            {">"}
          </HeatmapButtonStyle>
        </div>
        {ableToUpdateHeatmap ?



          < HeatmapButtonStyle onClick={onHeatmapRequested}>
            Update your heatmaps!
          </HeatmapButtonStyle>
          : null}
      </HeatmapStyle >
    );
  } else {
    if (me?.oculus_id === userData?.oculus_id ||
      me?.moderator) {
      return (
        <HeatmapButtonStyle onClick={onHeatmapRequested}>
          Request your heatmaps!
        </HeatmapButtonStyle>
      );
    } else {
      return null;
    }
  }
};
