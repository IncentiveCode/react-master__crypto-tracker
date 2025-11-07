import { useQuery } from "@tanstack/react-query";
import { fetchPriceInfo } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IPriceData {
	close: string;
	high: string; 
	low: string;
	market_cap: number;
	open: string;
	time_close: number; 
	time_open: number; 
	volume: string; 
}

function Chart({ coinId }: ChartProps) {	
	const { isLoading, data } = useQuery<IPriceData[]>(
		{ queryKey: ["chart", coinId], queryFn: () => fetchPriceInfo(coinId ?? ""), refetchInterval: 10000 }
	);
	
	return (
		<div>
      {isLoading ? (
        "Loading chart..."
      ) : (
      	data && <ApexChart
          type="candlestick"
					height={350}
          series={[
						{ name: "Chart", data: data?.map((item) => {
							return {
								x: new Date(item.time_close),
								y: [parseFloat(item.open), parseFloat(item.high), parseFloat(item.low), parseFloat(item.close)],
							};
						}) ?? [] },
					]}
          options={{
            chart: {
							type: 'candlestick',
              height: 350,
              width: 500,
							toolbar: {
								show: false,
							}
            },
            yaxis: {
              tooltip: {
								enabled: false
							}
            },
            xaxis: {
							type: 'datetime',
            },
						theme: {
							mode: 'light',
						},
						tooltip: {
							enabled: true,
						}
          }}
        />
      )}
    </div>
	);
}

export default Chart;