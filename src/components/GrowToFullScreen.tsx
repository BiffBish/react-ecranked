import React, { useEffect, useState, useRef } from "react";
import disableScroll from "disable-scroll";
import { delay } from "./Statistics";



interface SubGrowToFullscreenProps {
    isFullscreenComponent: boolean,
    isAnimating: boolean,
    useFullscreenState: () => [boolean, React.Dispatch<boolean>]
    useSharedState: <T>() => [T, React.Dispatch<T>],
    style?: React.CSSProperties | undefined
}

type GrowToFullScreenProps = {
    defaultState: any;
    children: React.ReactElement<SubGrowToFullscreenProps>;
};

export const GrowToFullScreen = ({ defaultState, children }: GrowToFullScreenProps) => {


    const [sharedStates, setSharedStates] = useState(defaultState);

    const useSharedState = () => {

        return [sharedStates, setSharedStates]
    }
    const [wantFullscreen, setWantFullscreen] = useState(false);

    const [showFullscreenElement, setShowFullscreenElement] = useState(false);

    const useFullscreenState = () => {
        return [showFullscreenElement, setWantFullscreen]
    }


    const childRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        console.log("Getting Position of original", childRef);
    }, [wantFullscreen]);

    const AnimationTime = 0.5;

    const [positionOnScreen, setPositionOnScreen] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0
    });

    const [goFullscreen, setGoFullscreen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    // const [wantFullscreen, setWantFullscreen] = useState(false);

    useEffect(() => {

        if (wantFullscreen) {
            disableScroll.on();

            setShowFullscreenElement(true);
            setIsAnimating(true);
            delay(1).then(() => setGoFullscreen(true));
            delay(1000 * AnimationTime).then(() => setIsAnimating(false));
        } else {
            setGoFullscreen(false);
            setIsAnimating(true);

            delay(1000 * AnimationTime).then(() => {
                setShowFullscreenElement(false);
                setIsAnimating(false);
                disableScroll.off();
            });
        }
    }, [wantFullscreen]);

    useEffect(() => {
        console.log("Getting Position of original", childRef);
        if (childRef.current == null) {
            return;
        }
        var rect = childRef.current.getBoundingClientRect();

        if (wantFullscreen) {
            // example use
            // rect.percentWidth = (rect.width / window.innerWidth) * 100;
            // rect.percentHeight = (rect.height / window.innerHeight) * 100;
            // console.log(rect);
            // // console.log(childReference.current.className);
            setShowFullscreenElement(true);
            setPositionOnScreen(rect);
        } else {
            // setOnClickZoom(false);
            // example use
            // rect.percentWidth = (rect.width / window.innerWidth) * 100;
            // rect.percentHeight = (rect.height / window.innerHeight) * 100;
            setPositionOnScreen(rect);
            setGoFullscreen(false);
        }
    }, [wantFullscreen, childRef]);

    let MaxStyle = {
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        // opacity: "100%",
    };

    let StartStyle = {
        top: positionOnScreen.top,
        left: positionOnScreen.left,
        width: positionOnScreen.width,
        height: positionOnScreen.height,
        // opacity: "0%",
    };
    // return (
    //   <>
    //     {React.cloneElement(props.children, {
    //       ref: childRef,
    //       // isFullscreenComponent: false,
    //       setFullscreenState: setWantFullscreen,
    //       // sharedStates: sharedStates,
    //       // setSharedStates: setSharedStates,
    //     })}
    //   </>
    // );
    return (
        <>
            <div style={{ width: "100%", height: "100%" }} ref={childRef}>
                {React.cloneElement(children, {
                    isFullscreenComponent: false,
                    isAnimating: isAnimating,
                    useSharedState: useSharedState as <T>() => [T, (state: T) => void],
                    useFullscreenState: useFullscreenState as <T>() => [T, (state: T) => void],
                })}
            </div>
            {
                showFullscreenElement ? (
                    <div
                        style={{
                            position: "fixed",
                            transitionProperty: "height, left, top, width",
                            transitionDuration: `${AnimationTime}s`,
                            transitionTimingFunction: "ease",
                            zIndex: 100,
                            ...(goFullscreen ? MaxStyle : StartStyle),
                        }}
                    >
                        {React.cloneElement(children, {
                            style: {
                                width: "100%",
                                height: "100%",
                                margin: "none",
                                boxSizing: "border-box",
                            },
                            isFullscreenComponent: true,
                            isAnimating: isAnimating,
                            useSharedState: useSharedState as <T>() => [T, (state: T) => void],
                            useFullscreenState: useFullscreenState as <T>() => [T, (state: T) => void],
                        })}
                    </div>
                ) : null}
        </>
    );
};

