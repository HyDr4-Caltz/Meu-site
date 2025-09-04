import { motion, useTransform, type MotionValue } from 'framer-motion';

const Timelinepoint = ({ scrollYpoint, index, totalitems, onPointClick}: {
    scrollYpoint: MotionValue<number>;
    index: number;
    totalitems: number;
    onPointClick: (index:number) => void;
}) => {
    const Yposition= 20 + (index/(totalitems -1)) * 760;

    const opacity = useTransform(
        scrollYpoint,
        [(index/totalitems) *0.95, (index/totalitems)],
        [0,1]
    );

    return (
        <motion.circle
          cx="30"
          cy={Yposition}
          r="8"
          fill="#050505"
          stroke="#00E5FF"
          strokeWidth="2"
          style={{opacity}}
          onClick={() => onPointClick(index)}
          cursor={'pointer'}
        />
    );
};

export const TimelineSVG = ({scrollYProgress, experiences, onPointClick}: {scrollYProgress: MotionValue<number>, experiences: any[], onPointClick: (index:number)=> void;}) => {
    return (
        <svg width="60" height="100%" viewBox="0 0 60 800" style={{ position: 'relative', marginLeft: '0', marginBottom: '20px', zIndex: 1 }}>
            <motion.path
            d="M 30 20 V 780"
            fill="transparent"
            strokeWidth="2"
            stroke="#00E5FF"
            style={{ pathLength: scrollYProgress }}
            />

            {experiences.map((_,index) => (
                <Timelinepoint
                key={index}
                index={index}
                totalitems={experiences.length}
                scrollYpoint={scrollYProgress}
                onPointClick={onPointClick}
                />
            ))}
        </svg>
    );
};