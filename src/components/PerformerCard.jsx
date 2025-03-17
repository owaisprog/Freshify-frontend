import { Card, Divider } from "@mantine/core";

function PerformerCard() {
  return (
    <Card
      shadow="sm"
      p="lg"
      radius={"25px"}
      className="flex gap-[10px]  rounded-[25px] border-[#718EBF] border-[0.3px]"
    >
      {/* First row: Icon Placeholder + Label + Amount */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {/* Icon Placeholder (emoji, or could be plain text) */}
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
            📊
          </div>
          <span className="font-roboto font-normal text-[18px] leading-none tracking-norma">
            Total Sales
          </span>
        </div>
        <span className="font-roboto font-semibold text-[30px] leading-none tracking-normal">
          $12,996
        </span>
      </div>

      <Divider />

      {/* Second row: Icon Placeholder + Label + Amount */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          {/* Another Icon Placeholder */}
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
            💰
          </div>
          <span className="font-roboto font-normal text-[18px] leading-none tracking-normal">
            Average Sales
          </span>
        </div>
        <span className="font-roboto font-semibold text-[30px] leading-none tracking-normal">
          $75
        </span>
      </div>
    </Card>
  );
}

export default PerformerCard;
