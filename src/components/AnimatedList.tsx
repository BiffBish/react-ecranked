import React from "react";
import { useEffect, useState } from "react";

interface AnimatedListChildProps {
    data: any,
    index?: number,
}

interface AnimatedListProps {
    listData: any[],
    children: React.ReactElement<AnimatedListChildProps>
}
export default function AnimatedList({ listData, children }: AnimatedListProps) {


    const [animationIndex, setAnimationIndex] = useState(0);
    const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        async function loadInReplayAnimation() {
            if (listData !== undefined) {

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                for (const _ of listData) {
                    await delay(20);
                    setAnimationIndex((prev) => {
                        if (prev < listData.length) {
                            return prev + 1;
                        }
                        return prev;
                    });
                }
            }
        }
        loadInReplayAnimation();
    }, [listData]);

    return (
        <div className="list" style={{ gap: "10px" }}>
            {listData.map((item, index) => {
                if (index < animationIndex) {
                    return (
                        React.cloneElement(children, {
                            data: item,
                            index: index
                        })
                        // <ChildComponent data={item} index={index} key={index} />
                    );
                }
                return null
            })}
        </div>
    );
};
            // <LeaderboardListContainer>
            //     {/* <LeaderboardListRankingBox rank={user.index} /> */}
            //     <LeaderboardListStyle
            //         key={user["oculus_name"]}
            //         onClick={OnGameClick}
            //         style={
            //             // eslint-disable-next-line
            //             localStorage.getItem("OCULUS_ID") == user.oculus_id
            //                 ? {
            //                     opacity: 1,
            //                     backgroundColor: "#151",
            //                 }
            //                 : {}
            //         }
            //     >
            //         <p style={{ margin: "0" }}>
            //             {user.index + ".  " + user["oculus_name"]}
            //         </p>
            //         <p style={{ margin: "0 0 0 auto" }}>
            //             {Math.round((user["frames_used"] / (30 * 60 * 60)) * 100) /
            //                 100 + //+
            //                 "h"}
            //         </p>
            //     </LeaderboardListStyle>
            // </LeaderboardListContainer>