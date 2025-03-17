import { Card, Divider } from "@mantine/core";

export default function DashboardCard({ stats }) {
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="25px"
      className="flex flex-col  gap-[10px] rounded-[25px] border-[#718EBF] border-[0.3px]"
    >
      {stats.map((stat, index) => (
        <div key={index}>
          {/* Row: Icon + Title + Amount */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Dynamic Icon */}
              <div
                className={`w-6 h-6 ${stat.bgColor} rounded-full flex items-center justify-center text-white`}
              >
                {stat.icon}
              </div>
              <span className="font-roboto font-normal text-[18px] leading-none tracking-normal">
                {stat.title}
              </span>
            </div>
            <span className="font-roboto font-semibold text-[30px] leading-none tracking-normal">
              {stat.amount}
            </span>
          </div>

          {/* Divider (except for the last item) */}
          {index !== stats.length - 1 && <Divider my="sm" />}
        </div>
      ))}
    </Card>
  );
}
