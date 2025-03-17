import { Card, Divider, Grid, Progress } from "@mantine/core";
import TabCard from "./TabCard";
import { FaTools } from "react-icons/fa";

function ProgressBar() {
  const stats = [1, 2, 3, 4];

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="25px"
      className="flex flex-col gap-[10px] p-[10px] rounded-[25px] border-[#718EBF] border-[0.3px]"
    >
      {stats.map((val, index) => (
        <div key={val}>
          <Grid align="center" p={3} gutter={2}>
            {/* Icon Column */}
            <Grid.Col span={{ base: 2.8, xs: 2, sm: 1.2, lg: 2.3 }}>
              <TabCard.Profile backGround="bg-pink-100">
                <FaTools size={40} color="#FF82AC" />
              </TabCard.Profile>
            </Grid.Col>

            {/* Progress Bar Column */}
            <Grid.Col span={{ base: 8 }}>
              <div className="flex flex-col gap-1.5">
                <h1>Service No {val}</h1>
                <Progress value={20} size="lg" radius="xl" />
              </div>
            </Grid.Col>

            {/* Number Column */}
            <Grid.Col
              span={{ base: 12, xs: 1 }}
              className="text-right font-semibold"
            >
              1,360
            </Grid.Col>
          </Grid>

          {/* Divider (Only add if it's not the last item) */}
          {index !== stats.length - 1 && <Divider className="my-2" />}
        </div>
      ))}
    </Card>
  );
}

export default ProgressBar;
