import React from 'react';
import { ResponsivePie } from '@nivo/pie';
let val = 0
const MyResponsivePie = ({ data, cnt, handleCourseClick }) => (

  <ResponsivePie
    data={data}
    id="_id"
    value={() => {
      if (data.length > 0) {
        if (val === data.length || val > data.length) {
          val = 0;
        }
        let index = val;
        val = val + 1;
        return (data[index].count / cnt);
      }
    }}
    valueFormat=" >-1~%"
    onClick={(node, data) => handleCourseClick(node)}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    // innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    height={450}
    activeOuterRadiusOffset={10}
    borderWidth={1}
    colors={{ scheme: 'paired' }}
    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={4}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
    motionConfig="stiff"
  />
)


export default MyResponsivePie;