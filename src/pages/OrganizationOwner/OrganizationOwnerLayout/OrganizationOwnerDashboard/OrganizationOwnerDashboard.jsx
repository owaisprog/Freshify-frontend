import {
  Avatar,
  Box,
  Divider,
  Flex,
  Image,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import OrganizationOwnerChart from "./OrganizationOwnerChart/OrganizationOwnerChart";
import { Carousel } from "@mantine/carousel";
import { Link } from "react-router-dom";

// carausel data
const carouselData = [
  {
    name: "CUTTING EDGE, TEXAS",
    details: "Carney Street, San Antonio, TX, USA",
    imgUrl:
      "https://tse2.mm.bing.net/th?id=OIP.zm8v-1Hoc3M2lOO2LH_N9AHaE7&w=315&h=315&c=7",
  },
  {
    name: "Atta Boy Hair Studio",
    details: "Adelaide, South Australia",
    imgUrl:
      "https://tse4.mm.bing.net/th?id=OIP.s1hx7Pz_SRstaVIeerEPaAHaE8&w=316&h=316&c=7",
  },
  {
    name: "A Star Barbers",
    details: "Chessington, Surrey, UK",
    imgUrl:
      "https://tse3.mm.bing.net/th?id=OIP.iceYBn1Y4Ojz5njQU4ebTgHaGv&w=431&h=431&c=7",
  },
  {
    name: "Hyp3 Barbers",
    details: "Townsville Shopping Centre, Queensland, Australia",
    imgUrl:
      "https://tse4.mm.bing.net/th?id=OIP.YYrwxZl4fBpqIzAi9nCp1QHaFu&w=366&h=366&c=7",
  },
  {
    name: "George's Barber Shop",
    details: "Fort Greene, Brooklyn, NY, USA",
    imgUrl:
      "https://tse4.mm.bing.net/th?id=OIP.s1hx7Pz_SRstaVIeerEPaAHaE8&w=316&h=316&c=7",
  },
];

export default function OrganizationOwnerDashboard() {
  return (
    <main className="flex flex-col  min-h-screen md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] 2xl:min-h-[900px] ">
      <Title order={1} c={"white"} fw={"bold"} my={"lg"}>
        DASHBOARD
      </Title>

      {/* Total Assets section  */}
      <section className="  flex gap-4   ">
        {/* Sales  sections  */}
        <section className=" w-[300px]   flex flex-col justify-between ">
          <Paper bg={"#39393A"} opacity={0.98} radius={"10px"} py={"xs"}>
            <Title order={5} c={"white"} ta={"center"} fw={"normal"}>
              TOTAL SALES
            </Title>
            <Title order={2} c={"white"} ta={"center"} fw={"normal"}>
              $12,554
            </Title>
            <Divider my="sm" />
            <Title order={6} c={"white"} ta={"center"} fw={"normal"}>
              Average Sales
            </Title>
            <Title order={2} c={"white"} ta={"center"} fw={"normal"}>
              $35
            </Title>
          </Paper>

          {/* Top Performers SECTOION  */}
          <Paper
            bg={"#39393A"}
            opacity={0.98}
            radius={"10px"}
            mt={"lg"}
            p={"sm"}
          >
            <Title order={5} c={"white"} mb={"md"} ta={"center"} fw={"normal"}>
              TOP PERFORMERS
            </Title>

            {/* TOP PERFORMERS   */}
            {[1, 2, 3, 4, 5].map((item) => (
              <Box
                key={item}
                bg={"black"}
                className="rounded-lg"
                p={"xs"}
                mb={"md"}
              >
                <Flex align={"center"} justify={"space-evenly"}>
                  <Avatar
                    variant="filled"
                    radius="xl"
                    size={"lg"}
                    src="https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png"
                  />
                  <Flex direction={"column"}>
                    <Title order={6} c={"white"} ta={"center"} fw={"normal"}>
                      Tayyeb&apos;s Total Sales
                    </Title>
                    <Title order={2} c={"white"} ta={"center"} fw={"normal"}>
                      $35
                    </Title>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Paper>
        </section>
        {/* CHART, ORDERS AND LOCATION SECTION  */}
        <section className="  w-[calc(100%-316px)] flex flex-col justify-between  ">
          <OrganizationOwnerChart />
          {/* ORDERS SECTION  */}
          <section className="flex justify-between ">
            <Paper
              bg={"#39393A"}
              w={300}
              opacity={0.98}
              radius={"10px"}
              py={"sm"}
            >
              <Title order={5} c={"white"} ta={"center"} fw={"normal"}>
                TOTAL ORDERS
              </Title>
              <Title order={2} c={"white"} ta={"center"} fw={"normal"}>
                5,555
              </Title>
              <Divider my="sm" />
              <Title order={5} c={"white"} ta={"center"} fw={"normal"}>
                Orders Today
              </Title>
              <Title order={2} c={"white"} ta={"center"} fw={"normal"}>
                35
              </Title>
              <Divider my="sm" />
              <Title order={5} c={"white"} ta={"center"} fw={"normal"}>
                Orders Current Week
              </Title>
              <Title order={2} c={"white"} ta={"center"} fw={"normal"}>
                129
              </Title>
            </Paper>

            <Carousel
              withIndicators
              withControls={false}
              height={270}
              bg={"#39393A"}
              w={450}
              dragFree
              slideGap="lg"
              align="start"
              className=" p-1 rounded-xl"
            >
              {carouselData.map((item, index) => (
                <Carousel.Slide
                  key={index}
                  className="flex p-4  bg-[#39393A] rounded-xl  "
                >
                  <div className="  self-center">
                    <Image radius="md" h={144} w={144} src={item.imgUrl} />
                  </div>
                  <div className="px-4 ">
                    <Title order={5} c={"white"} fw={"normal"} mb={"lg"}>
                      LOCATIONS
                    </Title>

                    <Title order={4} c={"white"} fw={"normal"}>
                      {item.name}
                    </Title>
                    <Title
                      className="uppercase"
                      order={6}
                      c={"white"}
                      fw={"normal"}
                    >
                      {item.details}
                    </Title>
                    <Divider my="sm" />
                    <Text c={"white"} size="xs" fw={"normal"}>
                      <Link
                        className="hover:underline hover:underline-offset-4"
                        to={"#"}
                      >
                        View Details
                      </Link>
                    </Text>
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>
          </section>
        </section>
      </section>
    </main>
  );
}
