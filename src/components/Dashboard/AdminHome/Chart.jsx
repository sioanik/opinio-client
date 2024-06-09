import { PieChart, Pie } from "recharts";


export default function Chart({ users, allPosts, allComments }) {
    const usersLength = users.length
    const postsLength = allPosts.length
    const commentsLength = allComments.length
    const data = [
      { name: "Total Users", value: usersLength },
      { name: "Total Posts", value: postsLength },
      { name: "Total Comments", value: commentsLength },
 
    ];
    return (
    <PieChart width={200} height={200}>
      <Pie
        dataKey="value"
        startAngle={360}
        endAngle={0}
        data={data}
        cx={100}
        cy={100}
        outerRadius={60}
        fill="#8884d8"
        label
      />
    </PieChart>
  );
}
